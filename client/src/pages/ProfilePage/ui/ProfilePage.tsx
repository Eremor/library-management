import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import { Page } from 'widgets/Page';
import { EditableProfileCard } from 'features/EditableProfile';

const ProfilePage = memo(() => {
  const { id } = useParams<{ id: string }>();
  return (
    <Page
      data-testid="ProfilePage"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          maxWidth: '700px',
        }}
        maxWidth={false}
      >
        <EditableProfileCard id={id} />
      </Container>
    </Page>
  );
});

export default ProfilePage;
