// ボリュームの入力
const bgmVolumeSlider = document.getElementById("bgm-volume");
const alarmVolumeSlider = document.getElementById("alarm-volume");
// ------------------------------------------
// 音の選択
// ------------------------------------------
const natureSelect = document.getElementById("nature-bgm-select");
const alarmSelect = document.getElementById("alarm-select");
let selectedBGM = "";
let selectedAlarm = "";

natureSelect.addEventListener("change", () => {
    let index = natureSelect.selectedIndex;
    selectedBGM = natureSelect.options[index].dataset.bgm;
})
alarmSelect.addEventListener("change", () => {
    let index = alarmSelect.selectedIndex;
    selectedAlarm = alarmSelect.options[index].dataset.bgm;
})

/** input⇔分タイマーの紐付け */
const correspondenceInputMinutesTimer = {
    "timer" : document.getElementById("timer-minutes"),
    "range" : document.getElementById("minutes-range"),
    "number" : document.getElementById("minutes-number")
}

/** input⇔秒タイマーの紐付け */
const correspondenceInputSecondsTimer = {
    "timer" : document.getElementById("timer-seconds"),
    "range" : document.getElementById("seconds-range"),
    "number" : document.getElementById("seconds-number")
}

function correspondInputTimer(correspond) {
    // numberは値が表示されるため、0埋めしておく
    correspond.number.value = correspond.number.value.padStart(2, "0");
    correspond.timer.innerHTML = correspond.number.value;

    correspond.range.addEventListener("input", () => {
        // rangeの値を0埋めしてnumberに代入する
        correspond.number.value = correspond.range.value.padStart(2, "0");
        correspond.timer.innerHTML = correspond.range.value.padStart(2, "0");
    })

    correspond.number.addEventListener("input", () => {
        // rangeにはそのまま値を代入すればいい
        correspond.range.value = correspond.number.value;
        correspond.number.value = correspond.number.value.padStart(2, "0");
        correspond.timer.innerHTML = correspond.number.value
    })
}

correspondInputTimer(correspondenceInputMinutesTimer);
correspondInputTimer(correspondenceInputSecondsTimer);