export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  BOOKS = 'books',
  BOOKS_DETAILS = 'book_details',
  LOANS = 'loans',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile/',
  [AppRoutes.BOOKS]: '/books/',
  [AppRoutes.BOOKS_DETAILS]: '/books/',
  [AppRoutes.LOANS]: '/loans',
  [AppRoutes.NOT_FOUND]: '*',
};
