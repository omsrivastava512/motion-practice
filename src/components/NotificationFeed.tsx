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

// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Added optional className prop so the component can be centered cleanly in showcase stages
// instead of remaining locked to the hardcoded 'absolute ml-120 mt-50' position from Day 2.
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
            <motion.div className={notifCls} variants={notificationVariant}>New Message 1!</motion.div>
            <motion.div className={notifCls} variants={notificationVariant}>New Message 2!</motion.div>
            <motion.div className={notifCls} variants={notificationVariant}>New Message 3!</motion.div>
        </motion.div>
    )
}

export default NotificationFeed


const notifCls = "bg-neutral-400 my-1 p-0.5"