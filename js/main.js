// Function to display the book data stored in local storage on page load
window.addEventListener("load", function () {
  // Get the keys of all items stored in local storage
  const keys = Object.keys(localStorage);
  
  // Loop through the keys and get the book data stored in local storage
  for (const key of keys) {
  const bookData = JSON.parse(localStorage.getItem(key));
  const title = bookData.title;
  const author = bookData.author;
  const isbn = bookData.isbn;
  }
  })
  
// Attach a click event listener to the search button
document.querySelector("#search-button").addEventListener("click", function () {
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

      // Create a book object using the extracted data
      const book = {
        title,
        author,
        isbn,
        coverImg,
      };

      // Check if the books array exists in local storage
      let books = JSON.parse(localStorage.getItem("books"));
      if (!books) {
        // If the books array doesn't exist, create it
        books = [];
      }

      // Add the new book to the books array
      books.push(book);

      // Store the updated books array in local storage
      localStorage.setItem("books", JSON.stringify(books));

      // Create a book element using the extracted data
      const bookElement = createBookElement(title, author, isbn, coverImg);

      // Append the created book element to the book grid container
      document.querySelector("#book-grid").appendChild(bookElement);
    })
    .catch((err) => {
      // Log the error in the console if the fetch request fails
      console.log(`error ${err}`);
    });
});

// Function to store the book data in local storage
function storeBookData(title, author, isbn, coverImg) {
  // Check if there is any existing book data in local storage
  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Add the current book data to the array
  books.push({ title, author, isbn, coverImg });

  // Store the updated book data array in local storage
  localStorage.setItem("books", JSON.stringify(books));
}
// Function to create a book element using the passed in book data
function createBookElement(title, author, isbn, coverImg) {
  // Create a book container element
  const book = document.createElement("div");
  book.classList.add("book");

  // Create a cover image element
  const cover = document.createElement("img");
  cover.classList.add("book-cover");
  cover.src = coverImg;
  book.appendChild(cover);

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

  // Return the created book element
  return book;
}


/*
9780399501487
9781841953922
9780142437339
*/