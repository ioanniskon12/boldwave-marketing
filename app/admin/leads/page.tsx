'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Lead } from '@/lib/supabase/types';

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

const AddButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ff8c42;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;

  &:hover {
    background: #e67d35;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ $color?: string }>`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${({ $color }) => $color || '#e5e5e5'};
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666666;
  text-transform: uppercase;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean; $color?: string }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $active, $color }) => ($active ? $color || '#1a1a1a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};
  border: 1px solid ${({ $active, $color }) => ($active ? $color || '#1a1a1a' : '#e5e5e5')};
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
  grid-template-columns: 1fr 150px 100px 100px 120px 100px;
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
  grid-template-columns: 1fr 150px 100px 100px 120px 100px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:hover {
    background: #fafafa;
  }
`;

const LeadName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
`;

const LeadEmail = styled.div`
  font-size: 13px;
  color: #666666;
`;

const LeadCompany = styled.div`
  font-size: 14px;
  color: #666666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  background: ${({ $status }) => {
    switch ($status) {
      case 'new': return '#dbeafe';
      case 'contacted': return '#fef3c7';
      case 'qualified': return '#d1fae5';
      case 'proposal': return '#ede9fe';
      case 'won': return '#dcfce7';
      case 'lost': return '#fecaca';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'new': return '#2563eb';
      case 'contacted': return '#d97706';
      case 'qualified': return '#059669';
      case 'proposal': return '#7c3aed';
      case 'won': return '#16a34a';
      case 'lost': return '#dc2626';
      default: return '#666666';
    }
  }};
`;

const PriorityBadge = styled.span<{ $priority: string }>`
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ $priority }) => {
    switch ($priority) {
      case 'high': return '#fecaca';
      case 'medium': return '#fef3c7';
      case 'low': return '#e5e5e5';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $priority }) => {
    switch ($priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#666666';
      default: return '#666666';
    }
  }};
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
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

const EditLink = styled(Link)`
  padding: 6px;
  background: #f5f5f5;
  color: #666666;
  border-radius: 6px;
  display: flex;

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

type Filter = 'all' | 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';

const statusColors: Record<string, string> = {
  new: '#2563eb',
  contacted: '#d97706',
  qualified: '#059669',
  proposal: '#7c3aed',
  won: '#16a34a',
  lost: '#dc2626',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const supabase = createClient();

  const fetchLeads = async () => {
    setLoading(true);
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return;

    const { error } = await supabase.from('leads').delete().eq('id', id);

    if (!error) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status } as never)
      .eq('id', id);

    if (!error) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: status as Lead['status'] } : l));
    }
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    proposal: leads.filter(l => l.status === 'proposal').length,
    won: leads.filter(l => l.status === 'won').length,
    lost: leads.filter(l => l.status === 'lost').length,
  };

  const totalValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);
  const wonValue = leads.filter(l => l.status === 'won').reduce((sum, l) => sum + (l.estimated_value || 0), 0);

  return (
    <>
      <PageHeader>
        <HeaderLeft>
          <Title>Leads</Title>
          <Subtitle>Track and manage your sales pipeline</Subtitle>
        </HeaderLeft>
        <AddButton href="/admin/leads/new">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Lead
        </AddButton>
      </PageHeader>

      <StatsGrid>
        <StatCard $color="#2563eb">
          <StatValue>{counts.new}</StatValue>
          <StatLabel>New</StatLabel>
        </StatCard>
        <StatCard $color="#d97706">
          <StatValue>{counts.contacted}</StatValue>
          <StatLabel>Contacted</StatLabel>
        </StatCard>
        <StatCard $color="#059669">
          <StatValue>{counts.qualified}</StatValue>
          <StatLabel>Qualified</StatLabel>
        </StatCard>
        <StatCard $color="#7c3aed">
          <StatValue>{counts.proposal}</StatValue>
          <StatLabel>Proposal</StatLabel>
        </StatCard>
        <StatCard $color="#16a34a">
          <StatValue>{formatCurrency(wonValue)}</StatValue>
          <StatLabel>Won</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(totalValue)}</StatValue>
          <StatLabel>Pipeline</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterBar>
        {(['all', 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as Filter[]).map((f) => (
          <FilterButton
            key={f}
            $active={filter === f}
            $color={statusColors[f]}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </FilterButton>
        ))}
      </FilterBar>

      <Table>
        <TableHeader>
          <span>Lead</span>
          <span>Company</span>
          <span>Value</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Actions</span>
        </TableHeader>

        {loading ? (
          <EmptyState>Loading...</EmptyState>
        ) : leads.length === 0 ? (
          <EmptyState>
            <h3>No leads yet</h3>
            <p>Add your first lead to start tracking your pipeline.</p>
          </EmptyState>
        ) : (
          leads.map((lead) => (
            <TableRow key={lead.id}>
              <div>
                <LeadName>{lead.name}</LeadName>
                <LeadEmail>{lead.email || lead.phone || '-'}</LeadEmail>
              </div>
              <LeadCompany>{lead.company || '-'}</LeadCompany>
              <Value>{formatCurrency(lead.estimated_value)}</Value>
              <PriorityBadge $priority={lead.priority}>{lead.priority}</PriorityBadge>
              <StatusBadge $status={lead.status}>{lead.status}</StatusBadge>
              <Actions>
                <EditLink href={`/admin/leads/${lead.id}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </EditLink>
                <ActionButton $danger onClick={() => handleDelete(lead.id)}>
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
