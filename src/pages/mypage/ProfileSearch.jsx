import { useSelector } from "react-redux";

export default function ProfileSearch() {
  // const profile = {
  //   nickname: "toby",
  //   email: "toby@naver.com",
  //   targetCalories: 2100,
  //   activityLevel: "매우 활동적",
  //   name: "Toby Kim",
  //   height: 163,
  //   weight: 55,
  //   photo: "", // or use base64/file url
  // }
  // const getInitial = (nickname) => nickname.charAt(0).toUpperCase();

  //mock tesing
  const user = useSelector((state) => state.loginSlice); //loginSlice named at loginSlice.js
  if (!user || !user.nickname) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
      {profile.photo ? (
        <img
          src={profile.photo}
          alt="profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover">
          {getInitial(profile.nickname)}
        </div>
      )}
      <ul className="text-gray-700 text-sm sm:text-base space-1">
        <li>이메일: {profile.email}</li>
        <li>이름: {profile.name}</li>
        <li>닉네임: {profile.nickname}</li>
        <li>키: {profile.height}</li>
        <li>체중: {profile.weight}</li>
        <li>활동량: {profile.activityLevel}</li>
        <li>권장칼로리: {profile.targetCalories}</li>
      </ul>
    </div>
  );
}
