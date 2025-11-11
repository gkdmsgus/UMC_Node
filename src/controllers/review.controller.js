import { addStoreReview, listStoreReviews, listMyReviews } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";

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

// 가게의 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};
// 내가 작성한 리뷰 목록 조회
export const handleListMyReviews = async (req, res, next) => {
  try {
    const reviews = await listMyReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};