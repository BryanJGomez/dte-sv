import { useLocation, useNavigate } from 'react-router-dom';
import InvoiceDetail from '../components/invoice/InvoiceDetail';
import { Button } from '../components/ui';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dte = state?.dte;

  if (!dte) {
    return (
      <div className="max-w-[700px] mx-auto text-center py-12 px-4 flex flex-col items-center gap-4 text-text-secondary">
        <p>No se encontró información del pedido.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Ir al Catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-3 md:px-4 pb-8 md:pb-12">
      <InvoiceDetail dte={dte} />

      <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
        <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => navigate('/historial')}>
          Ver Historial
        </Button>
        <Button variant="secondary" size="md" className="w-full sm:w-auto" onClick={() => navigate('/')}>
          Continuar Comprando
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;