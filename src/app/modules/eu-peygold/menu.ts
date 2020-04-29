import {MenuItem} from '../commons-peygold/entities/menu-item';
import {MenuSeparator} from '../commons-peygold/entities/menu-separator';
import {routes} from './routes';
import {routes as hRoutes} from '../pg-help/routes';

export const menu: Array<MenuItem> = [
  new MenuItem().fromJSON({label: 'Inicio', href: routes.home.href, icon: 'icon-Iconos-01'}),
//  new MenuItem().fromJSON({label: 'Movimientos', href: routes.transactions.index.href, icon: 'icon-Iconos-02'}),
  new MenuItem().fromJSON({label: 'Ingresar Dinero', href: routes.money.add.href, icon: 'icon-Iconos-03'}),
  new MenuItem().fromJSON({label: 'Cobrar', icon: 'icon-Iconos-04', childs: [
    new MenuItem().fromJSON({label: 'Solicitar dinero', href: routes.money.request.href}),
//    new MenuItem().fromJSON({label: 'Solicitudes enviadas', href: routes.money.requests.href}),
  ]}),
  new MenuItem().fromJSON({label: 'Pagar/Enviar Dinero', icon: 'icon-Iconos-05', childs: [
      new MenuItem().fromJSON({label: 'Enviar dinero', href: routes.money.send.href}),
      new MenuItem().fromJSON({label: 'Solicitudes de pago', href: routes.money.sent.href}),
  ]}),
  new MenuItem().fromJSON({label: 'QR', icon: 'icon-Iconos-06', childs: [
    new MenuItem().fromJSON({label: 'Cobrar / Generar QR', href: routes.qr.generator.href}),
    new MenuItem().fromJSON({label: 'Pagar / Escanear QR', href: routes.qr.scanner.href}),
  ]}),
//  new MenuItem().fromJSON({label: 'Remates', icon: 'icon-Iconos-13', childs: [
//      new MenuItem().fromJSON({label: 'Rematar mis puntos', href: routes.home.href}),
//      new MenuItem().fromJSON({label: 'Mis remates', href: routes.home.href}),
//      new MenuItem().fromJSON({label: 'Remates disponibles', href: routes.home.href}),
//  ]}),
//  new MenuItem().fromJSON({label: 'Reportes', icon: 'icon-reportes-27', childs: [
//      new MenuItem().fromJSON({label: 'Estado de cuentas', href: routes.reports.account_status.href}),
//      new MenuItem().fromJSON({label: 'Retenciones', href: routes.reports.withholdings.href}),
//  ]}),
  new MenuItem().fromJSON({label: 'Creditos', icon: 'icon-creditos-26', childs: [
      new MenuItem().fromJSON({label: 'Solicitar creditos', href: routes.loans.request.href}),
      new MenuItem().fromJSON({label: 'Mis solicitudes', href: routes.loans.index.href}),
  ]}),
//  new MenuItem().fromJSON({label: 'Comercios Adheridos', icon: 'icon-Iconos-08', href: routes.ecommerces.index.href}),
  new MenuSeparator(),
  new MenuItem().fromJSON({label: 'Mi Usuario', icon: 'icon-Iconos-09', href: routes.me.index.href}),
  new MenuItem().fromJSON({label: 'Ayuda', icon: 'icon-Iconos-07',  href: hRoutes.index.href}),
  // new MenuItem().fromJSON({label: 'Ir A Tienda', icon: 'icon-Iconos-10',   href: routes.home.href}),
];
