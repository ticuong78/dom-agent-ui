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
      contacts: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          is_subscribed: boolean
          lifecycle_stage: Database["public"]["Enums"]["lifecycle_stage"]
          message: string | null
          name: string | null
          phone: string | null
          sent_welcomed_at: string | null
          source: string | null
          unsubscribed_at: string | null
          updated_at: string
          visitor_id: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id?: string
          is_subscribed?: boolean
          lifecycle_stage?: Database["public"]["Enums"]["lifecycle_stage"]
          message?: string | null
          name?: string | null
          phone?: string | null
          sent_welcomed_at?: string | null
          source?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
          visitor_id?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          is_subscribed?: boolean
          lifecycle_stage?: Database["public"]["Enums"]["lifecycle_stage"]
          message?: string | null
          name?: string | null
          phone?: string | null
          sent_welcomed_at?: string | null
          source?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_logs: {
        Row: {
          event_type_id: string
          id: string
          occurred_at: string
          page: string | null
          payload: Json | null
          visit_session_id: string
          visitor_id: string
        }
        Insert: {
          event_type_id: string
          id?: string
          occurred_at?: string
          page?: string | null
          payload?: Json | null
          visit_session_id: string
          visitor_id: string
        }
        Update: {
          event_type_id?: string
          id?: string
          occurred_at?: string
          page?: string | null
          payload?: Json | null
          visit_session_id?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_logs_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_logs_visit_session_id_fkey"
            columns: ["visit_session_id"]
            isOneToOne: false
            referencedRelation: "visit_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_logs_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          category: string
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_stage_history: {
        Row: {
          created_at: string
          id: string
          product_stage: Database["public"]["Enums"]["product_stage"]
        }
        Insert: {
          created_at?: string
          id?: string
          product_stage?: Database["public"]["Enums"]["product_stage"]
        }
        Update: {
          created_at?: string
          id?: string
          product_stage?: Database["public"]["Enums"]["product_stage"]
        }
        Relationships: []
      }
      visit_sessions: {
        Row: {
          browser: string | null
          browser_version: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: Database["public"]["Enums"]["device_type"] | null
          ended_at: string | null
          event_count: number
          exit_page: string | null
          id: string
          landing_page: string
          language: string | null
          os: string | null
          os_version: string | null
          page_views: number
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          started_at: string
          timezone: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: Database["public"]["Enums"]["device_type"] | null
          ended_at?: string | null
          event_count?: number
          exit_page?: string | null
          id?: string
          landing_page: string
          language?: string | null
          os?: string | null
          os_version?: string | null
          page_views?: number
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          started_at?: string
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: Database["public"]["Enums"]["device_type"] | null
          ended_at?: string | null
          event_count?: number
          exit_page?: string | null
          id?: string
          landing_page?: string
          language?: string | null
          os?: string | null
          os_version?: string | null
          page_views?: number
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          started_at?: string
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visit_sessions_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          created_at: string
          first_seen_at: string
          id: string
          last_seen_at: string
          total_sessions: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          total_sessions?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          total_sessions?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      device_type:
        | "mobile"
        | "tablet"
        | "desktop"
        | "tv"
        | "wearable"
        | "bot"
        | "unknown"
      lifecycle_stage: "subscriber" | "lead" | "trial" | "customer" | "churned"
      product_stage:
        | "concept"
        | "pre_launch"
        | "alpha"
        | "closed_beta"
        | "open_beta"
        | "release_candidate"
        | "ga"
        | "growth"
        | "mature"
        | "maintenance"
        | "deprecated"
        | "sunset"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      device_type: [
        "mobile",
        "tablet",
        "desktop",
        "tv",
        "wearable",
        "bot",
        "unknown",
      ],
      lifecycle_stage: ["subscriber", "lead", "trial", "customer", "churned"],
      product_stage: [
        "concept",
        "pre_launch",
        "alpha",
        "closed_beta",
        "open_beta",
        "release_candidate",
        "ga",
        "growth",
        "mature",
        "maintenance",
        "deprecated",
        "sunset",
      ],
    },
  },
} as const
