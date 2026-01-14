import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import type { ApiError } from "../types";
import { postHooks } from "./common/usePost";
import { commentHooks } from "./common/useComment";
import { branchService } from "../services/branch.service";

const useCreateBranch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (branchData: {
      name: string;
      description?: string;
      branchType: string;
      allowStudentPosting?: boolean;
      allowComments?: boolean;
    }) => branchService.createBranch(branchData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });

      const branchId = data.data.Branch?._id;
      if (branchId) {
        navigate(`/branches/${branchId}`);
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message || "Failed to create Branch");
    },
  });
};

const useallBranches = () => {
  return useInfiniteQuery({
    queryKey: ["allBranches", "infinite"],
    queryFn: ({ pageParam }) =>
      branchService.getAllBranches(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const usemyBranches = () => {
  return useInfiniteQuery({
    queryKey: ["myBranches", "infinite"],
    queryFn: ({ pageParam }) =>
      branchService.getMyBranches(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useBranchDetails = (branchId: string | undefined) => {
  return useQuery({
    queryKey: ["branchDetails", branchId],
    queryFn: () => branchService.getBranchDetails(branchId as string),
    enabled: !!branchId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};

const useJoinBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (joinCode: string) => branchService.joinBranch(joinCode),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });
      queryClient.invalidateQueries({ queryKey: ["allBranches"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message || "Failed to join Branch");
    },
  });
};

const useLeaveBranch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (branchId: string) => branchService.leaveBranch(branchId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });
      queryClient.invalidateQueries({ queryKey: ["allBranches"] });
      queryClient.invalidateQueries({ queryKey: ["branchDetails"] });
      navigate("/classbranch/my");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message || "Failed to leave Branch");
    },
  });
};

const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (branchId: string) => branchService.deleteBranch(branchId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });
      queryClient.invalidateQueries({ queryKey: ["allBranches"] });
      navigate("/classbranch");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message || "Failed to delete Branch");
    },
  });
};

const useUpdateBranchDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      branchId,
      updateData,
    }: {
      branchId: string;
      updateData: {
        name?: string;
        description?: string;
        branchType?: string;
        settings?: {
          allowStudentPosting?: boolean;
          allowComments?: boolean;
        };
      };
    }) => branchService.updateBranch(branchId, updateData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["branchDetails"] });
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Branch details"
      );
    },
  });
};

const useUpdateBranchCoverImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      branchId,
      coverImage,
    }: {
      branchId: string;
      coverImage: File;
    }) => branchService.updateBranchCoverImage(branchId, coverImage),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["branchDetails"] });
      queryClient.invalidateQueries({ queryKey: ["myBranches"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Branch cover image"
      );
    },
  });
};

// ====================================
// Branch Posts & Members
// ====================================

const useBranchPosts = () => {
  const { branchId } = useParams();
  return useInfiniteQuery({
    queryKey: ["branchPosts", branchId],
    queryFn: ({ pageParam }) =>
      branchService.getBranchPosts(branchId as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!branchId,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

const useBranchMembers = () => {
  const { branchId } = useParams();
  return useInfiniteQuery({
    queryKey: ["branchMembers", branchId],
    queryFn: ({ pageParam }) =>
      branchService.getBranchMembers(branchId as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!branchId,
    staleTime: Infinity,
  });
};

// Branch Post Actions - Using Common Hooks
const useCreateBranchPost = () => {
  const { branchId } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      ["branchPosts", branchId],
      ["branchDetails", branchId],
    ],
  });
};

const useDeleteBranchPost = () => {
  const { branchId } = useParams();
  return postHooks.useDeletePost({
    queryKey: ["branchPosts", branchId],
    invalidateKey: [
      ["branchPosts", branchId],
      ["branchDetails", branchId],
    ],
  });
};

const useUpdateBranchPost = () => {
  const { branchId } = useParams();
  return postHooks.useUpdatePost({
    queryKey: ["branchPosts", branchId],
    invalidateKey: [["branchPosts", branchId]],
  });
};

const useToggleReadStatusBranchPost = () => {
  const { branchId } = useParams();
  return postHooks.useToggleReadStatus({
    queryKey: [["branchPosts", branchId]],
    invalidateKey: [],
  });
};

const useToggleBookmarkBranchPost = () => {
  const { branchId } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: ["branchPosts", branchId],
    invalidateKey: [["branchPosts", branchId]],
  });
};

// Branch Comment Hooks
const useAddBranchComment = ({ postId }: { postId: string }) => {
  const { branchId } = useParams();
  return commentHooks.useAddComment({
    postId,
    invalidateKey: [["branchPosts", branchId]],
  });
};

const useDeleteBranchComment = ({ postId }: { postId: string }) => {
  const { branchId } = useParams();
  return commentHooks.useDeleteComment({
    postId,
    invalidateKey: [["branchPosts", branchId]],
  });
};

const branchHooks = {
  useCreateBranch,
  useallBranches,
  usemyBranches,
  useBranchDetails,
  useJoinBranch,
  useLeaveBranch,
  useDeleteBranch,
  useUpdateBranchDetails,
  useUpdateBranchCoverImage,

  // Posts & Members
  useBranchPosts,
  useBranchMembers,

  // Post Actions
  useCreateBranchPost,
  useDeleteBranchPost,
  useUpdateBranchPost,
  useToggleReadStatusBranchPost,
  useToggleBookmarkBranchPost,

  // Comments
  useAddBranchComment,
  useDeleteBranchComment,
} as const;

export { branchHooks };
