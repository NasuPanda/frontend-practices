/**
 * 2022/02/23 昼
 * BGMの選択、ボリュームの部分リファクタリングした。
 * それらを参照している箇所(BGM音量チェックなど)も変更。
 *
 * ボリュームチェックのpause関数を無名関数にした。
 *
 * ストップボタンを押したときにinputの表示も変更されるようにした。
 *
 * audioPlay, audioPause関数の導入により大幅にコード量削減！
 * TODO 音量チェック、再生で場合分けが必要
 *      ループの有無
 */


// ------------------------------------------
// audio 入力
// ------------------------------------------
/** 選択された音声 */
const selectedSounds = {
    "bgm" : document.getElementById("bgm-fire"),
    "alarm" : document.getElementById("alarm-clock-1")
}
/** ボリュームの入力 */
const volumes = {
    "bgm" : document.getElementById("bgm-volume"),
    "alarm" : document.getElementById("alarm-volume")
}

const bgmSelect = document.getElementById("bgm-select");
const alarmSelect = document.getElementById("alarm-select");

bgmSelect.addEventListener("change", () => {
    const index = bgmSelect.selectedIndex;
    const bgmData = bgmSelect.options[index].dataset.bgm;
    selectedSounds.bgm = document.getElementById(`bgm-${bgmData}`);
})
alarmSelect.addEventListener("change", () => {
    const index = alarmSelect.selectedIndex;
    const alarmData = alarmSelect.options[index].dataset.alarm;
    selectedSounds.alarm = document.getElementById(`alarm-${alarmData}`)
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
    correspond.timer.textContent = correspond.number.value;

    correspond.range.addEventListener("input", () => {
        // rangeの値を0埋めしてnumberに代入する
        correspond.number.value = correspond.range.value.padStart(2, "0");
        correspond.timer.textContent = correspond.range.value.padStart(2, "0");
    })

    correspond.number.addEventListener("input", () => {
        // rangeにはそのまま値を代入すればいい
        correspond.range.value = correspond.number.value;
        correspond.number.value = correspond.number.value.padStart(2, "0");
        correspond.timer.textContent = correspond.number.value
    })
}

correspondInputTimer(correspondenceInputMinutesTimer);
correspondInputTimer(correspondenceInputSecondsTimer);

// ------------------------------------------
// 音声の制御
// ------------------------------------------
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const bgmCheck = document.getElementById("bgm-volume-check");
const alarmCheck = document.getElementById("alarm-volume-check");
const buttonsDisabledPlayback = [startBtn, bgmCheck, alarmCheck];
let isStop = false;

stopBtn.addEventListener("click", () => {
    isStop = true;
})

/** audio要素をplayし、ボタンを無効化する */
function audioPlay(audio, volume) {
    audio.volume = volume;
    audio.play();
    buttonsDisabledPlayback.forEach(btn => {
        btn.disabled = true;
    });
}

/** 一定時間再生する。 */
function audioPlayShort(audio, volume) {
    audioPlay(audio, volume);
    setTimeout(audioPause, 5000, audio);
}

/** audio要素をpauseし、ボタンを有効化する */
function audioPause(audio) {
    audio.pause();
    audio.currentTime = 0;
    buttonsDisabledPlayback.forEach(btn => {
        btn.disabled = false;
    });
}

/** 入力値をセットする */
function setInput(min, sec) {
    correspondenceInputMinutesTimer.number.value = String(min).padStart(2, "0");
    correspondenceInputMinutesTimer.range.value = min;
    correspondenceInputSecondsTimer.number.value = String(sec).padStart(2, "0");
    correspondenceInputSecondsTimer.range.value = sec;
}

function start() {
    let min = correspondenceInputMinutesTimer.number.value
    let sec = correspondenceInputSecondsTimer.number.value
    const minTimer = correspondenceInputMinutesTimer.timer
    const secTimer = correspondenceInputSecondsTimer.timer
    isStop = false;

    function finishPlay() {
        clearInterval(id);
        setInput(min, sec);
        audioPause(selectedSounds.bgm, buttonsDisabledPlayback);
    }

    audioPlay(selectedSounds.bgm, volumes.bgm.value/100);

    const id = setInterval( () => {
        if (min == 0 && sec == 0) {
            finishPlay();
            audioPlayShort(selectedSounds.alarm, volumes.alarm.value/100);
        } else if (isStop) {
            finishPlay();
        } else if (sec == 0) {
            sec = 59;
            min -= 1;
            minTimer.textContent = String(min).padStart(2, "0");
            secTimer.textContent = String(sec).padStart(2, "0");
        } else {
            sec -= 1;
            secTimer.textContent = String(sec).padStart(2, "0");
        }
    }, 1000);
}

startBtn.addEventListener("click", start)

// ------------------------------------------
// 音量チェック
// ------------------------------------------
/** 一定時間再生する。 */
const playVolumeCheck = function(audioId, buttonsDisabledPlayback) {
    const selectedAudio = selectedSounds[audioId];
    // 入力レンジが0〜100でボリュームは0〜1なので100で割る
    const volume = volumes[audioId].value / 100;
    audioPlayShort(selectedAudio, volume);
}

bgmCheck.addEventListener('click', playVolumeCheck.bind(null, "bgm"))
alarmCheck.addEventListener('click', playVolumeCheck.bind(null, "alarm"))
