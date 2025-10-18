import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addStoreReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const review = await addStoreReview(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};

