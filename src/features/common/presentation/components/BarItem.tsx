"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

type BarItemProps = {
  title: string;
  icon: LucideIcon;
  tag: string;
  pathname: string;
};

function BarItem({ title, icon: Icon, tag, pathname }: BarItemProps) {
  const router = useRouter();
  const isActive = pathname === `/${tag}`;

  return (
    <button
      onClick={() => router.push(`/${tag}`)}
      className="flex-1 flex justify-center"
    >
      <motion.div
        layout
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors
          ${isActive ? "bg-angie-pink" : "bg-transparent"}
        `}
      >
        <Icon
          className={`w-6 h-6 transition-colors
            ${isActive ? "text-white" : "text-gray-400"}
          `}
          strokeWidth={2}
        />

        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ width: 0, opacity: 0, x: -8 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden text-sm font-semibold text-white whitespace-nowrap"
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

export default BarItem;
