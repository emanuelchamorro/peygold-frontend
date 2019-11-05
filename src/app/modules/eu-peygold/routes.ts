const indexRoute = '/eu';
export const routes = {
  index: {route: 'eu', href: indexRoute},
  home: {route: 'home', href: indexRoute + '/home'},
  help: {route: 'help', href: indexRoute + '/help'},
  me : {
    index: {route: 'me', href: indexRoute + '/me'},
  },
  transactions : {
    index: {route: 'transactions', href: indexRoute + '/transactions'},
  },
  money : {
    add: {route: 'money/add', href: indexRoute + '/money/add'},
    request: {route: 'money/request', href: indexRoute + '/money/request'},
    requests: {route: 'money/requests', href: indexRoute + '/money/requests'},
    send: {route: 'money/send', href: indexRoute + '/money/send'},
    sent: {route: 'money/sent', href: indexRoute + '/money/sent'},
  },
  qr : {
    scan: {route: 'qr/scan', href: indexRoute + '/qr/scan'},
    generate: {route: 'qr/generate', href: indexRoute + '/qr/generate'},
  },
  reports : {
    account_status: {route: 'reports/account_status', href: indexRoute + '/reports/account_status'},
    withholdings: {route: 'reports/withholdings', href: indexRoute + '/reports/withholdings'},
  },
  credits : {
    index: {route: 'credits', href: indexRoute + '/credits'},
    request: {route: 'credits/request', href: indexRoute + '/credits/request'},
  },
  ecommerces : {
    index: {route: 'ecommerces', href: indexRoute + '/ecommerces'},
  },
};
