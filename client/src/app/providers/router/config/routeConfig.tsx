import { RouteProps } from 'react-router-dom';

import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { BooksPage } from 'pages/BooksPage';
import { BookDetailsPage } from 'pages/BookDetails';
import { LoansPage } from 'pages/LoansPage';
import { NotFoundPage } from 'pages/NotFoundPage';

import { AppRoutes, RoutePath } from 'shared/const';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
  },
  [AppRoutes.BOOKS]: {
    path: RoutePath.books,
    element: <BooksPage />,
  },
  [AppRoutes.BOOKS_DETAILS]: {
    path: `${RoutePath.book_details}:id`,
    element: <BookDetailsPage />,
  },
  [AppRoutes.LOANS]: {
    path: RoutePath.loans,
    element: <LoansPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
