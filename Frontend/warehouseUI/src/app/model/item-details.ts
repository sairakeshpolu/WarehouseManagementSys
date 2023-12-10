import { CustomerDetails } from "./shared-details";

export interface InventoryItem {
  index: number;
  item_name: string;
  category: string;
  quantity: number;
  askedQuantity?: number;
  availableQuantity?: number;
  price: number;
  orderStatus?: string;
}
export interface Order {
  orderType: string;
  items: InventoryItem[];
  customer: CustomerDetails | null;
}
export interface RouteOrder {
  type: string;
  status: string;
  _id: string;
  orderNumber: string;
  customer_name: string;
  created_by: string;
  created_time: string;
  packer: string;
  orderSelected: boolean;
  routeOrderNumber: number;
}
