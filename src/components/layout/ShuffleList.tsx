import { RotateCcw } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "preact/hooks"

const MOCK_LIST = Array.from("12345")

const ShuffleList = ({ }) => {
    const [list, setList] = useState(MOCK_LIST)

    const shuffleList = () => {
        const newList = [...list];

        setTimeout(() => {

            for (let i = newList.length - 1; i > 0; --i) {
                const j = Math.floor(Math.random() * (i + 1));;
                [newList[i], newList[j]] = [newList[j], newList[i]];
            }

            setList(newList)
        }, 500)
    }

    return (
        <ul className="relative p-3" title="Shuffle List">
            <li className="absolute z-10 right-0 top-0 rounded-4xl backdrop-filter backdrop-blur-lg backdrop-opacity-70 h-fit w-fit">
                <RotateCcw className=" size-7 text-black  p-0.5 hover:scale-110 cursor-pointer" onClick={shuffleList} />
            </li>

            {list.map((item) => (
                <motion.li key={item} layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-gray-200 h-fit w-50 mb-3 rounded text-black text-2xl font-semibold "
                >
                    {item}
                </motion.li>
            ))}
        </ul>
    )
}

export default ShuffleList