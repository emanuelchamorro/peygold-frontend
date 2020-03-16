const indexRoute = '/pe';
export const routes = {
  context: indexRoute,
  index: {route: 'pe', href: indexRoute},
  loaninsuranceview: {route: 'loaninsurance/:idLoanInsurance', href: indexRoute + '/loaninsurance'},

};
