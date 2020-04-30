const indexRoute = '/eu';
export const routes = {
  context: indexRoute,
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
    add: {
      route: 'money/add', href: indexRoute + '/money/add',
      bank_transfer: {route: 'money/add/bank-transfer', href: indexRoute + '/money/add/bank-transfer'},
      bank_deposit: {route: 'money/add/bank-deposit', href: indexRoute + '/money/add/bank-deposit'},
      credit_card: {route: 'money/add/credit-card', href: indexRoute + '/money/add/credit-card'},
      cash: {route: 'money/add/cash', href: indexRoute + '/money/add/cash'},
    },
    request: {route: 'money/request', href: indexRoute + '/money/request'},
    requests: {route: 'money/requests', href: indexRoute + '/money/requests'},
    send: {route: 'money/send', href: indexRoute + '/money/send'},
    sent: {route: 'money/sent', href: indexRoute + '/money/sent'},
  },
  qr : {
    scanner: {route: 'qr/scanner', href: indexRoute + '/qr/scanner'},
    generator: {route: 'qr/generator', href: indexRoute + '/qr/generator'},
    confirm: {route: 'qr/confirm', href: indexRoute + '/qr/confirm'},
  },
  reports : {
    account_status: {route: 'reports/account_status', href: indexRoute + '/reports/account_status'},
    withholdings: {route: 'reports/withholdings', href: indexRoute + '/reports/withholdings'},
  },
  loans : {
    index: {route: 'loans', href: indexRoute + '/loans'},
    request: {route: 'loans/request', href: indexRoute + '/loans/request'},
  },
  ecommerces : {
    index: {route: 'ecommerces', href: indexRoute + '/ecommerces'},
  },

};
