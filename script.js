const storedBooks = JSON.parse(localStorage.getItem("library"));
let myLibrary = storedBooks || [];

const library = document.getElementById("library");

updateBookLibrary();

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.id = crypto.randomUUID();
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function updateBookLibrary() {
  library.innerHTML = "";
  myLibrary.forEach(function (book) {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-book-id", book.id);
    bookDiv.classList.add("book");

    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("bookInfo");

    const bookDivTitle = document.createElement("h3");
    bookDivTitle.textContent = book.title;

    const bookDivAuthor = document.createElement("p");
    bookDivAuthor.textContent = book.author;

    const bookDivPages = document.createElement("p");
    bookDivPages.textContent = "Pages: " + book.pages;

    const bookButtonsDiv = document.createElement("div");
    bookButtonsDiv.classList.add("bookButtons");

    const deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "x";
    deleteBookButton.classList.add("deleteBookButton");

    const readToggleButton = document.createElement("button");

    if (book.isRead) {
      readToggleButton.textContent = "Read";
      console.log(readToggleButton.classList);

      readToggleButton.classList.add("read");
      console.log(readToggleButton.classList);
    } else {
      readToggleButton.textContent = "Not Read";
      readToggleButton.classList.add("notRead");
    }
    readToggleButton.classList.add("readToggleButton");
    readToggleButton.onclick = function () {
      book.isRead = !book.isRead;
      localStorage.setItem("library", JSON.stringify(myLibrary));
      updateBookLibrary();
    };

    deleteBookButton.onclick = function () {
      console.log(book);
      myLibrary = myLibrary.filter(function (b) {
        return b.id != book.id;
      });
      localStorage.setItem("library", JSON.stringify(myLibrary));
      updateBookLibrary();
    };

    bookInfoDiv.appendChild(bookDivTitle);
    bookInfoDiv.appendChild(bookDivAuthor);
    bookButtonsDiv.appendChild(readToggleButton);
    bookButtonsDiv.appendChild(deleteBookButton);

    bookDiv.appendChild(bookInfoDiv);
    bookDiv.appendChild(bookDivPages);
    bookDiv.appendChild(bookButtonsDiv);

    library.appendChild(bookDiv);
  });
}

const addBookButton = document.getElementById("addBook");
const formModal = document.getElementById("dialog");

addBookButton.addEventListener("click", function () {
  formModal.showModal();
});

const form = document.getElementById("addBookForm");
const submitBookButton = document.getElementById("submitBook");

submitBookButton.addEventListener("click", function () {
  const formData = new FormData(form);
  const bookTitle = formData.get("title");
  const bookAuthor = formData.get("author");
  const bookPages = formData.get("pages");
  const isBookRead = formData.get("isBookRead") ? true : false;
  if (form.reportValidity()) {
    console.log(formData.get("isBookRead"));
    addBookToLibrary(bookTitle, bookAuthor, bookPages, isBookRead);
    console.log(myLibrary);
    updateBookLibrary();
    form.reset();
    formModal.close();
  }
});

const cancelFormButton = document.getElementById("cancelForm");

cancelFormButton.addEventListener("click", function () {
  formModal.close();
});
