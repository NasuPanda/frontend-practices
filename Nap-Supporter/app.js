// ボリュームの入力
const bgmVolumeSlider = document.getElementById("bgm-volume");
const alarmVolumeSlider = document.getElementById("alarm-volume");

// ------------------------------------------
// 音の選択
// ------------------------------------------

const natureSelect = document.getElementById("bgm-select");
const alarmSelect = document.getElementById("alarm-select");
const selectedSounds = {
    "bgm" : natureSelect.options[natureSelect.selectedIndex].dataset.bgm,
    "alarm" : alarmSelect.options[alarmSelect.selectedIndex].dataset.alarm
}

natureSelect.addEventListener("change", () => {
    let index = natureSelect.selectedIndex;
    selectedBGM = natureSelect.options[index].dataset.bgm;
})
alarmSelect.addEventListener("change", () => {
    let index = alarmSelect.selectedIndex;
    selectedAlarm = alarmSelect.options[index].dataset.bgm;
})

// ------------------------------------------
// 時間の表示
// ------------------------------------------
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

// ------------------------------------------
// 音声の制御
// ------------------------------------------
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const stopBtn = document.getElementById("stop-btn");
// 音量チェック
const bgmCheck = document.getElementById("bgm-volume-check");
const alarmCheck = document.getElementById("alarm-volume-check");

function play(audio, volume) {
    audio.volume = volume;
    audio.play();
}

function pause(audio) {
    audio.pause();
    audio.currentTime = 0;
}

/** 一定時間再生する。 */
function playVolumeCheck(audioId) {
    const selectedAudio = document.getElementById(`${audioId}-${selectedSounds[audioId]}`)
    // 入力レンジが0〜100でボリュームは0〜1なので100で割る
    volume = document.getElementById(`${audioId}-volume`).value / 100;
    play(selectedAudio, volume);
    window.setTimeout(pause, 5000, selectedAudio);
}

bgmCheck.addEventListener('click', () => { playVolumeCheck("bgm") })
alarmCheck.addEventListener('click', () => { playVolumeCheck("alarm") })
