import { prisma } from "../db.config.js";

export const checkStoreExists = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });
  return store !== null;
};

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

export const getStore = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });
  return store;
};

export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  return user;
};

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