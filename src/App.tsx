
import BasketBall from "./components/BasketBall"

export function App() {

  return (
    <div className={"flex justify-between w-auto"}>
      <BasketBall
        variants={zBounceVariants}
      />
      <BasketBall
       variants={yBounceVariants}
      />
    </div>
  )
}

const zBounceVariants = {
  hover: { scale: 1.2 },
  tap: { scale: .8 }
}

const yBounceVariants = {
  hover:{ scale: 1.2 },
  tap:{ y: -50, scale: 1.2 },
}

