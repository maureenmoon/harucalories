import React, { useState } from "react";

export default function EditProfile() {
  const [form, setForm] = useState({
    nickname: "toby",
    name: "Toby Kim",
    height: 163,
    weight: 55,
    activityLevel: "매우 활동적",
    targetCalories: 2100,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitting:", form);
    // Add API call here
    alert("Updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm sm:text-base">
      <div>
        <label className="block font-semibold mb-1">Profile Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {["nickname", "name", "height", "weight", "targetCalories"].map(
        (field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize">
              {field}
            </label>
            <input
              name="field"
              value={form[field]}
              onChange={handleChange}
              type="text"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )
      )}
      <div>
        <label className="block font-semibold mb-1">Activity Level</label>
        <select
          name="activityLevel"
          value={form.activityLevel}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="high">매우 활동적</option>
          <option value="medium">활동적</option>
          <option value="low">조금 활동적</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded "
      >
        저장
      </button>
    </form>
  );
}
