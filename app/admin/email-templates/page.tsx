'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';
import { EmailTemplate } from '@/lib/supabase/types';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover { background: #e67d35; }
  svg { width: 18px; height: 18px; }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const TemplateCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TemplatePreview = styled.div`
  height: 200px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  position: relative;
`;

const PreviewFrame = styled.div`
  transform: scale(0.3);
  transform-origin: top left;
  width: 333%;
  height: 333%;
  pointer-events: none;
`;

const TemplateInfo = styled.div`
  padding: 20px;
`;

const TemplateName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const TemplateSubject = styled.p`
  font-size: 13px;
  color: #666666;
  margin-bottom: 12px;
`;

const TemplateMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryBadge = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  background: #f0f0f0;
  color: #666666;
  border-radius: 20px;
  text-transform: capitalize;
`;

const DefaultBadge = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 20px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $danger }) => ($danger ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fee2e2' : '#e5e5e5')};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  svg { width: 20px; height: 20px; color: #666666; }
`;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  flex: 1;
  overflow: hidden;
`;

const EditorPanel = styled.div`
  padding: 24px;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
`;

const PreviewPanel = styled.div`
  background: #f9fafb;
  padding: 24px;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;

  &:focus { border-color: #ff8c42; }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;

  &:focus { border-color: #ff8c42; }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', monospace;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  min-height: 300px;
  line-height: 1.5;

  &:focus { border-color: #ff8c42; }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;

  input { width: 18px; height: 18px; accent-color: #ff8c42; }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #e5e5e5;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;

  ${({ $primary }) =>
    $primary
      ? `background: #ff8c42; color: #ffffff; border: none;`
      : `background: #ffffff; color: #666666; border: 1px solid #e5e5e5;`}

  &:hover {
    ${({ $primary }) =>
      $primary ? `background: #e67d35;` : `background: #f5f5f5;`}
  }
`;

const PreviewContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PreviewHeader = styled.div`
  background: #f5f5f5;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
`;

const PreviewSubject = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const PreviewFrom = styled.div`
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
`;

const PreviewBody = styled.div`
  padding: 0;
  min-height: 400px;

  iframe {
    width: 100%;
    min-height: 400px;
    border: none;
  }
`;

const VariablesInfo = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
`;

const VariablesTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 8px;
`;

const VariablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const VariableTag = styled.code`
  font-size: 11px;
  padding: 4px 8px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 4px;
`;

const StarterTemplates = styled.div`
  margin-bottom: 24px;
`;

const StarterTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const StarterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StarterCard = styled.button<{ $active?: boolean }>`
  padding: 16px;
  background: ${({ $active }) => ($active ? '#fff7ed' : '#ffffff')};
  border: 2px solid ${({ $active }) => ($active ? '#ff8c42' : '#e5e5e5')};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    border-color: #ff8c42;
  }
`;

const StarterIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.1));
  border-radius: 10px;
  margin-bottom: 12px;
  color: #ff8c42;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StarterName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #ffffff;
  border-radius: 16px;

  h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
  p { font-size: 14px; color: #666666; margin-bottom: 24px; }
`;

const MinimalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const BrandedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const NewsletterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const starterTemplates = [
  {
    id: 'minimal',
    name: 'Minimal',
    icon: MinimalIcon,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; color: #1a1a1a;">Hello {{subscriber_name}},</h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #666666;">
                Your content goes here. Write something amazing for your subscribers.
              </p>
              <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #ff8c42; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Call to Action
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid #e5e5e5; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #999999;">
                <a href="{{unsubscribe_link}}" style="color: #999999;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'branded',
    name: 'Branded',
    icon: BrandedIcon,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <img src="https://owlmarketinghub.com/logo.png" alt="Owl Marketing Hub" style="height: 40px;">
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%); border-radius: 16px 16px 0 0; padding: 60px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; color: #ffffff; font-weight: 700;">{{subject}}</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-radius: 0 0 16px 16px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #1a1a1a;">
                Hi {{subscriber_name}},
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.7; color: #666666;">
                Your newsletter content goes here. Share updates, tips, and valuable insights with your audience.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="#" style="display: inline-block; padding: 16px 32px; background-color: #ff8c42; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
                      Learn More
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                Follow us for more updates
              </p>
              <p style="margin: 0 0 20px;">
                <a href="#" style="margin: 0 8px; color: #ff8c42; text-decoration: none;">Instagram</a>
                <a href="#" style="margin: 0 8px; color: #ff8c42; text-decoration: none;">LinkedIn</a>
                <a href="#" style="margin: 0 8px; color: #ff8c42; text-decoration: none;">Twitter</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #999999;">
                <a href="{{unsubscribe_link}}" style="color: #999999;">Unsubscribe</a> · <a href="#" style="color: #999999;">View in browser</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    icon: NewsletterIcon,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px 40px; border-radius: 16px 16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; color: #ffffff; font-weight: 700;">Owl Marketing Hub</h1>
                  </td>
                  <td align="right">
                    <span style="font-size: 12px; color: #999999;">{{current_date}}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #1a1a1a;">This Week's Highlights</h2>

              <!-- Article 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #1a1a1a;">
                      <a href="#" style="color: #1a1a1a; text-decoration: none;">Article Title Goes Here</a>
                    </h3>
                    <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #666666;">
                      Brief description of the article. Keep it engaging and informative to encourage clicks.
                    </p>
                    <a href="#" style="font-size: 14px; color: #ff8c42; text-decoration: none; font-weight: 600;">Read more →</a>
                  </td>
                </tr>
              </table>

              <!-- Article 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #1a1a1a;">
                      <a href="#" style="color: #1a1a1a; text-decoration: none;">Another Great Article</a>
                    </h3>
                    <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #666666;">
                      Another compelling description that makes readers want to learn more.
                    </p>
                    <a href="#" style="font-size: 14px; color: #ff8c42; text-decoration: none; font-weight: 600;">Read more →</a>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #fff7ed; padding: 30px; border-radius: 12px; text-align: center;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #1a1a1a;">Need Marketing Help?</h3>
                    <p style="margin: 0 0 20px; font-size: 14px; color: #666666;">Let's discuss how we can grow your business together.</p>
                    <a href="#" style="display: inline-block; padding: 14px 28px; background-color: #ff8c42; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Get in Touch</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px 40px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 15px; font-size: 14px; color: #ffffff;">
                Thanks for reading!
              </p>
              <p style="margin: 0; font-size: 12px; color: #666666;">
                <a href="{{unsubscribe_link}}" style="color: #666666;">Unsubscribe</a> · <a href="#" style="color: #666666;">Update preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
];

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedStarter, setSelectedStarter] = useState('minimal');
  const [form, setForm] = useState({
    name: '',
    subject: '',
    preview_text: '',
    html_content: starterTemplates[0].html,
    category: 'newsletter',
    is_default: false,
  });
  const supabase = createClient();

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching templates:', error);
    }
    if (data) {
      setTemplates(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      subject: '',
      preview_text: '',
      html_content: starterTemplates[0].html,
      category: 'newsletter',
      is_default: false,
    });
    setEditingId(null);
    setSelectedStarter('minimal');
  };

  const handleEdit = (template: EmailTemplate) => {
    setForm({
      name: template.name,
      subject: template.subject,
      preview_text: template.preview_text || '',
      html_content: template.html_content,
      category: template.category,
      is_default: template.is_default,
    });
    setEditingId(template.id);
    setSelectedStarter('');
    setShowModal(true);
  };

  const handleStarterSelect = (id: string) => {
    const starter = starterTemplates.find(t => t.id === id);
    if (starter) {
      setSelectedStarter(id);
      setForm({ ...form, html_content: starter.html });
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.html_content) {
      alert('Name, subject, and HTML content are required');
      return;
    }

    const data = {
      name: form.name,
      subject: form.subject,
      preview_text: form.preview_text || null,
      html_content: form.html_content,
      category: form.category,
      is_default: form.is_default,
    };

    if (editingId) {
      const { error } = await supabase
        .from('email_templates')
        .update(data as never)
        .eq('id', editingId);

      if (!error) {
        fetchTemplates();
      }
    } else {
      const { error } = await supabase.from('email_templates').insert(data as never);

      if (!error) {
        fetchTemplates();
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this template?')) return;

    const { error } = await supabase.from('email_templates').delete().eq('id', id);

    if (!error) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleDuplicate = async (template: EmailTemplate) => {
    const { error } = await supabase.from('email_templates').insert({
      name: `${template.name} (Copy)`,
      subject: template.subject,
      preview_text: template.preview_text,
      html_content: template.html_content,
      category: template.category,
      is_default: false,
    } as never);

    if (!error) {
      fetchTemplates();
    }
  };

  const getPreviewHtml = () => {
    return form.html_content
      .replace(/{{subscriber_name}}/g, 'John')
      .replace(/{{subject}}/g, form.subject || 'Subject Line')
      .replace(/{{unsubscribe_link}}/g, '#')
      .replace(/{{current_date}}/g, new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  };

  if (loading) {
    return <EmptyState>Loading...</EmptyState>;
  }

  return (
    <>
      <PageHeader>
        <div>
          <Title>Email Templates</Title>
          <Subtitle>Create and manage reusable email templates</Subtitle>
        </div>
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Template
        </AddButton>
      </PageHeader>

      {templates.length === 0 ? (
        <EmptyState>
          <h3>No templates yet</h3>
          <p>Create your first email template to start sending campaigns.</p>
          <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
            Create Template
          </AddButton>
        </EmptyState>
      ) : (
        <TemplatesGrid>
          {templates.map((template) => (
            <TemplateCard key={template.id}>
              <TemplatePreview>
                <PreviewFrame dangerouslySetInnerHTML={{ __html: template.html_content }} />
              </TemplatePreview>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateSubject>{template.subject}</TemplateSubject>
                <TemplateMeta>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <CategoryBadge>{template.category}</CategoryBadge>
                    {template.is_default && <DefaultBadge>Default</DefaultBadge>}
                  </div>
                  <Actions>
                    <ActionButton onClick={() => handleDuplicate(template)}>Duplicate</ActionButton>
                    <ActionButton onClick={() => handleEdit(template)}>Edit</ActionButton>
                    <ActionButton $danger onClick={() => handleDelete(template.id)}>Delete</ActionButton>
                  </Actions>
                </TemplateMeta>
              </TemplateInfo>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingId ? 'Edit Template' : 'Create Template'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <EditorPanel>
                {!editingId && (
                  <StarterTemplates>
                    <StarterTitle>Start with a template</StarterTitle>
                    <StarterGrid>
                      {starterTemplates.map((starter) => (
                        <StarterCard
                          key={starter.id}
                          $active={selectedStarter === starter.id}
                          onClick={() => handleStarterSelect(starter.id)}
                        >
                          <StarterIcon><starter.icon /></StarterIcon>
                          <StarterName>{starter.name}</StarterName>
                        </StarterCard>
                      ))}
                    </StarterGrid>
                  </StarterTemplates>
                )}

                <VariablesInfo>
                  <VariablesTitle>Available Variables</VariablesTitle>
                  <VariablesList>
                    <VariableTag>{'{{subscriber_name}}'}</VariableTag>
                    <VariableTag>{'{{subject}}'}</VariableTag>
                    <VariableTag>{'{{unsubscribe_link}}'}</VariableTag>
                    <VariableTag>{'{{current_date}}'}</VariableTag>
                  </VariablesList>
                </VariablesInfo>

                <FormGroup>
                  <Label>Template Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Monthly Newsletter"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Subject Line *</Label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Your monthly marketing insights"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Preview Text</Label>
                  <Input
                    value={form.preview_text}
                    onChange={(e) => setForm({ ...form, preview_text: e.target.value })}
                    placeholder="The text shown in email previews"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="newsletter">Newsletter</option>
                    <option value="promotional">Promotional</option>
                    <option value="announcement">Announcement</option>
                    <option value="welcome">Welcome</option>
                    <option value="transactional">Transactional</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>HTML Content *</Label>
                  <Textarea
                    value={form.html_content}
                    onChange={(e) => setForm({ ...form, html_content: e.target.value })}
                    placeholder="Paste your HTML email template here"
                  />
                </FormGroup>

                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={form.is_default}
                    onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                  />
                  Set as default template
                </CheckboxLabel>
              </EditorPanel>

              <PreviewPanel>
                <Label style={{ marginBottom: '16px' }}>Preview</Label>
                <PreviewContainer>
                  <PreviewHeader>
                    <PreviewSubject>{form.subject || 'Subject Line'}</PreviewSubject>
                    <PreviewFrom>From: Owl Marketing Hub</PreviewFrom>
                  </PreviewHeader>
                  <PreviewBody>
                    <iframe
                      srcDoc={getPreviewHtml()}
                      title="Email Preview"
                    />
                  </PreviewBody>
                </PreviewContainer>
              </PreviewPanel>
            </ModalBody>

            <ModalFooter>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button $primary onClick={handleSubmit}>
                {editingId ? 'Update' : 'Create'} Template
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
