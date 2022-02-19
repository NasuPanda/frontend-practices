// 表示切り替え
const loading = document.getElementById("conversion-loading");
const outputContainer = document.getElementById("output-container");
const inputContainer = document.getElementById("input-container");
// タブ
const inputJSONTab = document.getElementById("input-json-tab");
const uploadJSONTab = document.getElementById("upload-json-tab");
const outputCSVTab = document.getElementById("output-csv-tab");
const downloadCSVTab = document.getElementById("download-csv-tab");
const tabs = [inputJSONTab, uploadJSONTab, outputCSVTab, downloadCSVTab];
// ボタン
const conversionBtn = document.getElementById("conversion-btn");
// 入力ファイル
const fileInput = document.getElementById("input-json-file");
// テーブル
const csvTable = document.getElementById("output-csv");
// ファイル読み込み結果
let readResult = ""

conversionBtn.addEventListener("click", (e) => {
    // 変換処理開始(ローディングアニメーション表示)
    startLoad();

    // 変換処理実行
    validatedInput = validateInput()
    if (!validatedInput) {
        suspendLoad();
        return
    }

    const convertedInput = convertJsonToCsv(validatedInput);
    csvConvertArray(convertedInput);

    // 変換処理終了(ローディングアニメーション終了)
    finishLoad();
})

// ------------------------------------
// 入力
// ------------------------------------

/** 入力の検証 */
function validateInput() {
    const inputText = document.getElementById("input-json-text").value;

    if (inputText && readResult) {
        window.alert("入力はテキストかファイルのどちらかにしてください。")
        return false
    } else if (inputText) {
        return inputText
    } else if (readResult) {
        return readResult
    } else {
        window.alert("テキストかファイルを入力してください。")
        return false
    }
}

/** ファイルを読み込む */
function readFile() {
    const reader = new FileReader();
    reader.readAsText(fileInput.files[0])
    reader.addEventListener("load", () => {
        readResult = reader.result;
    })
}
fileInput.addEventListener("change", readFile);

// ------------------------------------
// JSON
// ------------------------------------

/** JSONをCSVに変換する */
function jsonToCsv(json) {
    const header = Object.keys(json[0]).join(',') + "\n";

    const body = json.map(function(d){
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");

    return header + body;
}

/** 変換処理実行 */
function convertJsonToCsv(input) {
    if (typeof(input) === "string") {
        return jsonToCsv(JSON.parse(input));
    } else {
        return jsonToCsv(input)
    }
}

// ------------------------------------
// CSV
// ------------------------------------

/** CSVを配列に変換する */
function csvConvertArray(csv) {
    const dataArray = [];
    const dataString = csv.split('\n');
    for (let i = 0; i < dataString.length; i++) {
        dataArray[i] = dataString[i].split(',');
    }
    return dataArray
}

// ------------------------------------
// 表示
// ------------------------------------

/** ロード開始時の処理 */
function startLoad() {
    loading.style.visibility = "visible";
};

/** ロード終了時の処理 */
function finishLoad() {
    toggleDisplay(inputContainer);
    toggleDisplay(outputContainer);

    for (const tab of tabs) {
        tab.checked = false
    }
    outputCSVTab.checked = true;

    loading.style.visibility = "hidden";
};

/** ロード中断時の処理 */
function suspendLoad() {
    loading.style.visibility = "hidden";
}

/** 要素の表示を切り替える */
function toggleDisplay(element) {
    if (element.classList.value === "active") {
        element.classList.remove("active");
        element.classList.add("inactive");
    } else {
        element.classList.remove("inactive");
        element.classList.add("active");
    }
}