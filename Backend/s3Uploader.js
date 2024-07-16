const AWS = require("aws-sdk");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

const upload = multer({ storage }).single('file');

function uploadToS3(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.status(500).send({ Error: err.message });
    }

    let myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}.${fileType}`,
      Body: req.file.buffer
    };

    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send({ Error: error });
      } else {
        res.status(200).send(data);
      }
    });
  });
}

module.exports = { uploadToS3 };