import { memo } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';

import { Profile } from '../model/types/profile';

interface ProfileCardProps {
  data?: Profile;
  error?: string;
  isLoading?: boolean;
}

const ProfileCard = memo((props: ProfileCardProps) => {
  const {
    data,
    error,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <Card sx={{
        width: '100%',
        flexGrow: 1,
      }}
      >
        <List>
          <ListItem>
            <Skeleton
              variant="rectangular"
              height={48}
              width="100%"
            />
          </ListItem>
          <ListItem>
            <Skeleton
              variant="rectangular"
              height={48}
              width="100%"
            />
          </ListItem>
        </List>
      </Card>
    );
  }

  return (
    <Card sx={{
      width: '100%',
      flexGrow: 1,
    }}
    >
      <List>
        {error && (
          <Typography
            variant="subtitle1"
            color="red"
          >
            {error}
          </Typography>
        )}
        <ListItem>
          <ListItemText
            primary="Пользователь:"
            secondary={data?.userName}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Почта:"
            secondary={data?.email}
          />
        </ListItem>
      </List>
    </Card>
  );
});

export { ProfileCard };
