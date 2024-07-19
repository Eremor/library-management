import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import { Page } from 'widgets/Page';

import { LinkPopover } from 'shared/ui/LinkPopover';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

const MainPage = memo(() => (
  <Page>
    <Typography variant="body1">
      Для ознакомления с функциональностью приложения доступно две учётные записи:
      <LinkPopover
        buttonText="Admin"
        elementsText={[
          'почта: admin@mail.ru',
          'пароль: 123',
        ]}
      />
      <LinkPopover
        buttonText="User"
        elementsText={[
          'почта: user@mail.ru',
          'пароль: 1234',
        ]}
      />
    </Typography>
    <Box>
      Реализованный функционал:
      <ul style={{ margin: 0 }}>
        <li>Отображение всех книг с данными и статусом аренды</li>
        <li>У пользователя Admin, есть возможность удобно добавить новую книгу в базу</li>
        <li>
          При нажатии на название книги осуществляется
          переход на страницу с детальной информацией
        </li>
        <li>
          На странице с детальной информацией о книге, можно взять её в аренду, если она
          свободна, либо вернуть, если текущий пользователь её взял
        </li>
        <li>
          На странице с детальной информацией о книге, пользователь Admin, может изменить
          данные о книге в удобном формате
        </li>
        <li>
          Отображение журнала выдачи книг, где отображается название книги, имя пользователя
          который её взял в аренду, а так же время когда книга была взята и возвращена
        </li>
        <li>Профиль пользователя, где пользователь может изменить часть своих данных</li>
      </ul>
    </Box>
    <Typography variant="body1" mt={3}>
      С кодом можно ознакомится в репозитории на
      <AppLink
        to="https://github.com/Eremor/library-management/tree/develop"
        target="_blank"
        theme={AppLinkTheme.PRIMARY}
        style={{
          fontWeight: 700,
        }}
      >
        GitHub
      </AppLink>
    </Typography>
  </Page>
));

export default MainPage;
