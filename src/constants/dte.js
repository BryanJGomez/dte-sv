export const IVA_RATE = 0.13;
export const PRICE_WITH_IVA_FACTOR = 1 + IVA_RATE;

export const DOCUMENT_TYPES = {
  FCF: 'FCF',
  CCF: 'CCF',
};

export const DOCUMENT_LABELS = {
  FCF: 'Factura de Consumidor Final',
  CCF: 'Comprobante de Crédito Fiscal',
};

export const CONTROL_NUMBER_PREFIX = {
  FCF: 'DTE-01',
  CCF: 'DTE-03',
};

export const APP_NAME = 'DTE E-Commerce';
export const EMISOR_NAME = 'DTE E-Commerce S.A. de C.V.';
export const EMISOR_NIT = '0614-010101-001-1';
export const EMISOR_NRC = '123456-7';
export const EMISOR_ACTIVIDAD = 'Venta al por menor de equipos de cómputo y electrónica';
export const EMISOR_DIRECCION = 'Colonia Escalón, Calle La Mascota #25, San Salvador, El Salvador';

export const INVOICE_STORAGE_KEY = 'dte_invoices';
export const CONTROL_NUMBER_STORAGE_KEY = 'dte_control_counter';
