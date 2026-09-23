import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "preact/hooks"


export const DirectionalExit = () => {
    const [square, setSquare] = useState<{ visible: boolean; dir: "up" | "down"; }>({
        visible: true, dir: "down"
    })

    const [locked, setLocked] = useState(false);
    // locked is used to throttle the exit animation

    const exit = (dir: "up" | "down") => {
        if (locked) return;
        setLocked(true);
        // AnimatePresence only captures exit data from the last render where the component was still mounted
        // The render where dir changes is the same render that removes the component. 
        // Therefor, that render or its custom state is not used for exit.
        // ❌❌ setSquare({ visible: false, dir }) ❌❌

        // commiting intent before exit
        setSquare(s => ({ ...s, dir }));
        // to avoid React batching the two state updates, 
        // we can use requestAnimationFrame
        requestAnimationFrame(() => {
            setSquare(s => ({ ...s, visible: !s.visible }))
        })
    }

    return <>
        <div className="h-20">
            <AnimatePresence mode="wait" >
                {square.visible && <ThrowSquare animationComplete={()=>setLocked(false)} direction={square.dir} />}
            </AnimatePresence>
        </div>
        {/* DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
         * Refined DirectionalExit square to rounded-xl with subtle shadow and styled arrow buttons with Apple-style tactile states.
         */}
        <div id="controls" className="flex items-center gap-2 mt-4">
            <button
                type="button"
                title="Exit throw downwards"
                disabled={locked}
                onClick={() => exit("down")}
                className="p-2 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-200 border border-neutral-800 shadow-sm transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
                <ArrowBigDown className="size-4" />
            </button>
            <button
                type="button"
                title="Exit throw upwards"
                disabled={locked}
                onClick={() => exit("up")}
                className="p-2 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-200 border border-neutral-800 shadow-sm transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
            >
                <ArrowBigUp className="size-4" />
            </button>
        </div>
    </>
}


const throwVariants = {
    shown: {
        y: 0,
        opacity: 1,
    },
    hidden: (dir: "up" | "down") => {
        return {
            y: dir === "up" ? 100 : -100,
            opacity: 0,
        }
    },
    exit: (dir: "up" | "down") => {
        return {
            y: dir === "up" ? -100 : 100,
            opacity: 0,
        }
    }
}
const ThrowSquare = ({ direction, animationComplete }: { direction: "up" | "down" , animationComplete():void}) => {
    return <motion.div
        // onAnimationStart={(def) => console.log("start", def)}
        onAnimationComplete={animationComplete}
        className="size-20 rounded-xl bg-neutral-100 border border-neutral-300 shadow-xl"
        variants={throwVariants} custom={direction}
        initial="hidden" animate="shown" exit="exit"
    />
}





