const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector(".modal");
const closeForm = document.querySelector(".close-form");
const submitBook = document.querySelector(".submit-book");
const form = document.querySelector("#book-form");

openModalBtn.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");

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
    const storedBooks = Store.getBooks();
    // const storedBooks = [
    //   {
    //     title: "Harry Potter",
    //     author: "JK Rolling",
    //     pages: "230",
    //   },
    //   {
    //     author: "John Green",
    //     title: "Looking for Alaska",
    //     pages: "300",
    //   },
    // ];

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

  static showAlert(message, className) {
    const nav = document.querySelector("nav");
    const alertDiv = document.createElement("div");
    const alertMessage = document.createElement("div");

    alertDiv.className = `alert alert-${className}`;
    alertDiv.appendChild(alertMessage);

    alertMessage.innerHTML = `${message}`;

    nav.appendChild(alertDiv);
    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
      UI.showAlert("Book deleted", "success");
      Store.removeBook(el.parentElement.firstElementChild);
    }
  }
}

// Store Class: Local Storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    // books.forEach((book, index) => {
    //   if (book.title === title) {
    //     books.splice(index, 1);
    //   }
    // });
    books.splice(books.indexOf(title), 1);

    localStorage.setItem("books", JSON.stringify(books));
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

  if (title === "" || author === "" || pages === "") {
    if (modal.classList !== "active") {
      const alertMessage = document.querySelector(".alert-message");
      alertMessage.textContent = "Please fill all the fields";
      setTimeout(() => (alertMessage.textContent = ""), 2000);
      UI.clearFields();
    }
  } else {
    const book = new Book(title, author, pages);

    // Add book to UI
    UI.addBooKToList(book);

    // Add book to localStorage
    Store.addBook(book);
    modal.classList.remove("active");
    UI.showAlert("Book added", "success");

    UI.clearFields();
  }
});

// Delete books
const bookshelf = document.querySelector(".bookshelf");

bookshelf.addEventListener("click", (el) => {
  // Delete book from UI
  UI.deleteBook(el.target);
  //Deletebook from localStorage
});
