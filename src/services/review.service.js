import { responseFromReview, responseFromReviews, responseFromMyReviews } from "../dtos/review.dto.js";
import { StoreNotFoundError } from "../errors.js";
import * as reviewRepository from "../repositories/review.repository.js";

export const addStoreReview = async (data) => {
  // 가게 존재 확인
  const storeExists = await reviewRepository.checkStoreExists(data.storeId);
  if (!storeExists) {
    throw new StoreNotFoundError(
      "존재하지 않는 가게입니다.", 
      { storeId: data.storeId }
    );
  }

  // 리뷰 추가
  const reviewId = await reviewRepository.addReview({
    storeId: data.storeId,
    userId: data.userId,
    rating: data.rating,
    content: data.content
  });

  const review = await reviewRepository.getReview(reviewId);
  const store = await reviewRepository.getStore(data.storeId);
  const user = await reviewRepository.getUser(data.userId);

  return responseFromReview({ review, store, user });
};

// 가게의 리뷰 목록 조회 (커서 기반 페이지네이션)
export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await reviewRepository.getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

// 내가 작성한 리뷰 목록 조회
export const listMyReviews = async (userId, cursor) => {
  const reviews = await reviewRepository.getMyReviews(userId, cursor);
  return responseFromMyReviews(reviews);
};