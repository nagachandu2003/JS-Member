const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const uri = process.env.mongo_uri;
const client = new MongoClient(uri);
const dbname = "JSUSERS";
const collection_name = "remoteusers";
let accountsCollection;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
    accountsCollection = client.db(dbname).collection(collection_name);
  } catch (err) {
    console.error(`Error connecting to the database : ${err}`);
  }
};


app.get("/", (req, res) => {
  res.send("Hello, I am connected Now");
});

// Define the /users/:email route first
app.get("/users/:email", async (req, res) => {
  // console.log("I am in /users/:email route");
  const {email} = req.params
  try {
    await connectToDatabase()
    const result = await accountsCollection.findOne({email})
    // console.log(result.regstatus!=="approved")
    // console.log(result.regstatus)
    if(result===null)
    res.send({success:false})
    else
    {
    if(result.regstatus==="approved")
    res.send({success:true})
    else
    res.send({success:false})
    }
  }
  catch (Err){
    console.log(`Error Occurred : ${Err}`)
  }
  finally {
    await client.close()
  }

  
});

// Define the /users route next
app.get("/users", async (req, res) => {
  // console.log("I am in /users route");
  try {
    await connectToDatabase();
    const result = await accountsCollection.find({
      regstatus: { $in: ["pending", "approved", "rejected"] }
    }).toArray();
    console.log(result);
    res.send(result)
  } catch (Err) {
    console.log(`Error Occurred : ${Err}`);
  } finally {
    await client.close();
  }
});


// app.get("/users/:email", async (req,res) => {
//   console.log("I am called")
//   console.log(req.params);
// })

// app.get("/users", async (req,res) => {
//     try{
//         await connectToDatabase()
//         const result = await accountsCollection.findOne({username:"Vijay"});
//         console.log(result)
//     }
//     catch(Err){
//         console.log(`Error Occurred : ${Err}`)
//     }
//     finally{
//         await client.close()
//     }
// })


app.post("/users", async (req,res) => {
  // console.log(req.body)
  try{
    await connectToDatabase()
    const result = await accountsCollection.insertOne(req.body);
    res.send({success:'User Inserted Successfully'})
  }
  catch(Err){
      console.log(`Error Occurred : ${Err}`)
  }
  finally{
      await client.close()
  }
})


app.put("/users", async (req,res) => {
  const {newemail,newregstatus} = req.body
  console.log(newregstatus)
  // db.collectionName.update(
  //   { _id: ObjectId("your_objectid") },
  //   { $set: { regstatus: "approved" } }
  // );
  
  try {
    await connectToDatabase()
    const result = await accountsCollection.updateOne(
      {email:newemail}, // Match the document with the given userId
      { $set: { regstatus: "approved" } }
    );
    // const result = await accountsCollection.updateOne({_id: new ObjectId(userId)},{$set : {regstatus:newregstatus}})
    res.send({ success: "Registration Status Updated Successfully" });
  }
  catch(Err){
    console.log(`Error Occurred : ${Err}`)
  }
  finally {
    await client.close()
  }
})

app.listen(3001,() => {
    console.log("Server is running on http://localhost:3001")
})