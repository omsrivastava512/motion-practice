import { motion } from "motion/react"
import { useState } from "preact/hooks"

// Ref: [ADR-LAYOUT-04] CompareImage FLIP layout vs immediate expansion with framed card geometry.
import nature from "../../assets/nature.png"

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

    return (
        <div className="relative flex flex-col items-center gap-3 sm:gap-4 p-2 sm:p-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-1 sm:p-2 w-full">
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
            <p className="text-[11px] sm:text-xs font-mono text-neutral-400 tracking-tight text-center">Click either card to expand into viewport</p>
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
        <div className={`${isHidden && !isExpanded ? 'opacity-0 pointer-events-none' : ''} border border-neutral-700/80 w-full max-w-[208px] sm:w-52 rounded-xl bg-neutral-900/80 p-2.5 ${isExpanded ? 'border-transparent' : ''} shadow-lg transition-all duration-300`}>
            <h3 className={`text-xs font-mono text-neutral-300 mb-2 font-medium tracking-tight ${isExpanded ? 'opacity-0' : ''} transition-all duration-300`}>
                Layout {isLayout ? "On" : "Off"}
            </h3>
            <motion.img
                src={nature} alt="Expandable preview" layout={isLayout}
                title={`Click to expand image (${isLayout ? 'with layout animation' : 'without layout animation'})`}
                className={`${isExpanded ? 'fixed top-0 left-0 w-dvw h-dvh object-contain z-50 bg-black/70 p-4' : 'relative w-full rounded-lg cursor-pointer hover:opacity-95 transition-opacity'}`}
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
        <div className={`border border-neutral-700/80 w-full max-w-[208px] sm:w-52 rounded-xl bg-neutral-900/90 p-2.5 ${isExpanded ? 'border-transparent' : ''} shadow-lg transition-all duration-300`}>
            <h3 className={`text-xs font-mono text-neutral-300 mb-2 font-medium tracking-tight ${isExpanded ? 'opacity-0' : ''} transition-all duration-300`}>
                Layout {isLayout ? "On" : "Off"}
            </h3>
            <motion.img
                src={nature} alt="Expandable preview" layout={isLayout}
                title={`Click to toggle image expand (${isLayout ? 'with layout transition' : 'without layout transition'})`}
                className={`${isExpanded ? 'fixed top-0 left-0 w-dvw z-50 bg-black/90 p-4' : 'relative w-full rounded-lg cursor-pointer hover:opacity-95 transition-opacity'}`}
                onClick={toggleExpand}
            />
        </div>
    )
}

export default CompareImage
