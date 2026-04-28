import { EMISOR_DIRECCION } from '../constants/dte';

// Genera factura HTML para imprimir en navegador
export const printInvoicePDF = dte => {
  const { identificacion, emisor, receptor, cuerpoDocumento, resumen, _meta } = dte;
  const docLabel = _meta.tipoDocumentoLabel;
  const date = new Date(_meta.savedAt).toLocaleString('es-SV');

  const itemRows = cuerpoDocumento
    .map(
      item => `
    <tr>
      <td>${item.numItem}</td>
      <td>${item.descripcion}</td>
      <td style="text-align:center">${item.cantidad}</td>
      <td style="text-align:right">$${item.precioUni.toFixed(2)}</td>
      <td style="text-align:right">$${item.ventaGravada.toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${docLabel} - ${identificacion.numeroControl}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #111; padding: 24px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 16px; }
    .brand { font-size: 20px; font-weight: 700; color: #2563eb; }
    .doc-title { text-align: right; }
    .doc-title h2 { font-size: 16px; font-weight: 700; color: #111; }
    .doc-title .control { font-family: monospace; color: #2563eb; font-size: 13px; margin-top: 4px; }
    .section { margin-bottom: 14px; }
    .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #6b7280; margin-bottom: 6px; border-bottom: 1px solid #e4e7f0; padding-bottom: 4px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .field label { font-size: 9px; text-transform: uppercase; color: #9ca3af; display: block; }
    .field span { font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-top: 4px; }
    thead tr { background: #f0f4ff; }
    th { padding: 6px 8px; text-align: left; font-size: 10px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
    td { padding: 6px 8px; border-bottom: 1px solid #f0f0f0; }
    .totals { margin-top: 14px; display: flex; justify-content: flex-end; }
    .totals-table { width: 280px; }
    .totals-table td { padding: 4px 8px; border: none; }
    .totals-table .total-row td { font-weight: 700; font-size: 13px; background: #eff6ff; color: #2563eb; }
    .footer { margin-top: 24px; padding-top: 12px; border-top: 1px dashed #ccc; font-size: 9px; color: #9ca3af; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; background: #eff6ff; color: #2563eb; }
    @media print {
      body { padding: 12px; }
      @page { margin: 12mm; size: A4; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">${emisor.nombreComercial}</div>
      <div style="margin-top:4px;font-size:10px;color:#6b7280;">${EMISOR_DIRECCION}</div>
      <div style="font-size:10px;color:#6b7280;">NIT: ${emisor.nit} &nbsp;|&nbsp; NRC: ${emisor.nrc}</div>
    </div>
    <div class="doc-title">
      <div class="badge">${docLabel}</div>
      <h2 style="margin-top:6px;">${docLabel.toUpperCase()}</h2>
      <div class="control">${identificacion.numeroControl}</div>
      <div style="font-size:10px;color:#6b7280;margin-top:4px;">${date}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Datos del Receptor</div>
    <div class="grid2">
      <div class="field"><label>Nombre / Razón Social</label><span>${receptor.nombre}</span></div>
      ${receptor.nrc ? `<div class="field"><label>NRC</label><span>${receptor.nrc}</span></div>` : ''}
      ${receptor.numDocumento ? `<div class="field"><label>${receptor.tipoDocumento === '13' ? 'DUI' : 'NIT'}</label><span>${receptor.numDocumento}</span></div>` : ''}
      ${receptor.correo ? `<div class="field"><label>Correo</label><span>${receptor.correo}</span></div>` : ''}
      ${receptor.direccion?.complemento ? `<div class="field" style="grid-column:1/-1"><label>Dirección</label><span>${receptor.direccion.complemento}</span></div>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Detalle de Artículos</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Descripción</th>
          <th style="text-align:center">Cant.</th>
          <th style="text-align:right">Precio Unit.</th>
          <th style="text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
  </div>

  <div class="totals">
    <table class="totals-table">
      <tr><td>Ventas Gravadas:</td><td style="text-align:right">$${resumen.totalGravada.toFixed(2)}</td></tr>
      <tr><td>IVA (13%):</td><td style="text-align:right">$${resumen.totalIva.toFixed(2)}</td></tr>
      <tr class="total-row"><td>Total a Pagar:</td><td style="text-align:right">$${resumen.totalPagar.toFixed(2)}</td></tr>
    </table>
  </div>

  <div class="footer">
    <div><strong>Código de Generación:</strong> ${identificacion.codigoGeneracion}</div>
    <div style="margin-top:4px;"><strong>Sello de Recepción:</strong> ${_meta.selloRecepcion}</div>
    <div style="margin-top:4px;"><strong>Total en Letras:</strong> ${resumen.totalLetras}</div>
    <div style="margin-top:8px;text-align:center;color:#bbb;">Documento generado electrónicamente. Ambiente de pruebas.</div>
  </div>
</body>
</html>`;

  // Create a hidden iframe to avoid opening a new tab
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  iframe.contentDocument.write(html);
  iframe.contentDocument.close();

  // Print from iframe after content is loaded
  setTimeout(() => {
    iframe.contentWindow.print();
    // Remove iframe after printing dialog closes (user action dependent)
    setTimeout(() => document.body.removeChild(iframe), 500);
  }, 500);
};
