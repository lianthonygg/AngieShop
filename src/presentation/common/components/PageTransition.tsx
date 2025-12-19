import { AnimatePresence, motion } from "framer-motion";
import { transitionVariantPage } from "../utils/transitions";

export function PageTransition() {
  return (
    <AnimatePresence mode="wait">
      <section>
        <motion.section
          className="fixed top-0 bottom-0 right-full w-screen z-50 bg-[#004CFF]"
          variants={transitionVariantPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
        ></motion.section>
      </section>
    </AnimatePresence>
  );
}
