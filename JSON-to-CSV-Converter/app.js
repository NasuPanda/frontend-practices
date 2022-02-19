// 表示切り替え
const loading = document.getElementById("conversion-loading");
const outputContainer = document.getElementById("output-container");
const inputContainer = document.getElementById("input-container");
// タブ
const inputJSONTab = document.getElementById("input-json-tab");
const uploadJSONTab = document.getElementById("upload-json-tab");
const outputCSVTab = document.getElementById("output-csv-tab");
const downloadCSVTab = document.getElementById("download-csv-tab");
const tabs = document.querySelectorAll("input[name='tab']");
// ボタン
const conversionBtn = document.getElementById("conversion-btn");
// 入力ファイル
const fileInput = document.getElementById("input-json-file");
// ファイル読み込み結果
let readResult = ""


conversionBtn.addEventListener("click", (e) => {
    // 変換処理開始(ローディングアニメーション表示)
    startLoad();
    // 変換処理実行
    validateResult = validateInput()
    if (!validateResult) return
    console.log(validateResult)
    // 変換処理終了(ローディングアニメーション終了)
    stopLoad();
})

// ------------------------------------
// 入力
// ------------------------------------
/** テキストが入力された */
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


function readFile() {
    const reader = new FileReader();
    reader.readAsText(fileInput.files[0])
    reader.addEventListener("load", () => {
        readResult = reader.result;
    })
}
fileInput.addEventListener("change", readFile);


// ------------------------------------
// 表示
// ------------------------------------
/** ロード開始時の処理 */
function startLoad() {
    loading.style.visibility = "visible";
};

/** ロード終了時の処理 */
function stopLoad() {
    toggleDisplay(inputContainer);
    toggleDisplay(outputContainer);

    for (const tab of tabs) {
        tab.checked = false
    }
    outputCSVTab.checked = true;

    loading.style.visibility = "hidden";
};

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