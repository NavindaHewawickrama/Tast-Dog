"use client";

import { useEffect, useState } from "react";

export default function usePathname() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setPathname(path);
  }, []);

  return pathname;
}
