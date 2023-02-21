// add event listener to the window to listen for the 'load' event
window.addEventListener("load", function () {
  // retrieve all the keys stored in local storage
  const keys = Object.keys(localStorage);
  // initialize an empty array to store the books data
  let books = [];
  // loop through each key in local storage
  for (const key of keys) {
    // retrieve the book data stored in local storage using the current key
    const bookData = JSON.parse(localStorage.getItem(key));
    // add the retrieved book data to the books array
    books = books.concat(bookData);
  }

  // check if there are books stored in local storage
  if (books.length) {
    // loop through each book in the books array
    for (const book of books) {
      // extract the book data from the current book object
      const title = book.title;
      const author = book.author;
      const isbn = book.isbn;
      const coverImg = book.coverImg;
      const dateStarted = book.dateStarted;
      const dateCompleted = book.dateCompleted;
      // create a book element using the createBookElement function
      const bookElement = createBookElement(title, author, isbn, coverImg, dateStarted, dateCompleted);
      // append the created book element to the book-grid element in the DOM
      document.querySelector("#book-grid").appendChild(bookElement);
    }
  }
});

// Attach a click event listener to the search button
document.querySelector("#add-btn").addEventListener("click", function () {
  // Get the ISBN value entered by the user
  const isbn = document.querySelector("#isbn-input").value;

  // Create the API endpoint URL by adding the ISBN to the URL string
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;

  // Make a fetch request to the API endpoint
  fetch(url)
    .then((res) => res.json()) // parse the response as JSON
    .then((data) => {
      // Extract relevant data from the response
      const dataPrefix = data[`ISBN:${isbn}`];
      const title = dataPrefix.title;
      const author = dataPrefix.authors[0].name;
      const coverImg = dataPrefix.cover.medium;
      const dateStarted = document.querySelector("#date-started-input").value;
      const dateCompleted = document.querySelector("#date-completed-input").value;

      // Create a book object using the extracted data
      const book = {
        title,
        author,
        isbn,
        coverImg,
        dateStarted,
        dateCompleted
      };
      console.log(book)

      /*Retrieve and parse stored data into an object or create an an empty array if no data is found in local storage*/
      let books = JSON.parse(localStorage.getItem("books")) || [];
      //Push newly created book object into books array
      books.push(book);
      /*Updated books array parsed back into json format and stored in local storage with key "books"*/
      localStorage.setItem("books", JSON.stringify(books));

      // Create a book element using the extracted data
      const bookElement = createBookElement(title, author, isbn, coverImg, dateStarted, dateCompleted);

      // Append the created book element to the book grid container
      document.querySelector("#book-grid").appendChild(bookElement);

      // Clear the input field after search button is clicked
      document.querySelector("#isbn-input").value = "";
    })
    .catch((err) => {
      // Log the error in the console if the fetch request fails
      console.log(`error ${err}`);
    });
});

// Function to store the book data in local storage
function storeBookData(title, author, isbn, coverImg, dateStarted, dateCompleted) {
  // Check if there is any existing book data in local storage
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Add the current book data to the array
  books.push({ title, author, isbn, coverImg, dateStarted, dateCompleted });

  // Store the updated book data array in local storage
  localStorage.setItem("books", JSON.stringify(books));
}

// Function to create a book element using the passed in book data
function createBookElement(title, author, isbn, coverImg, dateStarted, dateCompleted) {
  // Create a book container element
  const book = document.createElement("div");
  book.classList.add("book");

  // Create a cover image element
  const cover = document.createElement("img");
  cover.classList.add("book-cover");
  cover.src = coverImg;
  book.appendChild(cover);

  // Create a delete button element
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  book.appendChild(deleteButton);
  deleteButton.classList.add("hide");

  // Show the delete button on hover
  book.addEventListener("mouseenter", function () {
    deleteButton.classList.add("book-delete");
  });
  // Hide delete button
  book.addEventListener("mouseleave", function () {
    deleteButton.classList.remove("book-delete");
  });

  // Attach a click event listener to the delete button
  deleteButton.addEventListener("click", function () {
    // Remove the book from the local storage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(function (b) {
      return b.isbn !== isbn;
    });
    localStorage.setItem("books", JSON.stringify(books));

    // Remove the book element from the UI
    book.remove();
  });

  // Create a title element
  const titleElement = document.createElement("h2");
  titleElement.classList.add("book-title");
  titleElement.textContent = title;
  book.appendChild(titleElement);

  // Create an author element
  const authorElement = document.createElement("h3");
  authorElement.classList.add("book-author");
  authorElement.textContent = author;
  book.appendChild(authorElement);

  // Create an ISBN element
  const isbnElement = document.createElement("p");
  isbnElement.classList.add("book-isbn");
  isbnElement.textContent = isbn;
  book.appendChild(isbnElement);


  const dateElement = document.createElement("p");
  dateElement.classList.add("book-dates");
  dateStarted === "" && dateCompleted === "" ? dateElement.classList.add("hide") : 
  dateElement.textContent = `Read: ${dateStarted} - ${dateCompleted}`;
  console.log(dateStarted)
  book.appendChild(dateElement);

  // Return the created book element
  return book;
}

/*
9780399501487
9781841953922
9780142437339
9780345410030
9780486828817
9780060256678
9780807014271
9780394712277
9780385504201
9780440412670
0393006867
*/
