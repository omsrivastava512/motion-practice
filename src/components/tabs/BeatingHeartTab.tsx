import { useState } from "preact/hooks";
import { AnimatePresence, motion } from "motion/react";
import { BeatingHeart } from "../keyframes";

import arrowDown from "../assets/arrow-down.webp"


export const BeatingHeartTab = () => {
    const [isOn, setOn] = useState(false)

    return <div className={"flex flex-col justify-around w-auto h-fit relative"}>
        {
            isOn
                ? <motion.div className="edu-nsw-act-cursive-italics text-white text-4xl  ">shouldn't have!</motion.div>
                : <motion.div className="edu-nsw-act-cursive-italics text-black text-4xl mr-5 ">Touch!</motion.div>
        }
        <div className="flex justify-center-safe" >
            <AnimatePresence>
                <motion.img animate={{ opacity: isOn ? 0 : 1, }} src={arrowDown} width={70} alt="heard" />
            </AnimatePresence>
        </div>
        <BeatingHeart isOn={isOn} toggleOn={() => { setOn(s => !s) }} />
    </div>
}
