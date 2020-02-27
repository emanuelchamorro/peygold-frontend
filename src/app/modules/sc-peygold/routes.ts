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
  insurancecarriers : {
    index: {route: 'insurancecarriers', href: homeRoute + '/insurancecarriers'},
    post: {route: 'insurancecarrier', href: homeRoute + '/insurancecarrier'},
    put: {route: 'insurancecarrier/:insurancecarrierId', href: homeRoute + '/insurancecarrier'},
  },
  banks : {
    index: {route: 'banks', href: homeRoute + '/banks'},
    post: {route: 'bank', href: homeRoute + '/bank'},
    put: {route: 'bank/:bankId', href: homeRoute + '/bank'},
  },
  rescuecheck : {
    index: {route: 'rescuechecks', href: homeRoute + '/rescuechecks'},
    post: {route: 'rescuecheck', href: homeRoute + '/rescuecheck'},
    put: {route: 'rescuecheck/:rescuecheckId', href: homeRoute + '/rescuecheck'},
  },
  generalchargescredits : {
    index: {route: 'generalchargescredits', href: homeRoute + '/generalchargescredits'},
    post: {route: 'generalchargecredit', href: homeRoute + '/generalchargecredit'},
    put: {route: 'generalchargecredit/:generalchargecreditId', href: homeRoute + '/generalchargecredit'},
  },
  provincechargescredits : {
    index: {route: 'provincechargescredits', href: homeRoute + '/provincechargescredits'},
    post: {route: 'provincechargecredit', href: homeRoute + '/provincechargecredit'},
    put: {route: 'provincechargecredit/:provincechargecreditId', href: homeRoute + '/provincechargecredit'},
  },
};
