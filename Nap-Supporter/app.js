const minutesInputRange = document.getElementById("minutes-range")
const secondsInputRange = document.getElementById("seconds-range")
const bgmVolumeSlider = document.getElementById("bgm-volume")
const alarmVolumeSlider = document.getElementById("alarm-volume")
const minutesInputNumber = document.getElementById("minutes-number")
const secondsInputNumber = document.getElementById("seconds-number")

/**
 * range ⇔ numberの対応が何回か出てくるので、クラスか何かで表したいです。
 * rangeクラス、numberクラスを作ってお互いがお互いを更新する、というのは
 * よろしくない感じがします。
 * そこで、対応関係のクラスを作ることで対処します。
 */


/** input range⇔numberの対応を表すクラス */
class inputRangeNumberCorrespondence {
    constructor(inputRange, inputNumber) {
        this.inputRange = inputRange;
        this.inputNumber = inputNumber;

        // rangeとnumberの値を対応させる
        this.inputRange.addEventListener("input", () => {
            this.inputNumber.value = this.inputRange.value
        })
        this.inputNumber.addEventListener("input", () => {
            this.inputRange.value = this.inputNumber.value
        })
    }
}

const minutesInputs = new inputRangeNumberCorrespondence(minutesInputRange, minutesInputNumber);
const secondsInputs = new inputRangeNumberCorrespondence(secondsInputRange, secondsInputNumber);