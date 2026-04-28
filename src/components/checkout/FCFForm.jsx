import { useState } from 'react';
import { FormField, Input, Button } from '../ui';
import { validateFCFForm } from '../../utils/validators';

const FCFForm = ({ onSubmit, loading }) => {
  const [data, setData] = useState({
    nombre: '',
    dui: '',
    direccion: '',
    correo: '',
    telefono: '',
  });
  const [errors, setErrors] = useState({});

  const set = field => e => setData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    const errs = validateFCFForm(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Nombre Completo" required error={errors.nombre}>
        <Input
          placeholder="Juan Antonio García Pérez"
          value={data.nombre}
          onChange={set('nombre')}
          error={errors.nombre}
        />
      </FormField>

      <FormField label="DUI" error={errors.dui} hint="Formato: XXXXXXXX-X (Opcional)">
        <Input
          placeholder="12345678-9"
          value={data.dui}
          onChange={set('dui')}
          error={errors.dui}
          maxLength={10}
        />
      </FormField>

      <FormField label="Dirección" error={errors.direccion}>
        <Input
          placeholder="Col. Escalón, Calle La Mascota #25, San Salvador"
          value={data.direccion}
          onChange={set('direccion')}
        />
      </FormField>

      <FormField label="Correo Electrónico" required error={errors.correo}>
        <Input
          type="email"
          placeholder="usuario@ejemplo.com"
          value={data.correo}
          onChange={set('correo')}
          error={errors.correo}
        />
      </FormField>

      <FormField label="Teléfono" error={errors.telefono} hint="Opcional">
        <Input placeholder="+503 2123-4567" value={data.telefono} onChange={set('telefono')} />
      </FormField>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        type="submit"
      >
        {loading ? 'Procesando...' : '✓ Generar FCF'}
      </Button>
    </div>
  );
};

export default FCFForm;