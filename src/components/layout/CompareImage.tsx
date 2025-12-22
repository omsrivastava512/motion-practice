import { motion } from "motion/react"
import { useState } from "preact/hooks"

import nature from "../assets/nature.png"

/**
 * The `layout` prop is used to track layout changes of an element 
 * such as any change in the position or size and `motion` then ensures 
 * smooth transitions as the component moves or changes size.
 * 
 * This is particularly useful in dynamic layouts where elements may be rearranged,
 * without requiring you to manually manage the animation.
 */

const CompareImage = () => {
    const [expandedImage, setExpandedImage] = useState<number | null>(null)

    const toggleExpand = (i: number) => {
        setExpandedImage(e => e === i ? null : i)
    }

    return (<div className="relative max-w-screen max-h-screen size-screen">
        <div className="flex justify-center gap-1.5 p-2">
            <ControlledExpandableImage key={2}
                isHidden={expandedImage !== null}
                isExpanded={expandedImage == 2}
                toggleExpand={() => toggleExpand(2)}
            />
            <ControlledExpandableImage key={1} isLayout
                isHidden={expandedImage !== null}
                isExpanded={expandedImage == 1}
                toggleExpand={() => toggleExpand(1)}
            />
        </div>
        <h1>Click to Expand</h1>
    </div>
    )
}

type ControlledExpandableImageProps = {
    isExpanded: boolean,
    isHidden: boolean,
    isLayout?: boolean,
    toggleExpand(): void
}

const ControlledExpandableImage = ({ isExpanded, isHidden, isLayout = false, toggleExpand }: ControlledExpandableImageProps) => {

    return (
        <div className={`${isHidden && !isExpanded && 'opacity-0'} border-4 w-50 rounded-lg ${isExpanded && 'border-transparent'} transition-all duration-300`}>
            <h3 className={`${isExpanded && 'opacity-0'} transition-all duration-300`} >Layout {isLayout ? "On" : "Off"}</h3>
            <motion.img
                src={nature} alt="Expandable" layout={isLayout} title={isLayout ? "layout on" : "layout off"}
                className={`${isExpanded ? 'fixed top-0 left-0  w-dvw z-10' : 'relative w-50 z-0 '} rounded`}
                onClick={toggleExpand}
            />
        </div>
    )
}


export const ExpandableImage = ({ isLayout = false }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(e => !e)
    }

    return (
        <div className={`border-4 w-50 rounded-lg ${isExpanded && 'border-transparent'} transition-all duration-300`}>
            <h3 className={`${isExpanded && 'opacity-0'} transition-all duration-300`} >Layout {isLayout ? "On" : "Off"}</h3>
            <motion.img
                src={nature} alt="Expandable" layout={isLayout} title={isLayout ? "layout on" : "layout off"}
                className={`${isExpanded ? 'fixed top-0 left-0  w-dvw z-10' : 'relative w-50 z-0 '} rounded`}
                onClick={toggleExpand}
            />
        </div>
    )
}

export default CompareImage
