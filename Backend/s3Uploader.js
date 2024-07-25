const AWS = require("aws-sdk");
const busboy = require('busboy');
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// This config is necessary for Vercel to handle the request properly
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

async function uploadToS3(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bb = busboy({ headers: req.headers });

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    const fileExtension = filename.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: mimeType,
      Body: file
    };

    const managedUpload = s3.upload(params);

    managedUpload.on('httpUploadProgress', (progress) => {
      console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
    });

    managedUpload.send((err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        res.status(500).json({ error: 'File upload failed', details: err.message });
      } else {
        console.log("File uploaded successfully:", data.Location);
        res.status(200).json({
          message: 'File uploaded successfully',
          fileUrl: data.Location,
          key: data.Key
        });
      }
    });
  });

  bb.on('error', (error) => {
    console.error('Error parsing form:', error);
    res.status(500).json({ error: 'File upload failed', details: error.message });
  });

  bb.on('close', () => {
    console.log('Upload completed');
  });

  req.pipe(bb);
}

module.exports = { uploadToS3 };

// const AWS = require("aws-sdk");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ID,
//   secretAccessKey: process.env.AWS_SECRET
// });

// const storage = multer.memoryStorage({
//   destination: function(req, file, callback) {
//     callback(null, '');
//   }
// });

// const upload = multer({ storage }).single('file');

// function uploadToS3(req, res) {
//   upload(req, res, function(err) {
//     if (err) {
//       return res.status(500).send({ Error: err.message });
//     }

//     let myFile = req.file.originalname.split(".");
//     const fileType = myFile[myFile.length - 1];

//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `${uuidv4()}.${fileType}`,
//       Body: req.file.buffer
//     };

//     s3.upload(params, (error, data) => {
//       if (error) {
//         res.status(500).send({ Error: error });
//       } else {
//         res.status(200).send(data);
//       }
//     });
//   });
// }

// module.exports = { uploadToS3 };