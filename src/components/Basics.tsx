import { motion } from "motion/react"

// Ref: [ADR-COMP-04] Optical typography tracking and damped spring card feedback.
export const HeadingAppearFromBotton = () => <motion.h1
  className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-neutral-100 m-0"
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 2, type: "spring" }}
>
  Introducing...
</motion.h1>


export const SelectorCard = () => <motion.div
  className="size-40 rounded-xl bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 border border-neutral-700/80 shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center text-xs font-mono text-neutral-500"
  whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0px 10px 30px rgba(0,0,0,0.6)" }}
  whileTap={{ scale: .95 }}
  transition={{ type: "spring", stiffness: 300, damping: 15 }}
>
  <span className="select-none">Card</span>
</motion.div>
