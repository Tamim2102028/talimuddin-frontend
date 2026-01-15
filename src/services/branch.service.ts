import api from "../lib/axios";
import { BRANCH_LIMIT, MEMBERS_LIMIT, POST_LIMIT } from "../constants";
import type {
  CreateBranchResponse,
  MyBranchesResponse,
  BranchDetailsResponse,
  JoinBranchResponse,
} from "../types";

export const branchService = {
  // Create Branch (Teachers only)
  createBranch: async (branchData: {
    name: string;
    description?: string;
    branchType: string;
    allowStudentPosting?: boolean;
    allowComments?: boolean;
  }): Promise<CreateBranchResponse> => {
    const response = await api.post<CreateBranchResponse>(
      "/branches",
      branchData
    );
    return response.data;
  },

  // Get All Branches
  getAllBranches: async (page = 1): Promise<MyBranchesResponse> => {
    const limit = BRANCH_LIMIT;
    const response = await api.get<MyBranchesResponse>("/branches/all", {
      params: { page, limit },
    });
    return response.data;
  },

  // Get My Branches
  getMyBranches: async (page = 1): Promise<MyBranchesResponse> => {
    const limit = BRANCH_LIMIT;
    const response = await api.get<MyBranchesResponse>("/branches/my", {
      params: { page, limit },
    });
    return response.data;
  },

  // Get Branch Details
  getBranchDetails: async (
    branchId: string
  ): Promise<BranchDetailsResponse> => {
    const response = await api.get<BranchDetailsResponse>(
      `/branches/${branchId}`
    );
    return response.data;
  },

  // Join Branch (by join code only)
  joinBranch: async (joinCode: string): Promise<JoinBranchResponse> => {
    const response = await api.post<JoinBranchResponse>("/branches/join", {
      joinCode,
    });
    return response.data;
  },

  // Leave Branch
  leaveBranch: async (branchId: string) => {
    const response = await api.post(`/branches/${branchId}/leave`);
    return response.data;
  },

  // Delete Branch (Owner only)
  deleteBranch: async (branchId: string) => {
    const response = await api.delete(`/branches/${branchId}`);
    return response.data;
  },

  // Get Pending Join Requests (Owner, Admin, Teacher members)
  getPendingJoinRequests: async (branchId: string, page = 1) => {
    const response = await api.get(`/branches/${branchId}/requests/pending`, {
      params: { page, limit: 20 },
    });
    return response.data;
  },

  // Accept Join Request
  acceptJoinRequest: async (branchId: string, requestId: string) => {
    const response = await api.post(
      `/branches/${branchId}/requests/${requestId}/accept`
    );
    return response.data;
  },

  // Reject Join Request
  rejectJoinRequest: async (branchId: string, requestId: string) => {
    const response = await api.post(
      `/branches/${branchId}/requests/${requestId}/reject`
    );
    return response.data;
  },

  // Update Branch (Creator or Admin)
  updateBranch: async (
    branchId: string,
    updateData: {
      name?: string;
      description?: string;
      branchType?: string;
      settings?: {
        allowStudentPosting?: boolean;
        allowComments?: boolean;
      };
    }
  ) => {
    const response = await api.patch(`/branches/${branchId}`, updateData);
    return response.data;
  },

  // Update Branch Cover Image (Creator or Admin)
  updateBranchCoverImage: async (branchId: string, coverImage: File) => {
    const formData = new FormData();
    formData.append("coverImage", coverImage);
    const response = await api.patch(
      `/branches/${branchId}/cover-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Get Branch Posts
  getBranchPosts: async (branchId: string, page = 1) => {
    const limit = POST_LIMIT;
    const response = await api.get(`/branches/${branchId}/posts`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Get Branch Members
  getBranchMembers: async (branchId: string, page = 1) => {
    const limit = MEMBERS_LIMIT;
    const response = await api.get(`/branches/${branchId}/members`, {
      params: { page, limit },
    });
    return response.data;
  },
};
