import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { AppLinkTheme } from '../const/theme';

import styles from './AppLink.module.css';

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
}

const AppLink = memo((props: AppLinkProps) => {
  const {
    children,
    to,
    theme = AppLinkTheme.LIGHT,
    ...otherProps
  } = props;
  return (
    <Link
      className={`${styles[theme]} ${styles.link}`}
      to={to}
      {...otherProps}
    >
      {children}
    </Link>
  );
});

export { AppLink };
