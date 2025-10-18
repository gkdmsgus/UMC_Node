export const responseFromUser = ({ user, preferences }) => {
  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detailAddress,
    phoneNumber: user.phoneNumber,
    phoneNumber: user[0].phone_number,
    // 비밀번호는 응답에서 제외
    preferences: preferences
  };
};
export const bodyToUser = (body) => {
    const birth = new Date(body.birth); //날짜 변환
  
    return {
      email: body.email, //필수 
      name: body.name, // 필수
      gender: body.gender, // 필수
      birth, // 필수
      address: body.address || "", //선택 
      detailAddress: body.detailAddress || "", //선택 
      phoneNumber: body.phoneNumber,//필수
      password: body.password, //비밀번호 필드 추가
      preferences: body.preferences,// 필수 
    };
  };