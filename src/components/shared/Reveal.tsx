import type { ReactNode } from "react";
import { motion } from "framer-motion";

const Reveal = ({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
