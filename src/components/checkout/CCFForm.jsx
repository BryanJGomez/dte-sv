import { useState } from 'react';
import { FormField, Input, Button } from '../ui';
import { validateCCFForm } from '../../utils/validators';

const CCFForm = ({ onSubmit, loading }) => {
  const [data, setData] = useState({
    razonSocial: '',
    nrc: '',
    nit: '',
    direccion: '',
    correo: '',
    telefono: '',
  });
  const [errors, setErrors] = useState({});

  const set = field => e => setData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    const errs = validateCCFForm(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2 p-3.5 bg-warning-light border border-yellow-200 rounded-md text-sm text-warning leading-relaxed">
        <span>ℹ️</span>
        <span>En CCF, los precios mostrados excluyen IVA. El 13% se calcula por separado.</span>
      </div>

      <FormField label="Razón Social / Nombre Comercial" required error={errors.razonSocial}>
        <Input
          placeholder="Empresa S.A. de C.V."
          value={data.razonSocial}
          onChange={set('razonSocial')}
          error={errors.razonSocial}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3.5">
        <FormField label="NRC" required error={errors.nrc} hint="Formato: XXXXXXX-X">
          <Input placeholder="123456-7" value={data.nrc} onChange={set('nrc')} error={errors.nrc} />
        </FormField>

        <FormField label="NIT" required error={errors.nit} hint="Formato: XXXX-XXXXXX-XXX-X">
          <Input
            placeholder="0614-010101-001-1"
            value={data.nit}
            onChange={set('nit')}
            error={errors.nit}
          />
        </FormField>
      </div>

      <FormField label="Dirección" required error={errors.direccion}>
        <Input
          placeholder="Col. San Benito, Av. La Revolución #123, San Salvador"
          value={data.direccion}
          onChange={set('direccion')}
          error={errors.direccion}
        />
      </FormField>

      <FormField label="Correo Electrónico" required error={errors.correo}>
        <Input
          type="email"
          placeholder="facturacion@empresa.com.sv"
          value={data.correo}
          onChange={set('correo')}
          error={errors.correo}
        />
      </FormField>

      <FormField label="Teléfono">
        <Input placeholder="2222-3333" value={data.telefono} onChange={set('telefono')} />
      </FormField>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        type="submit"
      >
        {loading ? 'Generando Comprobante…' : 'Finalizar Pedido →'}
      </Button>
    </div>
  );
};

export default CCFForm;