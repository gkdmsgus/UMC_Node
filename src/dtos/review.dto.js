export const bodyToReview = (body) => {
    return {
      storeId: body.storeId,
      userId: body.userId || 1, 
      rating: body.rating,
      content: body.content || "",
      
    };
  };
  

  export const responseFromReview = ({ review, store, user }) => {
    return {
      reviewId: review[0].id,
      storeId: review[0].store_id,
      storeName: store[0].name,
      userId: review[0].user_id,
      userName: user[0].name,
      rating: review[0].rating,
      content: review[0].content,
      createdAt: review[0].created_at
    };
  };
  export const responseFromReviews = (reviews) => {
    return {
      data: reviews.map(review => ({
        id: review.id,
        storeName: review.store.name,
        userName: review.user.name,
        rating: review.rating,
        content: review.content,
        createdAt: review.createdAt,
      })),
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };
  // 내가 작성한 리뷰 목록 응답
export const responseFromMyReviews = (reviews) => {
  return {
    data: reviews.map(review => ({
      id: review.id,
      storeName: review.store.name,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
    })),
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};