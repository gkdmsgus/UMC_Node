import { responseFromReview } from "../dtos/review.dto.js";
import * as reviewRepository from "../repositories/review.repository.js";

export const addStoreReview = async (data) => {
  try {
    const storeExists = await reviewRepository.checkStoreExists(data.storeId);
    if (!storeExists) {
      throw new Error("존재하지 않는 가게입니다.");
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
  } catch (error) {
    throw error;
  }
};