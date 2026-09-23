import { useState } from "preact/hooks";
import { AnimatePresence, motion } from "motion/react";
import { BeatingHeart } from "../keyframes";

// DECISION [TRIGGER: RUNTIME_BUG] [ORIGIN: AI_AUTONOMOUS]:
// Fixed broken asset import path pointing to nonexistent parent folder.
import arrowDown from "../../assets/arrow-down.webp"


export const BeatingHeartTab = () => {
    const [isOn, setOn] = useState(false)

    return <div className={"flex flex-col justify-around w-auto h-fit relative"}>
        {
            isOn
                ? <motion.div className="edu-nsw-act-cursive-italics text-rose-300 text-4xl">shouldn't have!</motion.div>
                : <motion.div className="edu-nsw-act-cursive-italics text-neutral-300 text-4xl mr-5">Touch!</motion.div>
        }
        <div className="flex justify-center-safe">
            <AnimatePresence>
                <motion.img 
                    className="filter invert brightness-90"
                    animate={{ opacity: isOn ? 0 : 0.85 }} 
                    src={arrowDown} 
                    width={70} 
                    alt="arrow pointing to heart" 
                />
            </AnimatePresence>
        </div>
        <BeatingHeart isOn={isOn} toggleOn={() => { setOn(s => !s) }} />
    </div>
}
