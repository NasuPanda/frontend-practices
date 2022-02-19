const conversionBtn = document.getElementById("conversion-btn");
conversionBtn.addEventListener("click", (e) => {
    console.log(e);
    load()
    // 変換処理開始(ローディングアニメーション表示)
    // 変換処理実行
    // 変換処理終了(ローディングアニメーション終了)
})

function load() {
    const loading = document.getElementById("conversion-loading");

    function startLoad() {
        loading.style.visibility = "visible";
    };
    function stopLoad() {
        loading.style.visibility = "hidden";
    }

    startLoad();
    setTimeout(stopLoad, 3000);
}