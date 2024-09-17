import React from "react";

export default function ChatAbout() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="text-3xl font-bold">Welcome to Dev Chat</h1>
        <p className="w-96">
          This is a chat application built with Next.js, Supabase and Tailwind
        </p>
      </div>
    </div>
  );
}
