const homeRoute = '/sc';
export const routes = {
  home: {route: 'sc', href: homeRoute},
  help: {route: 'help', href: homeRoute + '/help'},
  me : {
    index: {route: 'me', href: homeRoute + '/me'},
  },
  dashboard : {
    index: {route: 'dashboard', href: homeRoute + '/dashboard'},
  },
  users : {
    index: {route: 'users', href: homeRoute + '/users'},
    post: {route: 'user', href: homeRoute + '/user'},
    put: {route: 'user/:userId', href: homeRoute + '/user'},
  },
};
