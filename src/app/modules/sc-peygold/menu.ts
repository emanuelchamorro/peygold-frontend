import {MenuItem} from '../commons-peygold/entities/menu-item';
import {MenuSeparator} from '../commons-peygold/entities/menu-separator';
import {routes} from './routes';

export const menu: Array<MenuItem> = [
  new MenuItem().fromJSON({label: 'Inicio', href: routes.home.href}),
  new MenuSeparator(),
  new MenuItem().fromJSON({label: 'Mi Usuario', href: routes.home.href}),
  new MenuItem().fromJSON({label: 'Ayuda', href: routes.home.href}),
  new MenuItem().fromJSON({label: 'Ir A Tienda', href: routes.home.href}),
];
