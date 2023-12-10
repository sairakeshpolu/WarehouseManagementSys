import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { AppSideLoginComponent } from './components/authentication/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { DriverRoutedOrdersComponent } from './components/driver-routed-orders/driver-routed-orders.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { RoutedOrDeliveredComponent } from './components/routed-or-delivered-orders/routed-or-delivered-orders.component';
import { RoutedOrDeliveredRoutesComponent } from './components/routed-or-delivered-routes/routed-or-delivered-routes.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      { path: "", redirectTo: "/login", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "inventory", component: InventoryComponent },
      { path: "purchase-order", component: PurchaseOrderComponent },
      { path: "sales-order", component: SalesOrderComponent },
      { path: "my-orders", component: MyOrdersComponent },
      { path: "add-customer", component: CreateCustomerComponent },
      { path: "all-customers", component: AllCustomersComponent },
      { path: "pending-orders", component: PendingOrdersComponent },
      { path: "change-password", component: PasswordChangeComponent },
      { path: "account-details", component: AccountProfileComponent },
      { path: "delivered-orders", component: RoutedOrDeliveredRoutesComponent },
      { path: "packed-orders", component: RoutedOrDeliveredComponent },
      { path: "routed-orders", component: RoutedOrDeliveredRoutesComponent },
      { path: "driver-pending-orders", component: DriverRoutedOrdersComponent },
      { path: "route-order", component: PendingOrdersComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
    ]
  },
  
  { path: "login", component: AppSideLoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
