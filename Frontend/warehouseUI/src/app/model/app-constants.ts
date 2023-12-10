export class AppConstants {
  public static ratingStarTotalCount = 5;
  //public static API_BASE_URL                = 'http://52.15.153.12:8080';
  public static API_BASE_URL                = 'http://localhost:8080';
  public static SIGN_IN_USER                = this.API_BASE_URL + '/api/v1/user/signin'; //POST
  public static SIGN_OUT_USER               = this.API_BASE_URL + '/api/v1/user/signOut'; //POST
  public static USER                        = this.API_BASE_URL + '/api/v1/user'; //POST
  public static PASSWORD_UPDATE             = this.API_BASE_URL + '/api/v1/user/update'; //POST
  public static INVENTORY_ITEMS             = this.API_BASE_URL + '/api/v1/inventory/items'; //GET, POST
  public static ITEMS_BY_CATEGORY_AND_ITEM  = this.API_BASE_URL + '/api/v1/inventory/items/{category}/{item}'; //GET, POST
  public static ORDERS                      = this.API_BASE_URL + '/api/v1/orders'; //GET, POST
  public static PENDING_ORDERS              = this.API_BASE_URL + '/api/v1/orders/{userType}/pending'; //GET, POST
  public static ROUTED_OR_DELIVERED_ORDERS  = this.API_BASE_URL + '/api/v1/orders/{userType}/completed'; //GET, POST
  public static ORDERS_STATUS_CHANGE        = this.API_BASE_URL + '/api/v1/orders/status'; //POST
  public static PACK_ORDER                  = this.API_BASE_URL + '/api/v1/orders/pack'; //POST
  public static ROUTE_ORDER                 = this.API_BASE_URL + '/api/v1/orders/route'; //POST
  public static ORDER_ITEMS                 = this.API_BASE_URL + '/api/v1/orders/:orderId/items'; //GET, POST
  public static SETTLE_ORDER                = this.API_BASE_URL + '/api/v1/orders/settle'; //GET, POST
  public static ORDER_STATISTICS            = this.API_BASE_URL + '/api/v1/orders/sales/statistics'; //GET, POST
  public static PENDING_DUE                 = this.API_BASE_URL + '/api/v1/orders/:customerId/due'; //GET, POST
  public static CUSTOMERS                   = this.API_BASE_URL + '/api/v1/customers'; //GET, POST
}
export class OrderStatus {
  public static orderCreated = "Order created";
  public static orderPackStart = "Order packing started";
  public static deliveryInProgress = 'Order delivery in progress';
  public static validStatuses = ['Order created', 'Order packing started', 'Order packing completed',
    'Out for Delivery', 'Order delivery in progress', 'Order delivered'];
}
export interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  type: string;
  supportedRoles: string;
}
export class Menu {
  public static sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
      type: "feather",
      supportedRoles: 'Manager, SalesPerson, Packer, Driver, Accountant'
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
      link: "/route-order",
      icon: "truck",
      menu: "Route Orders",
      type: "feather",
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
      link: "/pending-orders",
      icon: "archive",
      menu: "Pending Orders",
      type: "feather",
      supportedRoles: 'Packer'
    },
    {
      link: "/driver-pending-orders",
      icon: "archive",
      menu: "Pending Orders",
      type: "feather",
      supportedRoles: 'Driver'
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
      supportedRoles: 'Manager, SalesPerson, Accountant'
    },
    {
      link: "/delivered-orders",
      icon: "truck",
      menu: "Delivered Orders",
      type: "feather",
      supportedRoles: 'Driver'
    },
    {
      link: "/packed-orders",
      icon: "package",
      menu: "Packed Orders",
      type: "feather",
      supportedRoles: 'Packer'
    },
    {
      link: "/routed-orders",
      icon: "truck",
      menu: "Routed Orders",
      type: "feather",
      supportedRoles: 'Manager'
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
