import { v4 as uuidv4 } from 'uuid';
import {
  DOCUMENT_TYPES,
  DOCUMENT_LABELS,
  CONTROL_NUMBER_PREFIX,
  EMISOR_NAME,
  EMISOR_NIT,
  EMISOR_NRC,
  EMISOR_ACTIVIDAD,
  EMISOR_DIRECCION,
  CONTROL_NUMBER_STORAGE_KEY,
} from '../constants/dte';
import { calcFCFTotals, calcCCFTotals, getItemTotals } from './calculations';

// Genera número de control secuencial
const generateControlNumber = docType => {
  const key = `${CONTROL_NUMBER_STORAGE_KEY}_${docType}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  const prefix = CONTROL_NUMBER_PREFIX[docType];
  return `${prefix}-${String(next).padStart(8, '0')}`;
};

// Genera sello aleatorio (simulado)
const generateSello = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 40;
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Construye el DTE completo
export const generateDTE = ({ docType, cartItems, receptorData }) => {
  const codigoGeneracion = uuidv4();
  const numeroControl = generateControlNumber(docType);
  const selloRecepcion = generateSello();
  const fechaEmision = new Date().toISOString();

  const totals =
    docType === DOCUMENT_TYPES.FCF ? calcFCFTotals(cartItems) : calcCCFTotals(cartItems);

  const cuerpoDocumento = cartItems.map((item, idx) => {
    const { unitPrice, lineTotal } = getItemTotals(item, docType);
    return {
      numItem: idx + 1,
      tipoItem: 1,
      codigo: item.id,
      descripcion: item.name,
      cantidad: item.quantity,
      uniMedida: 59,
      precioUni: unitPrice,
      montoDescu: 0,
      ventaNoSuj: 0,
      ventaExenta: 0,
      ventaGravada: lineTotal,
      tributos: ['20'],
    };
  });

  const receptor = buildReceptor(docType, receptorData);

  return {
    identificacion: {
      version: 1,
      ambiente: '00',
      tipoDte: docType === DOCUMENT_TYPES.FCF ? '01' : '03',
      numeroControl,
      codigoGeneracion,
      tipoModelo: 1,
      tipoOperacion: 1,
      tipoContingencia: null,
      motivoContin: null,
      fecEmi: fechaEmision.split('T')[0],
      horEmi: fechaEmision.split('T')[1].split('.')[0],
      tipoMoneda: 'USD',
    },
    documentoRelacionado: null,
    emisor: {
      nit: EMISOR_NIT,
      nrc: EMISOR_NRC,
      nombre: EMISOR_NAME,
      codActividad: '47400',
      descActividad: EMISOR_ACTIVIDAD,
      nombreComercial: 'DTE E-Commerce',
      tipoEstablec: '01',
      direccion: {
        departamento: '06',
        municipio: '14',
        complemento: EMISOR_DIRECCION,
      },
      telefono: '2222-3333',
      correo: 'ventas@dte-ecommerce.com.sv',
    },
    receptor,
    cuerpoDocumento,
    resumen: {
      totalNoSuj: 0,
      totalExenta: 0,
      totalGravada: totals.ventasGravadas,
      subTotalVentas: totals.ventasGravadas,
      descuNoSuj: 0,
      descuExenta: 0,
      descuGravada: 0,
      porcentajeDescuento: 0,
      totalDescu: 0,
      tributos: [
        {
          codigo: '20',
          descripcion: 'Impuesto al Valor Agregado 13%',
          valor: totals.montoIva,
        },
      ],
      subTotal: totals.ventasGravadas,
      ivaRete1: 0,
      reteRenta: 0,
      montoTotalOperacion: totals.totalAPagar,
      totalNoGravado: 0,
      totalPagar: totals.totalAPagar,
      totalLetras: numberToWords(totals.totalAPagar),
      totalIva: totals.montoIva,
      saldoFavor: 0,
      condicionOperacion: 1,
      pagos: [
        {
          codigo: '01',
          montoPago: totals.totalAPagar,
          referencia: null,
          plazo: null,
          periodo: null,
        },
      ],
      numPagoElectronico: null,
    },
    extension: null,
    apendice: null,
    // Informacion adicional para uso interno.
    // No se agrega en los reportes(JSON o PDF)
    _meta: {
      tipoDocumentoLabel: DOCUMENT_LABELS[docType],
      selloRecepcion,
      savedAt: new Date().toISOString(),
      totals,
    },
  };
};

const buildReceptor = (docType, data) => {
  if (docType === DOCUMENT_TYPES.FCF) {
    return {
      tipoDocumento: data.dui ? '13' : null,
      numDocumento: data.dui || null,
      nrc: null,
      nombre: data.nombre,
      codActividad: null,
      descActividad: null,
      direccion: data.direccion
        ? { departamento: null, municipio: null, complemento: data.direccion }
        : null,
      telefono: data.telefono || null,
      correo: data.correo,
    };
  }
  return {
    tipoDocumento: '36',
    numDocumento: data.nit,
    nrc: data.nrc,
    nombre: data.razonSocial,
    codActividad: data.codActividad || null,
    descActividad: data.descActividad || null,
    direccion: {
      departamento: null,
      municipio: null,
      complemento: data.direccion,
    },
    telefono: data.telefono || null,
    correo: data.correo,
  };
};

// Convierte número a palabras para totales en USD
const numberToWords = amount => {
  const cents = Math.round((amount % 1) * 100);
  const dollars = Math.floor(amount);
  return `${dollars} DÓLARES CON ${cents.toString().padStart(2, '0')}/100`;
};
