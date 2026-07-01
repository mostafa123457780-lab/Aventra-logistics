export type UserRole =
  | "CUSTOMER"
  | "ADMIN"
  | "OPERATIONS_MANAGER"
  | "ACCOUNTANT"
  | "WAREHOUSE_MANAGER"
  | "WAREHOUSE_EMPLOYEE"
  | "DRIVER";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      customers: {
        Row: {
          id: string;
          profile_id: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["customers"]["Row"]> & { profile_id: string };
        Update: Partial<Database["public"]["Tables"]["customers"]["Row"]>;
      };
      shipments: {
        Row: {
          id: string;
          tracking_number: string;
          customer_id: string;
          origin: string;
          destination: string;
          service_type: string | null;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["shipments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["shipments"]["Row"]>;
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          customer_id: string;
          amount: number;
          payment_status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["invoices"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["invoices"]["Row"]>;
      };
      requests: {
        Row: {
          id: string;
          customer_id: string;
          request_type: string;
          description: string | null;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["requests"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["requests"]["Row"]>;
      };
      warehouses: {
        Row: {
          id: string;
          warehouse_name: string;
          warehouse_code: string;
          country: string;
          city: string;
          capacity: number | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["warehouses"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["warehouses"]["Row"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          action: string;
          table_name: string;
          record_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]>;
      };
      // ---- Phase 2 ----
      branches: {
        Row: {
          id: string;
          branch_name: string;
          branch_code: string;
          city: string;
          country: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["branches"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["branches"]["Row"]>;
      };
      vehicles: {
        Row: {
          id: string;
          plate_number: string;
          vehicle_type: string;
          capacity_kg: number | null;
          status: "Active" | "Maintenance" | "Inactive";
          branch_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Row"]>;
      };
      drivers: {
        Row: {
          id: string;
          profile_id: string;
          license_number: string;
          vehicle_id: string | null;
          branch_id: string | null;
          status: "Active" | "Off Duty" | "Suspended";
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["drivers"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["drivers"]["Row"]>;
      };
      driver_assistants: {
        Row: {
          id: string;
          profile_id: string;
          driver_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["driver_assistants"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["driver_assistants"]["Row"]>;
      };
      containers: {
        Row: {
          id: string;
          container_number: string;
          container_type: string;
          status: "Empty" | "Loading" | "In Transit" | "Delivered";
          warehouse_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["containers"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["containers"]["Row"]>;
      };
      payments: {
        Row: {
          id: string;
          invoice_id: string;
          amount: number;
          method: string;
          paid_at: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
      };
      vehicle_expenses: {
        Row: {
          id: string;
          vehicle_id: string;
          expense_type: string;
          amount: number;
          expense_date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicle_expenses"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["vehicle_expenses"]["Row"]>;
      };
    };
  };
}
