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

app.use(express.json())
app.use(logReq)
app.use('/api', noteRoutes)
app.get("/test-route", (req, res) => {
    res.send("The server is reading this route correctly!");
  });

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`)
})
})

