import { createContext, useContext, useReducer, useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('engineeor-cart', [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === product._id)
      if (exists) return prev
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [setCart])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i._id !== id))
  }, [setCart])

  const clearCart = useCallback(() => setCart([]), [setCart])

  const isInCart = useCallback((id) => cart.some(i => i._id === id), [cart])

  const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, total, count: cart.length }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}