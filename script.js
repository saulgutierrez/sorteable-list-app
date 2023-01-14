const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
    'Jeff Bezos',
    "Elon Musk",
    "Bernard Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
];

// Empty list of names to sort
const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...richestPeople]
        // Sort an object
        .map(a => ({ value: a, sort: Math.random() }))
        // This function compares two elements and order by ascending ASCII
        .sort((a, b) => a.sort - b.sort)
        // Shows the value of every object (name of richiest people)
        .map(a => a.value)
        .forEach((person, index) => {
            // Create a content for each attribute
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            // Print an index (starts at 1) and name of the richest person
            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
         <div class="draggable" draggable = "true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>     
        `;
            // Add each element of the array to the empty list
            listItems.push(listItem);
            // Add the list to the HTML DOM
            draggable_list.appendChild(listItem);
        });

    addEventListener();
}


function dragStart() {
    // The first li element gets the zero index, and all the next gets its index in descending order 
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

// When an element is over another this last one becomes a darker shadow style
function dragEnter() {
    this.classList.add('over');
}

// When an element leaves of another this last one recover its original color
function dragLeave() {
    this.classList.remove('over');
}

// Prevent refresh of the page for allow to save the index of the elements that were swapped
function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    // When two elements were swapped, its index too
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');

}

// Fetch the index of both of the elements that were swapped
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    // Swap the index and the data of the two elements that were selected (dragged and dropped)
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        // Draggable class only contains the person name
        // Trim removes spaces both at begin and end of the string
        const personName = listItem.querySelector('.draggable').innerText.trim();

        // Compares if personName is equals to original list in the same position
        // and returns green color if it is correct, and red color if it is false
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            // If you are a correct answer first removes a red color, and then adds a green color ahead
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    // Select all the html elements with the class name draggable
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    // Calling the functions to able a draggable operation
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

// Lauch the checkOrder function when clicked on check button
check.addEventListener("click", checkOrder);