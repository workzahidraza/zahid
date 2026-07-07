import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import { AuthContext } from "../../auth/context/authContext";
import { getMe } from "../../auth/services/api.auth";
import { getUserPosts } from "../../post/services/api.post";
import EditProfileModal from "./EditProfileModal";

const ProfileDetails = () => {
  const { user: contextUser, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleProfileUpdate = (updatedUser) => {
    setProfile((prev) => ({
      ...prev,
      profile_pic: updatedUser.profile_pic,
      bio: updatedUser.bio,
    }));
    setUser((prev) => ({
      ...prev,
      profile_pic: updatedUser.profile_pic,
      bio: updatedUser.bio,
    }));
  };

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const [profileResponse, postsResponse] = await Promise.all([
        getMe(),
        getUserPosts(contextUser?.userName),
      ]);

      if (profileResponse.success) {
        setProfile(profileResponse.user);
      }
      if (postsResponse.success) {
        setPosts(postsResponse.posts);
      }
      setLoading(false);
    }

    if (contextUser?.userName) {
      loadProfile();
    }
  }, [contextUser?.userName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <p className="text-sm text-[#8C8479]">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] md:pl-64">
      <NavBar />

      <div className="profile-container pb-20 md:pb-12 max-w-4xl mx-auto md:px-8 md:pt-6">
        <div className="profile_details w-full flex flex-col items-center justify-center gap-4 px-5 py-8 md:flex-row md:items-start md:justify-center md:gap-16 md:py-12 md:px-10">
          <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-[#C97B4A] md:h-40 md:w-40 md:flex-shrink-0">
            <img
              className="h-full w-full object-cover"
              src={profile?.profile_pic}
              alt="Profile"
            />
          </div>

          <div className="text-center md:text-left flex flex-col gap-3 flex-1">
            <div className="flex flex-col items-center md:items-start gap-2.5">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1
                  className="text-xl font-semibold text-[#2A2A28] md:text-2xl"
                  style={{ fontFamily: "'Source Serif 4', serif" }}
                >
                  {profile?.userName}
                </h1>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="px-4 py-1.5 bg-[#E4EBE3] hover:bg-[#d8e2d6] text-[#2F4A3C] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Edit profile
                </button>
              </div>
              <p className="text-[#8C8479] text-sm md:text-base -mt-1.5 md:-mt-1">@{profile?.userName}</p>
            </div>

            <div className="w-full flex justify-evenly md:justify-start md:gap-10 my-1 md:my-0">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[#2A2A28] text-lg font-medium md:text-xl">
                  {profile?.postCount ?? 0}
                </h2>
                <p className="text-[#8C8479] text-xs md:text-sm">Posts</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[#2A2A28] text-lg font-medium md:text-xl">
                  {profile?.followersCount ?? 0}
                </h2>
                <p className="text-[#8C8479] text-xs md:text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[#2A2A28] text-lg font-medium md:text-xl">
                  {profile?.followingCount ?? 0}
                </h2>
                <p className="text-[#8C8479] text-xs md:text-sm">Following</p>
              </div>
            </div>

            {profile?.bio && (
              <p className="text-[#2A2A28] text-sm mt-2 max-w-md">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="posts grid grid-cols-3 gap-0.5 px-0.5 md:gap-4 md:px-0">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square overflow-hidden bg-[#EDE6D8] md:rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                className="w-full h-full object-cover object-center"
                src={post.photo_url}
                alt={post.caption || "Post"}
              />
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <i className="ri-image-line text-3xl text-[#B7A98A]"></i>
            <p className="text-[#2A2A28] font-medium text-sm">No posts yet</p>
            <p className="text-[#8C8479] text-xs">
              Photos you share will show up here.
            </p>
          </div>
        )}
      </div>

      <BottomNav />

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onUpdate={handleProfileUpdate}
      />
    </main>
  );
};

export default ProfileDetails;
