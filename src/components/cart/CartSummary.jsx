import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button, Divider, EmptyState } from '../ui';

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16"
    />
  </svg>
);

const CartSummary = () => {
  const { items, totals, updateQty, removeItem, itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <aside className="bg-white border border-border rounded-lg p-5 shadow-md sticky top-24 flex flex-col gap-3 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-text-primary tracking-tight">
          Resumen del Carrito
        </h2>
        {itemCount > 0 && (
          <span className="text-xs text-text-muted bg-bg px-2 py-1 rounded-full border border-border">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon="🛒" title="Carrito vacío" description="Agrega productos para continuar" />
      ) : (
        <>
          <div className="flex flex-col gap-2.5">
            {items.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-2.5 p-3 bg-bg rounded-md border border-border-light"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-primary">{item.name}</span>
                  <span className="text-xs text-text-muted">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="flex items-center justify-center w-5 h-5 bg-transparent text-text-primary border-none cursor-pointer text-sm font-bold hover:bg-primary-light hover:text-primary active:scale-90 rounded p-0"
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="text-xs font-bold min-w-4 text-center">{item.quantity}</span>
                    <button
                      className="flex items-center justify-center w-5 h-5 bg-transparent text-text-primary border-none cursor-pointer text-sm font-bold hover:bg-primary-light hover:text-primary active:scale-90 rounded p-0"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="flex items-center justify-center ml-1 w-5 h-5 text-danger hover:bg-red-50 border-none cursor-pointer rounded p-0"
                      onClick={() => removeItem(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${totals.ventasGravadas.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (13%):</span>
              <span>${totals.montoIva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold bg-primary-light px-3 py-2.5 rounded-md text-primary">
              <span>Total:</span>
              <span>${totals.totalAPagar.toFixed(2)}</span>
            </div>
          </div>

          <Button variant="primary" size="md" fullWidth onClick={() => navigate('/checkout')}>
            Proceder a Pagar
          </Button>
        </>
      )}
    </aside>
  );
};

export default CartSummary;
