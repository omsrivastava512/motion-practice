import { RotateCcw } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "preact/hooks"

const MOCK_LIST = Array.from("12345")

const ShuffleList = ({ }) => {
    const [list, setList] = useState(MOCK_LIST)
    // Ref: [ADR-LAYOUT-02] Shared spinning feedback and spring layout transitions for 1D list reordering.
    const [isShuffling, setIsShuffling] = useState(false)

    const shuffleList = () => {
        if (isShuffling) return;
        setIsShuffling(true);
        const newList = [...list];

        setTimeout(() => {
            for (let i = newList.length - 1; i > 0; --i) {
                const j = Math.floor(Math.random() * (i + 1));;
                [newList[i], newList[j]] = [newList[j], newList[i]];
            }

            setList(newList);
            setIsShuffling(false);
        }, 500)
    }

    return (
        <ul className="relative p-3" title="Shuffle List">
            <li className="absolute z-10 right-0 top-0 h-fit w-fit list-none">
                <button
                    type="button"
                    title="Shuffle list"
                    disabled={isShuffling}
                    onClick={shuffleList}
                    className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-100 border border-neutral-700/80 shadow-md transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
                >
                    <RotateCcw className={`size-4 ${isShuffling ? 'animate-spin' : ''}`} />
                </button>
            </li>

            {list.map((item) => (
                <motion.li key={item} layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="h-12 w-52 mb-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 text-lg font-medium flex items-center justify-center shadow-sm select-none list-none"
                    title={`Item ${item} (reorders with spring physics)`}
                >
                    {item}
                </motion.li>
            ))}
        </ul>
    )
}

export default ShuffleList