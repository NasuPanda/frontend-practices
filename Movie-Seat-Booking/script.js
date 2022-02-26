const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

/** Save selected movie and price */
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

/** Update total and count */
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map( (seat)  => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
    // selected Seats
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    // selected Movie and Price
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

    if(selectedMovieIndex !==null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

// Seat click event
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
})

populateUI();
// Initial count and total set
updateSelectedCount();
