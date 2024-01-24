import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { MongoError } from "mongodb";
import { getUserObjectId } from "../../utils/getUserObjectId";
import s3 from "../../../config/s3Config";

export const editProfileInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("accessToken이 없습니다.");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const newNickname = req.body.nickname;
    const newIntroduce = req.body.introduce;

    const profileImage = req.file as Express.MulterS3.File;
    console.log("profileImage", profileImage);
    if (!profileImage) {
      const userData = await User.findOneAndUpdate(
        { _id },
        {
          nickname: newNickname,
          introduce: newIntroduce,
        }
      );
      return res.status(200).send("Success Edit Profile");
    }
    const beforeUserData = await User.findOne({ _id });
    if (beforeUserData?.profileImage) {
      await s3.deleteObject({
        Bucket: process.env.AWS_S3_POST_BUCKET,
        Key: beforeUserData?.profileImage.split(
          process.env.AWS_S3_URL as string
        )[1],
      });
    }
    const userData = await User.findOneAndUpdate(
      { _id },
      {
        nickname: newNickname,
        introduce: newIntroduce,
        profileImage: profileImage.location,
      }
    );
    console.log("userData", userData);
    return res.status(200).send("Success Edit Profile");
  } catch (err) {
    console.log("err", err instanceof MongoError);
    console.log("err", err);
    if (err instanceof MongoError && err.code === 11000) {
      return res.status(409).send("이미 존재하는 닉네임입니다.");
    }
    return res.status(400).send("Fail edit profile");
  }
};
