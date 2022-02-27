const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    random = document.getElementById("random"),
    mealsEl = document.getElementById("meals"),
    resultHeading = document.getElementById("result-heading"),
    single_nameEl = document.getElementById("single-meal");

/** Search meal and fetch from API */
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_nameEl.innerHTML = "";

    // Get search term
    const term = search.value;

    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for: ${term}</h2>`;
            });
    } else {
        alert("Please enter a search meal");
    }
}

// Event listeners
submit.addEventListener("submit", searchMeal);