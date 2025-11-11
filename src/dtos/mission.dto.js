// 미션 도전 응답
export const responseFromMissionChallenge = ({ challenge, mission, user }) => {
    return {
      challengeId: challenge.id,
      status: challenge.status,
      mission: {
        id: mission.id,
        missionSpec: mission.missionSpec,
        reward: mission.reward,
        deadline: mission.deadline,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      createdAt: challenge.createdAt,
    };
  };
  
  // 가게의 미션 목록 응답
  export const responseFromStoreMissions = (missions) => {
    return {
      data: missions.map(mission => ({
        id: mission.id,
        missionSpec: mission.missionSpec,
        reward: mission.reward,
        deadline: mission.deadline,
      })),
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].id : null,
      },
    };
  };
  
  // 내가 진행 중인 미션 목록 응답
  export const responseFromMyMissions = (userMissions) => {
    return {
      data: userMissions.map(um => ({
        id: um.id,
        status: um.status,
        createdAt: um.createdAt,
        mission: {
          id: um.mission.id,
          storeName: um.mission.store.name,
          missionSpec: um.mission.missionSpec,
          reward: um.mission.reward,
          deadline: um.mission.deadline,
        }
      })),
      pagination: {
        cursor: userMissions.length ? userMissions[userMissions.length - 1].id : null,
      },
    };
  };
  
  // 미션 완료 응답
  export const responseFromMissionComplete = (userMission) => {
    return {
      id: userMission.id,
      status: userMission.status,
      mission: userMission.mission,
    };
  };
  export const bodyToMissionChallenge = (body) => {
    return {
      userId: body.userId,
      missionId: body.missionId,
    };
  };