"use strict";

import {
  get_items, add_item, update_item_title_by_id, delete_item_by_id, get_item_title_by_id
} from './data.js';

var computeSumOfSquares = function(numbers) {
  return numbers.reduce(function(acc, n) {
    return acc + n * n;
  }, 0);
}

var printOddNumbersOnly = numbers => numbers.filter(n => n % 2 == 1).forEach(n => console.log(n));

function printFibo(n, a, b) {
  if (n === 0) return;
  if (n === 1) { console.log(a); return; }

  let f0 = a;
  let f1 = b;
  let result = `${a}, ${b}`;
  for (let i = 2; i < n; i++) {
    const tmp = f1;
    f1 = f0 + f1;
    f0 = tmp;
    result = `${result}, ${f1}`;
  }

  console.log(result);
}

console.log("1.---------------");
console.log(computeSumOfSquares([1, 2, 3]));
printOddNumbersOnly([1, 2, 3, 4, 5, 6, 7]);
printFibo(10, 0, 1);
console.log();

let user = { name: "John", years: 30 };

let { name, years: age, isAdmin = false } = user;

console.log("2.---------------");
console.log(name);   // John
console.log(age);    // 30
console.log(isAdmin); // false
console.log();

let libraryBooks = [
  { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
  { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
  { title: "The Road Ahead", author: "Bill Gates", ID: 4268 },
  { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", ID: 3257 }
];

// Function to add a new book to the library if it doesn't already exist
function addBook(title, author, ID) {
  // Check if a book with the same title and ID already exists
  let exists = libraryBooks.some(book => book.title === title && book.ID === ID);
  
  if (!exists) {
      let newBook = { title, author, ID };
      libraryBooks.push(newBook);
      return newBook; // Return the newly created book
  } else {
      return null; // Book already exists
  }
}

// Function to get all book titles, sorted alphabetically
function getTitles() {
  return libraryBooks.map(book => book.title).sort();
}

// Function to find books by a keyword in the title, sorted by ID
function findBooks(keyword) {
  return libraryBooks
      .filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()))
      .sort((a, b) => a.ID - b.ID);
}

console.log("3.---------------");
let newBook = addBook("Clean Code", "Robert C. Martin", 6543);
console.log(newBook);

let titles = getTitles();
console.log(titles);

let foundBooks = findBooks("The Road");
console.log(foundBooks);
console.log();

console.log("4.---------------");
console.log("add Book 1", add_item({ ID: 1, title: "Book 1" })); // true
console.log("add Book 2", add_item({ ID: 2, title: "Book 2" })); // true
console.log("add Duplicate Book", add_item({ ID: 1, title: "Duplicate Book" })); // false (ID 1 already exists)

console.log(get_items());

console.log("Updated Book 1", update_item_title_by_id(1, "Updated Book 1"));
console.log("Updated Non-existent Book", update_item_title_by_id(3, "Non-existent Book"));

console.log("Get Book title ID: 1", get_item_title_by_id(1));
console.log("Get Book title ID: 3", get_item_title_by_id(3));

console.log("Delete Book ID: 2", delete_item_by_id(2));
console.log("Delete Book ID: 3", delete_item_by_id(3));

console.log(get_items());
