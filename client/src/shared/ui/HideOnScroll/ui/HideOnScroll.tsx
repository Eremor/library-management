import { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';

interface HideOnScrollProps {
  children: ReactElement;
  window?: () => Window;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  );
}

export { HideOnScroll };
