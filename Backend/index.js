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

let dashboardCollection;
const connectToDatabaseDashboard = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
    dashboardCollection = client.db(dbname).collection("dashboard");
  } catch (err) {
    console.error(`Error connecting to the database : ${err}`);
  }
};



app.get("/", (req, res) => {
  res.send("Hello, I am connected Now");
});

app.get("/getcontentdetails", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { content: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Content Sent Successfully',Content:result[0].content})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.delete("/content/:id", async (req,res) => {
  // const {id} = req.params
  try {
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateMany({},{ $pull: { content: { id: req.params.id } } })
    res.send({success:'Item Deleted Successfully'})
  }
  catch(Err) {
    res.send({failure : Err})
  }
  finally {
    await client.close()
  }
})

app.post("/addcontentdata", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { content: req.body } })
    res.send({success : 'Content Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})


// app.get('/content/:email', async (req,res) => {
//   const {email} = req.params
//   try{
//     await connectToDatabase()
//     const result = await accountsCollection.findOne({email})
//     res.send({'Content':result.content})
//     await client.close()
//   }
//   catch(Err){
//     console.log(`Error Occurred : ${Err}`);
//     await client.close()
//   }
// })


// app.post('/addcontent', async (req, res) => {
//   const {obj} = req.body
//   try {
//     await connectToDatabase()
//     const result = await accountsCollection.updateOne({email:req.body.email},{
//        $push: { content: obj } 
//     })
//     // const result = await collection.updateOne(
//     //   {email:req.body.email},
//     //   { $push: { contentArray: objectToAdd } } 
//     // );

//     res.status(200).send({success:'Content Item added successfully'});
//     await client.close()
//   } catch (error) {
//     console.error('Error adding object:', error);
//     res.status(500).send({failure:'Error adding object'});
//     await client.close()
//   }
// });


app.post("/ytmcvideo/channel/videostats", async (req,res) => {
  console.log("I am from Video Stats")
  try{
    await connectToDatabase()
    const result = await accountsCollection.findOne({email:req.body.email})
    let channelItem
    if(result.channels){
    channelItem = result.channels.filter((ele) => ele.channelName===req.body.channelName)[0]
    }
    const videoItem = channelItem.videos.filter((ele) => ele.videoId===req.body.videoid)[0]
    // console.log(videoItem)
    res.send({videoItem})
  }
  catch(Err){
    console.log(`Error Occurred : ${Err}`)
  }
})

app.get("/allvideos/:email", async(req,res) => {
  const {email} = req.params
  try{
    await connectToDatabase()
    const pipeline = [
      { $unwind: '$channels' },
      { $match: { 'channels.email': email } },
      { $project: { videos: '$channels.videos' } }
    ];
    const result = await accountsCollection.aggregate(pipeline).toArray();
    let l = [];
    for(let values of result)
      {
        l = [...l,...values.videos]
      }
    res.send({success:'Videos sent Successfully',result:l})
}
catch(Err){
  console.log(`Error Occurred : ${Err}`)
}
finally {
  await client.close()
}
})

app.post("/users/videosdetails", async (req, res) => {
  console.log("I am from Video Details")
  console.log(req.body)
  try{
    await connectToDatabase()
    const result = await accountsCollection.findOne({email:req.body.email,channels : {$elemMatch : {
      channelUrl : `https://www.youtube.com/@${req.body.channelName}`
    }}})
    const Videos = result.channels.filter((ele) => ele.channelName===req.body.channelName)[0].videos
    res.send({success:true,Videos})
  }
  catch(Err){
    console.log(`Error Occurred : ${Err}`)
  }
})


// app.get("/users/videosdetails", async (req, res) => {
//   console.log(req.query)
//   try {
//     await connectToDatabase()
//     const result = await accountsCollection.findOne({email:req.query.email,channels:{$elemMatch:{
//       channelUrl:`https://www.youtube.com/@${req.query.channelName}`
//     }}})
//     // const result = await accountsCollection.findOne({
//     //   email: req.body.email,
//     //   channels: {
//     //     $elemMatch: {
//     //       channelUrl: `https://www.youtube.com/channel/${req.body.channelName}`,
//     //     },
//     //   },
//     // });
//     console.log(result)
//     res.send({ success: true, data: result });
//     await client.close()
//   } catch (err) {
//     console.error(`Error Occurred: ${err}`);
//     res.status(500).send({ success: false, error: err });
//     await client.close()
//   }
// });

// app.post("/users/videosdetails", async (req,res) => {
//   console.log(req.body)
//   try {
//     await connectToDatabase()
//     const result = await accountsCollection.findOne({
//       email: req.body.email, // Specify the email associated with the document
//       channels: {
//         $elemMatch: {
//           channelUrl: `https://www.youtube.com/channel/${req.body.channelName}`, // Specify the channelUrl for the channel
//         },
//       },
//     })
//     console.log(result)
//     // res.send({videos : result.videos})
//     // res.send({channels:result['channels']})
//   }
//   catch (Err) {
//     console.log(`Error Occurred ${Err}`)
//   }
//   finally {
//     await client.close()
//   }
//   res.send({success:true})
// })

app.post("/users/addvideo/:channelName", async (req,res) => {
  const {channelName} = req.params
  try{
    await connectToDatabase()
    const result = await accountsCollection.updateOne({email:req.body.email,
    channels: {
      $elemMatch : {
        channelUrl : `https://www.youtube.com/@${channelName}`
      }
    }},
    {$addToSet: {
      "channels.$.videos": req.body,
    }
  }
  )
    res.send({success : "Video Inserted Successfully"})
  }
  catch (Err) {
    console.log(`Error Occurred : ${Err}`)
  }
  finally {
    await client.close()
  }
})

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
    else if(result.regstatus==="pending")
    res.send({success:"pending"})
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

// get channel details route 
app.post("/users/channelsdetails", async (req,res) => {
  try {
    await connectToDatabase()
    const result = await accountsCollection.findOne({email:req.body.email})
    res.send({channels : result.channels})
    // res.send({channels:result['channels']})
  }
  catch (Err) {
    console.log(`Error Occurred ${Err}`)
  }
  finally {
    await client.close()
  }
})

// Adding channel Route
app.post("/users/channels", async (req,res) => {
  // console.log(req.body)
  const newObj = {
    ...req.body,
    channelUrl : req.body.channelUrl,
    channelName:req.body.channelName,
    id : req.body.id
  }
  try {
    await connectToDatabase()
    const result = await accountsCollection.updateOne({email:req.body.email},{ $push: { channels: newObj } })
    res.send({success:"Channel Inserted Successfully"})
  }
  catch (Err) {
    console.log(`Error Occurred : ${Err}`)
  }
  finally{
    await client.close()
  }
})

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

// Add Newly Registered User
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

// Update the user
app.put("/users", async (req,res) => {
  const {newemail,newregstatus} = req.body
  console.log(newregstatus)
  // console.log(newemail);
  // console.log(newregstatus)
  // db.collectionName.update(
  //   { _id: ObjectId("your_objectid") },
  //   { $set: { regstatus: "approved" } }
  // );
  
  try {
    await connectToDatabase()
    const result = await accountsCollection.updateOne(
      {email:newemail}, // Match the document with the given userId
      { $set: { regstatus: newregstatus } }
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