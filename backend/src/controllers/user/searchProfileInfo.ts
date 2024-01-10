import { Request, Response } from "express";
import { User } from "../../models/user";

export const searchProfileInfo = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const userData = await User.findOne({ userId: userId }, { _id: 0 });
    res.status(200).json(userData);
  } catch (err) {
    return res.status(400).send("프로필 정보를 불러오는데 실패했습니다.");
  }
};
