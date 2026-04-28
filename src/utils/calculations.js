import { IVA_RATE } from '../constants/dte';

// Redondea a 2 decimales (seguro para dinero).
export const round2 = value => Math.round((value + Number.EPSILON) * 100) / 100;

// FCF: el precio ya incluye IVA. Extrae precio base e IVA.
export const extractIvaFromTotal = priceWithIva => {
  const base = round2(priceWithIva / (1 + IVA_RATE));
  const iva = round2(priceWithIva - base);
  return { base, iva };
};

// CCF: el precio mostrado es sin IVA. Se suma 13% al total.
export const addIvaToBase = basePrice => {
  const iva = round2(basePrice * IVA_RATE);
  const total = round2(basePrice + iva);
  return { base: basePrice, iva, total };
};

// Calcula totales del carrito para FCF. Los precios ya incluyen IVA.
export const calcFCFTotals = items => {
  const totalWithIva = round2(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const { base: ventasGravadas, iva: montoIva } = extractIvaFromTotal(totalWithIva);
  return {
    ventasGravadas,
    montoIva,
    totalAPagar: totalWithIva,
  };
};

// Calcula totales del carrito para CCF. Sin IVA, se suma por separado.
export const calcCCFTotals = items => {
  const ventasGravadas = round2(
    items.reduce((sum, item) => {
      const { base } = extractIvaFromTotal(item.price);
      return sum + base * item.quantity;
    }, 0)
  );
  const montoIva = round2(ventasGravadas * IVA_RATE);
  const totalAPagar = round2(ventasGravadas + montoIva);
  return { ventasGravadas, montoIva, totalAPagar };
};

// Calcula total de línea según el tipo de documento.
export const getItemTotals = (item, docType) => {
  if (docType === 'CCF') {
    const { base } = extractIvaFromTotal(item.price);
    return {
      unitPrice: round2(base),
      lineTotal: round2(base * item.quantity),
    };
  }
  return {
    unitPrice: item.price,
    lineTotal: round2(item.price * item.quantity),
  };
};
