import { useCart } from '../../context/CartContext';
import { DOCUMENT_TYPES, PRICE_WITH_IVA_FACTOR } from '../../constants/dte';
import { calcCCFTotals } from '../../utils/calculations';

const OrderSummaryPanel = ({ docType }) => {
  const { items, totals: fcfTotals } = useCart();

  const totals = docType === DOCUMENT_TYPES.CCF ? calcCCFTotals(items) : fcfTotals;

  return (
    <div className="bg-white border border-border rounded-lg p-5 space-y-3">
      <h3 className="text-base font-bold text-text-primary tracking-tight">Resumen del Pedido</h3>

      <div className="space-y-2">
        {items.map(item => {
          const unitPrice =
            docType === DOCUMENT_TYPES.CCF ? item.price / PRICE_WITH_IVA_FACTOR : item.price;
          return (
            <div
              key={item.id}
              className="flex justify-between items-start gap-2 pb-2 border-b border-border-light last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-text-secondary">{item.quantity}×</span>
                <span className="text-sm font-medium text-text-primary">{item.name}</span>
              </div>
              <span className="font-bold text-sm text-primary">
                ${(unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-px bg-border my-2" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Ventas Gravadas</span>
          <span className="font-bold">${totals.ventasGravadas.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>IVA (13%)</span>
          <span className="font-bold">${totals.montoIva.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold bg-primary-light px-3 py-2.5 rounded-md text-primary">
          <span>Total a Pagar</span>
          <span>${totals.totalAPagar.toFixed(2)}</span>
        </div>
      </div>

      {docType === DOCUMENT_TYPES.CCF && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-xs text-warning">
          💡 Precios mostrados sin IVA según normativa CCF.
        </div>
      )}
    </div>
  );
};

export default OrderSummaryPanel;
