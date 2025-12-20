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


export const KillSquare = ({ onClick }: { onClick?(): void }) => {
    return <motion.div
        onClick={onClick} onAnimationComplete={() => console.log("fire animation")}
        className={"h-20 w-20 rounded bg-white"}
        variants={squareVariant}
        initial="hidden" animate="shown" exit="hidden"
    />
}