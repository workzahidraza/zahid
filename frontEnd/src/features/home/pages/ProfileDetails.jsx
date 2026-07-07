import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import { AuthContext } from "../../auth/context/authContext";
import { getMe } from "../../auth/services/api.auth";
import { getUserPosts } from "../../post/services/api.post";

const ProfileDetails = () => {
  const { user: contextUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen bg-[#FAF9F5]">
      <NavBar />

      <div className="profile-container pb-20">
        <div className="profile_details w-full flex flex-col items-center justify-center gap-4 px-5 py-8">
          <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-[#C97B4A]">
            <img
              className="h-full w-full object-cover"
              src={profile?.profile_pic}
              alt="Profile"
            />
          </div>

          <div className="text-center">
            <h1
              className="text-xl font-semibold text-[#2A2A28]"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              {profile?.userName}
            </h1>
            <p className="text-[#8C8479] text-sm">@{profile?.userName}</p>
            {profile?.bio && (
              <p className="text-[#2A2A28] text-sm mt-2">{profile.bio}</p>
            )}
          </div>

          <div className="w-full flex justify-evenly">
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">
                {profile?.postCount ?? 0}
              </h2>
              <p className="text-[#8C8479] text-xs">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">
                {profile?.followersCount ?? 0}
              </h2>
              <p className="text-[#8C8479] text-xs">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[#2A2A28] text-lg font-medium">
                {profile?.followingCount ?? 0}
              </h2>
              <p className="text-[#8C8479] text-xs">Following</p>
            </div>
          </div>
        </div>

        <div className="posts grid grid-cols-3 gap-0.5 px-0.5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square overflow-hidden bg-[#EDE6D8]"
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
    </main>
  );
};

export default ProfileDetails;
