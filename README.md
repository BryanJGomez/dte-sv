# DTE-SV 🧾

Tienda en línea con facturación electrónica para El Salvador.

## Características

- **Catálogo de productos** con filtros por categoría
- **Carrito de compras** interactivo
- **Dos tipos de facturas**: FCF y CCF
- **Generación automática** de PDF y JSON
- **Historial** guardado en localStorage
- **Validación** de datos (DUI, NIT, NRC, correo)
- **Diseño responsive** para móviles y escritorio

## Instalación

```bash
npm install
npm start
```

## Producción

```bash
npm run build
```

## Estructura

```
src/
├── components/    # UI: Navbar, ProductCard, Button, Forms
├── context/       # CartContext, InvoiceContext
├── pages/        # Catalog, Checkout, Confirmation, History
├── utils/        # calculos, validaciones, PDF, DTE
├── constants/     # constantes fiscales
└── data/         # productos
```

## Tipos de Documento

| Tipo | Descripción |
|------|-------------|
| **FCF** | Factura de Consumidor Final - IVA incluido |
| **CCF** | Comprobante de Crédito Fiscal - IVA separate |

## Tech Stack

- React 18
- Tailwind CSS
- PDF Generate
