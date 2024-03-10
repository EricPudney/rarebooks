import bookModel from "./models/bookmodel.js";

export default function (server) {
    server.get("/api/books", async (req, res) => {
        try {
            res.json(await bookModel.find());
        }
        catch (err) {
            res.status(500).json({ message: "Something went wrong" })
        }
    })

    server.get('/api/books/:id', async(req, res) => {
      try{
        let bookFound = await bookModel.findById(req.params.id);
        res.status(200).json(bookFound);
      }
      catch (err) {
        res.status(500).json({ message: "Something went wrong" });
      }
    })

    server.post("/api/books", async (req, res) => {
        try {
          const newBook = new bookModel({
            title: req.body.title,
            author: req.body.author, 
            price: req.body.price,
            subject: req.body.subject,
            publicationDate: req.body.publicationDate,
            imgURL: req.body.imgURL
          })
          const savedBook = await newBook.save()
          res.status(201).json(savedBook)
        } catch (err) {
          res.status(500).json({ message: "Something went wrong" })
        }
    })

    server.put("/api/books/:id", async (req, res) => {
      try{
        const editedBook = await bookModel.findByIdAndUpdate(req.params.id, 
          { $set: {
            "title": req.body.title,
            "author": req.body.author, 
            "price": req.body.price,
            "subject": req.body.subject,
            "publicationDate": req.body.publicationDate,
            "imgURL": req.body.imgURL 
          }})
          res.status(200).json({message: "Book details successfully updated."})
      } catch (e) {
        res.status(500).json(e.message);
      }
    })
}