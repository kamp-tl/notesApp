import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({quiet:true})

import noteRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js'
import {logReq} from './middlewares/logReq.js';

const app = express(); 
app.use(cors());

const PORT = process.env.PORT || 5001;

import path from "path";

const __dirname = path.resolve();

app.use(express.json())
//app.use(logReq)
app.use('/api/notes', noteRoutes)

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`)
})
})

