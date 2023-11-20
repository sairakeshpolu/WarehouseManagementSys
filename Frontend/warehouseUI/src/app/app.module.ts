import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './service/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { SharedService } from './service/shared.service';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { CreateEditOrderDialogComponent } from './components/create-edit-order-dialog/create-edit-order-dialog.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SpinnerComponent,
    InventoryComponent,
    PurchaseOrderComponent,
    CreateEditOrderDialogComponent,
    ConfirmDialogComponent,
    MyOrdersComponent,
    SalesOrderComponent,
    OrderItemsComponent,
    CreateCustomerComponent,
    AllCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    TablerIconsModule.pick(TablerIcons),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [TablerIconsModule, SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
