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

/*9780399501487
9781841953922
9780142437339
*/