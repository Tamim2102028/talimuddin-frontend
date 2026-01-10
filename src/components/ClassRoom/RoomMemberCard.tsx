import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MessageButton,
  UnfriendButton,
  AcceptButton,
  RejectButton,
  AddFriendButton,
  CancelRequestButton,
  UnblockButton,
} from "../shared/friends/FriendActions";
import { friendshipHooks } from "../../hooks/useFriendship";
import confirm from "../../utils/sweetAlert";

interface RoomMemberItem {
  user: {
    _id: string;
    fullName: string;
    userName: string;
    avatar: string;
    institution?: {
      name: string;
    };
  };
  meta: {
    memberId: string;
    role: string;
    isSelf: boolean;
    isFriend: boolean;
    hasPendingRequest: boolean;
    isSentRequest: boolean;
    isBlockedByMe: boolean;
    isBlockedByThem: boolean;
    isCR: boolean;
    isAdmin: boolean;
    isCreator: boolean;
  };
}

interface RoomMemberCardProps {
  member: RoomMemberItem;
  currentUserRole: string | null;
}

const RoomMemberCard: React.FC<RoomMemberCardProps> = ({ member }) => {
  const navigate = useNavigate();
  const { user, meta } = member;

  // Friendship mutations
  const { mutate: acceptRequest } = friendshipHooks.useAcceptFriendRequest();
  const { mutate: rejectRequest } = friendshipHooks.useRejectFriendRequest();
  const { mutate: sendRequest } = friendshipHooks.useSendFriendRequest();
  const { mutate: cancelRequest } = friendshipHooks.useCancelFriendRequest();
  const { mutate: unfriend } = friendshipHooks.useUnfriendUser();
  const { mutate: unblock } = friendshipHooks.useUnblockUser();

  // Friendship action handlers
  const handleMessage = () => {
    navigate("/messages");
  };

  const handleAccept = () => {
    acceptRequest({ requesterId: user._id });
  };

  const handleDecline = () => {
    rejectRequest({ requesterId: user._id });
  };

  const handleAddFriend = () => {
    sendRequest({ userId: user._id });
  };

  const handleCancelRequest = () => {
    cancelRequest({ recipientId: user._id });
  };

  const handleUnfriend = async () => {
    const ok = await confirm({
      title: "Are you sure?",
      text: "You will remove this friend.",
      confirmButtonText: "Yes, unfriend",
      icon: "warning",
    });
    if (ok) {
      unfriend({ friendId: user._id });
    }
  };

  const handleUnblock = () => {
    unblock({ userId: user._id });
  };

  // Render friendship action buttons
  const renderActions = () => {
    if (meta.isSelf) return null;
    if (meta.isBlockedByThem) return null;

    if (meta.isBlockedByMe) {
      return <UnblockButton onClick={handleUnblock} />;
    }

    if (meta.isFriend) {
      return (
        <div className="flex items-center space-x-2">
          <MessageButton onClick={handleMessage} />
          <UnfriendButton onClick={handleUnfriend} />
        </div>
      );
    }

    if (meta.hasPendingRequest) {
      return (
        <div className="flex space-x-2">
          <AcceptButton onClick={handleAccept} />
          <RejectButton onClick={handleDecline} />
        </div>
      );
    }

    if (meta.isSentRequest) {
      return <CancelRequestButton onClick={handleCancelRequest} />;
    }

    return <AddFriendButton onClick={handleAddFriend} />;
  };

  const institutionName = user.institution?.name || "No Institution";

  // Role badge
  const getRoleBadge = () => {
    if (meta.isCreator) {
      return (
        <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
          Creator
        </span>
      );
    }
    if (meta.isAdmin) {
      return (
        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
          Admin
        </span>
      );
    }
    if (meta.isCR) {
      return (
        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
          CR
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex items-center space-x-3 rounded-lg border p-2 shadow-sm ${
        meta.isSelf ? "border-blue-200 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <NavLink to={`/profile/${user.userName}`}>
        <img
          src={user.avatar}
          alt={user.fullName}
          className="h-10 w-10 rounded-full object-cover transition-opacity hover:opacity-80"
        />
      </NavLink>
      <div className="flex-1">
        <h3 className="flex items-center">
          <NavLink
            to={`/profile/${user.userName}`}
            className="font-medium text-gray-800 transition-colors hover:text-blue-600 hover:underline"
          >
            {user.fullName}
          </NavLink>
          {getRoleBadge()}
        </h3>
        <p className="text-sm font-medium text-gray-500">{institutionName}</p>
      </div>
      <div className="flex items-center gap-2">{renderActions()}</div>
    </div>
  );
};

export default RoomMemberCard;
