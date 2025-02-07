import express from 'express'
let app = express();

app.use(express.static("."));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.listen("3002", ()=>{
    console.log("Server is listening on port 3002")
})
