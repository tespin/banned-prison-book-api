export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          date: string | null
          id: string
          publication: string | null
          reason: string | null
          state_arc: string | null
          showMore: boolean
          isSelected: boolean
        }
        Insert: {
          author?: string | null
          date?: string | null
          id?: string
          publication?: string | null
          reason?: string | null
          state_arc?: string | null
        }
        Update: {
          author?: string | null
          date?: string | null
          id?: string
          publication?: string | null
          reason?: string | null
          state_arc?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];