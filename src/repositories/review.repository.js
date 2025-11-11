import { prisma } from "../db.config.js";

// 가게 존재 확인
export const checkStoreExists = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });
  return store !== null;
};

// 리뷰 추가
export const addReview = async (data) => {
  const created = await prisma.review.create({
    data: {
      storeId: data.storeId,
      userId: data.userId,
      rating: data.rating,
      content: data.content,
    }
  });
  return created.id;
};

// 리뷰 조회
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      store: true,
      user: true,
    }
  });
  return review;
};

// 가게 조회
export const getStore = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });
  return store;
};

// 가게의 모든 리뷰 조회 (커서 기반 페이지네이션)
export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      store: {
        select: {
          id: true,
          name: true,
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    where: { 
      storeId: storeId, 
      id: { gt: cursor } 
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
// 내가 작성한 리뷰 목록 조회 (커서 기반 페이지네이션)
export const getMyReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      store: {
        select: {
          id: true,
          name: true,
        }
      }
    },
    where: { 
      userId: userId,
      id: { gt: cursor }
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};