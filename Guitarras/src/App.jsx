import { useState , useEffect } from 'react'
import  Header  from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db'

function App() {
  /*data contendrá el estado actual, mientras que setData será una función que se utilizará para actualizar el estado data. */
  const [data,setData] = useState(db)
  /*Se inicializa con un array vacío */
  const [cart,setCart] = useState([])

  /* agregar elementos al carrito */
  function addToCart(item){
    
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExists>=0){//si existe el carrito
      //Es inmutable pq primero crea una copia
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      /* toma el estado anterior (prevCart) y agrega el nuevo elemento (item) al final del array */
      setCart([...cart,item])
    }
    
  }
  return (
    <>

    <Header
      cart={cart}
    />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
            /*identificar qué elementos han cambiado, se añadido o eliminado */
              key={guitar.id}
              /*Se crea el props de guitar */
              guitar={guitar}
              /*permitir que el componente Guitar actualice el estado del carrito. */
              setCart={setCart}
              /*permitir que el componente Guitar agregue elementos al carrito. */
              addToCart={addToCart}
            />
          ))}
            
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
