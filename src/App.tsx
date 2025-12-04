
import BasketBall from "./components/BasketBall"
import NotificationFeed from "./components/NotificationFeed"

export function App() {

  return (
    <div className={"flex justify-between w-auto"}>
      <NotificationFeed/>
    </div>
  )
}




const zBounceVariants = {
  hover: { scale: 1.2 },
  tap: { scale: .8 }
}

const yBounceVariants = {
  hover: { scale: 1.2 },
  tap: { y: -50, scale: 1.2 },
}



const BasketBallTab = () => <>
  <BasketBall
    variants={zBounceVariants}
  />
  <BasketBall
    variants={yBounceVariants}
  />
</>