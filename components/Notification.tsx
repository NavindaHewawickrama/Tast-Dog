import React from "react";
import { motion } from "framer-motion";
import { CgNotifications } from "react-icons/cg";
import Link from "next/link";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  message: string;
  link: string;
  linkText: string;
}

// Define motion variants
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Notification: React.FC<NotificationProps> = ({ open, onClose, message, link, linkText }) => {
  if (!open) return null;

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex justify-end z-50 m-1"
      onClick={onClose}
    >
      <div className="w-[540px] h-[75px] flex items-center px-[20px] bg-white shadow-xl gap-10">
        <div className="flex items-center gap-2">
          <CgNotifications className="text-buttonGreen w-[25px] h-[25px]" />
          <p className="text-[15px] text-buttonGreen capitalize">
            {message}
          </p>
        </div>
        <Link
          href={link}
          className="text-[15px] text-button2 capitalize underline"
        >
          {linkText}
        </Link>
      </div>
    </motion.div>
  );
};

export default Notification;
