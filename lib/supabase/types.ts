export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          tags: string[];
          thumbnail: string | null;
          author_name: string;
          author_image: string | null;
          meta_title: string | null;
          meta_description: string | null;
          meta_image: string | null;
          noindex: boolean | null;
          published: boolean;
          scheduled_for: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          tags: string[];
          thumbnail?: string | null;
          author_name: string;
          author_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_image?: string | null;
          noindex?: boolean | null;
          published?: boolean;
          scheduled_for?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          read_time?: string;
          tags?: string[];
          thumbnail?: string | null;
          author_name?: string;
          author_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_image?: string | null;
          noindex?: boolean | null;
          published?: boolean;
          scheduled_for?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          source: string;
          status: 'active' | 'unsubscribed' | 'bounced';
          subscribed_at: string;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          source?: string;
          status?: 'active' | 'unsubscribed' | 'bounced';
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          source?: string;
          status?: 'active' | 'unsubscribed' | 'bounced';
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string | null;
          message: string;
          source: string;
          status: 'new' | 'read' | 'replied' | 'archived';
          read_at: string | null;
          replied_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message: string;
          source?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          read_at?: string | null;
          replied_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message?: string;
          source?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          read_at?: string | null;
          replied_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          role: string | null;
          content: string;
          image_url: string | null;
          rating: number | null;
          featured: boolean;
          published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company?: string | null;
          role?: string | null;
          content: string;
          image_url?: string | null;
          rating?: number | null;
          featured?: boolean;
          published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company?: string | null;
          role?: string | null;
          content?: string;
          image_url?: string | null;
          rating?: number | null;
          featured?: boolean;
          published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          display_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          company: string | null;
          website: string | null;
          source: string;
          status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
          priority: 'low' | 'medium' | 'high';
          estimated_value: number | null;
          notes: string | null;
          tags: string[] | null;
          assigned_to: string | null;
          last_contact_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          source?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
          priority?: 'low' | 'medium' | 'high';
          estimated_value?: number | null;
          notes?: string | null;
          tags?: string[] | null;
          assigned_to?: string | null;
          last_contact_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          source?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
          priority?: 'low' | 'medium' | 'high';
          estimated_value?: number | null;
          notes?: string | null;
          tags?: string[] | null;
          assigned_to?: string | null;
          last_contact_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      redirects: {
        Row: {
          id: string;
          from_path: string;
          to_path: string;
          redirect_type: number;
          active: boolean;
          hit_count: number;
          last_hit_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          from_path: string;
          to_path: string;
          redirect_type?: number;
          active?: boolean;
          hit_count?: number;
          last_hit_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          from_path?: string;
          to_path?: string;
          redirect_type?: number;
          active?: boolean;
          hit_count?: number;
          last_hit_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string | null;
          image_url: string | null;
          email: string | null;
          phone: string | null;
          linkedin: string | null;
          twitter: string | null;
          instagram: string | null;
          display_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          bio?: string | null;
          image_url?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          instagram?: string | null;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          bio?: string | null;
          image_url?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          instagram?: string | null;
          display_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolio_items: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client: string | null;
          category: string | null;
          excerpt: string | null;
          content: string | null;
          challenge: string | null;
          solution: string | null;
          results: string | null;
          image_url: string | null;
          gallery: string[] | null;
          tags: string[] | null;
          metrics: Json;
          testimonial_id: string | null;
          featured: boolean;
          published: boolean;
          published_at: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client?: string | null;
          category?: string | null;
          excerpt?: string | null;
          content?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: string | null;
          image_url?: string | null;
          gallery?: string[] | null;
          tags?: string[] | null;
          metrics?: Json;
          testimonial_id?: string | null;
          featured?: boolean;
          published?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          client?: string | null;
          category?: string | null;
          excerpt?: string | null;
          content?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: string | null;
          image_url?: string | null;
          gallery?: string[] | null;
          tags?: string[] | null;
          metrics?: Json;
          testimonial_id?: string | null;
          featured?: boolean;
          published?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      email_templates: {
        Row: {
          id: string;
          name: string;
          subject: string;
          preview_text: string | null;
          html_content: string;
          design_json: Json | null;
          category: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject: string;
          preview_text?: string | null;
          html_content: string;
          design_json?: Json | null;
          category?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subject?: string;
          preview_text?: string | null;
          html_content?: string;
          design_json?: Json | null;
          category?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      email_campaigns: {
        Row: {
          id: string;
          name: string;
          subject: string;
          preview_text: string | null;
          html_content: string;
          template_id: string | null;
          status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
          scheduled_for: string | null;
          sent_at: string | null;
          total_recipients: number;
          sent_count: number;
          open_count: number;
          click_count: number;
          bounce_count: number;
          unsubscribe_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject: string;
          preview_text?: string | null;
          html_content: string;
          template_id?: string | null;
          status?: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
          scheduled_for?: string | null;
          sent_at?: string | null;
          total_recipients?: number;
          sent_count?: number;
          open_count?: number;
          click_count?: number;
          bounce_count?: number;
          unsubscribe_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subject?: string;
          preview_text?: string | null;
          html_content?: string;
          template_id?: string | null;
          status?: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
          scheduled_for?: string | null;
          sent_at?: string | null;
          total_recipients?: number;
          sent_count?: number;
          open_count?: number;
          click_count?: number;
          bounce_count?: number;
          unsubscribe_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Blog Posts
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

// Newsletter Subscribers
export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert'];
export type NewsletterSubscriberUpdate = Database['public']['Tables']['newsletter_subscribers']['Update'];

// Contact Submissions
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

// Testimonials
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];
export type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

// FAQs
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type FAQInsert = Database['public']['Tables']['faqs']['Insert'];
export type FAQUpdate = Database['public']['Tables']['faqs']['Update'];

// Leads
export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];

// Redirects
export type Redirect = Database['public']['Tables']['redirects']['Row'];
export type RedirectInsert = Database['public']['Tables']['redirects']['Insert'];
export type RedirectUpdate = Database['public']['Tables']['redirects']['Update'];

// Team Members
export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert'];
export type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update'];

// Portfolio Items
export type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
export type PortfolioItemInsert = Database['public']['Tables']['portfolio_items']['Insert'];
export type PortfolioItemUpdate = Database['public']['Tables']['portfolio_items']['Update'];

// Email Templates
export type EmailTemplate = Database['public']['Tables']['email_templates']['Row'];
export type EmailTemplateInsert = Database['public']['Tables']['email_templates']['Insert'];
export type EmailTemplateUpdate = Database['public']['Tables']['email_templates']['Update'];

// Email Campaigns
export type EmailCampaign = Database['public']['Tables']['email_campaigns']['Row'];
export type EmailCampaignInsert = Database['public']['Tables']['email_campaigns']['Insert'];
export type EmailCampaignUpdate = Database['public']['Tables']['email_campaigns']['Update'];
