import { responseFromReview, responseFromReviews, responseFromMyReviews } from "../dtos/review.dto.js";
import { StoreNotFoundError } from "../errors/basic.error.js";
import * as reviewRepository from "../repositories/review.repository.js";

export const addStoreReview = async (data) => {
  const storeExists = await reviewRepository.checkStoreExists(data.storeId);
  if (!storeExists) {
    throw new StoreNotFoundError(
      "존재하지 않는 가게입니다.", 
      { storeId: data.storeId }
    );
  }

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

export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await reviewRepository.getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listMyReviews = async (userId, cursor) => {
  const reviews = await reviewRepository.getMyReviews(userId, cursor);
  return responseFromMyReviews(reviews);
};