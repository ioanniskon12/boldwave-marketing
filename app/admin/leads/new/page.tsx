'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 32px;
`;

const Form = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: #ff8c42;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;

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
`;

export default function NewLeadPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    source: 'website',
    status: 'new',
    priority: 'medium',
    estimated_value: '',
    notes: '',
  });
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!form.name) {
      alert('Name is required');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('leads').insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      company: form.company || null,
      website: form.website || null,
      source: form.source,
      status: form.status,
      priority: form.priority,
      estimated_value: form.estimated_value ? parseFloat(form.estimated_value) : null,
      notes: form.notes || null,
    } as never);

    if (!error) {
      router.push('/admin/leads');
    } else {
      alert('Error creating lead');
    }
    setSaving(false);
  };

  return (
    <>
      <BackLink href="/admin/leads">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Leads
      </BackLink>

      <Title>Add New Lead</Title>

      <Form>
        <FormGrid>
          <FormGroup>
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 234 567 8900"
            />
          </FormGroup>

          <FormGroup>
            <Label>Company</Label>
            <Input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company Name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>Estimated Value ($)</Label>
            <Input
              type="number"
              value={form.estimated_value}
              onChange={(e) => setForm({ ...form, estimated_value: e.target.value })}
              placeholder="5000"
            />
          </FormGroup>

          <FormGroup>
            <Label>Source</Label>
            <Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="social">Social Media</option>
              <option value="ads">Ads</option>
              <option value="cold">Cold Outreach</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Priority</Label>
            <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </Select>
          </FormGroup>

          <FormGroup $full>
            <Label>Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Additional notes about this lead..."
            />
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <Button onClick={() => router.push('/admin/leads')}>Cancel</Button>
          <Button $primary onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Create Lead'}
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
