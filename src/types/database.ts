// Mirrors the tables defined in supabase/schema.sql
// Extend these as the dashboard / API phase is built out.

export type UserRole =
  | "ADMIN"
  | "OPERATIONS_MANAGER"
  | "ACCOUNTANT"
  | "WAREHOUSE_MANAGER"
  | "WAREHOUSE_EMPLOYEE"
  | "DRIVER"
  | "CUSTOMER";

export type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Picked Up"
  | "In Warehouse"
  | "In Transit"
  | "Customs Clearance"
  | "Out For Delivery"
  | "Delivered"
  | "Cancelled";

export type InvoiceStatus =
  | "Draft"
  | "Pending"
  | "Partially Paid"
  | "Paid"
  | "Overdue"
  | "Cancelled";

export type ServiceType = "Sea Freight" | "Air Freight" | "Land Freight" | "Multimodal";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface Customer {
  id: string;
  profile_id: string;
  company_name: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface Warehouse {
  id: string;
  warehouse_name: string;
  warehouse_code: string;
  country: string;
  city: string;
  address: string | null;
  capacity: number | null;
  created_at: string;
  deleted_at: string | null;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  customer_id: string;
  warehouse_id: string | null;
  origin: string;
  destination: string;
  service_type: ServiceType;
  weight: number | null;
  volume: number | null;
  cost: number | null;
  status: ShipmentStatus;
  created_at: string;
  deleted_at: string | null;
}

export interface ShipmentTrackingEvent {
  id: string;
  shipment_id: string;
  location: string;
  status: ShipmentStatus;
  notes: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  shipment_id: string | null;
  amount: number;
  payment_status: InvoiceStatus;
  created_at: string;
  deleted_at: string | null;
}

export interface QuoteRequest {
  id: string;
  customer_id: string | null;
  request_type: string;
  description: string;
  status: "new" | "in_review" | "quoted" | "closed";
  created_at: string;
}
