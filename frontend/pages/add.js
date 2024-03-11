export default async function add() {
    return `
        <div class="form-container">
        <h2>Add a book to the database:</h2>
        <br>
            <form id="addBookForm" onsubmit="addBook(); return false">
                <label for="title">Title</label>
                <input id="title" name="title" required/><br>
                <label for="author">Author</label>
                <input id="author" name="author" required/><br>
                <label for="price">Price in SEK</label>
                <input id="price" name="price" type="number" required/><br>
                <label for="subject">Subject</label>
                <input id="subject" name="subject" required/><br>
                <label for="publicationDate">Date of printing</label>
                <input id="publicationDate" name="publicationDate" type="number" required/><br>
                <label for="binding">Binding:</label>
                <input id="binding" name="binding" required/><br/>
                <label for="condition">Condition:</label>
                <input id="condition" name="condition" required/><br/>
                <label for="notes">Notes:</label>
                <input id="notes" name="notes" required/><br/>
                <label for="imgURL">Image file name (incl. extension)</label>
                <input id="imgURL" name="imgURL" required/><br>
                <input type="submit" value="Add book">
            </form>
            <br />
            <p id="result-text">
        </div>
    `
}

async function addBook() {
    const newBook = {
        title: $('[name=title]').val(),
        author: $('[name=author]').val(),
        price: $('[name=price]').val(),
        subject: $('[name=subject]').val(),
        publicationDate: $('[name=publicationDate]').val(),
        binding: $('[name=binding]').val(),
        condition: $('[name=condition]').val(),
        notes: $('[name=notes]').val(),
        imgURL: "../images/"+$('[name=imgURL]').val()
    }
    let result = await fetch("/api/books", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
    });
    if(result.status == 201) {    
        $('#addBookForm')[0].reset()
        $('#result-text').text("Book added.")
    }
    else {
        $('#result-text').text(result.statusText)
    }
}


window.addBook = addBook;