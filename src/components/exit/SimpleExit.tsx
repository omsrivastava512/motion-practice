import {useState} from "preact/hooks";
import {motion, AnimatePresence} from "motion/react"

export const SimpleExit = () => {
    const [show, setShow] = useState(true)
    const toggleShow = () => { setShow(s => !s) }
    return (
        <>
            {/* As `show` becomes `false`, React instantly destroys the Box from the DOM. Motion never gets a chance to run an exit animation. Check: onAnimationComplete does not fire for exit unless wrapped insie AnimatePresence*/}
            {/* <button onClick={toggleShow}></button> */}
            <AnimatePresence onExitComplete={() => console.log("exited")}>
                {show && <KillSquare onClick={toggleShow} />}
            </AnimatePresence>
            {/* AnimatePresence detects when a child is removed from the React tree. It freezes the removal, plays the exit animation, and then lets React destroy the element. */}
        </>
    )
}
const squareVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    shown: { opacity: 1, scale: 1 },
}


// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Refined KillSquare in SimpleExit with crisp rounded-xl borders, subtle shadow, and tactile click hint per /apple-design.
export const KillSquare = ({ onClick }: { onClick?(): void }) => {
    return <motion.div
        onClick={onClick} onAnimationComplete={() => console.log("fire animation")}
        className="size-20 rounded-xl bg-neutral-100 border border-neutral-300 shadow-xl cursor-pointer active:scale-95 transition-transform flex items-center justify-center text-xs font-mono text-neutral-500 select-none"
        variants={squareVariant}
        initial="hidden" animate="shown" exit="hidden"
    >
        <span>Dismiss</span>
    </motion.div>
}