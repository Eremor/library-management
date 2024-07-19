import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

import { Modal } from 'shared/ui/Modal';
import { useAppDispatch } from 'shared/lib/hooks';

import {
  getProfileData,
} from '../../model/selectors/profileSelector';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface FormValues {
  userName: string;
  email: string;
}

const EditableProfileCardHeader = memo(() => {
  const profileData = useSelector(getProfileData);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    defaultValues: {
      userName: profileData?.userName,
      email: profileData?.email,
    },
  });

  const onOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  const onSubmit = (data: FormValues) => {
    if (profileData) {
      dispatch(updateProfileData({
        profileId: profileData.id,
        userName: data.userName,
        email: data.email,
      }));
    }
    onCloseModal();
  };

  useEffect(() => {
    reset({
      userName: profileData?.userName,
      email: profileData?.email,
    });
  }, [profileData, reset]);

  return (
    <>
      <Button
        variant="contained"
        onClick={onOpenModal}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Редактировать профиль
      </Button>
      <Modal
        modalTitle="Редактировать профиль"
        open={isOpen}
        onClose={onCloseModal}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: '100%',
          }}
        >
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Укажите имя пользователя"
                variant="standard"
                autoComplete="off"
                {...register('userName', {
                  required: true,
                })}
                error={!!errors.userName}
                helperText={errors.userName && 'Необходимо указать имя пользователя'}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Укажите почту пользователя"
                variant="standard"
                autoComplete="off"
                {...register('email', {
                  required: true,
                  pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
                })}
                error={!!errors.email}
                helperText={errors.email && 'Необходимо указать почту пользователя'}
              />
            )}
          />
          <Stack
            mt={4}
            justifyContent="space-between"
            direction="row"
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!!errors.userName || !!errors.email}
            >
              Добавить
            </Button>
            <Button onClick={onCloseModal}>
              Отмена
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
});

export { EditableProfileCardHeader };
