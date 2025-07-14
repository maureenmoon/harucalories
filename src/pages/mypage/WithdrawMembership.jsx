export default function WithDrawMembership() {
  const handleWithdraw = () => {
    if (window.confirm("회원가입을 철회하시겠습니까?")) {
      alert("회원탈퇴가 완료되었습니다");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleWithdraw}
        className="w-full sm:w-auto bg-red-500 hober:bg-red-600 text-white px-6 py-2 font-bold rounded "
      >
        회원탈퇴
      </button>
    </div>
  );
}
