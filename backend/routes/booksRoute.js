import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router(); 

// route to save a new book
router.post('/', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        // create new book using model
        const newBook = new Book({ title, author, publishYear });

        // save book to database
        const savedBook = await newBook.save();

        return response.status(201).send(savedBook);
    } catch (error) {
        console.error("Error:", error.message);
        return response.status(500).send({ message: error.message });
    }
});

// route for get all books from database
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for update a book
router.put('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).json({ message: 'Book not found' });
        }

        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for delete a book
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Book not found'})
        }

        return response.status(200).send({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;