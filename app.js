const table = document.querySelector(".table");
const generateTableBtn = document.querySelector(".draw-btn");

generateTableBtn.addEventListener("click", (e) => {
  nums = generateNumbers(rows.value, cols.value);
  buildTable();

  e.preventDefault();
});

table.addEventListener("mouseleave", () => {
  table
    .querySelectorAll(".num")
    .forEach((cell) => cell.classList.remove("neighbour"));
});

table.addEventListener("mousemove", (e) => {
  if (!e.target.classList.contains("num")) {
    table
      .querySelectorAll(".num")
      .forEach((cell) => cell.classList.remove("neighbour"));
  }

  const activeRow = table.querySelector(".activeRow");
  if (activeRow) activeRow.classList.remove("activeRow");
  if (e.target.classList.contains("sum")) {
    e.target.parentElement.classList.add("activeRow");
  }
});

table.addEventListener("click", ({ target }) => {
  switch (target.className) {
    case "del-btn":
      nums.splice(target.closest("tr").rowIndex, 1);
      if (nums.length) {
        buildTable();
      } else {
        table.innerHTML = "";
      }
      break;
    case "add-btn":
      nums.push(generateNumbers(1, nums[0].length)[0]);
      buildTable();
      break;
    case "num":
      nums.flat().find((num) => num.ID == target.id.slice(4)).Amount++;
      buildTable();
  }
});

function buildTable() {
  table.innerHTML = generateAdvancedTable(nums);
  const numCells = document.querySelectorAll(".num");
  numCells.forEach((cell) =>
    cell.addEventListener("mouseover", (e) => {
      const neighbours = findNeighbours(
        e.target.id.slice(4),
        closestCells.value
      );
      table
        .querySelectorAll(".num")
        .forEach((cell) => cell.classList.remove("neighbour"));
      neighbours.forEach((num) =>
        table.querySelector("#cell" + num.id).classList.add("neighbour")
      );
    })
  );
}

// function generateTable(rows, cols) {
//   let html = "<table>";
//   for (let row = 0; row < rows; ++row) {
//     html += "<tr>";
//     for (let col = 0; col <tr cols; ++col) {
//       html += "<td>" + randomNum() + "</td>";
//     }
//     html += "</tr>";
//   }
//   html += "</table>";

//   return html;
// }
//При наведении на ячейку подсветить X ячеек, Amount которых самый близкий к Amount текущей ячейки.
function generateAdvancedTable(arr) {
  let html = "";
  arr.forEach((row) => {
    html += "<tr>";
    const sum = row.reduce((sum, num) => sum + num.Amount, 0);
    row.forEach((num) => {
      const portion = Math.round((num.Amount / sum) * 100);
      html +=
        '<td class="num" id="cell' +
        num.ID +
        '" data-portion="' +
        portion +
        '%" style="--portion: ' +
        portion +
        '%">' +
        num.Amount +
        "</td>";
    });
    html += '<td class="sum">' + sum + "</td>";
    html += '<td class="btn-cell"><button class="del-btn">del</button></td>';
    html += "</tr>";
  });
  html += "<tr>";
  const avgNums = arr[0].map((_, index) => {
    return Math.floor(
      arr.reduce((sum, row) => sum + row[index].Amount, 0) / arr.length
    );
  });
  avgNums.forEach((num) => {
    html += '<td class="average">' + num + "</td>";
  });

  html +=
    '<td></td><td class="btn-cell"><button class="add-btn">add</button></td></tr>';
  return html;
}

function generateNumbers(rows, cols) {
  let nums = [];
  let count = 1;
  for (let row = 0; row < rows; ++row) {
    let arr = [];
    for (let col = 0; col < cols; ++col) {
      arr.push({ ID: count++, Amount: randomNum() });
    }
    nums.push(arr);
  }
  return nums;
}

function randomNum() {
  return Math.floor(Math.random() * 900) + 100;
}

function findNeighbours(id, n) {
  //сделать плоскую копию массива намс
  const numsFlat = nums.flat();
  //значение элемента
  const amount = numsFlat.find((num) => num.ID == id).Amount;
  //создали новый массив с новыми объектами со значением "разница"
  const numDiffs = numsFlat.map((num) => ({
    id: num.ID,
    diff: Math.abs(num.Amount - amount),
  }));
  //отсортировали новый массив по разницам
  numDiffs.sort((a, b) => a.diff - b.diff);

  return numDiffs.splice(1, n);
}

generateTableBtn.click();
