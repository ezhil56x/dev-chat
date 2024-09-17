"use client";

import React, { useEffect, useRef } from "react";
import { useMessage } from "./messages";
import { LIMIT_MESSGAGES } from "../constant";

export default function InitMessages({ messages }: any) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSGAGES;

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);

  return <></>;
}
