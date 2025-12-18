'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';
import { Redirect } from '@/lib/supabase/types';

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

const StatsRow = styled.div`
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

const StatLabel = styled.div`
  font-size: 13px;
  color: #666666;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
`;

const Table = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 80px 90px 240px;
  gap: 16px;
  padding: 16px 24px;
  background: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 80px 90px 240px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:last-child { border-bottom: none; }
  &:hover { background: #fafafa; }
`;

const PathCell = styled.div`
  font-family: monospace;
  font-size: 13px;
  color: #1a1a1a;
  word-break: break-all;
`;

const TypeBadge = styled.span<{ $type: number }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $type }) => ($type === 301 ? '#dcfce7' : '#dbeafe')};
  color: ${({ $type }) => ($type === 301 ? '#16a34a' : '#2563eb')};
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $active }) => ($active ? '#dcfce7' : '#fef3c7')};
  color: ${({ $active }) => ($active ? '#16a34a' : '#d97706')};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $danger }) => ($danger ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fee2e2' : '#e5e5e5')};
  }

  svg {
    width: 14px;
    height: 14px;
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
  max-width: 600px;
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
  font-family: monospace;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;

  input { width: 18px; height: 18px; }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
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
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #ffffff;
  border-radius: 16px;

  h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
  p { font-size: 14px; color: #666666; }
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const DeleteModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const DeleteIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: #fef2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  svg {
    width: 32px;
    height: 32px;
    color: #dc2626;
  }
`;

const DeleteTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const DeleteDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const DeleteActions = styled.div`
  display: flex;
  gap: 12px;
`;

const DeleteButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $danger }) =>
    $danger
      ? `
    background: #dc2626;
    color: #ffffff;
    border: none;
    &:hover { background: #b91c1c; }
  `
      : `
    background: #ffffff;
    color: #666666;
    border: 1px solid #e5e5e5;
    &:hover { background: #f5f5f5; }
  `}
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #888888;
  margin-top: 6px;
`;

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    from_path: '',
    to_path: '',
    redirect_type: 301,
    active: true,
  });
  const supabase = createClient();

  const fetchRedirects = async () => {
    const { data, error } = await supabase
      .from('redirects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRedirects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRedirects();
  }, []);

  const resetForm = () => {
    setForm({ from_path: '', to_path: '', redirect_type: 301, active: true });
    setEditingId(null);
  };

  const handleEdit = (redirect: Redirect) => {
    setForm({
      from_path: redirect.from_path,
      to_path: redirect.to_path,
      redirect_type: redirect.redirect_type,
      active: redirect.active,
    });
    setEditingId(redirect.id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.from_path || !form.to_path) {
      alert('Source and destination paths are required');
      return;
    }

    const data = {
      from_path: form.from_path.startsWith('/') ? form.from_path : `/${form.from_path}`,
      to_path: form.to_path,
      redirect_type: form.redirect_type,
      active: form.active,
    };

    if (editingId) {
      const { error } = await supabase.from('redirects').update(data as never).eq('id', editingId);
      if (!error) {
        setRedirects(redirects.map(r => r.id === editingId ? { ...r, ...data } : r));
      }
    } else {
      const { data: newData, error } = await supabase.from('redirects').insert(data).select().single();
      if (!error && newData) {
        setRedirects([newData, ...redirects]);
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    const { error } = await supabase.from('redirects').delete().eq('id', deleteId);

    if (!error) {
      setRedirects(redirects.filter(r => r.id !== deleteId));
    }
    setDeleteId(null);
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const newActive = !currentActive;

    const { error } = await supabase
      .from('redirects')
      .update({ active: newActive })
      .eq('id', id);

    if (error) {
      console.error('Error toggling redirect:', error);
      alert('Failed to update redirect status');
      return;
    }

    setRedirects(redirects.map(r => r.id === id ? { ...r, active: newActive } : r));
  };

  const activeCount = redirects.filter(r => r.active).length;
  const permanent301 = redirects.filter(r => r.redirect_type === 301).length;
  const temporary302 = redirects.filter(r => r.redirect_type === 302).length;

  if (loading) {
    return <EmptyState>Loading...</EmptyState>;
  }

  return (
    <>
      <PageHeader>
        <div>
          <Title>URL Redirects</Title>
          <Subtitle>Manage 301/302 redirects for SEO and broken links</Subtitle>
        </div>
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Redirect
        </AddButton>
      </PageHeader>

      <StatsRow>
        <StatCard>
          <StatLabel>Total Redirects</StatLabel>
          <StatValue>{redirects.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active</StatLabel>
          <StatValue>{activeCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>301 Permanent</StatLabel>
          <StatValue>{permanent301}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>302 Temporary</StatLabel>
          <StatValue>{temporary302}</StatValue>
        </StatCard>
      </StatsRow>

      {redirects.length === 0 ? (
        <EmptyState>
          <h3>No redirects yet</h3>
          <p>Add redirects to handle moved pages and fix broken links.</p>
        </EmptyState>
      ) : (
        <Table>
          <TableHeader>
            <div>From</div>
            <div>To</div>
            <div>Type</div>
            <div>Status</div>
            <div>Actions</div>
          </TableHeader>
          {redirects.map((redirect) => (
            <TableRow key={redirect.id}>
              <PathCell>{redirect.from_path}</PathCell>
              <PathCell>{redirect.to_path}</PathCell>
              <div>
                <TypeBadge $type={redirect.redirect_type}>{redirect.redirect_type}</TypeBadge>
              </div>
              <div>
                <StatusBadge $active={redirect.active}>
                  {redirect.active ? 'Active' : 'Inactive'}
                </StatusBadge>
              </div>
              <Actions>
                <ActionButton onClick={() => handleEdit(redirect)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleToggleActive(redirect.id, redirect.active)}>
                  {redirect.active ? 'Disable' : 'Enable'}
                </ActionButton>
                <ActionButton $danger onClick={() => handleDeleteClick(redirect.id)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </ActionButton>
              </Actions>
            </TableRow>
          ))}
        </Table>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{editingId ? 'Edit Redirect' : 'Add Redirect'}</ModalTitle>
            <FormGroup>
              <Label>Source Path *</Label>
              <Input
                value={form.from_path}
                onChange={(e) => setForm({ ...form, from_path: e.target.value })}
                placeholder="/old-page"
              />
              <HelpText>The path to redirect from (e.g., /old-page or /blog/old-post)</HelpText>
            </FormGroup>
            <FormGroup>
              <Label>Destination *</Label>
              <Input
                value={form.to_path}
                onChange={(e) => setForm({ ...form, to_path: e.target.value })}
                placeholder="/new-page or https://example.com/page"
              />
              <HelpText>Can be a relative path or full URL</HelpText>
            </FormGroup>
            <FormGroup>
              <Label>Redirect Type</Label>
              <Select value={form.redirect_type} onChange={(e) => setForm({ ...form, redirect_type: Number(e.target.value) })}>
                <option value={301}>301 - Permanent Redirect (SEO-friendly)</option>
                <option value={302}>302 - Temporary Redirect</option>
              </Select>
              <HelpText>Use 301 for permanent moves, 302 for temporary redirects</HelpText>
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />
                Active (redirect is enabled)
              </CheckboxLabel>
            </FormGroup>
            <ModalActions>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button $primary onClick={handleSubmit}>
                {editingId ? 'Update' : 'Add'} Redirect
              </Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

      {deleteId && (
        <DeleteModal onClick={() => setDeleteId(null)}>
          <DeleteModalContent onClick={(e) => e.stopPropagation()}>
            <DeleteIconWrapper>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </DeleteIconWrapper>
            <DeleteTitle>Delete Redirect</DeleteTitle>
            <DeleteDescription>
              Are you sure you want to delete this redirect? This action cannot be undone.
            </DeleteDescription>
            <DeleteActions>
              <DeleteButton onClick={() => setDeleteId(null)}>Cancel</DeleteButton>
              <DeleteButton $danger onClick={handleDeleteConfirm}>Delete</DeleteButton>
            </DeleteActions>
          </DeleteModalContent>
        </DeleteModal>
      )}
    </>
  );
}
