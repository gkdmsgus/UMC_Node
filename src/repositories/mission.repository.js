import { pool } from "../db.config.js";

const QUERIES = {
  CHECK_MISSION: `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExist;`,
  CHECK_CHALLENGING: `
    SELECT EXISTS(
      SELECT 1 FROM user_mission 
      WHERE user_id = ? AND mission_id = ? 
      AND status IN ('challenging', 'pending')
    ) as isExist;
  `,
  INSERT_CHALLENGE: `INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, 'challenging');`,
  SELECT_CHALLENGE: `SELECT * FROM user_mission WHERE id = ?;`,
  SELECT_MISSION: `SELECT * FROM mission WHERE id = ?;`,
  SELECT_USER: `SELECT * FROM user WHERE id = ?;`
};

export const checkMissionExists = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(QUERIES.CHECK_MISSION, missionId);
    return rows[0].isExist === 1;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const checkAlreadyChallenging = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(QUERIES.CHECK_CHALLENGING, [userId, missionId]);
    return rows[0].isExist === 1;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const addMissionChallenge = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(QUERIES.INSERT_CHALLENGE, [data.userId, data.missionId]);
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getMissionChallenge = async (challengeId) => {
  const conn = await pool.getConnection();
  try {
    const [challenge] = await pool.query(QUERIES.SELECT_CHALLENGE, challengeId);
    if (challenge.length == 0) return null;
    return challenge;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getMission = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [mission] = await pool.query(QUERIES.SELECT_MISSION, missionId);
    if (mission.length == 0) return null;
    return mission;
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