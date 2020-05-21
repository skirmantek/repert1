export const RouteLinks = {
  common: [
    {
      icon: 'home',
      text: 'Pagrindinis',
      link: '/',
    },
    {
      icon: 'sign-in',
      text: 'Prisijungti',
      link: '/login',
      restricted: true,
    },
  ],
  admin: [
    {
      icon: 'sign-out',
      text: 'Atsijungti',
      link: '/logout',
    },
    {
      icon: 'home',
      text: 'Administravimas',
      link: '/admin',
    },
    {
      icon: 'clipboard',
      text: 'Mano spektakliai',
      link: '/admin/posts',
    },
    {
      icon: 'plus',
      text: 'Pridėti spektaklį',
      link: '/admin/posts/create',
    },
  ],
}
