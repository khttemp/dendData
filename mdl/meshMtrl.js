function makeModelTable() {
    let table = $("<table>", {border:1});
    let thead = $("<thead>");
    let tr = $("<tr>");
    tr.append($("<th>", {text: "メッシュ番号"}));
    tr.append($("<th>", {text: "マテリアル番号"}));
    tr.append($("<th>", {text: "画像"}));
    tr.append($("<th>", {class:"colorList", text: "カラーバリエーション"}));
    tr.append($("<th>", {class:"description", text: "説明"}));
    tr.append($("<th>", {text: "デフォルトのテクスチャ画像"}));
    thead.append(tr);
    table.append(thead);
    let tbody = $("<tbody>");
    table.append(tbody);
    return [table, tbody];
}

function makeTr(mtrl, key, model, meshNum, mtrlNum) {
    let tr = $("<tr>");
    let imageSrc = `./meshMtrl/${key}/${model}/${meshNum}-${mtrlNum}.png`;
    let textureSrc = "";
    if (mtrl["texture"] != "") {
        let array = mtrl["texture"].split(".");
        if (array[array.length - 1].toLowerCase() == "tga") {
            let img = array[0] + ".png";
            textureSrc = `./meshMtrl/texture/${img}`;
        } else {
            textureSrc = `./meshMtrl/texture/${mtrl["texture"]}`;
        }
    }
    tr.append($("<td>", {text: meshNum, style: "text-align: center; font-size:200%;"}));
    tr.append($("<td>", {text: mtrlNum, style: "text-align: center; font-size:200%;"}));
    tr.append($("<td>").append($("<img>", {src: imageSrc, width:"400px", border:1})));
    if (mtrl["colorList"].length > 0) {
        let td = $("<td>")
        for (let i = 0; i < mtrl["colorList"].length; i++) {
            let color = mtrl["colorList"][i];
            td.append($("<div>", {class:"colorList", text: "・" + color}));
        }
        tr.append(td);
    } else {
        tr.append($("<td>", {class:"colorList", text: "-", style: "text-align: center"}));
    }
    tr.append($("<td>", {class:"description", text: mtrl["description"]}));
    if (mtrl["texture"] != "") {
        tr.append($("<td>", {style: "text-align: center"})
            .append($("<img>", {src: textureSrc, width:"150px", border:1}))
            .append($("<div>", {text: mtrl["texture"]})));
    } else {
        tr.append($("<td>", {text: "なし"}));
    }
    return tr;
}

$(document).ready(function() {
    $.ajax({
        url: "./meshMtrl.json",
        type: "GET",
        dataType: "json",
    }).done(function(data) {
        let keyList = Object.keys(data);
        for (let key of keyList) {
            let modelData = data[key];
            if (Object.keys(modelData).length == 0) {
                continue;
            }
            let modelKeyList = Object.keys(modelData);
            for (let model of modelKeyList) {
                let meshNum = 0;
                let modelDiv = $("<div>");
                let modelTitle = $("<h2>", {text: model});
                modelDiv.append(modelTitle);
                $("#modelTable").append(modelDiv);

                let tableAndTbody = makeModelTable();
                let table = tableAndTbody[0];
                let tbody = tableAndTbody[1];
                modelDiv.append(table);
                let meshData = modelData[model];
                if (Object.keys(meshData).length == 0) {
                    continue;
                }
                let mtrlDataList = meshData[Object.keys(meshData)[0]];
                let mtrlNum;
                for (let mtrlData of mtrlDataList) {
                    mtrlNum = 0;
                    if (Object.keys(mtrlData).length == 0) {
                        continue;
                    }
                    let mtrlInfo = mtrlData[Object.keys(mtrlData)[0]];
                    for (let mtrl of mtrlInfo) {
                        tbody.append(makeTr(mtrl, key, model, meshNum, mtrlNum));
                        mtrlNum++;
                    }
                    meshNum++;
                }
            }
        }
    });
});