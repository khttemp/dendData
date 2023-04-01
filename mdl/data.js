function createTd(table, data) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let i = 0; i < data.length; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        if (i == 1) {
            td.innerHTML = data[i].replaceAll("|", "<br>");
        } else {
            td.innerHTML = data[i];
        }

        if (i == 0) {
            let imageTd = document.createElement("td");
            tr.appendChild(imageTd);
            let name = data[i].split(".smf")[0];
            let imgPath = "./image/" + name + ".png";
            $.ajax({
                url: imgPath,
                type: "HEAD",
                success: function() {
                    imageTd.innerHTML = `<a href="${imgPath}" target="_blank" rel="noopener noreferrer"><img src="${imgPath}" width="200"></a>`;
                }
            });
        }
    }
}

$(document).ready(function() {
    $.ajax({
        url: "./model.csv",
        dataType: "text",
        success: function(data) {
            allText = data;
        }
    }).done(function(data) {
        let rows = data.split("\n");
        rows.splice(0, 1);
        let modelTable = document.getElementById("modelTable");
        for (let i = 0; i < rows.length; i++) {
            let data = rows[i].split(",");
            if (data.length >= 2) {
                createTd(modelTable, data);
            }
        }
    });
});