import { prisma } from "../db.config.js";

export const checkMissionExists = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId }
  });
  return mission !== null;
};

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

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId }
  });
  return mission;
};

export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  return user;
};

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

export const updateMissionStatus = async (userMissionId, status) => {
  const updated = await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: status }
  });
  return updated;
};