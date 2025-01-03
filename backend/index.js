import express from "express";
import { PORT, mongoDB_URL} from "./config.js";
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome!");
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