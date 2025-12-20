import { motion } from "motion/react"

export const HeadingAppearFromBotton = () => <motion.h1
  className="text-neutral-400 h-100 w-100 rounded"
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 2, type: "spring" }}
>
  Introducing...
</motion.h1>


export const SelectorCard = () => <motion.div
  className="h-100 bg-neutral-300 w-100"
  whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
  whileTap={{ scale: .95 }}
  transition={{ type: "spring", stiffness: 300, damping: 15 }}
>
</motion.div>
