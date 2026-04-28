// Valida formato DUI salvadoreño: XXXXXXXX-X
export const validateDUI = dui => {
  if (!dui) return true; // opcional en FCF
  const clean = dui.replace(/\s/g, '');
  return /^\d{8}-\d$/.test(clean);
};

// Valida formato NIT salvadoreño: XXXX-XXXXXX-XXX-X
export const validateNIT = nit => {
  if (!nit) return false;
  const clean = nit.replace(/\s/g, '');
  return /^\d{4}-\d{6}-\d{3}-\d$/.test(clean);
};

// Valida formato NRC salvadoreño: XXXXXXX-X
export const validateNRC = nrc => {
  if (!nrc) return false;
  const clean = nrc.replace(/\s/g, '');
  return /^\d{1,7}-\d$/.test(clean);
};

// Valida formato de email
export const validateEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Valida campos del formulario FCF
export const validateFCFForm = data => {
  const errors = {};

  if (!data.nombre?.trim()) errors.nombre = 'El nombre completo es obligatorio.';

  if (data.dui && !validateDUI(data.dui)) errors.dui = 'Formato inválido. Use: XXXXXXXX-X';

  if (!data.correo?.trim()) errors.correo = 'El correo electrónico es obligatorio.';
  else if (!validateEmail(data.correo)) errors.correo = 'Ingrese un correo electrónico válido.';

  return errors;
};

// Valida campos del formulario CCF
export const validateCCFForm = data => {
  const errors = {};

  if (!data.razonSocial?.trim()) errors.razonSocial = 'La razón social es obligatoria.';

  if (!data.nrc?.trim()) errors.nrc = 'El NRC es obligatorio para CCF.';
  else if (!validateNRC(data.nrc)) errors.nrc = 'Formato inválido. Use: XXXXXXX-X';

  if (!data.nit?.trim()) errors.nit = 'El NIT es obligatorio para CCF.';
  else if (!validateNIT(data.nit)) errors.nit = 'Formato inválido. Use: XXXX-XXXXXX-XXX-X';

  if (!data.direccion?.trim()) errors.direccion = 'La dirección es obligatoria para CCF.';

  if (!data.correo?.trim()) errors.correo = 'El correo electrónico es obligatorio.';
  else if (!validateEmail(data.correo)) errors.correo = 'Ingrese un correo electrónico válido.';

  return errors;
};
