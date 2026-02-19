let xmlDoc;

function showMessage(msg, success = true) {
    const message = document.getElementById('msg');
    message.style.color = success ? 'green' : 'red';
    message.textContent = msg;
}

// Load XML and display
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onload = function () {
        try {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;
                displayBooks();
            } else {
                showMessage("Failed to load XML", false);
            }
        } catch (err) {
            showMessage("Error parsing XML: " + err, false);
        }
    };
    xhr.onerror = function () {
        showMessage("Request Error", false);
    };
    xhr.send();
}

// Display books in table
function displayBooks() {
    const tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";
    const books = xmlDoc.getElementsByTagName("book");
    if (books.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No books found</td></tr>";
        return;
    }

    for (let book of books) {
        const id = book.getElementsByTagName("id")[0].textContent;
        const title = book.getElementsByTagName("title")[0].textContent;
        const author = book.getElementsByTagName("author")[0].textContent;
        const status = book.getElementsByTagName("status")[0].textContent;

        const row = tableBody.insertRow();
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = title;
        row.insertCell(2).textContent = author;
        row.insertCell(3).textContent = status;
        row.insertCell(4).innerHTML = `<button onclick="prepareDelete('${id}')">Delete</button>`;
    }
}

// Add book
function addBook() {
    const id = document.getElementById('addId').value;
    const title = document.getElementById('addTitle').value;
    const author = document.getElementById('addAuthor').value;
    const status = document.getElementById('addStatus').value;

    if (!id || !title || !author || !status) {
        showMessage("Please fill all fields", false);
        return;
    }

    const libraryNode = xmlDoc.getElementsByTagName("library")[0];
    const newBook = xmlDoc.createElement("book");
    newBook.innerHTML = `
        <id>${id}</id>
        <title>${title}</title>
        <author>${author}</author>
        <status>${status}</status>
    `;
    libraryNode.appendChild(newBook);
    displayBooks();
    showMessage("Book added successfully");
}

// Update book status
function updateBook() {
    const id = document.getElementById('updateId').value;
    const status = document.getElementById('updateStatus').value;

    if (!id || !status) {
        showMessage("Enter Book ID and select status", false);
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");
    let found = false;
    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.getElementsByTagName("status")[0].textContent = status;
            found = true;
            break;
        }
    }

    if (found) {
        displayBooks();
        showMessage("Book status updated successfully");
    } else {
        showMessage("Book not found", false);
    }
}

// Delete book
function deleteBook() {
    const id = document.getElementById('deleteId').value;
    if (!id) {
        showMessage("Enter Book ID to delete", false);
        return;
    }

    const libraryNode = xmlDoc.getElementsByTagName("library")[0];
    const books = xmlDoc.getElementsByTagName("book");
    let found = false;

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            libraryNode.removeChild(book);
            found = true;
            break;
        }
    }

    if (found) {
        displayBooks();
        showMessage("Book deleted successfully");
    } else {
        showMessage("Book not found", false);
    }
}

// Optional helper if you want delete buttons in table
function prepareDelete(id) {
    document.getElementById('deleteId').value = id;
}

window.onload = loadBooks;
