const storedBooks = JSON.parse(localStorage.getItem("library"));
let myLibrary = storedBooks || [];

const library = document.getElementById("library");

updateBookLibrary();

function Book(title, author, pages) {
  if (!new.target) {
    throw Error("Book must be called with new");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);
  myLibrary.push(book);
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function updateBookLibrary() {
  library.innerHTML = "";
  myLibrary.forEach(function (book) {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-book-id", book.id);

    const bookDivTitle = document.createElement("h3");
    bookDivTitle.textContent = book.title;

    const bookDivAuthor = document.createElement("p");
    bookDivAuthor.textContent = book.author;

    const bookDivPages = document.createElement("p");
    bookDivPages.textContent = book.pages;

    const deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "Delete";
    deleteBookButton.className = "deleteBookButton";
    deleteBookButton.onclick = function () {
      console.log(book);
      myLibrary = myLibrary.filter(function (b) {
        return b.id != book.id;
      });
      localStorage.setItem("library", JSON.stringify(myLibrary));
      updateBookLibrary();
    };

    bookDiv.appendChild(bookDivTitle);
    bookDiv.appendChild(bookDivAuthor);
    bookDiv.appendChild(bookDivPages);
    bookDiv.appendChild(deleteBookButton);

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
  if (form.reportValidity()) {
    addBookToLibrary(bookTitle, bookAuthor, bookPages);
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
