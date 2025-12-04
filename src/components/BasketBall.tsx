import basketBall from "../assets/basketball.png"
import {motion, type TargetAndTransition } from "motion/react"

type BasketBallProps = {
  whileHover: TargetAndTransition
  whileTap: TargetAndTransition
}

const BasketBall = ({ whileHover, whileTap }: BasketBallProps) => <motion.img
  src={basketBall}
  draggable={false}
  height={100}
  width={100}
  whileHover={whileHover}
  whileTap={whileTap}
  initial={{ scale: 0.5, opacity: 0, }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
></motion.img>


export default BasketBall