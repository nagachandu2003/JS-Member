const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");
const {v4:uuidv4} = require("uuid");



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// AWS S3 File Upload Code Snippet Starts
const s3 = new AWS.S3({
  accessKeyId:process.env.AWS_ID,
  secretAccessKey:process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req,file,callback){
      callback(null,'')
    }
})

const upload = multer({storage}).single('file')

app.post("/upload",upload,(req,res) => {
  let myFile = req.file.originalname.split(".")
  const fileType = myFile[myFile.length-1]

  const params = {
    Bucket : process.env.AWS_BUCKET_NAME,
    Key : `${uuidv4()}.${fileType}`,
    Body : req.file.buffer
  }
  
  s3.upload(params, (error,data) => {
    if(error){
      res.status(500).send({Error : error})
    }
    res.status(200).send(data)
  })
})

// AWS S3 File Upload Code Snippet Ends







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

let campCollection;
const connectToDatabaseCamp = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
    campCollection = client.db(dbname).collection("campusers");
  } catch (err) {
    console.error(`Error connecting to the database : ${err}`);
  }
};



app.get("/", (req, res) => {
  res.send("Hello, I am connected Now");
});


// Stats Tab Today's API
app.post("/gettodaystats", async (req, res) => {
  try {
    await connectToDatabaseDashboard();
    const result = await dashboardCollection.findOne({});
    const {
      attendancelist,
      attendanceselfielist,
      householdlist,
      reportsslist,
      reportdigitalinfluencerlist,
      reportcoachinglist,
      reportssvitranlist
    } = result;

    // Filter attendance details
    const getAttendanceDetails = attendancelist.filter((ele) => (
      ele.attendanceDate === req.body.date && ele.campCluster === req.body.campCluster
    ));

    const finRes = getAttendanceDetails.length > 0 
  ? getAttendanceDetails[0].attendance.filter((ele) => ele.email === req.body.email)[0]?.status === "Present" 
    ? "Present" 
    : "Absent" 
  : "Absent";

    // Filter attendance selfie details
    const getAttendanceSelfieDetails = attendanceselfielist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.email === req.body.email && ele.date === req.body.date
    ));
    console.log(getAttendanceSelfieDetails)
    const finRes2 = getAttendanceSelfieDetails.filter((ele) => ele.period === "Morning");
    const finRes3 = getAttendanceSelfieDetails.filter((ele) => ele.period === "Evening");

    // Filter household selfie details
    const getHouseholdSelfieDetails = householdlist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.date === req.body.date
    ));
    const finRes4 = getHouseholdSelfieDetails.length;

    // Filter other report details
    const getSSDetails = reportsslist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.date === req.body.date
    ));
    const finRes5 = getSSDetails.length;

    const getDIDetails = reportdigitalinfluencerlist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.date === req.body.date
    ));
    const finRes6 = getDIDetails.length;

    const getCoaching = reportcoachinglist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.date === req.body.date
    ));
    const finRes7 = getCoaching.length;

    const getSSVitran = reportssvitranlist.filter((ele) => (
      ele.campCluster === req.body.campCluster && ele.date === req.body.date
    ));
    const finRes8 = getSSVitran.length;

    res.send({
      success: 'Stats Sent Successfully',
      detailedstats: {
        attendancedetails: finRes,
        morningattendanceselfiedetails: finRes2.length===0?'Absent':'Present',
        eveningattendanceselfiedetails: finRes3.length===0?'Absent':'Present',
        householdselfiedetails: finRes4,
        ssdetails: finRes5,
        didetails: finRes6,
        coachingdetails: finRes7,
        ssvitrandetails: finRes8
      }
    });
  } catch (Err) {
    res.send({ Error: `Error Occurred: ${Err}` });
  }
});



app.delete("/deletecampadmin", async (req,res) => {
    try {
      await connectToDatabaseDashboard()
      const result = await dashboardCollection.updateMany({},{ $pull: { campregisteredlist: { id: req.body.id } } })
      res.send({success:'Item Deleted Successfully'})
    }
    catch(Err) {
      res.send({failure : Err})
    }
    finally {
      await client.close()
    }
  })


// Getting registered members based on CampId
app.get("/regcampusers/:campId", async (req,res) => {
  try{
    await connectToDatabaseCamp()
    const result = await campCollection.find({campCluster:req.params.campId}).toArray()
    console.log(result)
    res.send({success : `Registered Users for camp Cluster ${req.params.campId} sent successfully`,result})
  }
  catch(Err)
  {
    res.send({failure : `Error Occurred : ${Err}`})
  }
})


// Updating role of a member in campusers
app.put("/updatemembertosubadmin", async (req,res) => {
  try{
   await connectToDatabaseCamp()
   const result = await campCollection.updateOne({email:req.body.email},{$set : {person:req.body.person}})
   res.send({success : `Role Updated Successfully`})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.put("/updatemembertoteamlead", async (req,res) => {
  try{
   await connectToDatabaseCamp()
   const result = await campCollection.updateOne({email:req.body.email},{$set : {addedToTeam:req.body.addedToTeam}})
   if (result.modifiedCount === 1) {
    res.send({ success: `Member status Updated Successfully` });
} else {
    res.send({ failure: `Member not found or status not updated` });
}
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

//Household (Selfie) API
app.post("/addselfiedata", async(req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { householdlist: req.body } })
    res.send({success : 'Selfie Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getselfiedata/:campCluster", async (req,res) => {
    const {campCluster} = req.params
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { householdlist: 1, _id: 0 } }
  ];
  const result = await dashboardCollection.aggregate(pipeline).toArray()
  const {householdlist} = result[0]
  if(campCluster==="ALL")
    res.send({success : 'Selfie data sent successfully', result:householdlist})
  else{
  const filteredList = householdlist.filter((ele) => ele.campCluster===campCluster)
  res.send({success : 'Selfie data Sent Successfully',result:filteredList})
  }
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
})
app.delete("/deleteselfie", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne(
      {}, // Filter to match the document containing the campteams array
      { $pull: { householdlist: { id: req.body.id } } } // Pull the object with the matching id from the array
    );
    res.send({success : 'Selfie Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

//Attendance Selfie
app.post("/addattendanceselfiedata", async(req,res) => {
  console.log(req.body)
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { attendanceselfielist: req.body } })
    res.send({success : 'Attendance Selfie Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getattendanceselfiedata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { attendanceselfielist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {attendanceselfielist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'Selfie data sent successfully', result:attendanceselfielist})
else{
const filteredList = attendanceselfielist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'Selfie data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

app.delete("/deleteattendanceselfie", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne(
      {}, // Filter to match the document containing the campteams array
      { $pull: { attendanceselfielist : { id: req.body.id } } } // Pull the object with the matching id from the array
    );
    res.send({success : 'Attendance Selfie Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// CAMP APP REPORT PAGE APIS
// D2D REPORT API
app.post("/addreportd2dlist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportd2dlist: req.body } })
    res.send({success : 'D2D Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getd2dreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportd2dlist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportd2dlist} = result[0]
if(campCluster==="ALL")
  res.send({success : "D2D data Sent Successfully",result:reportd2dlist})
else
{
  const filteredList = reportd2dlist.filter((ele) => ele.campCluster===campCluster)
  res.send({success : 'D2D data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

// WHATSAPP APIs
app.post("/addreportwhatsapplist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportwhatsapplist: req.body } })
    res.send({success : 'WhatsApp Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getwhatsappreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportwhatsapplist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()

const {reportwhatsapplist} = result[0]
if(campCluster==="ALL")
  res.send({success : "WhatsApp data Sent Successfully",result:reportwhatsapplist})
else
{
  const filteredList = reportwhatsapplist.filter((ele) => ele.campCluster===campCluster)
  res.send({success : 'WhatsApp data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

//SANSTHAPAK SADASYA API
app.post("/addreportsslist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportsslist: req.body } })
    res.send({success : 'SS Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getssreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportsslist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportsslist} = result[0]
if(campCluster==="ALL")
  res.send({success : "SS data Sent Successfully",result:reportsslist})
else
{
const filteredList = reportsslist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'SS data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

// SS Vitran List
app.post("/addreportssvitranlist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportssvitranlist: req.body } })
    res.send({success : 'SS Vitran Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getssvitranreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportssvitranlist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportssvitranlist} = result[0]
if(campCluster==="ALL")
  res.send({success: "SS Vitran data Sent Successfully", result : reportssvitranlist})
else{
  const filteredList = reportssvitranlist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'SS Vitran data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

// Digital Influencer List APIs
app.post("/addreportdigitalinfluencerlist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportdigitalinfluencerlist: req.body } })
    res.send({success : 'Digital Influencer Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getdigitalinfluencerreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportdigitalinfluencerlist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportdigitalinfluencerlist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'Digital Influencer data Sent Successfully',result:reportdigitalinfluencerlist})
else{
  const filteredList = reportdigitalinfluencerlist.filter((ele) => ele.campCluster===campCluster)
  res.send({success : 'Digital Influencer data Sent Successfully',result:filteredList})
  }
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

// Coaching APIs
app.post("/addreportcoachinglist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportcoachinglist: req.body } })
    res.send({success : 'Coaching Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getcoachingreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportcoachinglist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportcoachinglist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'Coaching data Sent Successfully',result:reportcoachinglist})
else{
const filteredList = reportcoachinglist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'Coaching data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

// ADMIN TABS APIs
//Collateral APIs
app.post("/addreportcollaterallist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportcollaterallist: req.body } })
    res.send({success : 'Collateral Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getcollateralreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportcollaterallist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportcollaterallist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'Collateral data Sent Successfully',result:reportcollaterallist})
else
{
const filteredList = reportcollaterallist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'Collateral data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

//Expenses APIs
app.post("/addreportexpenseslist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportexpenseslist: req.body } })
    res.send({success : 'Expenses Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getexpensesreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportexpenseslist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportexpenseslist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'Expenses data Sent Successfully',result:reportexpenseslist})
else
{
const filteredList = reportexpenseslist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'Expenses data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})


// Activity APIs
app.post("/addreportactivitylist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportactivitylist: req.body } })
    res.send({success : 'Activity Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getactivityreportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportactivitylist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportactivitylist} = result[0]
if(campCluster==="ALL")
  res.send({success:'Activity data sent successfully',result:reportactivitylist})
else
{
const filteredList = reportactivitylist.filter((ele) => ele.campCluster===campCluster)
res.send({success : 'Activity data Sent Successfully',result:filteredList})
}
}
catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})

//D2D Incharge List
app.post("/addreportd2dinchargelist", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { reportd2dinchargelist: req.body } })
    res.send({success : 'D2D Incharge Added Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getd2dinchargereportdata/:campCluster", async (req,res) => {
  const {campCluster} = req.params
try {
  await connectToDatabaseDashboard()
  const pipeline = [
    { $project: { reportd2dinchargelist: 1, _id: 0 } }
];
const result = await dashboardCollection.aggregate(pipeline).toArray()
const {reportd2dinchargelist} = result[0]
if(campCluster==="ALL")
  res.send({success : 'D2D Incharge data sent successfully',result:reportd2dinchargelist})
else
{
  const filteredList = reportd2dinchargelist.filter((ele) => ele.campCluster===campCluster)
  res.send({success : 'D2D Incharge data Sent Successfully',result:filteredList})
  }
}

catch(Err){
  res.send({failure : `Error Occurred : ${Err}`})
}
})





//CAMP APP APIs
app.post("/campusers", async (req,res) => {
  console.log(req.body)
  try{
    await connectToDatabaseCamp()
    const result = await campCollection.insertOne(req.body);
    res.send({success:'User Inserted Successfully'})
  }
  catch(Err){
      console.log(`Error Occurred : ${Err}`)
  }
  finally{
      await client.close()
  }
})
// Inserting a new User
// Camp APP 
app.get("/campusers/:email", async (req, res) => {
  const {email} = req.params
  try {
    await connectToDatabaseCamp()
    const result = await campCollection.findOne({email})
    // console.log(result.regstatus!=="approved")
    // console.log(result.regstatus)
    if(result===null)
    res.send({success:false})
    else
    {
    if(result.regstatus==="approved")
    res.send({success:true,result})
    else if(result.regstatus==="pending")
    res.send({success:"pending",result})
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

app.delete("/deletecampusers/:email", async (req,res) => {
  try{
    await connectToDatabaseCamp()
    const result = await campCollection.deleteOne({email:req.params.email});
    res.send({success : 'Member Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`}) 
  }
  finally {
    await client.close()
  }
})

//CAMP APP KYC APIs
app.get("/getcampkyclist", async (req,res) => {
  try{
    await connectToDatabaseCamp()
    const query = { kyc: { $exists: true, $not: { $size: 0 } } };
    // Fetch the documents
    const result = await campCollection.find(query).toArray();
    const finalResult = result.map((ele) => ({...ele.kyc,email:ele.email,kycstatus:ele.kycstatus}))
    res.send({success : "KYC sent successfully", details:finalResult})
  }
  catch(Err){
    res.send({failure : Err})
  }
  finally {
    await client.close()
  }
})

app.post("/addcampKYC", async (req,res) => {
  try{
    await connectToDatabaseCamp()
    const result = await campCollection.updateOne({email:req.body.email},{
      $set : {kyc : req.body.obj}
    })
    res.send({success : 'KYC Sent Successfully'})
  }
  catch(Err)
  {
    res.send({failure : `Error Occurred ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.put("/updatecampkycstatus", async (req,res) => {
  const {newemail,newkycstatus} = req.body 
  try {
    await connectToDatabaseCamp()
    const result = await campCollection.updateOne(
      {email:newemail}, // Match the document with the given userId
      { $set: { kycstatus: newkycstatus } }
    );
    // const result = await accountsCollection.updateOne({_id: new ObjectId(userId)},{$set : {regstatus:newregstatus}})
    res.send({ success: "KYC Status Updated Successfully" });
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally {
    await client.close()
  }
})

app.delete("/deletecampkyc", async (req,res) => {
  console.log(req.body);
  try{
    await connectToDatabaseCamp()
    const result = await campCollection.updateOne({email:req.body.email},{
      $unset: { kyc: "" },
      $set: { kycstatus: "pending" }
  })
    res.send({success : 'KYC Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : Err})
  }
  finally{
    await client.close()
  }
})

// Getting admin users from jsdashboard
app.get("/admincampusers/:email", async (req, res) => {
  const {email} = req.params
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { campregisteredlist: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    // console.log(result)
    const usersList = result[0].campregisteredlist
    const emailsList = usersList.map((ele) => ele.campInchargeGmail)
    const campsList = usersList.filter((ele) => ele.campInchargeGmail===email)
    const ress = emailsList.includes(email)
    res.send({success:ress,campsList})
    }
  catch (Err){
    console.log(`Error Occurred : ${Err}`)
  }
  finally {
    await client.close()
  }
});

//getting subadmin details from jsdashboard
app.get("/subadmincampusers/:email", async (req, res) => {
  const {email} = req.params
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { subadminlist: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    const usersList = result[0].subadminlist
    const emailsList = usersList.map((ele) => ele.email)
    const campsList = usersList.filter((ele) => ele.email===email)
    const ress = emailsList.includes(email)
    res.send({success:ress,subadminList:campsList})
    }
  catch (Err){
    console.log(`Error Occurred : ${Err}`)
  }
  finally {
    await client.close()
  }
});

app.get("/campusers", async (req, res) => {
  // console.log("I am in /users route");
  try {
    await connectToDatabaseCamp();
    const result = await campCollection.find({
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

// Sub Admin Storage
app.post("/addsubadmindata", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const query = {
      subadminlist: { $elemMatch: { email: req.body.email } }
    };
    const result2 = await dashboardCollection.findOne(query)
    if(result2!==null)
      res.send({msg:'User already exists'})
    else{
    const result = await dashboardCollection.updateOne({},{ $push: { subadminlist: req.body } })
    res.send({success : 'Sub Admin Added Successfully'})
    }
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getsubadmindetails", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { subadminlist: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Sub Admins List Sent Successfully',subadminList:result[0].subadminlist})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

//Camp Teams for admin
app.post("/addteaminadmin", async(req,res) => {
    try{
      await connectToDatabaseDashboard()
      await connectToDatabaseCamp()
      const result = await dashboardCollection.updateOne({},{ $push: { campteams: req.body } })
      const result2 = await campCollection.updateOne({email:req.body.teamLeadEmail},{$set : {addedToTeam:true}})
      res.send({success : 'Team Added Successfully'})
    }
    catch(Err){
      res.send({failure:`Error Occurred : ${Err}`})
    }
    finally{
      await client.close()
    }
})

app.put("/addmembers", async (req, res) => {
  try {
    await connectToDatabaseDashboard();
    await connectToDatabaseCamp()
    const result = await dashboardCollection.updateOne(
      { "campteams.id": req.body.id }, // Filter to match the document containing the campteams array and the specific id within it
      { $set: { "campteams.$.teammembers": req.body.selectedMembers } } // Set the teammembers array for the matched array element
    );

    if (result.matchedCount > 0) {
      const emails = req.body.selectedMembers.map(member => member.email);

      // Update the addedToTeam field to true for the members based on their emails
      const updateResult = await campCollection.updateMany(
        { email: { $in: emails } }, // Filter to match the members by their emails
        { $set: { addedToTeam: true, teamName:req.body.teamName } } // Set the addedToTeam field to true
      );
      res.send({ success: 'Team members updated successfully' });
    } else {
      res.send({ failure: 'Team not found' });
    }
  } catch (Err) {
    res.send({ failure: `Error occurred: ${Err}` });
  } finally {
    await client.close();
  }
});



app.delete("/deleteteaminadmin", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    await connectToDatabaseCamp()
    const result = await dashboardCollection.updateOne(
      {}, // Filter to match the document containing the campteams array
      { $pull: { campteams: { id: req.body.id } } } // Pull the object with the matching id from the array
    );
    let emails = (req.body.teammembers).map((ele) => ele.email)
    emails = [...emails,req.body.email]
    const updateResult = await campCollection.updateMany(
      { email: { $in: emails } }, // Filter to match the members by their emails
      { $set: { addedToTeam: false, teamName:'' } } // Set the addedToTeam field to true
    );
    res.send({success : 'Team Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get('/getcampteams', async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { campteams: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Teams Sent Successfully',Teams:result[0].campteams})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// Attendance APIs
app.post("/addattendanceadmin", async(req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { attendancelist : req.body } })
    res.send({success : 'Attendance Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getattendanceadmin", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { attendancelist: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Attendance Sent Successfully',AttendanceList:result[0].attendancelist})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getattendanceadmin/:campCluster", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { attendancelist: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    const {attendancelist} = result[0]
    const filteredList = attendancelist.filter((ele) => ele.campCluster===req.params.campCluster)
    console.log(filteredList)
    res.send({success:'Attendance Data Sent Successfully',AttendanceList:filteredList})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.delete("/deleteattendance", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $pull: { attendancelist: { id: req.body.id } } });
    res.send({success : "Attendance Deleted Successfully"})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// YTCM AND JSDASHBOARD APIs
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

// Trending APIs
app.post("/addtrendingdata", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { trending: req.body } })
    res.send({success : 'Video Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.delete("/trending/:id", async (req,res) => {
  // const {id} = req.params
  try {
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateMany({},{ $pull: { trending: { id: req.params.id } } })
    res.send({success:'Video Deleted Successfully'})
  }
  catch(Err) {
    res.send({failure : Err})
  }
  finally {
    await client.close()
  }
})

app.get("/gettrendingdetails", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { trending: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Trending Videos Sent Successfully',Trending:result[0].trending})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// Referral APIs

app.get("/getreferraldetails", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { referral: 1, _id: 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Referrals Sent Successfully',Referral:result[0].referral})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.delete("/referral/:id", async (req,res) => {
  // const {id} = req.params
  try {
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateMany({},{ $pull: { referral: { id: req.params.id } } })
    res.send({success:'Referral Deleted Successfully'})
  }
  catch(Err) {
    res.send({failure : Err})
  }
  finally {
    await client.close()
  }
})


app.post("/addreferral", async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { referral: req.body } })
    res.send({success : 'Referral Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// CampRegistration APIs
app.post("/addcampuserjsd",async (req,res) => {
  try{
    await connectToDatabaseDashboard()
    const result = await dashboardCollection.updateOne({},{ $push: { campregisteredlist: req.body } })
    res.send({success : 'User Added Successfully'})
  }
  catch(Err){
    res.send({failure:`Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/getcampusers", async (req,res) => {
  try {
    await connectToDatabaseDashboard()
    const pipeline = [
      { $project: { campregisteredlist : 1, _id : 0 } }
  ];
  
    const result = await dashboardCollection.aggregate(pipeline).toArray()
    res.send({success:'Camp Users Sent Successfully',CampusersList:result[0].campregisteredlist})
  }
  catch(Err) {
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.put("/campusers", async (req,res) => {
  const {newemail,newregstatus} = req.body
  // console.log(newemail);
  // console.log(newregstatus)
  
  try {
    await connectToDatabaseCamp()
    const result = await campCollection.updateOne(
      {email:newemail}, // Match the document with the given userId
      { $set: { regstatus: newregstatus,category:req.body.category } }
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

// KYC APIs
app.get("/getkyclist", async (req,res) => {
  try{
    await connectToDatabase()
    const query = { kyc: { $exists: true, $not: { $size: 0 } } };
    // Fetch the documents
    const result = await accountsCollection.find(query).toArray();
    const finalResult = result.map((ele) => ({...ele.kyc,email:ele.email,kycstatus:ele.kycstatus}))
    res.send({success : "KYC sent successfully", details:finalResult})
  }
  catch(Err){
    res.send({failure : Err})
  }
  finally {
    await client.close()
  }
})

app.post("/addKYC", async (req,res) => {
  try{
    await connectToDatabase()
    const result = await accountsCollection.updateOne({email:req.body.email},{
      $set : {kyc : req.body.obj}
    })
    res.send({success : 'KYC Sent Successfully'})
  }
  catch(Err)
  {
    res.send({failure : `Error Occurred ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.put("/updatekycstatus", async (req,res) => {
  const {newemail,newkycstatus} = req.body 
  try {
    await connectToDatabase()
    const result = await accountsCollection.updateOne(
      {email:newemail}, // Match the document with the given userId
      { $set: { kycstatus: newkycstatus } }
    );
    // const result = await accountsCollection.updateOne({_id: new ObjectId(userId)},{$set : {regstatus:newregstatus}})
    res.send({ success: "KYC Status Updated Successfully" });
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally {
    await client.close()
  }
})

app.delete("/deletekyc", async (req,res) => {
  console.log(req.body);
  try{
    await connectToDatabase()
    const result = await accountsCollection.updateOne({email:req.body.email},{
      $unset: { kyc: "" },
      $set: { kycstatus: "pending" }
  })
    res.send({success : 'KYC Deleted Successfully'})
  }
  catch(Err){
    res.send({failure : Err})
  }
  finally{
    await client.close()
  }
})

// CartItems API
app.post("/addclaimeditems", async (req,res) => {
  try{
    await connectToDatabase()
    const result = await accountsCollection.updateOne({email:req.body.email},{$push : {claimedvideoslist:req.body.claimeddetails},$set : {claimstatus:'pending'}})
    res.send({success : 'Items sent for Claim Successfully'})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.get("/claimeddetails/:email", async (req,res) => {
  // console.log(req.params)
  try{
    await connectToDatabase();
    const result = await accountsCollection.findOne({email:req.params.email})
    res.send({success:"Claimed details send Successfully",claimedDetails:result.claimedvideoslist})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

// Get all claimed items API
app.get("/rewarditems", async (req,res) => {
  try{
    await connectToDatabase()
    const projection = {
      email:1,
      name:1,
      whatsappNumber:1,
      claimedvideoslist: 1,
      _id: 0
    };
    const result = await accountsCollection.find({}, { projection }).toArray();
    const processedResult = result.map(doc => {
      if (doc.claimedvideoslist && Array.isArray(doc.claimedvideoslist)) {
        doc.claimedvideoslist = doc.claimedvideoslist.map(item => ({
          ...item,
          email: doc.email,
          name: doc.name,
          whatsappNumber: doc.whatsappNumber
        }));
      }
      return doc;
    });
    let newList = []
    for(let values of processedResult)
      {
        if(values.claimedvideoslist)
          newList = [...newList,...values.claimedvideoslist]
      }
    res.send({success:'Reward Items sent Successfully',rewardItems : newList})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
  finally{
    await client.close()
  }
})

app.post("/updaterewardstatus", async (req,res) => {
  try{
    await connectToDatabase()
    const filter = { email: req.body.email };
    const update = {
      $set: {
        'claimedvideoslist.$[elem].status': req.body.newstatus
      }
    };
    const arrayFilters = [{ 'elem.rewardId': req.body.rewardId }];

    const result = await accountsCollection.updateOne(filter, update, { arrayFilters: arrayFilters });
    res.send({success:'Reward Status Updated Successfully'})
  }
  catch(Err)
  {
    res.send({failure : `Error Occurred : ${Err}`})
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

// app.get("/allvideos/:email", async(req,res) => {
//   const {email} = req.params
//   try{
//     await connectToDatabase()
//     const pipeline = [
//       { $unwind: '$channels' },
//       { $match: { 'channels.email': email } },
//       { $project: { videos: '$channels.videos' } }
//     ];
//     const result = await accountsCollection.aggregate(pipeline).toArray();
//     let l = [];
//     for(let values of result)
//       {
//         l = [...l,...values.videos]
//       }
//     res.send({success:'Videos sent Successfully',result:l})
// }
// catch(Err){
//   console.log(`Error Occurred : ${Err}`)
// }
// finally {
//   await client.close()
// }
// })

// NEW API SPACE
app.get("/allvideos/:email", async (req,res) => {
  const { email } = req.params;
  try {
    await connectToDatabase()
    const pipeline = [
      { $unwind: '$channels' },
      { $match: { 'channels.email': email } },
      { $project: { videos: '$channels.videos' } }
    ];
    const result = await accountsCollection.aggregate(pipeline).toArray();
    let le = [];
    for(let values of result)
      {
        le = [...le,...values.videos]
      }
      const result2 = await accountsCollection.findOne({email:req.params.email})
      let claimedVideos = [];
      if(result2.claimedvideoslist)
        {
          for(let values of result2.claimedvideoslist)
            {
              claimedVideos = [...claimedVideos,...values.cartList]
            }
        }
        const l = le.filter(obj1 => !claimedVideos.some(obj2 => obj2.videoId === obj1.videoId));
        res.send({success:"Videos Sent Successfully",result:l})
  }
  catch(Err){
    res.send({failure : `Error Occurred : ${Err}`})
  }
})
// NEW API SPACE

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
    id : req.body.id,
    channelDate : req.body.channelDate,
    channelTime : req.body.channelTime
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

// Update the Registrations status
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