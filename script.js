var SPREADSHEET_ID = "1s9TpQq3aiKH4tJ_5MASL1C5-NdPh5xZ9I_u4o1UbMFk";
var TAB_NAME = "database";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://opensheet.elk.sh/" + SPREADSHEET_ID + "/" + TAB_NAME)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const placeholders = ["2020", "2021", "2022", "2023"];
      const intervals = [
        [0, 2],
        [3, 11],
        [12, 30],
        [31, 41],
      ];
      const chartElement = document.getElementById("chart");

      intervals.forEach((interval, index) => {
        const yearDiv = document.createElement("div");
        yearDiv.className = "year-overview";

        const h3 = document.createElement("h3");
        h3.className = "year-title";
        h3.textContent = placeholders[index];
        chartElement.appendChild(h3);

        for (let i = interval[0]; i <= interval[1] && i < data.length; i++) {
          const entry = data[i];

          var bookLink = document.createElement("a");
          bookLink.href = entry.file;
          bookLink.target = "_blank";
          bookLink.rel = "noopener noreferrer";
          bookLink.className = "book-link";

          var bookDiv = document.createElement("div");
          bookDiv.className = "item";

          var img = document.createElement("img");
          img.className = "cover";
          img.src = entry.cover;

          var detailsDiv = document.createElement("div");
          detailsDiv.className = "details";

          var title = document.createElement("div");
          title.className = "book-title";
          title.textContent = entry.title + ",";

          var pageBreak = document.createElement("br");

          var author = document.createElement("span");
          author.className = "book-author";
          author.textContent = entry.author;

          title.appendChild(pageBreak);
          title.appendChild(author);

          detailsDiv.appendChild(title);

          bookDiv.appendChild(img);

          bookLink.appendChild(bookDiv);
          bookLink.appendChild(detailsDiv);
          yearDiv.appendChild(bookLink); // Append bookLink to yearDiv
        }

        chartElement.appendChild(yearDiv);
      });
    })
    .catch((error) => {
      console.error("There was an error fetching the data:", error);
    });
});
