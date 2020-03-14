import {MenuItem} from '../commons-peygold/entities/menu-item';
import {MenuSeparator} from '../commons-peygold/entities/menu-separator';
import {routes} from './routes';

export const menu: Array<MenuItem> = [
  new MenuItem().fromJSON({label: 'Inicio', href: routes.dashboard.index.href, icon: 'icon-Iconos-01'}),

  new MenuItem().fromJSON({label: 'Gestión de usuarios', icon: 'icon-seguridad', childs: [
    new MenuItem().fromJSON({label: 'Usuarios', href: routes.users.index.href}),
    //new MenuItem().fromJSON({label: 'Roles de usuarios', href: routes.home.href}),
  ]}),
  new MenuItem().fromJSON({label: 'Catálogos', icon: 'icon-catalogo', childs: [
    new MenuItem().fromJSON({label: 'Aseguradoras', href: routes.insurancecarriers.index.href}),
    new MenuItem().fromJSON({label: 'Rescate de cheque', href: routes.rescuecheck.index.href}),
    new MenuItem().fromJSON({label: 'Bancos', href: routes.banks.index.route}),
    new MenuItem().fromJSON({label: 'Cargo y abono general', href: routes.generalchargescredits.index.href}),
    new MenuItem().fromJSON({label: 'Cargo y abono por provincia', href: routes.provincechargescredits.index.href}),
    

  ]}),
  new MenuItem().fromJSON({label: 'Gestión de créditos', icon: 'icon-creditos-26', childs: [
    new MenuItem().fromJSON({label: 'Solicitudes', href: routes.creditmanagement.index.href}),
    new MenuItem().fromJSON({label: 'Liquidaciones', href: routes.loansettlements.index.href})    
  ]}),
  new MenuItem().fromJSON({label: 'Reportes', icon: 'icon-reportes-27', childs: [
    new MenuItem().fromJSON({label: 'Estado de cuenta', href: routes.home.href}),
    new MenuItem().fromJSON({label: 'Retenciones', href: routes.home.href}),
  ]}),
  new MenuItem().fromJSON({label: 'Ajustes de sistema', icon: 'icon-configuracion-40', href: routes.home.href}),
  new MenuSeparator(),
  new MenuItem().fromJSON({label: 'Mi Usuario', icon: 'icon-Iconos-09', href: routes.me.index.href}),
];
