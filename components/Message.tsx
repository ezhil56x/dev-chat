"use client";
import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";
import { DeleteAlert } from "./MessageAction";
import { useMessage } from "@/lib/store/messages";

export default function Message({ index, message }: any) {
  const user = useUser((state) => state.user);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4" key={index}>
      <div>
        <Image
          src={message.users.avatar_url}
          width={40}
          height={40}
          alt={message.users.display_name}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-bold">{message.users.display_name}</h1>
            <h1 className="text-sm text-gray-400">
              {new Date(message.created_at).toDateString()}
            </h1>
          </div>
          {user?.id === message.users.id && <MessageMenu message={message} />}
        </div>
        <p className="text-gray-300">{message.text}</p>
      </div>
    </div>
  );
}

const MessageMenu = ({ message }: any) => {
  const [isDeleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const setActionMessage = useMessage((state: any) => state.setActionMessage);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              /* Add edit logic here */
            }}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setDeleteAlertOpen(true)}
            onClick={() => setActionMessage(message)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onOpenChange={setDeleteAlertOpen}
      />
    </>
  );
};
