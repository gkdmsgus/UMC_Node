import { prisma } from "../db.config.js";

// 미션 존재 확인
export const checkMissionExists = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId }
  });
  return mission !== null;
};

// 이미 도전 중인지 확인
export const checkAlreadyChallenging = async (userId, missionId) => {
  const userMission = await prisma.userMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
      status: { in: ['challenging', 'pending'] }
    }
  });
  return userMission !== null;
};

// 미션 도전 추가
export const addMissionChallenge = async (data) => {
  const created = await prisma.userMission.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      status: 'challenging',
    }
  });
  return created.id;
};

// 미션 도전 조회
export const getMissionChallenge = async (challengeId) => {
  const challenge = await prisma.userMission.findUnique({
    where: { id: challengeId },
    include: {
      mission: true,
      user: true,
    }
  });
  return challenge;
};

// 미션 조회
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId }
  });
  return mission;
};

// 가게의 미션 목록 조회 (페이지네이션)
export const getStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: { 
      storeId: storeId,
      id: { gt: cursor }
    },
    take: 5,
    orderBy: { id: 'asc' }
  });
  return missions;
};

// 내가 진행 중인 미션 목록 조회 (페이지네이션)
export const getMyChallengingMissions = async (userId, cursor) => {
  const userMissions = await prisma.userMission.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      mission: {
        select: {
          id: true,
          reward: true,
          deadline: true,
          missionSpec: true,
          store: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
    },
    where: {
      userId: userId,
      status: 'challenging',
      id: { gt: cursor }
    },
    take: 5,
    orderBy: { id: 'asc' }
  });
  return userMissions;
};

// 미션 상태 업데이트 (진행 중 → 완료)
export const updateMissionStatus = async (userMissionId, status) => {
  const updated = await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: status }
  });
  return updated;
};