# sorteable-list-app
Drag the elements and pick in the correct order.
The game shows a list with the names of the 10 richest people in the world, and you can drag and drop each element and pick in their correct spot.
Current correct order is given from an array called 'richiest people', and you can alter it for update the list to actual date.
Every time the the browser is refreshed, the list order is sorted randomly, and every sorted element receives an index, that starts from zero, and all the next gets its index in descending order.
I've a function that compares, if the given index is equals to the original index from the array, then, that element is in its correct spot. That is how you can go ahead in the game, until sort each element.