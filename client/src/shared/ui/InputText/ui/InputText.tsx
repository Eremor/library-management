import { memo } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { TextField } from '@mui/material';

interface InputTextProps {
  name: string;
  control: Control<FieldValues>;
  label: string;
  isRequired?: boolean;
}

const InputText = memo((props: InputTextProps) => {
  const {
    name,
    control,
    label,
    isRequired = false,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          required={isRequired}
          label={label}
          variant="standard"
        />
      )}
    />
  );
});

export { InputText };
