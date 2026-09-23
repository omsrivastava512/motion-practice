import { motion, } from "motion/react"

const ulVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.2 } }
}

// Ref: [ADR-COMP-01] [ADR-COMP-04] Translucent menu with staggered variant propagation and tempered hover scale.
const liVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.15 }
}

const Menu = () => {
    return (
        <motion.ul
            initial="hidden"
            animate="visible"   // visible is propogated to the children
            variants={ulVariants}
            className="list-none p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-2xl flex flex-col justify-center items-center min-w-[220px] gap-2 select-none"
        >
            <motion.li whileHover="hover" variants={liVariants} className="px-6 py-2 rounded-lg bg-neutral-800/80 text-neutral-200 text-sm font-medium w-full text-center border border-neutral-700/50 cursor-pointer">Home</motion.li>
            <motion.li whileHover="hover" variants={liVariants} className="px-6 py-2 rounded-lg bg-neutral-800/80 text-neutral-200 text-sm font-medium w-full text-center border border-neutral-700/50 cursor-pointer">About</motion.li>
            <motion.li whileHover="hover" variants={liVariants} className="px-6 py-2 rounded-lg bg-neutral-800/80 text-neutral-200 text-sm font-medium w-full text-center border border-neutral-700/50 cursor-pointer">Contact</motion.li>
        </motion.ul>
    )
}

export default Menu