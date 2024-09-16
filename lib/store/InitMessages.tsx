"use client";

import React, { useEffect, useRef } from "react";
import { useMessage } from "./messages";

export default function InitMessages({ messages }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);

  return <></>;
}
