
import BasketBall from "./components/BasketBall"
// import NotificationFeed from "./components/NotificationFeed"
import { PresentHeartBeat } from "./Keyframes"

export function App() {

  return (
    <div className={""}>
      
      <PresentHeartBeat />
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