import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useInvoice } from '../context/InvoiceContext';
import { generateDTE } from '../utils/dte';
import { DOCUMENT_TYPES, DOCUMENT_LABELS } from '../constants/dte';
import FCFForm from '../components/checkout/FCFForm';
import CCFForm from '../components/checkout/CCFForm';
import OrderSummaryPanel from '../components/checkout/OrderSummaryPanel';
import { EmptyState, Button } from '../components/ui';

const CheckoutPage = () => {
  const [docType, setDocType] = useState(DOCUMENT_TYPES.FCF);
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCart();
  const { saveInvoice } = useInvoice();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-[480px] mx-auto my-12 px-4">
        <EmptyState
          icon="🛒"
          title="Carrito vacío"
          description="No hay productos en tu carrito. Agrega productos para continuar."
          action={
            <Button variant="primary" onClick={() => navigate('/')}>
              Ir al Catálogo
            </Button>
          }
        />
      </div>
    );
  }

  const handleSubmit = receptorData => {
    setLoading(true);
    setTimeout(() => {
      const dte = generateDTE({ docType, cartItems: items, receptorData });
      saveInvoice(dte);
      clearCart();
      navigate('/confirmacion', { state: { dte } });
    }, 800);
  };

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-6 md:gap-7 max-w-[1100px] mx-auto p-4 md:p-6 items-start">
      <div className="flex flex-col gap-4 md:gap-5">
        <button className="text-sm text-primary font-semibold cursor-pointer bg-transparent border-none p-0 hover:opacity-70 transition-opacity w-fit" onClick={() => navigate('/')}>
          ← Volver
        </button>

        <div>
          <h1 className="text-xl md:text-3xl font-bold text-text-primary tracking-tight">Finalizar Compra</h1>
          <p className="text-xs md:text-sm text-text-muted mt-1">
            Selecciona el tipo de documento
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {Object.values(DOCUMENT_TYPES).map(type => (
            <button
              key={type}
              className={`flex flex-col gap-1 p-3 md:p-4 border-2 rounded-lg bg-white cursor-pointer text-left transition-all ${
                docType === type
                  ? 'border-primary bg-primary-light'
                  : 'border-border hover:border-primary-muted hover:bg-primary-light'
              }`}
              onClick={() => setDocType(type)}
            >
              <span className="font-mono text-base md:text-lg font-bold text-primary">{type}</span>
              <span className="text-xs text-text-secondary leading-tight">{DOCUMENT_LABELS[type]}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border border-border rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-base font-bold text-text-primary mb-4 md:mb-5 tracking-tight">
            Datos del {docType === DOCUMENT_TYPES.FCF ? 'Consumidor' : 'Contribuyente'}
          </h2>
          {docType === DOCUMENT_TYPES.FCF ? (
            <FCFForm onSubmit={handleSubmit} loading={loading} />
          ) : (
            <CCFForm onSubmit={handleSubmit} loading={loading} />
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <OrderSummaryPanel docType={docType} />
      </div>
    </div>
  );
};

export default CheckoutPage;