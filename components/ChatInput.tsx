"use client";
import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { useMessage } from "@/lib/store/messages";

export default function ChatInput() {
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state: any) => state.addMessage);
  const setOptimisticIds = useMessage((state: any) => state.setOptimisticIds);

  const supabase = supabaseBrowser();

  const handleSendMessage = async (text: string) => {
    if (text.trim() === "") {
      return;
    }

    const newMessage = {
      id: uuidv4(),
      text,
      send_by: user?.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      users: {
        id: user?.id,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
        display_name: user?.user_metadata.user_name,
      },
    };

    addMessage(newMessage);
    setOptimisticIds(newMessage.id);

    // @ts-ignore
    const { error } = await supabase.from("messages").insert({ text });

    if (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-5">
      <Input
        placeholder="send message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
