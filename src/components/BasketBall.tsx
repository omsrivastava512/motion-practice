import basketBall from "../assets/basketball.png"
import {motion, type TargetAndTransition, } from "motion/react"

type BasketBallProps = {
  // whileHover: TargetAndTransition
  // whileTap: TargetAndTransition
  variants: {
    hover: TargetAndTransition,
    tap: TargetAndTransition
  }
}

const BasketBall = ({ variants }: BasketBallProps) => <motion.img
  className="cursor-grab"
  src={basketBall}
  draggable={false}
  variants={variants}
  height={100}
  width={100}
  whileHover="hover"
  whileTap="tap"
  initial={{ scale: 0.5, opacity: 0, }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
></motion.img>


export default BasketBall