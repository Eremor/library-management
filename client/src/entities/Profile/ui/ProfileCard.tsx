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
        data-testid="ProfileCard.Card"
      >
        <List>
          <ListItem>
            <Skeleton
              variant="rectangular"
              height={48}
              width="100%"
              data-testid="ProfileCard.Skeleton"
            />
          </ListItem>
          <ListItem>
            <Skeleton
              variant="rectangular"
              height={48}
              width="100%"
              data-testid="ProfileCard.Skeleton"
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
      data-testid="ProfileCard.Card"
    >
      <List>
        {error && (
          <Typography
            variant="subtitle1"
            color="red"
            data-testid="ProfileCard.Error"
          >
            {error}
          </Typography>
        )}
        <ListItem>
          <ListItemText
            primary="Пользователь:"
            secondary={data?.userName}
            data-testid="ProfileCard.UserName"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Почта:"
            secondary={data?.email}
            data-testid="ProfileCard.UserEmail"
          />
        </ListItem>
      </List>
    </Card>
  );
});

export { ProfileCard };
