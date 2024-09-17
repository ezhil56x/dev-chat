"use client";
import { useEffect } from "react";
import { useUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/lib/supabase/browser";
import React from "react";

export default function ChatPresence() {
  const user = useUser((state: any) => state.user);
  const supabase = supabaseBrowser();
  const [onineUsers, setOnlineUsers] = React.useState(0);

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers(Array.from(new Set(userIds)).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
    // eslint-disable-next-line
  }, [user]);

  if (!user) {
    return <div className="h-3 w-1"></div>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      <h1 className="text-sm text-gray-400">{onineUsers} online</h1>
    </div>
  );
}
