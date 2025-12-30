import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserProfile, updateProfile } from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
        setUsername(data.user.username || "");
        setEmail(data.user.email || "");
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await updateProfile(username, email);

      if (data?.user?.id) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
          Loading profile...
        </div>
      </>
    );
  }

  const searchHistory = Array.isArray(user.searchHistory)
    ? user.searchHistory
    : [];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="p-10 max-w-3xl mx-auto space-y-8">

          <h2 className="text-2xl font-bold">Profile</h2>

          {/* PROFILE VIEW CARD */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Your Details
            </h3>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="text-gray-500">Username:</span>{" "}
                <span className="font-medium">{user.username}</span>
              </p>

              <p>
                <span className="text-gray-500">Email:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-black text-white rounded
                         hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* EDIT PROFILE CARD */}
          {isEditing && (
            <div className="bg-gray-50 rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">
                Update Profile
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="New username"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="New email"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded
                               hover:bg-gray-800 transition"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded
                               hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>

                {message && (
                  <div className="bg-green-100 text-green-700 p-2 rounded">
                    {message}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* SEARCH HISTORY CARD */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Search History
            </h3>

            {searchHistory.length === 0 ? (
              <p className="text-gray-500">
                No searches yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {[...searchHistory].reverse().map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 border-b pb-1"
                  >
                    🔍 {item.query}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
