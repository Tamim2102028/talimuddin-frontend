import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaBuilding } from "react-icons/fa";
import { profileHooks } from "../../hooks/useProfile";
import PageLoader from "../Fallbacks/PageLoader";

const ProfileDetails: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = profileHooks.useProfileDetails();
  const user = data?.user;

  if (isLoading) return <PageLoader />;

  if (error || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">User Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex gap-4 rounded-2xl border-2 border-gray-300 bg-white p-4 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-200"
        >
          <FaArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
          <p className="text-sm font-semibold text-gray-600">Profile Details</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Identity */}
        <div className="rounded-2xl border-2 border-gray-300 bg-white p-5 shadow-md">
          <h3 className="mb-4 flex items-center gap-3 text-base font-bold text-gray-800">
            <FaUser className="text-lg text-blue-600" /> Identity
          </h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">Full Name</span>
              {user.fullName ? (
                <span className="font-semibold text-gray-900">
                  {user.fullName}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">Username</span>
              {user.userName ? (
                <span className="font-semibold text-gray-900">
                  @{user.userName}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">Email</span>
              {user.email ? (
                <span className="font-semibold text-gray-900">
                  {user.email}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">Phone</span>
              {user.phoneNumber ? (
                <span className="font-semibold text-gray-900">
                  {user.phoneNumber}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">Gender</span>
              {user.gender ? (
                <span className="font-semibold text-gray-900">
                  {user.gender}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-600">Religion</span>
              {user.religion ? (
                <span className="font-semibold text-gray-900">
                  {user.religion}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-2xl border-2 border-gray-300 bg-white p-5 shadow-md">
          <h3 className="mb-4 flex items-center gap-3 text-base font-bold text-gray-800">
            <FaUser className="text-lg text-blue-600" /> Bio
          </h3>
          {user.bio ? (
            <p className="text-base font-medium text-gray-700">{user.bio}</p>
          ) : (
            <p className="inline-block rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
              Not added
            </p>
          )}
        </div>

        {/* Institution */}
        <div className="rounded-2xl border-2 border-gray-300 bg-white p-5 shadow-md">
          <h3 className="mb-4 flex items-center gap-3 text-base font-bold text-gray-800">
            <FaBuilding className="text-lg text-blue-600" /> Institution
          </h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium text-gray-600">User Type</span>
              {user.userType ? (
                <span className="font-semibold text-gray-900">
                  {user.userType}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  Not added
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
