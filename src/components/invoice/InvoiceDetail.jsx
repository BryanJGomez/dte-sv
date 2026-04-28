import { useState } from 'react';
import { Button } from '../ui';
import { printInvoicePDF } from '../../utils/pdfGenerator';

const DownloadIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const InvoiceDetail = ({ dte }) => {
  const [copied, setCopied] = useState(false);
  const { identificacion, receptor, cuerpoDocumento, _meta } = dte;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(dte, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(dte, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${identificacion.numeroControl}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[660px] mx-auto p-8 flex flex-col gap-5 animate-fadeIn">
      <div className="text-center py-5">
        <div className="w-14 h-14 rounded-full bg-success-light border-2 border-success-border flex items-center justify-center mx-auto mb-3.5">
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Pedido Confirmado</h1>
        <p className="text-sm text-text-muted mt-1">Tu factura ha sido generada exitosamente</p>
      </div>

      <div className="bg-success-light border border-success-border rounded-lg p-5 text-center flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-widest text-success">Número de Control</span>
        <span className="font-mono text-2xl font-bold text-success tracking-wide">{identificacion.numeroControl}</span>
        <span className="text-xs text-text-secondary">
          Guardado: {new Date(_meta.savedAt).toLocaleString('es-SV')}
        </span>
      </div>

      <div className="bg-white border border-border rounded-lg p-5 shadow-sm">
        <h2 className="text-base font-bold text-text-primary mb-4.5 tracking-tight">Resumen del Documento</h2>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Tipo de Documento</span>
            <span className="text-sm font-semibold text-text-primary">{_meta.tipoDocumentoLabel}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">No. de Control</span>
            <span className="font-mono text-sm font-semibold text-primary">
              {identificacion.numeroControl}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Emisor</span>
            <span className="text-sm font-semibold text-text-primary">{dte.emisor.nombreComercial}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Fecha/Hora</span>
            <span className="text-sm font-semibold text-text-primary">
              {new Date(_meta.savedAt).toLocaleString('es-SV')}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Receptor</span>
            <span className="text-sm font-semibold text-text-primary">{receptor.nombre}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Correo</span>
            <span className="text-sm font-semibold text-text-primary">{receptor.correo}</span>
          </div>
        </div>

        <div className="h-px bg-border-light my-4" />

        <h3 className="text-sm font-semibold text-text-secondary mb-2.5">Items</h3>
        <div className="flex flex-col gap-2">
          {cuerpoDocumento.map(item => (
            <div key={item.numItem} className="flex justify-between items-start gap-3 p-2.5 bg-bg rounded-md">
              <div>
                <span className="text-sm font-bold text-text-primary block">{item.descripcion}</span>
                <span className="text-xs text-text-muted mt-0.5 block">
                  {item.cantidad} × ${item.precioUni.toFixed(2)}
                </span>
              </div>
              <span className="text-sm font-bold text-text-primary flex-shrink-0">${item.ventaGravada.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-border-light my-4" />

        <h3 className="text-sm font-semibold text-text-secondary mb-2.5">Totales</h3>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span>Ventas Gravadas:</span>
            <span className="font-semibold">${_meta.totals.ventasGravadas.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA (13%):</span>
            <span className="font-semibold">${_meta.totals.montoIva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold bg-primary-light px-3 py-2.5 rounded-md text-primary mt-1">
            <span>Total a Pagar:</span>
            <span>${_meta.totals.totalAPagar.toFixed(2)}</span>
          </div>
        </div>

        <div className="h-px bg-border-light my-4" />

        <div className="flex flex-col gap-2.5">
          <Button variant="danger" fullWidth onClick={() => printInvoicePDF(dte)}>
            <DownloadIcon /> Descargar PDF
          </Button>
          <Button variant="success" fullWidth onClick={handleDownloadJSON}>
            <DownloadIcon /> Descargar JSON
          </Button>
          <Button variant="secondary" fullWidth onClick={handleCopyJSON}>
            <CopyIcon /> {copied ? '¡Copiado!' : 'Copiar JSON'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-bg rounded-md flex flex-col gap-1">
          <div>
            <span className="text-xs font-semibold text-text-secondary mr-1.5">Código de Generación:</span>
            <span className="font-mono text-xs text-text-muted">
              {identificacion.codigoGeneracion.substring(0, 20)}…
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-text-secondary mr-1.5">Sello:</span>
            <span className="font-mono text-xs text-text-muted">
              {_meta.selloRecepcion.substring(0, 20)}…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;