import express, { response } from "express";
import { PORT, mongoDB_URL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome!");
});

// route for save a new book
// old code:
// app.post('/books', async (request, response) => {
//     try {
//         if (
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: "Send all required fields: title, author, publishYear",
//             });
//         }
//         const newBook = {
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear
//         };

//         const book = await book.create(newBook);

//         return response.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message})
//     }
// });

// endpoint to save a new book
app.post("/books", async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        // Validasi input
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        // Buat dokumen baru menggunakan model
        const newBook = new Book({ title, author, publishYear });

        // Simpan dokumen ke database
        const savedBook = await newBook.save();

        // Kirim respons sukses
        return response.status(201).send(savedBook);
    } catch (error) {
        console.error("Error:", error.message);
        return response.status(500).send({ message: error.message });
    }
});

// route for get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for get one book from database by id
app.get('/books/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });