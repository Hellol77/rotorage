import multerS3 from "multer-s3";
import multer from "multer";
import s3 from "./s3Config";

const awsUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET as string, // 객체를 업로드할 버킷 이름
    acl:process.env.AWS_S3_ACL as string, // Access control for the file
    key: function (req, file, cb) {
      // 객체의 키로 고유한 식별자 이기 때문에 겹치면 안됨
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      );
    },
  }),
});

export default awsUpload;
