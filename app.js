const table = document.querySelector(".table");

table.addEventListener("click", ({ target }) => {
  switch (target.className) {
    case "del-btn":
      nums.splice(target.closest("tr").rowIndex, 1);
      table.innerHTML = generateAdvancedTable(nums);
      break;
    case "add-btn":
      nums.push(generateNumbers(1, nums[0].length)[0]);
      table.innerHTML = generateAdvancedTable(nums);
      break;
    case "num":
      nums.flat().find((num) => num.ID == target.id.slice(4)).Amount++;
      table.innerHTML = generateAdvancedTable(nums);
  }
});

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

function generateAdvancedTable(arr) {
  let html = "";
  arr.forEach((row) => {
    html += "<tr>";
    row.forEach((num) => {
      html += '<td class="num" id="cell' + num.ID + '">' + num.Amount + "</td>";
    });
    html +=
      '<td class="sum">' +
      row.reduce((sum, num) => sum + num.Amount, 0) +
      "</td>";
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

let nums = generateNumbers(4, 3);
table.innerHTML = generateAdvancedTable(nums);

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

console.log(generateNumbers(4, 3));

function randomNum() {
  return Math.floor(Math.random() * 900) + 100;
}
