import { Request, Response } from "express";
import { User } from "../../models/user";

export const searchProfileInfo = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("user Id가 없습니다.");
  }
  try {
    const userData = await User.findOne({ _id: userId }, { _id: 0 });
    res.status(200).send(userData);
  } catch (err) {
    console.log("err");
    res.status(400).send("프로필 정보를 불러오는데 실패했습니다.");
  }
};
