import React, { useState, useRef, useEffect } from "react";
import {
  FaEllipsisH,
  FaEdit,
  FaArchive,
  FaTrash,
  FaEyeSlash,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Room, RoomMeta } from "../../../types";
import { roomHooks } from "../../../hooks/useRoom";
import confirm from "../../../utils/sweetAlert";
import RoomDetailsNavBar from "./RoomDetailsNavBar";

interface RoomHeaderProps {
  room: Room;
  meta: RoomMeta;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ room, meta }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: toggleArchive, isPending: isArchiving } =
    roomHooks.useToggleArchiveRoom();
  const { mutate: deleteRoom, isPending: isDeleting } =
    roomHooks.useDeleteRoom();
  const { mutate: hideRoom, isPending: isHiding } = roomHooks.useHideRoom();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyJoinCode = async () => {
    if (meta.joinCode) {
      try {
        await navigator.clipboard.writeText(meta.joinCode);
        toast.success("Join code copied to clipboard");
      } catch (error) {
        toast.error(`Failed to copy join code: ${error}`);
      }
      setShowMenu(false);
    }
  };

  const handleToggleArchive = async () => {
    setShowMenu(false);
    const ok = await confirm({
      title: room.isArchived ? "Unarchive Room?" : "Archive Room?",
      text: room.isArchived
        ? "Are you sure you want to unarchive this room?"
        : "Are you sure you want to archive this room? Members won't be able to post.",
      confirmButtonText: room.isArchived ? "Yes, unarchive" : "Yes, archive",
    });

    if (ok) {
      toggleArchive(room._id);
    }
  };

  const handleDelete = async () => {
    setShowMenu(false);
    const ok = await confirm({
      title: "Delete Room?",
      text: "Are you sure you want to delete this room? This action cannot be undone.",
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#d33",
      isDanger: true,
    });

    if (ok) {
      deleteRoom(room._id);
    }
  };

  const handleHide = async () => {
    setShowMenu(false);
    const ok = await confirm({
      title: meta.isHidden ? "Unhide Room?" : "Hide Room?",
      text: meta.isHidden
        ? "This room will be shown in your main room list again."
        : "This room will be hidden from your room list. You can unhide it later.",
      confirmButtonText: meta.isHidden ? "Yes, unhide" : "Yes, hide",
    });

    if (ok) {
      hideRoom(room._id);
    }
  };

  return (
    <div className="relative">
      <img
        src={room.coverImage}
        alt={room.name}
        className="h-64 w-full object-cover"
      />

      <div className="mx-auto max-w-5xl px-4">
        <div className="relative -mt-20">
          <div className="rounded-2xl bg-white px-5 pt-5 shadow-lg">
            <div className="flex flex-col items-start gap-6">
              <div className="w-full flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Name & Badge */}
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {room.name}
                      </h1>
                      {meta.isHidden && (
                        <span className="rounded-full bg-purple-100 px-3 py-1.5 text-sm font-semibold text-purple-700">
                          Hidden
                        </span>
                      )}
                      {room.isArchived && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-semibold text-yellow-700">
                          Archived
                        </span>
                      )}
                    </div>

                    {/* member and post count */}
                    <p className="mt-1 text-gray-600">
                      {room.membersCount === 1 ? "Member" : "Members"} (
                      {room.membersCount.toLocaleString()}) {" - "}
                      {room.postsCount === 1 ? "Post" : "Posts"} (
                      {room.postsCount.toLocaleString()})
                    </p>
                  </div>

                  {/* Go Live Button, Join Code, and 3-dot menu */}
                  <div className="flex items-center gap-2">
                    {(meta.isCreator || meta.isAdmin) && (
                      <Link
                        to={`/classroom/rooms/${room._id}/live`}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        <FaVideo className="h-4 w-4" />
                        <span>Go Live</span>
                      </Link>
                    )}

                    {/* Join Code Display */}
                    {meta.joinCode && (
                      <button
                        onClick={handleCopyJoinCode}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                        title="Click to copy join code"
                      >
                        <span className="font-mono text-sm font-semibold text-gray-700">
                          {meta.joinCode}
                        </span>
                      </button>
                    )}

                    <div
                      className="relative rounded-lg border border-gray-300"
                      ref={menuRef}
                    >
                      <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200"
                        title="More actions"
                      >
                        <FaEllipsisH className="h-5 w-5" />
                      </button>

                      {showMenu && (
                        <div className="absolute top-full right-0 z-50 mt-1 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                          <div className="py-1">
                            {!meta.isCreator &&
                              !meta.isAdmin &&
                              meta.isMember && (
                                <button
                                  onClick={handleHide}
                                  disabled={isHiding}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <FaEyeSlash className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium">
                                    {isHiding
                                      ? "Processing..."
                                      : meta.isHidden
                                        ? "Unhide Room"
                                        : "Hide Room"}
                                  </span>
                                </button>
                              )}

                            {(meta.isCreator || meta.isAdmin) && (
                              <>
                                <Link
                                  to={`/classroom/rooms/${room._id}/edit`}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                  onClick={() => setShowMenu(false)}
                                >
                                  <FaEdit className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium">Edit Room</span>
                                </Link>

                                <button
                                  onClick={handleToggleArchive}
                                  disabled={isArchiving}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <FaArchive className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium">
                                    {isArchiving
                                      ? "Processing..."
                                      : room.isArchived
                                        ? "Unarchive Room"
                                        : "Archive Room"}
                                  </span>
                                </button>
                              </>
                            )}

                            {meta.isCreator && (
                              <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <FaTrash className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium">
                                  {isDeleting ? "Deleting..." : "Delete Room"}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {room.description && (
                  <p className="mt-4 text-gray-700">{room.description}</p>
                )}
                <RoomDetailsNavBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
