const { S3 } = require("@aws-sdk/client-s3");

const s3 = new S3({
  // aws 콘솔에서 발급받은 키와 지역 입력
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

export default s3;
