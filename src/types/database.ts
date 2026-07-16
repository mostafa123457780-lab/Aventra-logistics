export type UserRole =
  | "CUSTOMER"
  | "ADMIN"
  | "OPERATIONS_MANAGER"
  | "ACCOUNTANT"
  | "WAREHOUSE_MANAGER"
  | "WAREHOUSE_EMPLOYEE"
  | "DRIVER";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string;
          created_at: string | null;
          id: string;
          new_data: Json | null;
          old_data: Json | null;
          record_id: string | null;
          table_name: string;
          user_id: string | null;
        };
        Insert: {
          action: string;
          created_at?: string | null;
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          record_id?: string | null;
          table_name: string;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          created_at?: string | null;
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          record_id?: string | null;
          table_name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      containers: {
        Row: {
          container_number: string;
          container_size: string | null;
          container_type: string | null;
          id: string;
          location: string | null;
          shipment_id: string | null;
          status: string | null;
        };
        Insert: {
          container_number: string;
          container_size?: string | null;
          container_type?: string | null;
          id?: string;
          location?: string | null;
          shipment_id?: string | null;
          status?: string | null;
        };
        Update: {
          container_number?: string;
          container_size?: string | null;
          container_type?: string | null;
          id?: string;
          location?: string | null;
          shipment_id?: string | null;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "containers_shipment_id_fkey";
            columns: ["shipment_id"];
            isOneToOne: false;
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          }
        ];
      };
      customers: {
        Row: {
          address: string | null;
          company_name: string | null;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          notes: string | null;
          profile_id: string | null;
        };
        Insert: {
          address?: string | null;
          company_name?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          profile_id?: string | null;
        };
        Update: {
          address?: string | null;
          company_name?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      documents: {
        Row: {
          entity_id: string;
          entity_type: string;
          file_url: string;
          id: string;
          uploaded_at: string | null;
        };
        Insert: {
          entity_id: string;
          entity_type: string;
          file_url: string;
          id?: string;
          uploaded_at?: string | null;
        };
        Update: {
          entity_id?: string;
          entity_type?: string;
          file_url?: string;
          id?: string;
          uploaded_at?: string | null;
        };
        Relationships: [];
      };
      drivers: {
        Row: {
          address: string | null;
          availability: string;
          date_of_birth: string | null;
          deleted_at: string | null;
          hire_date: string | null;
          id: string;
          license_expiry: string | null;
          license_number: string;
          national_id: string | null;
          notes: string | null;
          photo_url: string | null;
          profile_id: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          availability?: string;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          hire_date?: string | null;
          id?: string;
          license_expiry?: string | null;
          license_number: string;
          national_id?: string | null;
          notes?: string | null;
          photo_url?: string | null;
          profile_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          availability?: string;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          hire_date?: string | null;
          id?: string;
          license_expiry?: string | null;
          license_number?: string;
          national_id?: string | null;
          notes?: string | null;
          photo_url?: string | null;
          profile_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "drivers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      expenses: {
        Row: {
          amount: number;
          created_at: string | null;
          expense_type: string | null;
          id: string;
          notes: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          expense_type?: string | null;
          id?: string;
          notes?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          expense_type?: string | null;
          id?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      inventory: {
        Row: {
          id: string;
          item_name: string;
          quantity: number;
          shipment_id: string | null;
          sku: string | null;
          status: string | null;
          warehouse_id: string | null;
        };
        Insert: {
          id?: string;
          item_name: string;
          quantity?: number;
          shipment_id?: string | null;
          sku?: string | null;
          status?: string | null;
          warehouse_id?: string | null;
        };
        Update: {
          id?: string;
          item_name?: string;
          quantity?: number;
          shipment_id?: string | null;
          sku?: string | null;
          status?: string | null;
          warehouse_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_shipment_id_fkey";
            columns: ["shipment_id"];
            isOneToOne: false;
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_warehouse_id_fkey";
            columns: ["warehouse_id"];
            isOneToOne: false;
            referencedRelation: "warehouses";
            referencedColumns: ["id"];
          }
        ];
      };
      invoices: {
        Row: {
          amount: number;
          created_at: string | null;
          customer_id: string | null;
          deleted_at: string | null;
          id: string;
          invoice_number: string;
          payment_status: string;
          shipment_id: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          customer_id?: string | null;
          deleted_at?: string | null;
          id?: string;
          invoice_number: string;
          payment_status?: string;
          shipment_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          customer_id?: string | null;
          deleted_at?: string | null;
          id?: string;
          invoice_number?: string;
          payment_status?: string;
          shipment_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_shipment_id_fkey";
            columns: ["shipment_id"];
            isOneToOne: false;
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          created_by: string | null;
          customer_id: string;
          deleted_at: string | null;
          id: string;
          notes: string | null;
          order_date: string;
          order_number: string;
          payment_status: string;
          status: string;
          total_amount: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          customer_id: string;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          order_number: string;
          payment_status?: string;
          status?: string;
          total_amount?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          customer_id?: string;
          deleted_at?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          order_number?: string;
          payment_status?: string;
          status?: string;
          total_amount?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          amount: number;
          id: string;
          invoice_id: string | null;
          payment_date: string | null;
          payment_method: string | null;
        };
        Insert: {
          amount: number;
          id?: string;
          invoice_id?: string | null;
          payment_date?: string | null;
          payment_method?: string | null;
        };
        Update: {
          amount?: number;
          id?: string;
          invoice_id?: string | null;
          payment_date?: string | null;
          payment_method?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
          phone: string | null;
          role: UserRole;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          full_name: string;
          id?: string;
          phone?: string | null;
          role: UserRole;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
          phone?: string | null;
          role?: UserRole;
        };
        Relationships: [];
      };
      requests: {
        Row: {
          created_at: string | null;
          customer_id: string | null;
          description: string | null;
          id: string;
          request_type: string;
          status: string | null;
        };
        Insert: {
          created_at?: string | null;
          customer_id?: string | null;
          description?: string | null;
          id?: string;
          request_type: string;
          status?: string | null;
        };
        Update: {
          created_at?: string | null;
          customer_id?: string | null;
          description?: string | null;
          id?: string;
          request_type?: string;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "requests_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      shipment_tracking: {
        Row: {
          created_at: string | null;
          id: string;
          location: string | null;
          notes: string | null;
          shipment_id: string | null;
          status: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          location?: string | null;
          notes?: string | null;
          shipment_id?: string | null;
          status: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          location?: string | null;
          notes?: string | null;
          shipment_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shipment_tracking_shipment_id_fkey";
            columns: ["shipment_id"];
            isOneToOne: false;
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          }
        ];
      };
      shipments: {
        Row: {
          cost: number | null;
          created_at: string | null;
          customer_id: string | null;
          deleted_at: string | null;
          destination: string;
          driver_id: string | null;
          id: string;
          order_id: string;
          origin: string;
          package_count: number | null;
          payment_status: string | null;
          service_type: string;
          status: string;
          tracking_number: string;
          vehicle_id: string | null;
          volume: number | null;
          warehouse_id: string | null;
          weight: number | null;
        };
        Insert: {
          cost?: number | null;
          created_at?: string | null;
          customer_id?: string | null;
          deleted_at?: string | null;
          destination: string;
          driver_id?: string | null;
          id?: string;
          order_id: string;
          origin: string;
          package_count?: number | null;
          payment_status?: string | null;
          service_type: string;
          status?: string;
          tracking_number: string;
          vehicle_id?: string | null;
          volume?: number | null;
          warehouse_id?: string | null;
          weight?: number | null;
        };
        Update: {
          cost?: number | null;
          created_at?: string | null;
          customer_id?: string | null;
          deleted_at?: string | null;
          destination?: string;
          driver_id?: string | null;
          id?: string;
          order_id?: string;
          origin?: string;
          package_count?: number | null;
          payment_status?: string | null;
          service_type?: string;
          status?: string;
          tracking_number?: string;
          vehicle_id?: string | null;
          volume?: number | null;
          warehouse_id?: string | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "shipments_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shipments_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shipments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shipments_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shipments_warehouse_id_fkey";
            columns: ["warehouse_id"];
            isOneToOne: false;
            referencedRelation: "warehouses";
            referencedColumns: ["id"];
          }
        ];
      };
      trips: {
        Row: {
          arrival_date: string | null;
          departure_date: string | null;
          destination: string | null;
          driver_id: string | null;
          id: string;
          origin: string | null;
          status: string | null;
          trip_number: string;
          vehicle_id: string | null;
        };
        Insert: {
          arrival_date?: string | null;
          departure_date?: string | null;
          destination?: string | null;
          driver_id?: string | null;
          id?: string;
          origin?: string | null;
          status?: string | null;
          trip_number: string;
          vehicle_id?: string | null;
        };
        Update: {
          arrival_date?: string | null;
          departure_date?: string | null;
          destination?: string | null;
          driver_id?: string | null;
          id?: string;
          origin?: string | null;
          status?: string | null;
          trip_number?: string;
          vehicle_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "trips_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trips_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          }
        ];
      };
      vehicle_maintenance: {
        Row: {
          cost: number | null;
          created_at: string;
          description: string | null;
          id: string;
          maintenance_type: string;
          next_due_date: string | null;
          odometer_at_service: number | null;
          performed_at: string;
          performed_by: string | null;
          vehicle_id: string;
        };
        Insert: {
          cost?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          maintenance_type: string;
          next_due_date?: string | null;
          odometer_at_service?: number | null;
          performed_at?: string;
          performed_by?: string | null;
          vehicle_id: string;
        };
        Update: {
          cost?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          maintenance_type?: string;
          next_due_date?: string | null;
          odometer_at_service?: number | null;
          performed_at?: string;
          performed_by?: string | null;
          vehicle_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          }
        ];
      };
      vehicles: {
        Row: {
          assigned_driver_id: string | null;
          capacity: number | null;
          deleted_at: string | null;
          fuel_type: string | null;
          id: string;
          insurance_expiry: string | null;
          last_maintenance_date: string | null;
          make: string | null;
          model: string | null;
          next_maintenance_date: string | null;
          notes: string | null;
          odometer: number | null;
          plate_number: string;
          status: string | null;
          updated_at: string;
          vehicle_number: string;
          vehicle_type: string | null;
          year: number | null;
        };
        Insert: {
          assigned_driver_id?: string | null;
          capacity?: number | null;
          deleted_at?: string | null;
          fuel_type?: string | null;
          id?: string;
          insurance_expiry?: string | null;
          last_maintenance_date?: string | null;
          make?: string | null;
          model?: string | null;
          next_maintenance_date?: string | null;
          notes?: string | null;
          odometer?: number | null;
          plate_number: string;
          status?: string | null;
          updated_at?: string;
          vehicle_number: string;
          vehicle_type?: string | null;
          year?: number | null;
        };
        Update: {
          assigned_driver_id?: string | null;
          capacity?: number | null;
          deleted_at?: string | null;
          fuel_type?: string | null;
          id?: string;
          insurance_expiry?: string | null;
          last_maintenance_date?: string | null;
          make?: string | null;
          model?: string | null;
          next_maintenance_date?: string | null;
          notes?: string | null;
          odometer?: number | null;
          plate_number?: string;
          status?: string | null;
          updated_at?: string;
          vehicle_number?: string;
          vehicle_type?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "vehicles_assigned_driver_id_fkey";
            columns: ["assigned_driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          }
        ];
      };
      warehouse_locations: {
        Row: {
          bin: string | null;
          id: string;
          rack: string | null;
          shelf: string | null;
          warehouse_id: string | null;
          zone: string | null;
        };
        Insert: {
          bin?: string | null;
          id?: string;
          rack?: string | null;
          shelf?: string | null;
          warehouse_id?: string | null;
          zone?: string | null;
        };
        Update: {
          bin?: string | null;
          id?: string;
          rack?: string | null;
          shelf?: string | null;
          warehouse_id?: string | null;
          zone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "warehouse_locations_warehouse_id_fkey";
            columns: ["warehouse_id"];
            isOneToOne: false;
            referencedRelation: "warehouses";
            referencedColumns: ["id"];
          }
        ];
      };
      warehouses: {
        Row: {
          address: string | null;
          capacity: number | null;
          city: string;
          country: string;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          warehouse_code: string;
          warehouse_name: string;
        };
        Insert: {
          address?: string | null;
          capacity?: number | null;
          city: string;
          country: string;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          warehouse_code: string;
          warehouse_name: string;
        };
        Update: {
          address?: string | null;
          capacity?: number | null;
          city?: string;
          country?: string;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          warehouse_code?: string;
          warehouse_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
