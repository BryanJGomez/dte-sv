import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoice } from '../context/InvoiceContext';
import { printInvoicePDF } from '../utils/pdfGenerator';
import InvoiceDetail from '../components/invoice/InvoiceDetail';
import { EmptyState, Button, Badge } from '../components/ui';

const HistoryPage = () => {
  const { invoices, clearHistory } = useInvoice();
  const navigate = useNavigate();
  const [confirmClear, setConfirmClear] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleDownloadJSON = dte => {
    const blob = new Blob([JSON.stringify(dte, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dte.identificacion.numeroControl}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const docTypeVariant = tipoDte => (tipoDte === '01' ? 'primary' : 'warning');

  return (
    <>
      <div className="max-w-[960px] mx-auto p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-text-primary tracking-tight">Historial</h1>
            <p className="text-xs md:text-sm text-text-muted mt-0.5">
              {invoices.length} doc{invoices.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <Button variant="secondary" size="sm" onClick={() => navigate('/')} className="w-full sm:w-auto">
              ← Volver
            </Button>
            {invoices.length > 0 &&
              (confirmClear ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm font-semibold text-danger">¿Seguro?</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      clearHistory();
                      setConfirmClear(false);
                    }}
                  >
                    Sí
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setConfirmClear(false)}>
                    No
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => setConfirmClear(true)} className="w-full sm:w-auto">
                  Limpiar
                </Button>
              ))}
          </div>
        </div>

        {invoices.length === 0 ? (
          <EmptyState
            icon="📄"
            title="Sin facturas"
            description="Aún no has generado ningún documento fiscal."
            action={
              <Button variant="primary" onClick={() => navigate('/')}>
                Ir al Catálogo
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {invoices.map(dte => {
              const { identificacion, receptor, _meta } = dte;
              return (
                <div
                  key={identificacion.codigoGeneracion}
                  className="bg-white border border-border rounded-lg p-3 md:p-4 shadow-sm flex flex-col gap-2.5 transition-shadow cursor-pointer hover:shadow-md"
                  onClick={() => setSelectedInvoice(dte)}
                >
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Badge variant={docTypeVariant(identificacion.tipoDte)}>
                        {identificacion.tipoDte === '01' ? 'FCF' : 'CCF'}
                      </Badge>
                      <div className="min-w-0">
                        <span className="font-mono text-xs md:text-sm font-bold text-primary block truncate">
                          {identificacion.numeroControl}
                        </span>
                        <span className="text-xs text-text-muted truncate block">
                          {receptor.nombre}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-sm md:text-lg font-bold text-text-primary">
                        ${_meta.totals.totalAPagar.toFixed(2)}
                      </span>
                      <span className="text-xs text-text-muted">
                        {new Date(_meta.savedAt).toLocaleDateString('es-SV')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 flex-wrap">
                    {dte.cuerpoDocumento.slice(0, 3).map(item => (
                      <span key={item.numItem} className="px-2 py-0.5 bg-bg border border-border-light rounded-full text-xs text-text-secondary">
                        {item.cantidad}× {item.descripcion.slice(0, 15)}
                      </span>
                    ))}
                    {dte.cuerpoDocumento.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-text-muted">+{dte.cuerpoDocumento.length - 3}</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-1">
                    <button
                      className="px-2 py-1 rounded border border-border bg-bg text-xs font-bold text-text-secondary hover:bg-primary-light hover:text-primary transition-all cursor-pointer font-mono"
                      onClick={e => {
                        e.stopPropagation();
                        printInvoicePDF(dte);
                      }}
                    >
                      PDF
                    </button>
                    <button
                      className="px-2 py-1 rounded border border-border bg-bg text-xs font-bold text-text-secondary hover:bg-primary-light hover:text-primary transition-all cursor-pointer font-mono"
                      onClick={e => {
                        e.stopPropagation();
                        handleDownloadJSON(dte);
                      }}
                    >
                      JSON
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-2 md:p-4" onClick={() => setSelectedInvoice(null)}>
          <div className="absolute inset-0" onClick={() => setSelectedInvoice(null)} />
          <div className="relative bg-bg rounded-lg max-h-[90vh] overflow-y-auto max-w-[700px] w-full z-10 m-2 md:m-0" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 bg-white border border-border rounded-md w-7 h-7 flex items-center justify-center cursor-pointer z-10 hover:bg-surface-hover text-lg"
              onClick={() => setSelectedInvoice(null)}
            >
              ✕
            </button>
            <InvoiceDetail dte={selectedInvoice} />
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryPage;