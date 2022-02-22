const minutesInputRange = document.getElementById("minutes-range")
const secondsInputRange = document.getElementById("seconds-range")
const bgmVolumeSlider = document.getElementById("bgm-volume")
const alarmVolumeSlider = document.getElementById("alarm-volume")
const minutesInputNumber = document.getElementById("minutes-number")
const secondsInputNumber = document.getElementById("seconds-number")

const slides = [minutesInputRange, secondsInputRange, bgmVolumeSlider, alarmVolumeSlider];
const numberInputs = [minutesInputNumber, secondsInputNumber];

function inputSlider() {
    console.log(this.value)
}

class rangeNumberCorrespondence {
	constructor(inputRange, inputNumber) {
		this.inputRange = inputRange;
        this.inputNumber = inputNumber;

        // range⇔number の値を紐付ける
        this.inputRange.addEventListener("input", (e) => {
            this.inputNumber.value = this.inputRange.value;
        });
        this.inputNumber.addEventListener("input", (e) => {
            this.inputRange.value = this.inputNumber.value;
        });
	}
}

const minutesInput = new Input(minutesInputRange, minutesInputNumber);
const secondsInput = new Input(secondsInputRange, secondsInputNumber);
