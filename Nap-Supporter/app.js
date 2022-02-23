/**
 * 2022/02/23 昼
 * BGMの選択、ボリュームの部分リファクタリングした。
 * それらを参照している箇所(BGM音量チェックなど)も変更。
 *
 * ストップボタンを押したときにinputの表示も変更されるようにした。
 *
 * audioPlay, audioPause関数の導入により大幅にコード量削減！
 *
 * 音量チェック、再生で場合分けが必要(ループ有無)
 * → 通常の再生、一定時間再生する関数を作った。
 *
 * ☆ 以下リファクタリング
 *
 * disabledの名前変更、input要素も追加。
 *
 * bgmSelect, alarmSelect をbindでリファクタリング
 * イベントリスナーにおいて、thisはwindowを指す。
 * →bindを使ってthisの参照をselect要素にすることで対応。
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 *
 * ついでに、this使えばcorrespondenceもリファクタリング出来ること無い？
 * correspondenceにメソッドをもたせる→スプレッド構文で展開しつつプロパティを置き換え
 * 大本を作る→それぞれコピー・置換の方が良いだろうけど今回は2つのみので。
 */

/** 選択された音声のHTML要素 */
const selectedSounds = {
    "bgm" : document.getElementById("bgm-fire"),
    "alarm" : document.getElementById("alarm-clock-1")
}
/** ボリュームの入力のHTML要素 */
const volumes = {
    "bgm" : document.getElementById("bgm-volume"),
    "alarm" : document.getElementById("alarm-volume")
}

/** input⇔分タイマーの対応 */
const correspondenceInputMinutesTimer = {
    "timer" : document.getElementById("timer-minutes"),
    "range" : document.getElementById("minutes-range"),
    "number" : document.getElementById("minutes-number"),
    /** input ⇔ timerを紐付ける */
    correspondInputTimer() {
        // numberは値が表示されるため、0埋めしておく
        this.number.value = this.number.value.padStart(2, "0");
        this.timer.textContent = this.number.value;

        this.range.addEventListener("input", () => {
            // rangeの値を0埋めしてnumberに代入する
            this.number.value = this.range.value.padStart(2, "0");
            this.timer.textContent = this.range.value.padStart(2, "0");
        })
        this.number.addEventListener("input", () => {
            // rangeにはそのまま値を代入すればいい
            this.range.value = this.number.value;
            this.number.value = this.number.value.padStart(2, "0");
            this.timer.textContent = this.number.value
        })
    }
}
/** input⇔秒タイマーの対応 */
const correspondenceInputSecondsTimer = {
    ...correspondenceInputMinutesTimer,
    "timer" : document.getElementById("timer-seconds"),
    "range" : document.getElementById("seconds-range"),
    "number" : document.getElementById("seconds-number"),
}

const bgmSelect = document.getElementById("bgm-select");
const alarmSelect = document.getElementById("alarm-select");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const bgmVolumeCheck = document.getElementById("bgm-volume-check");
const alarmVolumeCheck = document.getElementById("alarm-volume-check");

/** 再生時無効にするHTML要素 */
const elementsDisabledPlayback = [
                                startBtn, bgmVolumeCheck, alarmVolumeCheck,
                                correspondenceInputMinutesTimer.range,
                                correspondenceInputMinutesTimer.number,
                                correspondenceInputSecondsTimer.range,
                                correspondenceInputSecondsTimer.number];

let isStopClick = false;

/** 音声が選択された時 */
function selectSound(audioId) {
    // カスタムデータ属性の取得 element.options.index.dataset.key
    const dataValue = this.options[this.selectedIndex].dataset[audioId];
    selectedSounds[audioId] = document.getElementById(`${audioId}-${dataValue}`);
}

/** audio要素をplayし、ボタンを無効化する */
function audioPlay(audio, volume) {
    audio.volume = volume;
    audio.loop = true;
    audio.play();
    elementsDisabledPlayback.forEach(btn => {
        btn.disabled = true;
    });
}

/** audio要素をpauseし、ボタンを有効化する */
function audioPause(audio) {
    audio.pause();
    audio.currentTime = 0;
    elementsDisabledPlayback.forEach( btn => btn.disabled = false );
}

/** 一定時間再生する。 */
function audioPlayShort(audio, volume) {
    audioPlay(audio, volume);
    setTimeout(audioPause, 5000, audio);
}

/** 音量チェックを一定時間再生する。 */
function playVolumeCheck(audioId) {
    const selectedAudio = selectedSounds[audioId];
    const volume = volumes[audioId].value / 100;
    audioPlayShort(selectedAudio, volume);
}

/** タイマーの入力値をセットする */
function setTimerInputs(min, sec) {
    correspondenceInputMinutesTimer.number.value = String(min).padStart(2, "0");
    correspondenceInputMinutesTimer.range.value = min;
    correspondenceInputSecondsTimer.number.value = String(sec).padStart(2, "0");
    correspondenceInputSecondsTimer.range.value = sec;
}

function start() {
    // 1. 初期化
    let min = correspondenceInputMinutesTimer.number.value
    let sec = correspondenceInputSecondsTimer.number.value
    const minTimer = correspondenceInputMinutesTimer.timer
    const secTimer = correspondenceInputSecondsTimer.timer
    isStopClick = false;

    /** 再生終了時の処理 */
    function finishPlay() {
        clearInterval(id);
        setTimerInputs(min, sec);
        audioPause(selectedSounds.bgm, elementsDisabledPlayback);
    }

    // 2. 音声を再生する
    audioPlay(selectedSounds.bgm, volumes.bgm.value/100);

    // 3. タイマーを制御しつつ再生
    const id = setInterval( () => {
        if (min == 0 && sec == 0) {
            // 終了 : タイマーで終了
            finishPlay();
            audioPlayShort(selectedSounds.alarm, volumes.alarm.value/100);
        } else if (isStopClick) {
            // 終了 : ストップボタンで終了(アラームは流れない)
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

correspondenceInputMinutesTimer.correspondInputTimer()
correspondenceInputSecondsTimer.correspondInputTimer()

// bindでthisの参照をselect要素にする
bgmSelect.addEventListener("change", selectSound.bind(bgmSelect, "bgm"));
alarmSelect.addEventListener("change", selectSound.bind(alarmSelect, "alarm"));
// thisが不要の場合はbindにnullを渡す
bgmVolumeCheck.addEventListener('click', playVolumeCheck.bind(null, "bgm"))
alarmVolumeCheck.addEventListener('click', playVolumeCheck.bind(null, "alarm"))

startBtn.addEventListener("click", start)
stopBtn.addEventListener("click", () => isStopClick = true )