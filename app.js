const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector(".modal");
const closeForm = document.querySelector(".close-form");
const submitBook = document.querySelector(".submit-book");
const form = document.querySelector("#book-form");

openModalBtn.addEventListener("click", (e) => {
  modal.classList.add("active");
});

closeForm.addEventListener("click", (e) => {
  modal.classList.remove("active");
});

// Book class
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// UI class

class UI {
  static displayBooks(book) {
    const storedBooks = [
      {
        title: "Harry Potter",
        author: "JK Rolling",
        pages: "230",
      },
      {
        author: "John Green",
        title: "Looking for Alaska",
        pages: "300",
      },
    ];

    const books = storedBooks;
    books.forEach((book) => UI.addBooKToList(book));
  }

  static addBooKToList(book) {
    const bookshelf = document.querySelector(".bookshelf");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("bookDiv");

    bookDiv.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>${book.pages}</p>
    <button class='btn delete'>Delete</button>
    `;

    bookshelf.appendChild(bookDiv);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }
}

// Load Books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Add books

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;

  const book = new Book(title, author, pages);
  UI.addBooKToList(book);
  modal.classList.remove("active");
  UI.clearFields();
});

// Delete books
const bookshelf = document.querySelector(".bookshelf");

bookshelf.addEventListener("click", (el) => {
  UI.deleteBook(el.target);
});
