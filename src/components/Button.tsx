import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  disabled?: boolean;
  loading?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({ text, onClick, variant = 'contained', disabled = false, loading = false }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        textTransform: 'none',
        fontSize: '1rem',
        padding: '1rem 2rem',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: variant === 'outlined' ? 'rgba(0, 128, 0, 0.1)' : '#006400',
          color: '#fff',
        },
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : text}
    </Button>
  );
};

export default MyButton;
```