import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../slices/loginSlice";
import FormInput from "../../components/mypage/FormInput";
import FormSelect from "../../components/mypage/FormSelect";
import ProfileImage from "../../components/mypage/ProfileImage";
import SubLayout from "../../layout/SubLayout";
import {
  updateProfile,
  updatePhoto,
  updateMemberWithImage,
} from "../../api/authIssueUserApi/memberApi";
import { getUserData } from "../../utils/cookieUtils";
import { uploadProfileImage } from "../../utils/imageUpload/uploadImageToSupabase";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.user);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    birthAt: "",
    gender: "FEMALE",
    height: "",
    weight: "",
    activityLevel: "MODERATE", // Fixed to match backend
    photo: "",
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        birthAt: currentUser.birthAt || "",
        gender: currentUser.gender || "FEMALE",
        height: currentUser.height || "",
        weight: currentUser.weight || "",
        activityLevel: currentUser.activityLevel || "MODERATE", // Fixed to match backend
        photo: currentUser.photo || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Optimized image upload using new function
  const handlePhotoChange = async (file) => {
    try {
      setIsLoading(true);
      console.log("🖼️ Starting profile image upload...");

      // Upload optimized profile image to Supabase
      const uploadResult = await uploadProfileImage(file);
      console.log("✅ Profile image upload result:", uploadResult);

      // Get current user ID from cookies
      const user = getUserData();
      if (!user) {
        throw new Error("User not found in cookies");
      }

      const memberId = user.memberId || user.id;
      if (!memberId) {
        throw new Error("Member ID not found");
      }

      // Update backend with new photo URL
      const response = await updatePhoto(uploadResult.imageUrl);

      // Update form and Redux state with new photo URL
      setForm((prev) => ({ ...prev, photo: uploadResult.imageUrl }));
      dispatch(editProfile({ ...currentUser, photo: uploadResult.imageUrl }));

      console.log("📊 Image optimization stats:");
      console.log(
        "   Original size:",
        (uploadResult.originalSize / 1024).toFixed(2),
        "KB"
      );
      console.log(
        "   Optimized size:",
        (uploadResult.optimizedSize / 1024).toFixed(2),
        "KB"
      );
      console.log(
        "   Compression ratio:",
        (
          (1 - uploadResult.optimizedSize / uploadResult.originalSize) *
          100
        ).toFixed(1) + "%"
      );

      alert("프로필 사진이 업로드되었습니다.");
    } catch (error) {
      const message =
        error.response?.data?.message || "프로필 사진 업로드에 실패했습니다.";
      alert(message);
      console.error("❌ Image upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await updateProfile(form);
      dispatch(editProfile(response));
      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      const message =
        error.response?.data?.message || "프로필 수정에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4">
      <SubLayout to="/mypage" menu="마이페이지" label="프로필 수정" />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <ProfileImage
              currentImage={form.photo}
              onImageChange={handlePhotoChange}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <FormInput
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                생년월일
              </label>
              <FormInput
                name="birthAt"
                type="date"
                value={form.birthAt}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                성별
              </label>
              <FormSelect
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: "FEMALE", label: "여성" },
                  { value: "MALE", label: "남성" },
                ]}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                키 (cm)
              </label>
              <FormInput
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                몸무게 (kg)
              </label>
              <FormInput
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                활동량
              </label>
              <FormSelect
                name="activityLevel"
                value={form.activityLevel}
                onChange={handleChange}
                options={[
                  { value: "HIGH", label: "매우 활동적" },
                  { value: "MEDIUM", label: "활동적" },
                  { value: "LOW", label: "낮음" },
                ]}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/mypage")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
