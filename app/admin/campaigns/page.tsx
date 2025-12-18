'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';
import { EmailCampaign, EmailTemplate, NewsletterSubscriber } from '@/lib/supabase/types';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #666666;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  background: ${({ $active }) => ($active ? '#1a1a1a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: 1px solid ${({ $active }) => ($active ? '#1a1a1a' : '#e5e5e5')};
  border-radius: 8px;
  cursor: pointer;
`;

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CampaignCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CampaignHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CampaignInfo = styled.div`
  flex: 1;
`;

const CampaignName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const CampaignSubject = styled.p`
  font-size: 14px;
  color: #666666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $status }) => {
    switch ($status) {
      case 'sent': return '#dcfce7';
      case 'scheduled': return '#dbeafe';
      case 'sending': return '#fef3c7';
      case 'draft': return '#f3f4f6';
      case 'failed': return '#fecaca';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'sent': return '#16a34a';
      case 'scheduled': return '#2563eb';
      case 'sending': return '#d97706';
      case 'draft': return '#666666';
      case 'failed': return '#dc2626';
      default: return '#666666';
    }
  }};
`;

const CampaignStats = styled.div`
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const CampaignStat = styled.div`
  text-align: center;
`;

const CampaignStatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CampaignStatLabel = styled.div`
  font-size: 11px;
  color: #999999;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
`;

const ActionButton = styled.button<{ $danger?: boolean; $primary?: boolean }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $danger, $primary }) => {
    if ($primary) return '#ff8c42';
    if ($danger) return '#fef2f2';
    return '#f5f5f5';
  }};
  color: ${({ $danger, $primary }) => {
    if ($primary) return '#ffffff';
    if ($danger) return '#dc2626';
    return '#666666';
  }};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${({ $danger, $primary }) => {
      if ($primary) return '#e67d35';
      if ($danger) return '#fee2e2';
      return '#e5e5e5';
    }};
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
  grid-template-columns: 450px 1fr;
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
  min-height: 250px;
  line-height: 1.5;

  &:focus { border-color: #ff8c42; }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #e5e5e5;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FooterRight = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $primary?: boolean; $success?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;

  ${({ $primary, $success }) => {
    if ($success) return `background: #16a34a; color: #ffffff; border: none;`;
    if ($primary) return `background: #ff8c42; color: #ffffff; border: none;`;
    return `background: #ffffff; color: #666666; border: 1px solid #e5e5e5;`;
  }}

  &:hover {
    ${({ $primary, $success }) => {
      if ($success) return `background: #15803d;`;
      if ($primary) return `background: #e67d35;`;
      return `background: #f5f5f5;`;
    }}
  }

  svg { width: 18px; height: 18px; }
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
  iframe {
    width: 100%;
    min-height: 450px;
    border: none;
  }
`;

const RecipientInfo = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

const RecipientCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0369a1;
`;

const RecipientLabel = styled.div`
  font-size: 13px;
  color: #0369a1;
`;

const ScheduleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #ffffff;
  border-radius: 16px;

  h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
  p { font-size: 14px; color: #666666; margin-bottom: 24px; }
`;

const TemplateSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const TemplateOption = styled.button<{ $selected: boolean }>`
  padding: 16px;
  background: ${({ $selected }) => ($selected ? '#fff7ed' : '#ffffff')};
  border: 2px solid ${({ $selected }) => ($selected ? '#ff8c42' : '#e5e5e5')};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;

  &:hover { border-color: #ff8c42; }
`;

const TemplateOptionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
`;

const TemplateOptionCategory = styled.div`
  font-size: 12px;
  color: #666666;
  text-transform: capitalize;
`;

type Filter = 'all' | 'draft' | 'scheduled' | 'sent';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    subject: '',
    preview_text: '',
    html_content: '',
    template_id: '',
    scheduled_for: '',
    scheduled_time: '',
  });
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);

    // Fetch campaigns
    let query = supabase
      .from('email_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data: campaignsData } = await query;
    if (campaignsData) setCampaigns(campaignsData);

    // Fetch templates
    const { data: templatesData } = await supabase
      .from('email_templates')
      .select('*')
      .order('name');
    if (templatesData) setTemplates(templatesData);

    // Fetch active subscriber count
    const { count } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    setSubscriberCount(count || 0);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const resetForm = () => {
    setForm({
      name: '',
      subject: '',
      preview_text: '',
      html_content: '',
      template_id: '',
      scheduled_for: '',
      scheduled_time: '',
    });
    setEditingId(null);
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    setForm({
      ...form,
      template_id: template.id,
      subject: template.subject,
      html_content: template.html_content,
    });
  };

  const handleEdit = (campaign: EmailCampaign) => {
    const scheduledDate = campaign.scheduled_for ? new Date(campaign.scheduled_for) : null;
    setForm({
      name: campaign.name,
      subject: campaign.subject,
      preview_text: campaign.preview_text || '',
      html_content: campaign.html_content,
      template_id: campaign.template_id || '',
      scheduled_for: scheduledDate ? scheduledDate.toISOString().split('T')[0] : '',
      scheduled_time: scheduledDate ? scheduledDate.toTimeString().slice(0, 5) : '',
    });
    setEditingId(campaign.id);
    setShowModal(true);
  };

  const handleSaveDraft = async () => {
    if (!form.name || !form.subject || !form.html_content) {
      alert('Name, subject, and content are required');
      return;
    }

    const data = {
      name: form.name,
      subject: form.subject,
      preview_text: form.preview_text || null,
      html_content: form.html_content,
      template_id: form.template_id || null,
      status: 'draft' as const,
    };

    if (editingId) {
      await supabase.from('email_campaigns').update(data as never).eq('id', editingId);
    } else {
      await supabase.from('email_campaigns').insert(data);
    }

    setShowModal(false);
    resetForm();
    fetchData();
  };

  const handleSchedule = async () => {
    if (!form.name || !form.subject || !form.html_content) {
      alert('Name, subject, and content are required');
      return;
    }

    if (!form.scheduled_for || !form.scheduled_time) {
      alert('Please select a date and time to schedule');
      return;
    }

    const scheduledDateTime = new Date(`${form.scheduled_for}T${form.scheduled_time}`);

    const data = {
      name: form.name,
      subject: form.subject,
      preview_text: form.preview_text || null,
      html_content: form.html_content,
      template_id: form.template_id || null,
      status: 'scheduled' as const,
      scheduled_for: scheduledDateTime.toISOString(),
      total_recipients: subscriberCount,
    };

    if (editingId) {
      await supabase.from('email_campaigns').update(data as never).eq('id', editingId);
    } else {
      await supabase.from('email_campaigns').insert(data);
    }

    setShowModal(false);
    resetForm();
    fetchData();
  };

  const handleSendNow = async () => {
    if (!form.name || !form.subject || !form.html_content) {
      alert('Name, subject, and content are required');
      return;
    }

    if (!confirm(`Send this campaign to ${subscriberCount} subscribers now?`)) {
      return;
    }

    setSending(true);

    // Save campaign first
    const campaignData = {
      name: form.name,
      subject: form.subject,
      preview_text: form.preview_text || null,
      html_content: form.html_content,
      template_id: form.template_id || null,
      status: 'sending' as const,
      total_recipients: subscriberCount,
    };

    let campaignId = editingId;

    if (editingId) {
      await supabase.from('email_campaigns').update(campaignData as never).eq('id', editingId);
    } else {
      const { data } = await supabase.from('email_campaigns').insert(campaignData).select().single();
      if (data) campaignId = data.id;
    }

    // Call send API
    try {
      const response = await fetch('/api/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send campaign');
      }

      alert('Campaign sent successfully!');
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Failed to send campaign. Please check your email configuration.');
      // Update status back to draft
      if (campaignId) {
        await supabase.from('email_campaigns').update({ status: 'draft' } as never).eq('id', campaignId);
      }
    }

    setSending(false);
    setShowModal(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign?')) return;
    await supabase.from('email_campaigns').delete().eq('id', id);
    fetchData();
  };

  const handleDuplicate = async (campaign: EmailCampaign) => {
    await supabase.from('email_campaigns').insert({
      name: `${campaign.name} (Copy)`,
      subject: campaign.subject,
      preview_text: campaign.preview_text,
      html_content: campaign.html_content,
      template_id: campaign.template_id,
      status: 'draft',
    });
    fetchData();
  };

  const getPreviewHtml = () => {
    return form.html_content
      .replace(/{{subscriber_name}}/g, 'John')
      .replace(/{{subject}}/g, form.subject || 'Subject Line')
      .replace(/{{unsubscribe_link}}/g, '#')
      .replace(/{{current_date}}/g, new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalSent = campaigns.filter(c => c.status === 'sent').reduce((acc, c) => acc + c.sent_count, 0);
  const totalOpens = campaigns.reduce((acc, c) => acc + c.open_count, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.click_count, 0);

  if (loading) {
    return <EmptyState>Loading...</EmptyState>;
  }

  return (
    <>
      <PageHeader>
        <div>
          <Title>Email Campaigns</Title>
          <Subtitle>Create and send newsletters to your subscribers</Subtitle>
        </div>
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Campaign
        </AddButton>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatValue>{campaigns.length}</StatValue>
          <StatLabel>Total Campaigns</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{subscriberCount}</StatValue>
          <StatLabel>Active Subscribers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalSent.toLocaleString()}</StatValue>
          <StatLabel>Emails Sent</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalOpens.toLocaleString()}</StatValue>
          <StatLabel>Total Opens</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalClicks.toLocaleString()}</StatValue>
          <StatLabel>Total Clicks</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterBar>
        <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton $active={filter === 'draft'} onClick={() => setFilter('draft')}>Drafts</FilterButton>
        <FilterButton $active={filter === 'scheduled'} onClick={() => setFilter('scheduled')}>Scheduled</FilterButton>
        <FilterButton $active={filter === 'sent'} onClick={() => setFilter('sent')}>Sent</FilterButton>
      </FilterBar>

      {campaigns.length === 0 ? (
        <EmptyState>
          <h3>No campaigns yet</h3>
          <p>Create your first email campaign to engage your subscribers.</p>
          <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
            Create Campaign
          </AddButton>
        </EmptyState>
      ) : (
        <CampaignList>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id}>
              <CampaignHeader>
                <CampaignInfo>
                  <CampaignName>{campaign.name}</CampaignName>
                  <CampaignSubject>{campaign.subject}</CampaignSubject>
                </CampaignInfo>
                <StatusBadge $status={campaign.status}>
                  {campaign.status === 'scheduled' && campaign.scheduled_for
                    ? `Scheduled: ${formatDate(campaign.scheduled_for)}`
                    : campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </StatusBadge>
                <Actions>
                  {campaign.status === 'draft' && (
                    <ActionButton onClick={() => handleEdit(campaign)}>Edit</ActionButton>
                  )}
                  <ActionButton onClick={() => handleDuplicate(campaign)}>Duplicate</ActionButton>
                  {campaign.status === 'draft' && (
                    <ActionButton $danger onClick={() => handleDelete(campaign.id)}>Delete</ActionButton>
                  )}
                </Actions>
              </CampaignHeader>

              {campaign.status === 'sent' && (
                <CampaignStats>
                  <CampaignStat>
                    <CampaignStatValue>{campaign.total_recipients}</CampaignStatValue>
                    <CampaignStatLabel>Recipients</CampaignStatLabel>
                  </CampaignStat>
                  <CampaignStat>
                    <CampaignStatValue>{campaign.sent_count}</CampaignStatValue>
                    <CampaignStatLabel>Delivered</CampaignStatLabel>
                  </CampaignStat>
                  <CampaignStat>
                    <CampaignStatValue>{campaign.open_count}</CampaignStatValue>
                    <CampaignStatLabel>Opens</CampaignStatLabel>
                  </CampaignStat>
                  <CampaignStat>
                    <CampaignStatValue>{campaign.click_count}</CampaignStatValue>
                    <CampaignStatLabel>Clicks</CampaignStatLabel>
                  </CampaignStat>
                  <CampaignStat>
                    <CampaignStatValue>
                      {campaign.sent_count > 0 ? ((campaign.open_count / campaign.sent_count) * 100).toFixed(1) : 0}%
                    </CampaignStatValue>
                    <CampaignStatLabel>Open Rate</CampaignStatLabel>
                  </CampaignStat>
                  <CampaignStat>
                    <CampaignStatValue>
                      {campaign.open_count > 0 ? ((campaign.click_count / campaign.open_count) * 100).toFixed(1) : 0}%
                    </CampaignStatValue>
                    <CampaignStatLabel>Click Rate</CampaignStatLabel>
                  </CampaignStat>
                </CampaignStats>
              )}
            </CampaignCard>
          ))}
        </CampaignList>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingId ? 'Edit Campaign' : 'New Campaign'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <EditorPanel>
                <RecipientInfo>
                  <RecipientCount>{subscriberCount}</RecipientCount>
                  <RecipientLabel>Active subscribers will receive this campaign</RecipientLabel>
                </RecipientInfo>

                {templates.length > 0 && !editingId && (
                  <>
                    <Label>Choose a Template</Label>
                    <TemplateSelector>
                      {templates.map((template) => (
                        <TemplateOption
                          key={template.id}
                          $selected={form.template_id === template.id}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <TemplateOptionName>{template.name}</TemplateOptionName>
                          <TemplateOptionCategory>{template.category}</TemplateOptionCategory>
                        </TemplateOption>
                      ))}
                    </TemplateSelector>
                  </>
                )}

                <FormGroup>
                  <Label>Campaign Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="December Newsletter"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Subject Line *</Label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Your monthly marketing insights are here!"
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
                  <Label>Email Content (HTML) *</Label>
                  <Textarea
                    value={form.html_content}
                    onChange={(e) => setForm({ ...form, html_content: e.target.value })}
                    placeholder="Your email HTML content..."
                  />
                </FormGroup>

                <Label>Schedule (Optional)</Label>
                <ScheduleContainer>
                  <Input
                    type="date"
                    value={form.scheduled_for}
                    onChange={(e) => setForm({ ...form, scheduled_for: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    type="time"
                    value={form.scheduled_time}
                    onChange={(e) => setForm({ ...form, scheduled_time: e.target.value })}
                  />
                </ScheduleContainer>
              </EditorPanel>

              <PreviewPanel>
                <Label style={{ marginBottom: '16px' }}>Preview</Label>
                <PreviewContainer>
                  <PreviewHeader>
                    <PreviewSubject>{form.subject || 'Subject Line'}</PreviewSubject>
                    <PreviewFrom>From: Owl Marketing Hub</PreviewFrom>
                  </PreviewHeader>
                  <PreviewBody>
                    {form.html_content ? (
                      <iframe srcDoc={getPreviewHtml()} title="Email Preview" />
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                        Select a template or paste HTML content to preview
                      </div>
                    )}
                  </PreviewBody>
                </PreviewContainer>
              </PreviewPanel>
            </ModalBody>

            <ModalFooter>
              <FooterLeft>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </FooterLeft>
              <FooterRight>
                <Button onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                {form.scheduled_for && form.scheduled_time && (
                  <Button $primary onClick={handleSchedule}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Schedule
                  </Button>
                )}
                <Button $success onClick={handleSendNow} disabled={sending}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  {sending ? 'Sending...' : 'Send Now'}
                </Button>
              </FooterRight>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
