import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"


const server = express();
const port = 3000;

server.use(express.json());
server.use(express.static("../frontend"));

mongoose.connect("mongodb+srv://*****@cluster0.jidr2xq.mongodb.net/Books");

apiRegister(server)

server.listen(port, ()=>{
    console.log(`Server open on http://localhost:${port}`)
})