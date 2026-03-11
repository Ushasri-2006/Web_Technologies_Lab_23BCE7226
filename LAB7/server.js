const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)

let db

async function connectDB(){
 await client.connect()
 db = client.db("student_notes")
}

connectDB()

// ADD NOTE
app.post("/notes", async (req,res)=>{
 const note=req.body
 note.created_date=new Date()

 const result=await db.collection("notes").insertOne(note)

 res.send(result)
})

// VIEW NOTES
app.get("/notes", async (req,res)=>{
 const notes=await db.collection("notes").find().toArray()
 res.send(notes)
})

// UPDATE NOTE
app.put("/notes/:id", async (req,res)=>{
 const id=req.params.id
 const data=req.body

 await db.collection("notes").updateOne(
 {_id:new ObjectId(id)},
 {$set:data}
 )

 res.send("Note updated")
})

// DELETE NOTE
app.delete("/notes/:id", async (req,res)=>{
 const id=req.params.id

 await db.collection("notes").deleteOne(
 {_id:new ObjectId(id)}
 )

 res.send("Note deleted")
})

app.listen(3000,()=>{
 console.log("Server running on port 3000")
})

// SEARCH BOOK
app.get("/books/search", async (req,res)=>{

let title = req.query.title;

let books = await db.collection("books")
.find({title:{$regex:title,$options:"i"}})
.toArray();

res.json(books);

});


// FILTER CATEGORY
app.get("/books/category/:category", async (req,res)=>{

let category = req.params.category;

let books = await db.collection("books")
.find({category:{$regex:category,$options:"i"}})
.toArray();

res.json(books);

});


// SORT PRICE
app.get("/books/sort/price", async (req,res)=>{

let books = await db.collection("books")
.find()
.sort({price:1})
.toArray();

res.json(books);

});


// SORT RATING
app.get("/books/sort/rating", async (req,res)=>{

let books = await db.collection("books")
.find()
.sort({rating:-1})
.toArray();

res.json(books);

});


// TOP RATED BOOKS
app.get("/books/top", async (req,res)=>{

let books = await db.collection("books")
.find({rating:{$gte:4}})
.limit(5)
.toArray();

res.json(books);

});


// PAGINATION
app.get("/books", async (req,res)=>{

let page = parseInt(req.query.page)||1;
let limit = 5;

let books = await db.collection("books")
.find()
.skip((page-1)*limit)
.limit(limit)
.toArray();

res.json(books);

});