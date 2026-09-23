import {  motion } from "motion/react"

const feedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const notificationVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12
        }
    },
}

// Ref: [ADR-COMP-01] Optional stage-centering className and staggered variant propagation.
type NotificationFeedProps = {
    className?: string;
}

const NotificationFeed = ({ className }: NotificationFeedProps = {}) => {
    return (
        <motion.div
            variants={feedVariants}
            initial="hidden"
            animate="visible"
            className={className || "relative flex flex-col w-64"}
        >
            <motion.div className={notifCls} variants={notificationVariant} title="Staggered message 1">New Message 1!</motion.div>
            <motion.div className={notifCls} variants={notificationVariant} title="Staggered message 2">New Message 2!</motion.div>
            <motion.div className={notifCls} variants={notificationVariant} title="Staggered message 3">New Message 3!</motion.div>
        </motion.div>
    )
}

export default NotificationFeed


const notifCls = "px-3.5 py-2.5 my-1 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200 text-xs font-medium tracking-tight shadow-md backdrop-blur-md flex items-center select-none"