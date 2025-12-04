
import BasketBall from "./components/BasketBall"

export function App() {

  return (
    <div className={"flex justify-between w-auto"}>
      <BasketBall
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: .8 }}
      />
      <BasketBall
        whileHover={{ scale: 1.2 }}
        whileTap={{ y: -50, scale: 1.2 }}
      />
    </div>
  )
}



