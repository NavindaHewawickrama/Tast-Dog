"use client";

import { motion } from "framer-motion";
import dropIn from "@/utils/motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
