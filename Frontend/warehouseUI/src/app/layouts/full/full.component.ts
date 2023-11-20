import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  type: string;
  supportedRoles: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService,
              private _router: Router) { }

  routerActive: string = "activelink";

  logout() {
    this.authenticationService.logout();
    this._router.navigateByUrl('/');
  }

  get role() {
    return localStorage.getItem('role');
  }

  get sidebarMenuForUser() {
    var sidebarMenu: sidebarMenu[] = [];
    this.sidebarMenu.forEach(element => {
      if (element.supportedRoles.indexOf(this.role != null ? this.role : 'N/A') != -1) {
        sidebarMenu.push(element);
      }
    });
    return sidebarMenu;
  }

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
      type: "feather",
      supportedRoles: 'Manager, SalesPerson'
    },
    {
      link: "/inventory",
      icon: "store",
      menu: "My Inventory",
      type: "mat",
      supportedRoles: 'Manager'
    },
    {
      link: "/purchase-order",
      icon: "create_new_folder",
      menu: "Create PO",
      type: "mat",
      supportedRoles: 'Manager'
    },
    {
      link: "/sales-order",
      icon: "create_new_folder",
      menu: "Create SO",
      type: "mat",
      supportedRoles: 'SalesPerson'
    },
    {
      link: "/my-orders",
      icon: "archive",
      menu: "Recent Orders",
      type: "feather",
      supportedRoles: 'Manager, SalesPerson'
    },
    {
      link: "/add-customer",
      icon: "plus-square",
      menu: "Add new customer",
      type: "feather",
      supportedRoles: 'SalesPerson'
    },
    {
      link: "/all-customers",
      icon: "file-text",
      menu: "All customers",
      type: "feather",
      supportedRoles: 'Manager, SalesPerson'
    },
    /*{
      link: "/button",
      icon: "disc",
      menu: "Buttons",
      type: "feather"
    },
    {
      link: "/forms",
      icon: "layout",
      menu: "Forms",
      type: "feather"
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
      type: "feather"
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
      type: "feather"
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
      type: "feather"
    },
    {
      link: "/table",
      icon: "grid",
      menu: "Tables",
      type: "feather"
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
      type: "feather"
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
      type: "feather"
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
      type: "feather"
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
      type: "feather"
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
      type: "feather"
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
      type: "feather"
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
      type: "feather"
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
      type: "feather"
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
      type: "feather"
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
      type: "feather"
    },*/
  ]

}
