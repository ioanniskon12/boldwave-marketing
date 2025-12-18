'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@/lib/supabase/client';
import { FAQ } from '@/lib/supabase/types';

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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FAQHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Answer = styled.div`
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const Category = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  background: #f5f5f5;
  color: #666666;
  border-radius: 20px;
`;

const StatusBadge = styled.span<{ $published: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $published }) => ($published ? '#dcfce7' : '#fef3c7')};
  color: ${({ $published }) => ($published ? '#16a34a' : '#d97706')};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f5f5f5')};
  color: ${({ $danger }) => ($danger ? '#dc2626' : '#666666')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
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
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  outline: none;

  &:focus { border-color: #ff8c42; }
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

const categories = [
  // General categories (for /faq page)
  { value: 'general', label: 'General', group: 'General' },
  { value: 'pricing', label: 'Pricing', group: 'General' },
  { value: 'support', label: 'Support', group: 'General' },
  { value: 'other', label: 'Other', group: 'General' },
  // Service-specific categories (for /services/[slug] pages)
  { value: 'social media', label: 'Social Media Management', group: 'Services' },
  { value: 'content', label: 'Content Creation', group: 'Services' },
  { value: 'branding', label: 'Branding & Creative', group: 'Services' },
  { value: 'advertising', label: 'Paid Advertising', group: 'Services' },
  { value: 'website', label: 'Website Development', group: 'Services' },
  { value: 'design', label: 'UI/UX Design', group: 'Services' },
  { value: 'seo', label: 'SEO & Content Writing', group: 'Services' },
  { value: 'email', label: 'Email Marketing', group: 'Services' },
  { value: 'influencer', label: 'Influencer Partnerships', group: 'Services' },
  { value: 'strategy', label: 'Marketing Strategy', group: 'Services' },
  { value: 'funnel', label: 'Full Funnel Setup', group: 'Services' },
];

const getCategoryLabel = (value: string) => {
  const cat = categories.find(c => c.value === value);
  return cat ? cat.label : value.charAt(0).toUpperCase() + value.slice(1);
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'general',
    published: true,
  });
  const supabase = createClient();

  const fetchFAQs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQs:', error);
    }
    if (data) {
      setFaqs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const resetForm = () => {
    setForm({ question: '', answer: '', category: 'general', published: true });
    setEditingId(null);
  };

  const handleEdit = (faq: FAQ) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      published: faq.published,
    });
    setEditingId(faq.id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.question || !form.answer) {
      alert('Question and answer are required');
      return;
    }

    const data = {
      question: form.question,
      answer: form.answer,
      category: form.category,
      published: form.published,
    };

    if (editingId) {
      const { error } = await supabase.from('faqs').update(data as never).eq('id', editingId);
      if (!error) {
        setFaqs(faqs.map(f => f.id === editingId ? { ...f, ...data } : f));
      }
    } else {
      const { data: newData, error } = await supabase.from('faqs').insert(data).select().single();
      if (!error && newData) {
        setFaqs([...faqs, newData]);
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

    const { error } = await supabase.from('faqs').delete().eq('id', deleteId);

    if (!error) {
      setFaqs(faqs.filter(f => f.id !== deleteId));
    }
    setDeleteId(null);
  };

  if (loading) {
    return <EmptyState>Loading...</EmptyState>;
  }

  return (
    <>
      <PageHeader>
        <div>
          <Title>FAQs</Title>
          <Subtitle>Manage frequently asked questions</Subtitle>
        </div>
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add FAQ
        </AddButton>
      </PageHeader>

      {faqs.length === 0 ? (
        <EmptyState>
          <h3>No FAQs yet</h3>
          <p>Add frequently asked questions to help your visitors.</p>
        </EmptyState>
      ) : (
        <FAQList>
          {faqs.map((faq) => (
            <FAQCard key={faq.id}>
              <Question>{faq.question}</Question>
              <Answer>{faq.answer}</Answer>
              <Meta>
                <Category>{getCategoryLabel(faq.category)}</Category>
                <StatusBadge $published={faq.published}>
                  {faq.published ? 'Published' : 'Draft'}
                </StatusBadge>
                <Actions>
                  <ActionButton onClick={() => handleEdit(faq)}>Edit</ActionButton>
                  <ActionButton $danger onClick={() => handleDeleteClick(faq.id)}>Delete</ActionButton>
                </Actions>
              </Meta>
            </FAQCard>
          ))}
        </FAQList>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{editingId ? 'Edit FAQ' : 'Add FAQ'}</ModalTitle>
            <FormGroup>
              <Label>Question *</Label>
              <Input
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="What services do you offer?"
              />
            </FormGroup>
            <FormGroup>
              <Label>Answer *</Label>
              <Textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="We offer a wide range of marketing services..."
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <optgroup label="General">
                  {categories.filter(cat => cat.group === 'General').map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Services">
                  {categories.filter(cat => cat.group === 'Services').map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </optgroup>
              </Select>
            </FormGroup>
            <ModalActions>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button $primary onClick={handleSubmit}>
                {editingId ? 'Update' : 'Add'} FAQ
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
            <DeleteTitle>Delete FAQ</DeleteTitle>
            <DeleteDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
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
