import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "preact/hooks"


const GoodBye = () => {
    return <DirectionalExit />
}

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

        // to avoid React batching the two state updates, we can use requestAnimationFrame
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
        <div id="controls" className="flex gap-1 mt-2">
            <button disabled={locked} onClick={() => exit("down")}><ArrowBigDown /></button>
            <button disabled={locked} onClick={() => exit("up")}><ArrowBigUp /></button>
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
        className={"h-20 w-20 rounded bg-white"}
        variants={throwVariants} custom={direction}
        initial="hidden" animate="shown" exit="exit"
    />
}


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


const KillSquare = ({ onClick }: { onClick?(): void }) => {
    return <motion.div
        onClick={onClick} onAnimationComplete={() => console.log("fire animation")}
        className={"h-20 w-20 rounded bg-white"}
        variants={squareVariant}
        initial="hidden" animate="shown" exit="hidden"
    />
}


export default GoodBye