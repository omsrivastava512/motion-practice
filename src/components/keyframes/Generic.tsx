import {  motion } from "motion/react";


export const WiggleBox = () => {
    return (
        <motion.div
            className="h-20 w-20 bg-neutral-400"
            whileHover={{ x: [0, -10, 10, -10, 10, 0], transition: { duration: .4 } }}
        >
        </motion.div>
    )
}

export const ScaleButton = () => (
    <motion.button
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ times: [0, 0.2, 1], duration: 0.5 }}
    // 0% start, 20% reach big scale, 100% back to normal like @keyframes
    >
        Click
    </motion.button>
)
