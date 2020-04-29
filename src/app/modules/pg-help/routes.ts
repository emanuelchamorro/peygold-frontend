const indexRoute = '/help';
export const routes = {
  context: indexRoute,
  index: {route: 'help', href: indexRoute},
  cantactus: {route: 'cantactus', href: indexRoute + '/cantactus'},
  frequentquestions: {route: 'frequentquestions', href: indexRoute + '/frequentquestions'},
  peygoldquestions: {route: 'peygoldquestions', href: indexRoute + '/peygoldquestions'},
};
