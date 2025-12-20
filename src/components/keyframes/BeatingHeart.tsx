import {motion, type Variants} from "motion/react"

import heart from "./assets/heart.png"

type BeatingHeartProps = {
    isOn: boolean,
    toggleOn(): void
}
export const BeatingHeart = ({ isOn, toggleOn }: BeatingHeartProps) => {
    return (
        <motion.img
            src={heart}
            width={300}
            variants={heartVariants}
            animate={isOn ? "fast" : "slow"}
            // whileTap="fast"
            onClick={toggleOn}
        />
    )
}

const heartVariants: Variants = {
    fast: { scale: [1, 1.3, 1], transition: { repeat: Infinity, duration: 0.2, repeatType: "reverse" } },
    slow: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.5, repeatType: "reverse" } },
}
