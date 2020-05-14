const homeRoute = '/';

export const routes = {
  home: {route: homeRoute, href: homeRoute},
  login : {route: 'login', href: homeRoute + 'login'},
  logout : {route: 'logout', href: homeRoute + 'logout'},
  register : {
    index: {route: 'register', href: homeRoute + 'register'},
    company: {route: 'register/company', href: homeRoute + 'register/company'},
    institution: {route: 'register/institution', href: homeRoute + 'register/institution'},
    person: {route: 'register/person', href: homeRoute + 'register/person'},
    success: {route: 'register/success', href: homeRoute + 'register/success'},
  },
  reset_password : {
    index: {route: 'reset-password', href: homeRoute + 'reset-password'},
    success: {route: 'reset-password/success', href: homeRoute +  'reset-password/success'},
  },
  verify_email : {route: 'verify-email', href: homeRoute + 'verify-email'},
};
