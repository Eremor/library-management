import { memo, MouseEvent, useState } from 'react';
import { Button, Popover, Typography } from '@mui/material';

interface LinkPopoverProps {
  buttonText: string;
  elementsText: string[];
}

const LinkPopover = memo((props: LinkPopoverProps) => {
  const { buttonText, elementsText } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          fontWeight: 700,
        }}
      >
        {buttonText}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {elementsText.map((text) => (
          <Typography
            variant="body1"
            key={text}
            p={2}
            sx={{
              '&:last-child': {
                pt: 0,
              },
            }}
          >
            {text}
          </Typography>
        ))}
      </Popover>
    </>
  );
});

export { LinkPopover };
