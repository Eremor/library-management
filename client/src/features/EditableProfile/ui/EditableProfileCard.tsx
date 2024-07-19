import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ProfileCard } from 'entities/Profile';
import { getAuthData } from 'entities/User';

import { useAppDispatch } from 'shared/lib/hooks';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';

import {
  getProfileData,
  getProfileError,
  getProfileIsLoading,
} from '../model/selectors/profileSelector';
import { profileReducer } from '../model/slice/profileSlice';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from './EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

function EditableProfileCard({ id }: EditableProfileCardProps) {
  const dispatch = useAppDispatch();
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const user = useSelector(getAuthData);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  }, [id, dispatch]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      {(data?.id === user?.id) && (
        <EditableProfileCardHeader />
      )}
      <ProfileCard
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </DynamicModuleLoader>
  );
}

export { EditableProfileCard };
