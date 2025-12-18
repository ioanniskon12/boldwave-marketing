'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ContactSubmission } from '@/lib/supabase/types';

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666666;
  text-decoration: none;
  margin-bottom: 24px;

  &:hover {
    color: #1a1a1a;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const HeaderLeft = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #666666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $status }) => {
    switch ($status) {
      case 'new': return '#dbeafe';
      case 'read': return '#f3f4f6';
      case 'replied': return '#dcfce7';
      case 'archived': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'new': return '#2563eb';
      case 'read': return '#666666';
      case 'replied': return '#16a34a';
      case 'archived': return '#d97706';
      default: return '#666666';
    }
  }};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $primary }) =>
    $primary
      ? `
    background: #ff8c42;
    color: #ffffff;
    border: none;

    &:hover {
      background: #e67d35;
    }
  `
      : `
    background: #ffffff;
    color: #666666;
    border: 1px solid #e5e5e5;

    &:hover {
      background: #f5f5f5;
    }
  `}

  ${({ $danger }) =>
    $danger &&
    `
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;

    &:hover {
      background: #fee2e2;
    }
  `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div``;

const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

const InfoValue = styled.div`
  font-size: 15px;
  color: #1a1a1a;

  a {
    color: #ff8c42;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MessageContent = styled.div`
  font-size: 15px;
  line-height: 1.7;
  color: #1a1a1a;
  white-space: pre-wrap;
`;

const NotesSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  font-size: 14px;
  font-family: inherit;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  margin-bottom: 12px;

  &:focus {
    border-color: #ff8c42;
  }
`;

const SaveNotesButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #333333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusDropdown = styled.select`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #ff8c42;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666666;
`;

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params.id as string;
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchContact = async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('id', contactId)
        .single();

      if (!error && data) {
        setContact(data);
        setNotes(data.notes || '');

        // Mark as read if new
        if (data.status === 'new') {
          await supabase
            .from('contact_submissions')
            .update({ status: 'read', read_at: new Date().toISOString() } as never)
            .eq('id', contactId);
          setContact({ ...data, status: 'read' });
        }
      }
      setLoading(false);
    };

    fetchContact();
  }, [contactId]);

  const handleStatusChange = async (newStatus: string) => {
    if (!contact) return;

    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'replied' && !contact.replied_at) {
      updates.replied_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('contact_submissions')
      .update(updates as never)
      .eq('id', contact.id);

    if (!error) {
      setContact({ ...contact, status: newStatus as ContactSubmission['status'] });
    }
  };

  const handleSaveNotes = async () => {
    if (!contact) return;

    setSaving(true);
    const { error } = await supabase
      .from('contact_submissions')
      .update({ notes } as never)
      .eq('id', contact.id);

    if (!error) {
      setContact({ ...contact, notes });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!contact) return;
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', contact.id);

    if (!error) {
      router.push('/admin/contacts');
    }
  };

  const handleReply = () => {
    if (!contact) return;
    window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject || 'Your inquiry'}`;
    handleStatusChange('replied');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <LoadingState>Loading contact...</LoadingState>;
  }

  if (!contact) {
    return <LoadingState>Contact not found</LoadingState>;
  }

  return (
    <>
      <BackLink href="/admin/contacts">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Contacts
      </BackLink>

      <PageHeader>
        <HeaderLeft>
          <Title>{contact.name}</Title>
          <HeaderMeta>
            <span>{formatDate(contact.created_at)}</span>
            <StatusBadge $status={contact.status}>{contact.status}</StatusBadge>
          </HeaderMeta>
        </HeaderLeft>
        <HeaderActions>
          <StatusDropdown
            value={contact.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </StatusDropdown>
          <ActionButton $primary onClick={handleReply}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Reply
          </ActionButton>
          <ActionButton $danger onClick={handleDelete}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </ActionButton>
        </HeaderActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                ) : (
                  '-'
                )}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Company</InfoLabel>
              <InfoValue>{contact.company || '-'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Source</InfoLabel>
              <InfoValue>{contact.source}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{contact.subject || 'Message'}</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageContent>{contact.message}</MessageContent>

          <NotesSection>
            <InfoLabel>Internal Notes</InfoLabel>
            <NotesTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this contact..."
            />
            <SaveNotesButton onClick={handleSaveNotes} disabled={saving}>
              {saving ? 'Saving...' : 'Save Notes'}
            </SaveNotesButton>
          </NotesSection>
        </CardContent>
      </Card>
    </>
  );
}
