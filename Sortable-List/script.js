const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  // 要素が重なったら
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Add event listeners
// over 要素が重なったら
// drop ドロップされた
// enter 重なり始め
// leave 要素が離れた
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  })
  draggableItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  })

}