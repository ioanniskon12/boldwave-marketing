'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';
import { NewsletterSubscriber } from '@/lib/supabase/types';

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

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
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
    &:hover { background: #e67d35; }
  `
      : `
    background: #ffffff;
    color: #666666;
    border: 1px solid #e5e5e5;
    &:hover { background: #f5f5f5; }
  `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
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

const Table = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const Email = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`;

const Name = styled.div`
  font-size: 13px;
  color: #666666;
`;

const Source = styled.div`
  font-size: 14px;
  color: #666666;
`;

const DateText = styled.div`
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
      case 'active': return '#dcfce7';
      case 'unsubscribed': return '#fef3c7';
      case 'bounced': return '#fecaca';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'active': return '#16a34a';
      case 'unsubscribed': return '#d97706';
      case 'bounced': return '#dc2626';
      default: return '#666666';
    }
  }};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 6px;
  background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $danger }) => ($danger ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666666;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
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
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
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

  &:focus {
    border-color: #ff8c42;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;

  &:focus {
    border-color: #ff8c42;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

type Filter = 'all' | 'active' | 'unsubscribed' | 'bounced';

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newSource, setNewSource] = useState('manual');
  const supabase = createClient();

  const fetchSubscribers = async () => {
    setLoading(true);
    let query = supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setSubscribers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, [filter]);

  const handleAdd = async () => {
    if (!newEmail) return;

    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: newEmail,
      name: newName || null,
      source: newSource,
      status: 'active',
    } as never);

    if (!error) {
      setShowModal(false);
      setNewEmail('');
      setNewName('');
      fetchSubscribers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this subscriber?')) return;

    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);

    if (!error) {
      setSubscribers(subscribers.filter(s => s.id !== id));
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const now = Date.now();
    const updates: Record<string, unknown> = { status };
    if (status === 'unsubscribed') {
      updates.unsubscribed_at = new Date(now).toISOString();
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update(updates as never)
      .eq('id', id);

    if (!error) {
      fetchSubscribers();
    }
  };

  const handleExport = () => {
    const csv = [
      ['Email', 'Name', 'Source', 'Status', 'Subscribed Date'],
      ...subscribers.map(s => [
        s.email,
        s.name || '',
        s.source,
        s.status,
        new Date(s.subscribed_at).toLocaleDateString(),
      ]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
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
    all: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    bounced: subscribers.filter(s => s.status === 'bounced').length,
  };

  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Title>Newsletter Subscribers</Title>
          <Subtitle>Manage your email subscribers</Subtitle>
        </HeaderLeft>
        <HeaderButtons>
          <Button onClick={handleExport}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </Button>
          <Button $primary onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Subscriber
          </Button>
        </HeaderButtons>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatValue>{counts.all}</StatValue>
          <StatLabel>Total Subscribers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{counts.active}</StatValue>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{counts.unsubscribed}</StatValue>
          <StatLabel>Unsubscribed</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{counts.bounced}</StatValue>
          <StatLabel>Bounced</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterBar>
        <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
          All
        </FilterButton>
        <FilterButton $active={filter === 'active'} onClick={() => setFilter('active')}>
          Active
        </FilterButton>
        <FilterButton $active={filter === 'unsubscribed'} onClick={() => setFilter('unsubscribed')}>
          Unsubscribed
        </FilterButton>
        <FilterButton $active={filter === 'bounced'} onClick={() => setFilter('bounced')}>
          Bounced
        </FilterButton>
      </FilterBar>

      <Table>
        <TableHeader>
          <span>Email</span>
          <span>Source</span>
          <span>Subscribed</span>
          <span>Status</span>
          <span>Actions</span>
        </TableHeader>

        {loading ? (
          <EmptyState>Loading...</EmptyState>
        ) : subscribers.length === 0 ? (
          <EmptyState>
            <h3>No subscribers yet</h3>
            <p>Add subscribers manually or collect them through your forms.</p>
          </EmptyState>
        ) : (
          subscribers.map((sub) => (
            <TableRow key={sub.id}>
              <div>
                <Email>{sub.email}</Email>
                {sub.name && <Name>{sub.name}</Name>}
              </div>
              <Source>{sub.source}</Source>
              <DateText>{formatDate(sub.subscribed_at)}</DateText>
              <StatusBadge $status={sub.status}>{sub.status}</StatusBadge>
              <Actions>
                {sub.status === 'active' && (
                  <ActionButton onClick={() => handleStatusChange(sub.id, 'unsubscribed')} title="Unsubscribe">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                  </ActionButton>
                )}
                <ActionButton $danger onClick={() => handleDelete(sub.id)} title="Delete">
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

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Add Subscriber</ModalTitle>
            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="John Doe"
              />
            </FormGroup>
            <FormGroup>
              <Label>Source</Label>
              <Select value={newSource} onChange={(e) => setNewSource(e.target.value)}>
                <option value="manual">Manual</option>
                <option value="website">Website</option>
                <option value="import">Import</option>
              </Select>
            </FormGroup>
            <ModalActions>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button $primary onClick={handleAdd}>Add Subscriber</Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
