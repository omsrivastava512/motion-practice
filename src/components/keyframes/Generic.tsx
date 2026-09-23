import {  motion } from "motion/react";


// Ref: [ADR-COMP-04] Sculpted material WiggleBox and Apple-style tactile ScaleButton.
export const WiggleBox = () => {
    return (
        <motion.div
            className="size-20 rounded-xl bg-neutral-800 border border-neutral-700/80 shadow-lg cursor-pointer flex items-center justify-center text-xs font-mono text-neutral-400"
            whileHover={{ x: [0, -10, 10, -10, 10, 0], transition: { duration: .4 } }}
        >
            <span className="select-none">Wiggle</span>
        </motion.div>
    )
}

export const ScaleButton = () => (
    <motion.button
        className="px-4 py-2 rounded-md bg-neutral-100 hover:bg-white text-neutral-900 text-xs font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ times: [0, 0.2, 1], duration: 0.5 }}
    // 0% start, 20% reach big scale, 100% back to normal like @keyframes
    >
        Click
    </motion.button>
)
