import { createContext, useReducer, useContext, useMemo } from 'react';
import { cartReducer, initialCartState, CART_ACTIONS } from '../reducers/cartReducer';
import { calcFCFTotals } from '../utils/calculations';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = product => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  const removeItem = id => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
  const updateQty = (id, qty) =>
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity: qty } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  const totals = useMemo(() => calcFCFTotals(state.items), [state.items]);
  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const isInCart = id => state.items.some(i => i.id === id);
  const getItem = id => state.items.find(i => i.id === id);

  const value = {
    items: state.items,
    totals,
    itemCount,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    isInCart,
    getItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
