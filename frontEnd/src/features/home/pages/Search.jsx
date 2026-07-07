import React, { useState } from "react";
import NavBar from "./NavBar";
import BottomNav from "./BottomNav";
import { searchUsers } from "../../auth/services/api.auth";
import { followUser, unfollowUser } from "../services/api.follow";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const response = await searchUsers(query.trim());
    if (response.success) {
      setUsers(response.users);
    }
    setLoading(false);
  };

  const toggleFollow = async (userName, isFollowing) => {
    const response = isFollowing
      ? await unfollowUser(userName)
      : await followUser(userName);

    if (response.success) {
      setUsers((prev) =>
        prev.map((user) =>
          user.userName === userName
            ? { ...user, isFollowing: response.isFollowing }
            : user,
        ),
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 md:pl-64">
      <NavBar />

      <div className="px-4 py-4 md:max-w-[600px] md:mx-auto md:py-8">
        <h2 className="text-sm font-medium text-[#2A2A28] mb-3 md:text-lg">
          Search users
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            className="flex-1 bg-[#F3EFE4] text-[#2A2A28] placeholder-[#8C8479] rounded-lg px-3 py-2.5 border-none outline-none text-sm focus:ring-2 focus:ring-[#2F4A3C]/30"
            type="text"
            placeholder="Search by username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F4A3C] text-[#FAF9F5] px-4 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            {loading ? "..." : "Search"}
          </button>
        </form>

        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-[#FAF9F5] border border-[#2A2A28]/10 rounded-xl px-3 py-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.profile_pic}
                  alt={user.userName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-[#2A2A28]">
                    {user.userName}
                  </p>
                  {user.bio && (
                    <p className="text-xs text-[#8C8479] truncate max-w-40">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => toggleFollow(user.userName, user.isFollowing)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  user.isFollowing
                    ? "bg-[#E4EBE3] text-[#2F4A3C]"
                    : "bg-[#2F4A3C] text-[#FAF9F5]"
                }`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}

          {!loading && users.length === 0 && query && (
            <p className="text-center text-sm text-[#8C8479] py-8">
              No users found for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default Search;
