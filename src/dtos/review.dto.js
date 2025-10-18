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
   