import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INVOICE_STORAGE_KEY } from '../constants/dte';

const InvoiceContext = createContext(null);

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    try {
      const stored = localStorage.getItem(INVOICE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // perisite factura en localStorage cada vez que se actualiza el estado de facturas
  useEffect(() => {
    try {
      localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoices));
    } catch (err) {
      console.error('Failed to persist invoices:', err);
    }
  }, [invoices]);

  const saveInvoice = useCallback(dte => {
    setInvoices(prev => [dte, ...prev]);
  }, []);

  const getInvoice = useCallback(
    controlNumber => invoices.find(inv => inv.identificacion.numeroControl === controlNumber),
    [invoices]
  );

  const clearHistory = useCallback(() => {
    setInvoices([]);
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, saveInvoice, getInvoice, clearHistory }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error('useInvoice must be used within InvoiceProvider');
  return ctx;
};
