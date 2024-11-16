import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ShareButtonProps {
  progress: number;
  goalTitle: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ progress, goalTitle }) => {
  const [isCopied, setIsCopied] = useState(false);

  const shareMessage = `I've made ${progress}% progress on my "${goalTitle}" goal! #fitness #progress`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return (
    <div>
      <IconButton aria-label="copy" onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
      {isCopied && <span>Copied!</span>}
    </div>
  );
};

export default ShareButton;
```