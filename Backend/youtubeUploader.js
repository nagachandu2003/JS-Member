const { google } = require("googleapis");
const dotenv = require("dotenv");
const axios = require("axios");
const stream = require("stream");

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `https://js-member-backend.vercel.app/oauth2callback`
);

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

async function initiateUpload(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description, videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Video URL is required' });
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    state: JSON.stringify({
      title,
      description,
      videoUrl
    })
  });

  res.json({ authUrl });
}

async function completeUpload(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;
  const { title, description, videoUrl } = JSON.parse(req.query.state);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Download the video
    const videoResponse = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    // Create a pass-through stream
    const passThrough = new stream.PassThrough();
    videoResponse.data.pipe(passThrough);

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus: 'private' }
      },
      media: {
        body: passThrough,
      },
    });

    res.redirect(`https://js-smp.vercel.app/success/${response.data.id}`);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video to YouTube', details: error.message });
  }
}

module.exports = { initiateUpload, completeUpload };
// const {google} = require("googleapis")
// const dotenv = require("dotenv");
// dotenv.config();

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   `http://localhost:3001/oauth2callback`
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });

// async function initiateUpload(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { title, description, videoUrl } = req.body;

//   if (!videoUrl) {
//     return res.status(400).json({ error: 'Video URL is required' });
//   }

//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/youtube.upload'],
//     state: JSON.stringify({
//       title,
//       description,
//       videoUrl
//     })
//   });

//   res.json({ authUrl });
// }

// async function completeUpload(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { code } = req.query;
//   const { title, description, videoUrl } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: videoUrl,
//       },
//     });

//     res.redirect(`http://localhost:3000/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).json({ error: 'Failed to upload video to YouTube', details: error.message });
//   }
// }

// module.exports = {initiateUpload,completeUpload}

// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const dotenv = require("dotenv");
// dotenv.config();

// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// const storage = multer.diskStorage({
//   destination: uploadsDir,
//   filename(req, file, cb) {
//     const newFileName = `${uuidv4()}-${file.originalname}`;
//     cb(null, newFileName);
//   }
// });

// const uploadVideoFile = multer({ storage }).single("videoFile");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://js-member-backend.vercel.app/oauth2callback"
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });

// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       console.error('Upload error:', err);
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const filename = req.file.filename;
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           filename,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { filename, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const filePath = path.join(uploadsDir, filename);
//     const fileSize = fs.statSync(filePath).size;

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fs.createReadStream(filePath),
//       },
//     }, {
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileSize) * 100;
//         console.log(`${Math.round(progress)}% complete`);
//       },
//     });

//     fs.unlinkSync(filePath);
//     res.redirect(`https://js-smp.vercel.app/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error.message);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// module.exports = { initiateUpload, completeUpload };



// const { google } = require('googleapis');
// const multer = require("multer");
// const { Readable } = require('stream');

// // Multer setup for memory storage
// const storage = multer.memoryStorage();
// const uploadVideoFile = multer({ storage }).single("videoFile");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "http://localhost:3001/oauth2callback"
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });

// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       console.error('Upload error:', err);
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           fileBuffer: req.file.buffer.toString('base64'),
//           mimeType: req.file.mimetype,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       console.error('No file uploaded');
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { fileBuffer, mimeType, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const fileStream = new Readable();
//     fileStream.push(Buffer.from(fileBuffer, 'base64'));
//     fileStream.push(null);

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fileStream,
//         mimeType: mimeType
//       },
//     }, {
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileStream.readableLength) * 100;
//         console.log(`${Math.round(progress)}% complete`);
//       },
//     });

//     res.redirect(`http://localhost:3000/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// module.exports = { initiateUpload, completeUpload };


// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// const dotenv = require("dotenv");
// dotenv.config();


// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// const storage = multer.diskStorage({
//   destination: uploadsDir,
//   filename(req, file, cb) {
//     const newFileName = `${uuidv4()}-${file.originalname}`;
//     cb(null, newFileName);
//   }
// });

// const uploadVideoFile = multer({ storage }).single("videoFile");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://js-member-backend.vercel.app/oauth2callback"  // Updated to use the deployed backend URL
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });

// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       console.error('Upload error:', err);
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const filename = req.file.filename;
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           filename,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       console.error('No file uploaded');
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { filename, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const fileSize = fs.statSync(path.join(uploadsDir, filename)).size;

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fs.createReadStream(path.join(uploadsDir, filename)),
//       },
//     }, {
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileSize) * 100;
//         console.log(`${Math.round(progress)}% complete`);
//       },
//     });

//     fs.unlinkSync(path.join(uploadsDir, filename));
//     res.redirect(`https://js-smp.vercel.app/success/${response.data.id}`);  // Updated to use the deployed frontend URL
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// module.exports = { initiateUpload, completeUpload };










































// const { google } = require('googleapis');
// const multer = require("multer");
// const { Readable } = require('stream');

// // Multer setup for memory storage
// const storage = multer.memoryStorage();
// const uploadVideoFile = multer({ storage }).single("videoFile");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "http://localhost:3001/oauth2callback"
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });

// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       console.error('Upload error:', err);
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           fileBuffer: req.file.buffer.toString('base64'),
//           mimeType: req.file.mimetype,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       console.error('No file uploaded');
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { fileBuffer, mimeType, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const fileStream = new Readable();
//     fileStream.push(Buffer.from(fileBuffer, 'base64'));
//     fileStream.push(null);

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fileStream,
//         mimeType: mimeType
//       },
//     }, {
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileStream.readableLength) * 100;
//         console.log(`${Math.round(progress)}% complete`);
//       },
//     });

//     res.redirect(`http://localhost:3000/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// module.exports = { initiateUpload, completeUpload };

// WORKING BELOW

// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const dotenv = require("dotenv");
// dotenv.config();

// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// const storage = multer.diskStorage({
//   destination: uploadsDir,
//   filename(req, file, cb) {
//     const newFileName = `${uuidv4()}-${file.originalname}`;
//     cb(null, newFileName);
//   }
// });

// const uploadVideoFile = multer({ storage }).single("videoFile");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://js-member-backend.vercel.app/oauth2callback"
// );

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client
// });


// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       console.error('Upload error:', err);
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           fileBuffer: req.file.buffer.toString('base64'),
//           mimeType: req.file.mimetype,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       console.error('No file uploaded');
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { fileBuffer, mimeType, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const fileStream = new require('stream').Readable();
//     fileStream.push(Buffer.from(fileBuffer, 'base64'));
//     fileStream.push(null);

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fileStream,
//         mimeType: mimeType
//       },
//     });

//     res.redirect(`http://localhost:3000/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// function initiateUpload(req, res) {
//   uploadVideoFile(req, res, function(err) {
//     if (err) {
//       return res.status(500).send({ Error: err.message });
//     }

//     if (req.file) {
//       const filename = req.file.filename;
//       const { title, description } = req.body;
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/youtube.upload'],
//         state: JSON.stringify({
//           filename,
//           title,
//           description
//         })
//       });
//       res.json({ authUrl });
//     } else {
//       res.status(400).send("No file uploaded");
//     }
//   });
// }

// async function completeUpload(req, res) {
//   const { code } = req.query;
//   const { filename, title, description } = JSON.parse(req.query.state);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const fileSize = fs.statSync(path.join(uploadsDir, filename)).size;

//     const response = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: { title, description },
//         status: { privacyStatus: 'private' }
//       },
//       media: {
//         body: fs.createReadStream(path.join(uploadsDir, filename)),
//       },
//     }, {
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileSize) * 100;
//         console.log(`${Math.round(progress)}% complete`);
//       },
//     });

//     fs.unlinkSync(path.join(uploadsDir, filename));
//     // res.json({ success: true, videoId: response.data.id });
//     res.redirect(`https://js-smp.vercel.app/success/${response.data.id}`);
//   } catch (error) {
//     console.error('Error uploading video:', error.message);
//     res.status(500).send(`Error uploading video: ${error.message}`);
//   }
// }

// module.exports = { initiateUpload, completeUpload };