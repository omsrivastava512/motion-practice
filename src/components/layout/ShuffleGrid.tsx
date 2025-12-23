import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "preact/hooks";

let COLORS = [
    "#f00", "#0f0", "#00f", "#ff0",  // red, green, blue, yellow
    "#f0a", "#0ff", "#fff", "#000",  // magenta, cyan, white, black
    "#800080", "#ff6347", "#ff4500", "#32cd32", // purple, tomato, orange, limegreen
    "#ff1493", "#ffd700", "#adff2f", "#8a2be2", // deeppink, gold, greenyellow, blueviolet
    "#c71585", "#d2691e", "#a52a2a", "#c0c0c0", // mediumvioletred, chocolate, brown, silver
    "#ff8c00", "#4b0082", "#ffff00", "#800000" // darkorange, indigo, yellow, maroon
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
        <button title="Shuffle tiles" disabled={isShuffling} className="absolute right-10 top-10 rounded-4xl backdrop-filter backdrop-blur-lg backdrop-opacity-70 h-fit w-fit">
            <RotateCcw className={`size-7 text-black p-0.5 ${isShuffling?'cursor-not-allowed':'hover:scale-110 active:scale-95 cursor-pointer'}`} onClick={shuffleBoxes} />
        </button>
        <div className="relative grid grid-cols-6 gap-4 p-4">
            {colors.map((color) => (
                <motion.div
                    layout
                    key={color}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    // transition={{ duration: 0.8, ease: "easeInOut" }}   
                    className={`w-24 h-24 rounded-lg bg-[${color}]`}
                    style={{ backgroundColor: color }}
                ></motion.div>
            ))}
        </div>
    </>
    )
}

export default ShuffleGrid