import { AnimatePresence, motion, type Variants } from "motion/react";

import heart from "./assets/heart.png"
import arrowDown from "./assets/arrow-down.webp"
import { useState } from "preact/hooks";

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
            animate={isOn ? "hover" : "visible"}
            // whileTap="hover"
            onClick={onClick}
        />
    )
}

const heartVariants: Variants = {
    hover: { scale: [1, 1.3, 1], transition: { repeat: Infinity, duration: 0.25, repeatType: "reverse" } },
    visible: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.5, repeatType: "reverse" } },
}

export const PresentHeartBeat = () => {
    const [isOn, setOn] = useState(false)

    return <div className={"flex flex-col justify-around w-auto h-fit relative"}>
        {
            isOn
                ? <motion.div  className="edu-nsw-act-cursive-italics text-black text-4xl  ">shouldn't have!</motion.div>
                : <motion.div  className="edu-nsw-act-cursive-italics text-black text-4xl mr-5 ">Touch!</motion.div>
        }
        <div className="flex justify-center-safe" >
            <AnimatePresence>
                <motion.img animate={{opacity: isOn?0:1,}} src={arrowDown} width={70} alt="heard" />
            </AnimatePresence>
        </div>
        <BeatingHeart isOn={isOn} onClick={() => { setOn(s => !s) }} />
    </div>
}