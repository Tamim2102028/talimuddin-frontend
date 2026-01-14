import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaFileAlt,
  FaInfoCircle,
  FaChartBar,
  FaGraduationCap,
} from "react-icons/fa";
import type { Branch } from "../../../types/Branch.types";

interface BranchAboutProps {
  Branch: Branch;
}

const BranchAbout: React.FC<BranchAboutProps> = ({ Branch }) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBranchTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      UNIVERSITY: "University",
      COLLEGE: "College",
      COACHING: "Coaching",
      SCHOOL: "School",
      GENERAL: "General",
    };
    return labels[type] || type;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <FaInfoCircle className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branch Details</h1>
          <p className="text-gray-500">Learn more about this Branch</p>
        </div>
      </div>

      {/* Description Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaFileAlt className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">About</h2>
        </div>
        <p className="leading-relaxed text-gray-700">
          {Branch.description || "No description provided for this Branch."}
        </p>
      </div>

      {/* Branch Type Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaGraduationCap className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Branch Type</h2>
        </div>
        <div className="flex items-start gap-4 rounded-lg bg-blue-50 p-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-blue-600">
            <FaGraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">
              {getBranchTypeLabel(Branch.branchType)}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This Branch is configured for{" "}
              {getBranchTypeLabel(Branch.branchType).toLowerCase()} level
              learning
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaChartBar className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
              <FaUsers className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Branch.membersCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <FaFileAlt className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Branch.postsCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaInfoCircle className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Branch Settings
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Student Posting</p>
              <p className="text-sm text-gray-600">
                {Branch.settings.allowStudentPosting
                  ? "Students can create posts"
                  : "Only teachers and admins can post"}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                Branch.settings.allowStudentPosting
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {Branch.settings.allowStudentPosting ? "✓" : "✕"}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Comments</p>
              <p className="text-sm text-gray-600">
                {Branch.settings.allowComments
                  ? "Members can comment on posts"
                  : "Comments are disabled"}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                Branch.settings.allowComments
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {Branch.settings.allowComments ? "✓" : "✕"}
            </div>
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaCalendarAlt className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
            <FaCalendarAlt className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Branch Created</p>
            <p className="text-sm text-gray-600">
              {formatDate(Branch.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchAbout;
