'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ContactSubmission } from '@/lib/supabase/types';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderLeft = styled.div``;

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
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#1a1a1a' : '#f5f5f5')};
  }
`;

const Table = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 150px 120px 100px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 150px 120px 100px 100px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const ContactName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const ContactEmail = styled.div`
  font-size: 13px;
  color: #666666;
`;

const ContactSubject = styled.div`
  font-size: 14px;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContactMessage = styled.div`
  font-size: 13px;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContactDate = styled.div`
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

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant?: 'danger' }>`
  padding: 8px;
  background: ${({ $variant }) => ($variant === 'danger' ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $variant }) => ($variant === 'danger' ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $variant }) => ($variant === 'danger' ? '#fee2e2' : '#e5e5e5')};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ViewLink = styled(Link)`
  padding: 8px;
  background: #f5f5f5;
  color: #666666;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666666;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666666;
`;

const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  color: #666666;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #cccccc;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

type Filter = 'all' | 'new' | 'read' | 'replied' | 'archived';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const supabase = createClient();

  const fetchContacts = async () => {
    setLoading(true);
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'read' && !contacts.find(c => c.id === id)?.read_at) {
      updates.read_at = new Date().toISOString();
    }
    if (newStatus === 'replied') {
      updates.replied_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('contact_submissions')
      .update(updates as never)
      .eq('id', id);

    if (!error) {
      setContacts(contacts.map(c =>
        c.id === id ? { ...c, status: newStatus as ContactSubmission['status'], ...updates } : c
      ));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status', 'Date'],
      ...contacts.map(c => [
        c.name,
        c.email,
        c.phone || '',
        c.company || '',
        c.subject || '',
        c.message.replace(/"/g, '""'),
        c.status,
        new Date(c.created_at).toLocaleDateString(),
      ]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const counts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length,
    archived: contacts.filter(c => c.status === 'archived').length,
  };

  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Title>Contact Submissions</Title>
          <Subtitle>Manage messages from your contact form</Subtitle>
        </HeaderLeft>
        <ExportButton onClick={handleExport}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </ExportButton>
      </PageHeader>

      <FilterBar>
        <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({counts.all})
        </FilterButton>
        <FilterButton $active={filter === 'new'} onClick={() => setFilter('new')}>
          New ({counts.new})
        </FilterButton>
        <FilterButton $active={filter === 'read'} onClick={() => setFilter('read')}>
          Read ({counts.read})
        </FilterButton>
        <FilterButton $active={filter === 'replied'} onClick={() => setFilter('replied')}>
          Replied ({counts.replied})
        </FilterButton>
        <FilterButton $active={filter === 'archived'} onClick={() => setFilter('archived')}>
          Archived ({counts.archived})
        </FilterButton>
      </FilterBar>

      <Table>
        <TableHeader>
          <span>Contact</span>
          <span>Message</span>
          <span>Subject</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </TableHeader>

        {loading ? (
          <LoadingState>Loading contacts...</LoadingState>
        ) : contacts.length === 0 ? (
          <EmptyState>
            <h3>No contact submissions</h3>
            <p>Contact form submissions will appear here.</p>
          </EmptyState>
        ) : (
          contacts.map((contact) => (
            <TableRow key={contact.id}>
              <div>
                <ContactName>{contact.name}</ContactName>
                <ContactEmail>{contact.email}</ContactEmail>
              </div>
              <ContactMessage>{contact.message}</ContactMessage>
              <ContactSubject>{contact.subject || '-'}</ContactSubject>
              <ContactDate>{formatDate(contact.created_at)}</ContactDate>
              <StatusBadge $status={contact.status}>{contact.status}</StatusBadge>
              <Actions>
                <ViewLink href={`/admin/contacts/${contact.id}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </ViewLink>
                {contact.status === 'new' && (
                  <ActionButton onClick={() => handleStatusChange(contact.id, 'read')} title="Mark as read">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </ActionButton>
                )}
                <ActionButton
                  $variant="danger"
                  onClick={() => handleDelete(contact.id)}
                  title="Delete"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </ActionButton>
              </Actions>
            </TableRow>
          ))
        )}
      </Table>
    </>
  );
}
