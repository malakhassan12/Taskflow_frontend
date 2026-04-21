import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiSave } from "react-icons/fi";
import { useTheme } from "../../Context/DarkModeProvider";
import { primaryColor } from "../../Constants/Colors";
import { getUserProfile, updateUserProfile } from "../../Api/api/manager.api";

const ProfileForm = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile({
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          age: response.age || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: parseInt(profile.age) || 0,
      });

      // Update localStorage with new profile data
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.firstName = profile.firstName;
      user.lastName = profile.lastName;
      user.age = profile.age;
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Updated localStorage user:", JSON.parse(localStorage.getItem("user")));

      // Force re-render of MemberNavbar by triggering a page reload or using context
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-sm text-slate-500">Loading profile...</div>;
  }

  return (
    <div className="space-y-4">
      <article className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Personal Information</h3>
        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Update your personal details and profile information</p>

        <form className="mt-5 space-y-4" onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">First Name</span>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Last Name</span>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiMail className="h-3.5 w-3.5" />
              Email Address
            </span>
            <input
              type="email"
              value={JSON.parse(localStorage.getItem("user"))?.email || ""}
              disabled
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 bg-slate-50"
            />
          </label>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              Age
            </span>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: primaryColor }}
          >
            <FiSave className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </article>

      <article className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Account Information</h3>
        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Your account details and role</p>

        <div className="mt-5 divide-y divide-slate-100">
          <div className="flex items-start justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Account Type</p>
              <p className="text-xs text-slate-500">Your current role</p>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              {JSON.parse(localStorage.getItem("user"))?.role || "Team Member"}
            </span>
          </div>

          <div className="flex items-start justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Account Status</p>
              <p className="text-xs text-slate-500">Current status</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProfileForm;
