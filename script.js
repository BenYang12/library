const myLibrary = [];

function Book(title, author, pages, read){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        const readStatus = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function renderLibrary(){
    const library = document.querySelector("#library");
    //clear whats there before
    library.textContent = "";

    //for each book object in library, render them using html
    //forEach() is best for this goal
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`
        
        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("p");
        read.textContent = `Read: ${book.read ? "Yes" : "No"}`;


        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.classList.add("toggle-read");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-book");

        card.append(title, author, pages, read, toggleBtn, removeBtn);
        library.appendChild(card);
    })
    attachCardButtonListeners();//attach these listeners every single time a library is rendered
}

//attach event listeners to toggle read and remove buttons on each card
function attachCardButtonListeners() {
    document.querySelectorAll(".remove-book").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.closest(".book-card").dataset.id;//reads data-id
            const index = myLibrary.findIndex(book => book.id === id);//find book in myLibrary that matches this id
            if (index !== -1) {
                myLibrary.splice(index, 1);//remove book 
                renderLibrary();//call again to display updated booklist
            }
        });
    });

    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.closest(".book-card").dataset.id;
            const book = myLibrary.find(book => book.id === id);
            if (book) {
                book.toggleRead();
                renderLibrary();
            }
        });
    });
}


//card buttons finished, now move into Add a New Book form behavior
const newbookBtn = document.querySelector("#new-book-btn");
const formContainer = document.querySelector("#book-form-container");
const closeBtn = document.querySelector("#close-form");
const form = document.querySelector("#book-form");

//show form when add button is clicked
newbookBtn.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
})
//hide form when user changes mind and clicks cancel button
closeBtn.addEventListener("click", ()=>{
    formContainer.classList.add("hidden");
})

form.addEventListener("submit", (e) => {
    e.preventDefault(); //warning was provided by odinproject walkthrough
    const title = form.title.value;
    const pages = parseInt(form.pages.value);
    const read = form.read.checked;
    const author = form.author.value;

    addBookToLibrary(title, author, pages,read) 
    form.reset();
    formContainer.classList.add("hidden");
    renderLibrary(); 
})
