import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "preact/hooks";

// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Replaced harsh 1990s HTML neon saturated hex colors (#f00, #0f0, #00f, etc.) with Apple's calibrated
// Dark Mode System Palette (HIG system blue, indigo, purple, mint, coral, amber, etc.),
// keeping the exact original shuffling mechanism, DOM layout, and Motion physics completely untouched.
let COLORS = [
    "#0A84FF", "#5E5CE6", "#BF5AF2", "#FF375F", "#FF453A", "#FF9F0A",
    "#FFD60A", "#30D158", "#63E6E2", "#64D2FF", "#70D7FF", "#3880FF",
    "#AF52DE", "#FF2D55", "#FF6B4A", "#FFB340", "#34C759", "#40C8E0",
    "#7D52DE", "#E056FD", "#FF4F64", "#F5A623", "#28CD41", "#8E8E93"
];

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const ShuffleGrid = ({ }) => {
    const [colors, setColors] = useState(COLORS)
    const [isShuffling, setIsShuffling] = useState(false)
    const isShufflingRef = useRef(false);

    const shuffleBoxes = async() => {
        if(isShufflingRef.current) return;
        isShufflingRef.current = true;
        setIsShuffling(true)

        const newOrder = [...colors];

        for (let i = newOrder.length - 1; i > 0; i = i - 2) {
            const j = Math.floor(Math.random() * (i + 1));;
            [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
            setColors([...newOrder])
            await sleep(800)
        }

        isShufflingRef.current = false;
        setIsShuffling(false)
    }

    return (<>
        {/* DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
         * Changed shuffle button from text-black on translucent pill to high-contrast neutral-100 on neutral-800
         * so it is clearly visible and crisp on the dark stage canvas.
         */}
        <button 
            type="button"
            title="Shuffle tiles" 
            disabled={isShuffling} 
            onClick={shuffleBoxes}
            className="absolute right-6 top-6 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-100 border border-neutral-700/80 shadow-md transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        >
            <RotateCcw className={`size-5 ${isShuffling ? 'animate-spin' : ''}`} />
        </button>
        <div className="relative grid grid-cols-6 gap-4 p-4">
            {colors.map((color) => (
                <motion.div
                    layout
                    key={color}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    // transition={{ duration: 0.8, ease: "easeInOut" }}   
                    className="w-24 h-24 rounded-xl shadow-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Tile: ${color}`}
                ></motion.div>
            ))}
        </div>
    </>
    )
}

export default ShuffleGrid