export default async function books() {

    const response = await fetch("/api/books");
    const result = await response.json();
    let booklist = "";
    for (let book of result) {
        booklist += `<li>
        <div class="book-list-item">
        <h3>${book.title}</h3>
        <p>By ${book.author}</p>
        <p>Subject: ${book.subject}</p>
        <p>Price (SEK): ${book.price}</p>
        <p>Date printed: ${book.publicationDate}</p>
        <p>Binding: ${book.binding}</p>
        <p>Condition: ${book.condition}</p>
        <p>Notes: ${book.notes}</p>
        <button class="edit-button" onclick="editBook('${book._id}'); return false">Edit</button>
        <img src="${book.imgURL}" loading="lazy">
        </div>
        </li>`
    }
        return `
    <div id="main-container">
    <h2>My Books</h2>
    <div id="filter-container">
    <label for="subject-filter">Filter by subject:</label>
    <select name="subject-filter" id="subject-filter" onchange="filterSubject()">
        <option value="">--Subject--</option>
        <option value="History">History</option>
        <option value="Poetry">Poetry</option>
        <option value="Literature">Literature</option>
        <option value="Drama">Drama</option>
        <option value="Theology">Theology</option>
        <option value="Philosophy">Philosophy</option>
        <option value="Science">Science</option>
    </select>
    </div>
    <div>
    <ul id="booklist">${booklist}</ul>
    </div>
    </div>
    `
}

async function filterSubject() {
    const response = await fetch("/api/books");
    const result = await response.json();
    let booklist = "";
    for (let book of result) {
        if (book.subject.indexOf($("#subject-filter").val()) >= 0) {
            booklist += `<li>
            <div class="book-list-item">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>Subject: ${book.subject}</p>
            <p>Price (SEK): ${book.price}</p>
            <p>Date printed: ${book.publicationDate}</p>
            <p>Binding: ${book.binding}</p>
            <p>Condition: ${book.condition}</p>
            <p>Notes: ${book.notes}</p>
            <button class="edit-button" onclick="editBook('${book._id}'); return false">Edit</button>
            <img src="${book.imgURL}" loading="lazy">
            </div>
            </li>`
        }
    }
    $("#booklist").html(booklist);
}

async function editBook(id) {
    const response = await fetch(`/api/books/${id}`);
    const result = await response.json();
    const editForm = `<div class="form-container">
    <h2>Update details for this book:</h2><br/>
    <form id="edit-form" onsubmit="updateBook('${result._id}'); return false">
    <label for="title">Title</label>
    <input id="title" name="title" value='${result.title}'/><br/>
    <label for="author">Author:</label>
    <input id="author" name="author" value='${result.author}'/><br/>
    <label for="subject">Subject:</label>
    <input id="subject" name="subject" value='${result.subject}'/><br/>
    <label for="price">Price:</label>
    <input id="price" name="price" type="number" value='${result.price}'/><br/>
    <label for="publicationDate">Date printed:</label>
    <input id="publicationDate" name="publicationDate" type="number" value='${result.publicationDate}'/><br/>
    <label for="binding">Binding:</label>
    <input id="binding" name="binding" value='${result.binding}'/><br/>
    <label for="condition">Condition:</label>
    <input id="condition" name="condition" value='${result.condition}'/><br/>
    <label for="notes">Notes:</label>
    <input id="notes" name="notes" value='${result.notes}'/><br/>
    <label for="imgURL">Image URL:</label>
    <input id="imgURL" name="imgURL" value='${result.imgURL}'/><br/>
    <input id="update-btn" type="submit" value="Update"/>
    </form>
    <br />
    <p id="result-text">
    </div>`;
    $("#main-container").html(editForm)
}

window.filterSubject = filterSubject;
window.editBook = editBook;

async function updateBook(id) {
    const updatedBook = {
            title: $('[name=title]').val(),
            author: $('[name=author]').val(),
            price: $('[name=price]').val(),
            subject: $('[name=subject]').val(),
            publicationDate: $('[name=publicationDate]').val(),
            binding: $('[name=binding]').val(),
            condition: $('[name=condition]').val(),
            notes: $('[name=notes]').val(),
            imgURL: $('[name=imgURL]').val()
        }
    const result = await fetch (`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook),
        })
    const response = await result.json();
    $('#result-text').text(response.message);
    $('#update-btn').hide()
    $('[name=title]').val(""),
    $('[name=author]').val(""),
    $('[name=price]').val(""),
    $('[name=subject]').val(""),
    $('[name=publicationDate]').val(""),
    $('[name=binding]').val(""),
    $('[name=condition]').val(""),
    $('[name=notes]').val(""),
    $('[name=imgURL]').val("")
    $(".form-container").append("<button onclick='reloadPage()'>Back</button>")
}

function reloadPage(){
    location.reload(true);
}

window.updateBook = updateBook;
window.reloadPage = reloadPage;
// window.filterDate = filterDate;
// window.filterValue = filterValue;


/*<label for="date-filter">Filter by publication date:</label>
    <select name="date-filter" id="date-filter" onchange="filterDate()>
        <option value="">--Date--</option>
        <option value="1600">Pre-1700</option>
        <option value="1700">1700s</option>
        <option value="1800">1800s</option>
        <option value="1900">1900s and later</option>
    </select>
    <label for="value-filter">Filter by value:</label>
    <select name="value-filter" id="value-filter" onchange="filterValue()>
        <option value="">--Value--</option>
        <option value="100">Up to 100</option>
        <option value="500">100-500</option>
        <option value="1000">500-1000</option>
        <option value=">1000">Over 1000</option>
    </select>*/