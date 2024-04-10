import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import Router from "./routes/routes.js";
import connection from "./database/db.js";
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/', Router);
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Start database and app server
connection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });
