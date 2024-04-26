import { Variants } from "framer-motion";

const dropIn = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "easeIn",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
  },
};

export const dropDown = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "easeIn",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default dropIn;
