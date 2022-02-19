const conversionBtn = document.getElementById("conversion-btn");
conversionBtn.addEventListener("click", (e) => {
    console.log(e);
    load()
    // 変換処理開始(ローディングアニメーション表示)
    // 変換処理実行
    // 変換処理終了(ローディングアニメーション終了)
})

const loading = document.getElementById("conversion-loading");
const outputContainer = document.getElementById("output-container");
const inputContainer = document.getElementById("input-container");
const defaultCheckedOutputTab = document.getElementById("output-csv-tab");
const tabs = document.querySelectorAll("input[name='tab']");

function startLoad() {
    loading.style.visibility = "visible";
};

function stopLoad() {
    inputContainer.style.display = "none";
    outputContainer.style.display = "flex";

    for (const tab of tabs) {
        tab.checked = false
    }
    defaultCheckedOutputTab.checked = true;

    loading.style.visibility = "hidden";
};

function load() {
    startLoad();
    setTimeout(stopLoad, 3000);
}