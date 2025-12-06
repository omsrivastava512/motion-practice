import {  motion, type Variants } from "motion/react";

import heart from "./assets/heart.png"

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

type BeatingHeartProps = {
    isOn: boolean,
    onClick(): void
}
export const BeatingHeart = ({ isOn, onClick }: BeatingHeartProps) => {
    return (
        <motion.img
            src={heart}
            width={300}
            variants={heartVariants}
            animate={isOn ? "fast" : "slow"}
            // whileTap="fast"
            onClick={onClick}
        />
    )
}

const heartVariants: Variants = {
    fast: { scale: [1, 1.3, 1], transition: { repeat: Infinity, duration: 0.2, repeatType: "reverse" } },
    slow: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.5, repeatType: "reverse" } },
}
