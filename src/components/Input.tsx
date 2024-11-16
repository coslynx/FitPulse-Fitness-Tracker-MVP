import React, { useState, ChangeEvent } from 'react';
import { TextField, FormHelperText } from '@mui/material';

interface InputProps {
  type?: 'text' | 'number' | 'date' | 'email';
  label: string;
  placeholder?: string;
  value?: string | number | Date;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState<string | number | Date>(value || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    onChange(event);
  };

  return (
    <TextField
      type={type}
      label={label}
      placeholder={placeholder}
      value={inputValue as string}
      onChange={handleInputChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};

export default Input;

```