import { pool } from "../db.config.js";

const QUERIES = {
  CHECK_STORE: `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist;`,
  INSERT_REVIEW: `INSERT INTO review (store_id, user_id, rating, content) VALUES (?, ?, ?, ?);`,
  SELECT_REVIEW: `SELECT * FROM review WHERE id = ?;`,
  SELECT_STORE: `SELECT * FROM store WHERE id = ?;`,
  SELECT_USER: `SELECT * FROM user WHERE id = ?;`
};

export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(QUERIES.CHECK_STORE, storeId);
    return rows[0].isExist === 1;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      QUERIES.INSERT_REVIEW,
      [data.storeId, data.userId, data.rating, data.content]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();
  try {
    const [review] = await pool.query(QUERIES.SELECT_REVIEW, reviewId);
    if (review.length == 0) return null;
    return review;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getStore = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [store] = await pool.query(QUERIES.SELECT_STORE, storeId);
    if (store.length == 0) return null;
    return store;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getUser = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [user] = await pool.query(QUERIES.SELECT_USER, userId);
    if (user.length == 0) return null;
    return user;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};