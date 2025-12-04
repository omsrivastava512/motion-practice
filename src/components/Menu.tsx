import { motion, } from "motion/react"

const ulVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.2 } }
}

const liVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    hover: {scale: 1.5, }
}

const Menu = () => {
    return (
        <motion.ul
            initial="hidden"
            animate="visible"   // visible is propogated to the children
            variants={ulVariants}
            className="list-none px-10 h-100 flex flex-col justify-center items-center bg-[#eeee] text-black font-semibold"
        >
            <motion.li whileHover="hover" variants={liVariants} className="my-1 px-10 "> Home</motion.li>
            <motion.li whileHover="hover" variants={liVariants} className="my-1 px-10 "> About</motion.li>
            <motion.li whileHover="hover" variants={liVariants} className="my-1 px-10 "> Contact</motion.li>
        </motion.ul>
    )
}

export default Menu