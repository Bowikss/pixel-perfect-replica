export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          budget_cents: number
          celebrate_anniversary: boolean
          celebrate_birthday: boolean
          celebrate_name_day: boolean
          celebrate_new_hire: boolean
          city: string | null
          created_at: string
          delivery_window: string
          holiday_shift: Database["public"]["Enums"]["holiday_shift"]
          id: string
          invite_token: string
          locale: string
          logo_url: string | null
          name: string
          onboarded: boolean
          trial_ends_at: string
        }
        Insert: {
          budget_cents?: number
          celebrate_anniversary?: boolean
          celebrate_birthday?: boolean
          celebrate_name_day?: boolean
          celebrate_new_hire?: boolean
          city?: string | null
          created_at?: string
          delivery_window?: string
          holiday_shift?: Database["public"]["Enums"]["holiday_shift"]
          id?: string
          invite_token?: string
          locale?: string
          logo_url?: string | null
          name: string
          onboarded?: boolean
          trial_ends_at?: string
        }
        Update: {
          budget_cents?: number
          celebrate_anniversary?: boolean
          celebrate_birthday?: boolean
          celebrate_name_day?: boolean
          celebrate_new_hire?: boolean
          city?: string | null
          created_at?: string
          delivery_window?: string
          holiday_shift?: Database["public"]["Enums"]["holiday_shift"]
          id?: string
          invite_token?: string
          locale?: string
          logo_url?: string | null
          name?: string
          onboarded?: boolean
          trial_ends_at?: string
        }
        Relationships: []
      }
      employee_profiles: {
        Row: {
          alt_treat: string | null
          birth_date: string | null
          cake_flavour: string | null
          celebration_style: Database["public"]["Enums"]["celebration_style"]
          company_id: string
          created_at: string
          dietary: string[]
          dietary_notes: string | null
          email: string | null
          first_name: string
          hide_birth_year: boolean
          home_address: string | null
          id: string
          is_remote: boolean
          last_name: string | null
          name_day_day: number | null
          name_day_month: number | null
          office_id: string | null
          profile_complete: boolean
          start_date: string | null
          team: string | null
          user_id: string | null
        }
        Insert: {
          alt_treat?: string | null
          birth_date?: string | null
          cake_flavour?: string | null
          celebration_style?: Database["public"]["Enums"]["celebration_style"]
          company_id: string
          created_at?: string
          dietary?: string[]
          dietary_notes?: string | null
          email?: string | null
          first_name: string
          hide_birth_year?: boolean
          home_address?: string | null
          id?: string
          is_remote?: boolean
          last_name?: string | null
          name_day_day?: number | null
          name_day_month?: number | null
          office_id?: string | null
          profile_complete?: boolean
          start_date?: string | null
          team?: string | null
          user_id?: string | null
        }
        Update: {
          alt_treat?: string | null
          birth_date?: string | null
          cake_flavour?: string | null
          celebration_style?: Database["public"]["Enums"]["celebration_style"]
          company_id?: string
          created_at?: string
          dietary?: string[]
          dietary_notes?: string | null
          email?: string | null
          first_name?: string
          hide_birth_year?: boolean
          home_address?: string | null
          id?: string
          is_remote?: boolean
          last_name?: string | null
          name_day_day?: number | null
          name_day_month?: number | null
          office_id?: string | null
          profile_complete?: boolean
          start_date?: string | null
          team?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_profiles_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      name_days: {
        Row: {
          day: number
          id: string
          month: number
          name: string
        }
        Insert: {
          day: number
          id?: string
          month: number
          name: string
        }
        Update: {
          day?: number
          id?: string
          month?: number
          name?: string
        }
        Relationships: []
      }
      offices: {
        Row: {
          address: string
          city: string | null
          company_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          address: string
          city?: string | null
          company_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          address?: string
          city?: string | null
          company_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "offices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_company_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "company_admin" | "employee" | "partner"
      celebration_style: "loud" | "small" | "quiet"
      holiday_shift: "friday_before" | "monday_after"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "company_admin", "employee", "partner"],
      celebration_style: ["loud", "small", "quiet"],
      holiday_shift: ["friday_before", "monday_after"],
    },
  },
} as const
