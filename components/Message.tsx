import Image from "next/image";
import React from "react";

export default function Message({ index, message }: any) {
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
        <div className="flex items-center gap-2">
          <h1 className="font-bold">{message.users.display_name}</h1>
          <h1 className="text-sm text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className="text-gray-300">{message.text}</p>
      </div>
    </div>
  );
}
