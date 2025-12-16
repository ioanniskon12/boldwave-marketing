'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666666;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: 0;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  border: none;
  color: ${({ $active }) => ($active ? '#ff8c42' : '#666666')};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #ff8c42;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ $active }) => ($active ? '#ff8c42' : '#1a1a1a')};
  }
`;

const PagesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PageCard = styled.div<{ $expanded: boolean }>`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PageCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #fafafa;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PageIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PageDetails = styled.div``;

const PageName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
`;

const PagePath = styled.div`
  font-size: 13px;
  color: #999999;
`;

const StatusBadge = styled.span<{ $configured: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $configured }) => ($configured ? '#dcfce7' : '#f5f5f5')};
  color: ${({ $configured }) => ($configured ? '#16a34a' : '#999999')};
`;

const ExpandIcon = styled.div<{ $expanded: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0')});
`;

const PageCardContent = styled.div<{ $expanded: boolean }>`
  display: ${({ $expanded }) => ($expanded ? 'block' : 'none')};
  padding: 0 24px 24px;
  border-top: 1px solid #f0f0f0;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
  padding-top: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const LabelHint = styled.span`
  font-weight: 400;
  color: #999999;
  margin-left: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const CharCount = styled.div<{ $warning?: boolean }>`
  font-size: 11px;
  color: ${({ $warning }) => ($warning ? '#d97706' : '#999999')};
  text-align: right;
  margin-top: 4px;
`;

const ImageUploadArea = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 63px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cccccc;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
  }

  input {
    display: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const RemoveImageButton = styled.button`
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #dc2626;
  background: #fef2f2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
  }
`;

const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #ff8c42;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    background: #e67d35;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #16a34a;
  font-size: 14px;
  margin-bottom: 24px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 24px;
`;

const GlobalSettingsCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
`;

// Define all website pages
const websitePages = [
  // Main Pages
  { path: '/', name: 'Home', icon: 'home', category: 'main' },
  { path: '/about', name: 'About Us', icon: 'users', category: 'main' },
  { path: '/services', name: 'Services', icon: 'briefcase', category: 'main' },
  { path: '/portfolio', name: 'Portfolio', icon: 'folder', category: 'main' },
  { path: '/blog', name: 'Blog', icon: 'edit', category: 'main' },
  { path: '/contact', name: 'Contact', icon: 'mail', category: 'main' },
  { path: '/faq', name: 'FAQ', icon: 'help', category: 'main' },
  { path: '/team', name: 'Team', icon: 'users', category: 'main' },
  { path: '/privacy', name: 'Privacy Policy', icon: 'shield', category: 'main' },
  { path: '/terms', name: 'Terms of Service', icon: 'file', category: 'main' },
  { path: '/landing', name: 'Landing Page', icon: 'layout', category: 'main' },
  // Service Pages
  { path: '/services/social-media-management', name: 'Social Media Management', icon: 'service', category: 'services' },
  { path: '/services/content-creation', name: 'Content Creation', icon: 'service', category: 'services' },
  { path: '/services/branding-creative-direction', name: 'Branding & Creative Direction', icon: 'service', category: 'services' },
  { path: '/services/paid-advertising', name: 'Paid Advertising', icon: 'service', category: 'services' },
  { path: '/services/website-development', name: 'Custom Website Development', icon: 'service', category: 'services' },
  { path: '/services/ui-ux-design', name: 'UI/UX Design', icon: 'service', category: 'services' },
  { path: '/services/seo-content-writing', name: 'SEO & Content Writing', icon: 'service', category: 'services' },
  { path: '/services/email-marketing', name: 'Email Marketing', icon: 'service', category: 'services' },
  { path: '/services/influencer-partnerships', name: 'Influencer & Creator Partnerships', icon: 'service', category: 'services' },
  { path: '/services/marketing-strategy', name: 'Marketing Strategy & Consulting', icon: 'service', category: 'services' },
  { path: '/services/full-funnel-setup', name: 'Full Funnel Setup', icon: 'service', category: 'services' },
  // Portfolio / Case Study Pages
  { path: '/portfolio/ecommerce-fashion-brand', name: 'StyleVerse Case Study', icon: 'casestudy', category: 'portfolio' },
  { path: '/portfolio/saas-platform-growth', name: 'CloudMetrics Case Study', icon: 'casestudy', category: 'portfolio' },
  { path: '/portfolio/health-wellness-brand', name: 'VitalGlow Case Study', icon: 'casestudy', category: 'portfolio' },
  { path: '/portfolio/real-estate-agency', name: 'PrimeProperties Case Study', icon: 'casestudy', category: 'portfolio' },
  { path: '/portfolio/fitness-app-launch', name: 'FitTrack Pro Case Study', icon: 'casestudy', category: 'portfolio' },
  { path: '/portfolio/restaurant-chain', name: 'Urban Bites Case Study', icon: 'casestudy', category: 'portfolio' },
];

interface PageMeta {
  title: string;
  description: string;
  image: string;
}

interface AllPagesMeta {
  [path: string]: PageMeta;
}

interface GlobalSettings {
  site_name: string;
  default_image: string;
  twitter_handle: string;
}

const defaultGlobalSettings: GlobalSettings = {
  site_name: 'Owl Marketing Hub',
  default_image: '',
  twitter_handle: '@owlmarketinghub',
};

const SectionHeader = styled.div<{ $clickable?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }

  &:first-of-type {
    margin-top: 0;
  }
`;

const SectionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionExpandIcon = styled.div<{ $expanded: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0')});
`;

const SectionCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  background: #e5e5e5;
  color: #999999;
  padding: 2px 8px;
  border-radius: 10px;
`;

const getIcon = (type: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    service: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    casestudy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    help: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    file: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    layout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  };
  return icons[type] || icons.file;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'pages' | 'global'>('pages');
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    main: true,
    services: true,
    portfolio: true,
  });
  const [pagesMeta, setPagesMeta] = useState<AllPagesMeta>({});
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(defaultGlobalSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const supabase = createClient();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch pages meta
        const { data: pagesData } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'pages_meta')
          .single();

        if (pagesData) {
          const settingsData = pagesData as { value: AllPagesMeta };
          setPagesMeta(settingsData.value);
        }

        // Fetch global settings
        const { data: globalData } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'global_seo')
          .single();

        if (globalData) {
          const settingsData = globalData as { value: GlobalSettings };
          setGlobalSettings(settingsData.value);
        }
      } catch (err) {
        // Use defaults
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handlePageMetaChange = (path: string, field: keyof PageMeta, value: string) => {
    setPagesMeta((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        [field]: value,
      },
    }));
    setSuccess('');
    setError('');
  };

  const handleGlobalChange = (field: keyof GlobalSettings, value: string) => {
    setGlobalSettings((prev) => ({ ...prev, [field]: value }));
    setSuccess('');
    setError('');
  };

  const handleImageUpload = async (path: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `seo/${path.replace(/\//g, '-') || 'home'}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      handlePageMetaChange(path, 'image', publicUrl);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleGlobalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `seo/default-og-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      handleGlobalChange('default_image', publicUrl);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const savePageMeta = async (path: string) => {
    setSaving(path);
    setSuccess('');
    setError('');

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'pages_meta',
          value: pagesMeta,
          updated_at: new Date().toISOString(),
        } as never, {
          onConflict: 'key'
        });

      if (error) throw error;

      setSuccess(`SEO settings for "${websitePages.find(p => p.path === path)?.name}" saved!`);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(null);
    }
  };

  const saveGlobalSettings = async () => {
    setSaving('global');
    setSuccess('');
    setError('');

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'global_seo',
          value: globalSettings,
          updated_at: new Date().toISOString(),
        } as never, {
          onConflict: 'key'
        });

      if (error) throw error;

      setSuccess('Global settings saved!');
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(null);
    }
  };

  const isPageConfigured = (path: string): boolean => {
    const meta = pagesMeta[path];
    return !!(meta && (meta.title || meta.description || meta.image));
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading settings...</div>;
  }

  return (
    <>
      <PageHeader>
        <Title>SEO Settings</Title>
        <Subtitle>Manage meta titles, descriptions, and images for all pages.</Subtitle>
      </PageHeader>

      {success && <SuccessMessage>{success}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TabsContainer>
        <Tab $active={activeTab === 'pages'} onClick={() => setActiveTab('pages')}>
          Page Settings
        </Tab>
        <Tab $active={activeTab === 'global'} onClick={() => setActiveTab('global')}>
          Global Settings
        </Tab>
      </TabsContainer>

      {activeTab === 'pages' && (
        <PagesGrid>
          <SectionHeader onClick={() => toggleSection('main')}>
            <SectionHeaderLeft>
              Main Pages
              <SectionCount>{websitePages.filter(p => p.category === 'main').length}</SectionCount>
            </SectionHeaderLeft>
            <SectionExpandIcon $expanded={expandedSections.main}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </SectionExpandIcon>
          </SectionHeader>
          {expandedSections.main && websitePages.filter(p => p.category === 'main').map((page) => (
            <PageCard key={page.path} $expanded={expandedPage === page.path}>
              <PageCardHeader onClick={() => setExpandedPage(expandedPage === page.path ? null : page.path)}>
                <PageInfo>
                  <PageIcon>{getIcon(page.icon)}</PageIcon>
                  <PageDetails>
                    <PageName>{page.name}</PageName>
                    <PagePath>{page.path}</PagePath>
                  </PageDetails>
                </PageInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <StatusBadge $configured={isPageConfigured(page.path)}>
                    {isPageConfigured(page.path) ? 'Configured' : 'Not set'}
                  </StatusBadge>
                  <ExpandIcon $expanded={expandedPage === page.path}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </ExpandIcon>
                </div>
              </PageCardHeader>

              <PageCardContent $expanded={expandedPage === page.path}>
                <FormGrid>
                  <FormGroup $fullWidth>
                    <Label>
                      Meta Title
                      <LabelHint>(60 chars max)</LabelHint>
                    </Label>
                    <Input
                      placeholder={`${page.name} | Owl Marketing Hub`}
                      value={pagesMeta[page.path]?.title || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'title', e.target.value)}
                      maxLength={60}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.title?.length || 0) > 50}>
                      {pagesMeta[page.path]?.title?.length || 0}/60
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>
                      Meta Description
                      <LabelHint>(160 chars max)</LabelHint>
                    </Label>
                    <Textarea
                      placeholder="Brief description of this page for search engines..."
                      value={pagesMeta[page.path]?.description || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'description', e.target.value)}
                      maxLength={160}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.description?.length || 0) > 140}>
                      {pagesMeta[page.path]?.description?.length || 0}/160
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>OG Image (1200x630 recommended)</Label>
                    <ImageUploadArea>
                      <ImagePreview>
                        {pagesMeta[page.path]?.image ? (
                          <img src={pagesMeta[page.path].image} alt="OG Preview" />
                        ) : (
                          <ImagePlaceholder>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </ImagePlaceholder>
                        )}
                      </ImagePreview>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <ImageUploadButton>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(page.path, e)}
                          />
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          {imageUploading ? 'Uploading...' : 'Upload'}
                        </ImageUploadButton>
                        {pagesMeta[page.path]?.image && (
                          <RemoveImageButton onClick={() => handlePageMetaChange(page.path, 'image', '')}>
                            Remove
                          </RemoveImageButton>
                        )}
                      </div>
                    </ImageUploadArea>
                  </FormGroup>
                </FormGrid>

                <SaveButton onClick={() => savePageMeta(page.path)} disabled={saving === page.path}>
                  {saving === page.path ? 'Saving...' : 'Save Changes'}
                </SaveButton>
              </PageCardContent>
            </PageCard>
          ))}

          <SectionHeader onClick={() => toggleSection('services')}>
            <SectionHeaderLeft>
              Service Pages
              <SectionCount>{websitePages.filter(p => p.category === 'services').length}</SectionCount>
            </SectionHeaderLeft>
            <SectionExpandIcon $expanded={expandedSections.services}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </SectionExpandIcon>
          </SectionHeader>
          {expandedSections.services && websitePages.filter(p => p.category === 'services').map((page) => (
            <PageCard key={page.path} $expanded={expandedPage === page.path}>
              <PageCardHeader onClick={() => setExpandedPage(expandedPage === page.path ? null : page.path)}>
                <PageInfo>
                  <PageIcon>{getIcon(page.icon)}</PageIcon>
                  <PageDetails>
                    <PageName>{page.name}</PageName>
                    <PagePath>{page.path}</PagePath>
                  </PageDetails>
                </PageInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <StatusBadge $configured={isPageConfigured(page.path)}>
                    {isPageConfigured(page.path) ? 'Configured' : 'Not set'}
                  </StatusBadge>
                  <ExpandIcon $expanded={expandedPage === page.path}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </ExpandIcon>
                </div>
              </PageCardHeader>

              <PageCardContent $expanded={expandedPage === page.path}>
                <FormGrid>
                  <FormGroup $fullWidth>
                    <Label>
                      Meta Title
                      <LabelHint>(60 chars max)</LabelHint>
                    </Label>
                    <Input
                      placeholder={`${page.name} | Owl Marketing Hub`}
                      value={pagesMeta[page.path]?.title || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'title', e.target.value)}
                      maxLength={60}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.title?.length || 0) > 50}>
                      {pagesMeta[page.path]?.title?.length || 0}/60
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>
                      Meta Description
                      <LabelHint>(160 chars max)</LabelHint>
                    </Label>
                    <Textarea
                      placeholder="Brief description of this page for search engines..."
                      value={pagesMeta[page.path]?.description || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'description', e.target.value)}
                      maxLength={160}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.description?.length || 0) > 140}>
                      {pagesMeta[page.path]?.description?.length || 0}/160
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>OG Image (1200x630 recommended)</Label>
                    <ImageUploadArea>
                      <ImagePreview>
                        {pagesMeta[page.path]?.image ? (
                          <img src={pagesMeta[page.path].image} alt="OG Preview" />
                        ) : (
                          <ImagePlaceholder>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </ImagePlaceholder>
                        )}
                      </ImagePreview>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <ImageUploadButton>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(page.path, e)}
                          />
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          {imageUploading ? 'Uploading...' : 'Upload'}
                        </ImageUploadButton>
                        {pagesMeta[page.path]?.image && (
                          <RemoveImageButton onClick={() => handlePageMetaChange(page.path, 'image', '')}>
                            Remove
                          </RemoveImageButton>
                        )}
                      </div>
                    </ImageUploadArea>
                  </FormGroup>
                </FormGrid>

                <SaveButton onClick={() => savePageMeta(page.path)} disabled={saving === page.path}>
                  {saving === page.path ? 'Saving...' : 'Save Changes'}
                </SaveButton>
              </PageCardContent>
            </PageCard>
          ))}

          <SectionHeader onClick={() => toggleSection('portfolio')}>
            <SectionHeaderLeft>
              Portfolio / Case Studies
              <SectionCount>{websitePages.filter(p => p.category === 'portfolio').length}</SectionCount>
            </SectionHeaderLeft>
            <SectionExpandIcon $expanded={expandedSections.portfolio}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </SectionExpandIcon>
          </SectionHeader>
          {expandedSections.portfolio && websitePages.filter(p => p.category === 'portfolio').map((page) => (
            <PageCard key={page.path} $expanded={expandedPage === page.path}>
              <PageCardHeader onClick={() => setExpandedPage(expandedPage === page.path ? null : page.path)}>
                <PageInfo>
                  <PageIcon>{getIcon(page.icon)}</PageIcon>
                  <PageDetails>
                    <PageName>{page.name}</PageName>
                    <PagePath>{page.path}</PagePath>
                  </PageDetails>
                </PageInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <StatusBadge $configured={isPageConfigured(page.path)}>
                    {isPageConfigured(page.path) ? 'Configured' : 'Not set'}
                  </StatusBadge>
                  <ExpandIcon $expanded={expandedPage === page.path}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </ExpandIcon>
                </div>
              </PageCardHeader>

              <PageCardContent $expanded={expandedPage === page.path}>
                <FormGrid>
                  <FormGroup $fullWidth>
                    <Label>
                      Meta Title
                      <LabelHint>(60 chars max)</LabelHint>
                    </Label>
                    <Input
                      placeholder={`${page.name} | Owl Marketing Hub`}
                      value={pagesMeta[page.path]?.title || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'title', e.target.value)}
                      maxLength={60}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.title?.length || 0) > 50}>
                      {pagesMeta[page.path]?.title?.length || 0}/60
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>
                      Meta Description
                      <LabelHint>(160 chars max)</LabelHint>
                    </Label>
                    <Textarea
                      placeholder="Brief description of this page for search engines..."
                      value={pagesMeta[page.path]?.description || ''}
                      onChange={(e) => handlePageMetaChange(page.path, 'description', e.target.value)}
                      maxLength={160}
                    />
                    <CharCount $warning={(pagesMeta[page.path]?.description?.length || 0) > 140}>
                      {pagesMeta[page.path]?.description?.length || 0}/160
                    </CharCount>
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <Label>OG Image (1200x630 recommended)</Label>
                    <ImageUploadArea>
                      <ImagePreview>
                        {pagesMeta[page.path]?.image ? (
                          <img src={pagesMeta[page.path].image} alt="OG Preview" />
                        ) : (
                          <ImagePlaceholder>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </ImagePlaceholder>
                        )}
                      </ImagePreview>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <ImageUploadButton>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(page.path, e)}
                          />
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          {imageUploading ? 'Uploading...' : 'Upload'}
                        </ImageUploadButton>
                        {pagesMeta[page.path]?.image && (
                          <RemoveImageButton onClick={() => handlePageMetaChange(page.path, 'image', '')}>
                            Remove
                          </RemoveImageButton>
                        )}
                      </div>
                    </ImageUploadArea>
                  </FormGroup>
                </FormGrid>

                <SaveButton onClick={() => savePageMeta(page.path)} disabled={saving === page.path}>
                  {saving === page.path ? 'Saving...' : 'Save Changes'}
                </SaveButton>
              </PageCardContent>
            </PageCard>
          ))}
        </PagesGrid>
      )}

      {activeTab === 'global' && (
        <GlobalSettingsCard>
          <CardTitle>Global SEO Settings</CardTitle>
          <CardDescription>
            These settings are used as defaults when page-specific settings are not configured.
          </CardDescription>

          <FormGrid>
            <FormGroup>
              <Label>Site Name</Label>
              <Input
                placeholder="Owl Marketing Hub"
                value={globalSettings.site_name}
                onChange={(e) => handleGlobalChange('site_name', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Twitter Handle</Label>
              <Input
                placeholder="@owlmarketinghub"
                value={globalSettings.twitter_handle}
                onChange={(e) => handleGlobalChange('twitter_handle', e.target.value)}
              />
            </FormGroup>

            <FormGroup $fullWidth>
              <Label>Default OG Image</Label>
              <ImageUploadArea>
                <ImagePreview>
                  {globalSettings.default_image ? (
                    <img src={globalSettings.default_image} alt="Default OG" />
                  ) : (
                    <ImagePlaceholder>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </ImagePlaceholder>
                  )}
                </ImagePreview>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <ImageUploadButton>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGlobalImageUpload}
                    />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {imageUploading ? 'Uploading...' : 'Upload'}
                  </ImageUploadButton>
                  {globalSettings.default_image && (
                    <RemoveImageButton onClick={() => handleGlobalChange('default_image', '')}>
                      Remove
                    </RemoveImageButton>
                  )}
                </div>
              </ImageUploadArea>
            </FormGroup>
          </FormGrid>

          <SaveButton onClick={saveGlobalSettings} disabled={saving === 'global'}>
            {saving === 'global' ? 'Saving...' : 'Save Global Settings'}
          </SaveButton>
        </GlobalSettingsCard>
      )}
    </>
  );
}
