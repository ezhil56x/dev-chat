import React, { Suspense } from "react";
import ListMessages from "./ListMessages";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";

export default async function ChatMessages() {
  const supabase = supabaseServer();

  // filter by created_at
  const { data } = await supabase
    .from("messages")
    .select("*,users(*)")
    .order("created_at", { ascending: true });

  return (
    <Suspense fallback={"loading..."}>
      <ListMessages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
