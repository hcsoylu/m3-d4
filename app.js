const bookResults = document.querySelector(".container-images");

const createBook = (book) => {
  const div = document.createElement("div");

  div.classList.add("col-md-4");
  div.classList.add("books-container");
  div.innerHTML = ` <div class="card mb-4 shadow-sm"  style="height: 760px;">
                               <img class="card-img-top d-flex" src="${book.img}">
                               <div class="card-body">
                                  <p class="card-text">
                                  <h6 class="book-title">${book.title}</h6><span class = "book-price">$${book.price}</span>
                                  <div>
                                  <small class="text-muted">${book.category}</small>
                                  </div>
  
                                  </p>
                                 <div class="justify-content-between align-items-center">
                                      <div class="btn-group">
                                          <button type="button" class="btn btn-sm btn-outline-secondary btnHide" onclick="hideToggle()">
                                          Skip
                                          </button>
                                          <a><button type="button" class="btn btn-sm btn-outline-success" onclick="addToCart(event)">
                                          Add to Cart<span><i class="fas fa-cart-plus ml-3"></i></span>
                                          </button></a>
                                      </div>
                                      
                                  </div>
                                 </div>
                             </div>`;
  bookResults.appendChild(div);
};

let bookLibrary = [];

const getBooks = () => {
  fetch(`https://striveschool-api.herokuapp.com/books/`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      bookLibrary = data;
      data.forEach((item) => createBook(item));
    });
};

const btn = document.querySelector(".search-btn");
btn.addEventListener("click", function (event) {
  event.preventDefault();
  const input = document.querySelector(".form-control").value;

  bookResults.innerHTML = "";
  const filteredLibrary = bookLibrary.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  filteredLibrary.forEach((book) => createBook(book));
});

window.onload = function () {
  getBooks();
};
