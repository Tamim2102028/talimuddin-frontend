import type { User } from "./user.types";
import type { Pagination } from "./common.types";

// Branch Types
export type BranchType =
  | "UNIVERSITY"
  | "COLLEGE"
  | "COACHING"
  | "SCHOOL"
  | "GENERAL";

// Branch Settings
export interface BranchSettings {
  allowStudentPosting: boolean;
  allowComments: boolean;
}

// Branch (full object from backend)
export interface Branch {
  _id: string;
  name: string;
  description?: string;
  coverImage: string;
  branchType: BranchType;
  joinCode: string;
  creator: User;
  membersCount: number;
  postsCount: number;
  isArchived: boolean;
  isDeleted: boolean;
  settings: BranchSettings;
  createdAt: string;
  updatedAt: string;
}

// Branch in list (getMyBranches response) - includes isCR from membership
export interface BranchListItem {
  _id: string;
  name: string;
  description?: string;
  coverImage: string;
  branchType: BranchType;
  creator: User;
  membersCount: number;
  postsCount: number;
  joinCode: string;
  isCR: boolean; // From membership
  isArchived: boolean;
  createdAt: string;
}

// Branch Meta (from getBranchDetails)
export interface BranchMeta {
  isMember: boolean;
  isTeacher: boolean;
  isCreator: boolean;
  isAdmin: boolean;
  isCR: boolean;
  isHidden: boolean;
  joinCode: string | null;
}

// API Response Types
export interface BranchDetailsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    Branch: Branch;
    meta: BranchMeta;
  };
}

export interface MyBranchesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    branches: BranchListItem[];
    pagination: Pagination;
  };
}

export interface CreateBranchResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    Branch: Branch;
    meta: {
      isMember: boolean;
      isCreator: boolean;
      joinCode: string;
    };
  };
}

export interface JoinBranchResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    branchId: string;
    branchName: string;
  };
}
