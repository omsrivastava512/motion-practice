import BasketBall from "../BasketBall"


const zBounceVariants = {
    hover: { scale: 1.2 },
    tap: { scale: .8 }
}

const yBounceVariants = {
    hover: { scale: 1.2 },
    tap: { y: -50, scale: 1.2 },
}
const xBounceVariants = {
    hover: { scale: 1.2 },
    tap: { x: -50, scale: 1.2 },
}

export const BasketBallTab = () => <>
    <BasketBall
        variants={xBounceVariants}
    />
    <BasketBall
        variants={zBounceVariants}
    />
    <BasketBall
        variants={yBounceVariants}
    />
</>


