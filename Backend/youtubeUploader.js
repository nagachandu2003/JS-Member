const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename(req, file, cb) {
    const newFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, newFileName);
  }
});

const uploadVideoFile = multer({ storage }).single("videoFile");

const oauth2Client = new google.auth.OAuth2(
  "911721135973-kigmnep4rtnio28bjgg6arg1t9itiftj.apps.googleusercontent.com",
  "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",
  "http://localhost:3001/oauth2callback"
);

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

function initiateUpload(req, res) {
  uploadVideoFile(req, res, function(err) {
    if (err) {
      return res.status(500).send({ Error: err.message });
    }

    if (req.file) {
      const filename = req.file.filename;
      const { title, description } = req.body;
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.upload'],
        state: JSON.stringify({
          filename,
          title,
          description
        })
      });
      res.json({ authUrl });
    } else {
      res.status(400).send("No file uploaded");
    }
  });
}

async function completeUpload(req, res) {
  const { code } = req.query;
  const { filename, title, description } = JSON.parse(req.query.state);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const fileSize = fs.statSync(path.join(uploadsDir, filename)).size;

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus: 'private' }
      },
      media: {
        body: fs.createReadStream(path.join(uploadsDir, filename)),
      },
    }, {
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        console.log(`${Math.round(progress)}% complete`);
      },
    });

    fs.unlinkSync(path.join(uploadsDir, filename));
    // res.json({ success: true, videoId: response.data.id });
    res.redirect(`http://localhost:3000/success/${response.data.id}`);
  } catch (error) {
    console.error('Error uploading video:', error.message);
    res.status(500).send(`Error uploading video: ${error.message}`);
  }
}

module.exports = { initiateUpload, completeUpload };

