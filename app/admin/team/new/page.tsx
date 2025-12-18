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

  &:hover { color: #1a1a1a; }
  svg { width: 16px; height: 16px; }
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

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
  svg { width: 32px; height: 32px; color: #ccc; }
`;

const UploadButton = styled.label`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background: #f5f5f5;
  color: #666666;
  border-radius: 8px;
  cursor: pointer;

  &:hover { background: #e5e5e5; }
  input { display: none; }
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
      ? `background: #ff8c42; color: #ffffff; border: none; &:hover { background: #e67d35; }`
      : `background: #ffffff; color: #666666; border: 1px solid #e5e5e5; &:hover { background: #f5f5f5; }`}
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

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
    phone: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    image_url: '',
    published: true,
  });
  const supabase = createClient();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `team/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('images').upload(fileName, file);

    if (!error) {
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setForm({ ...form, image_url: data.publicUrl });
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) {
      alert('Name and role are required');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('team_members').insert({
      name: form.name,
      role: form.role,
      bio: form.bio || null,
      email: form.email || null,
      phone: form.phone || null,
      linkedin: form.linkedin || null,
      twitter: form.twitter || null,
      instagram: form.instagram || null,
      image_url: form.image_url || null,
      published: form.published,
    });

    if (!error) {
      router.push('/admin/team');
    } else {
      alert('Error creating team member');
    }
    setSaving(false);
  };

  return (
    <>
      <BackLink href="/admin/team">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Team
      </BackLink>

      <Title>Add Team Member</Title>

      <Form>
        <FormGrid>
          <FormGroup $full>
            <Label>Photo</Label>
            <ImageUpload>
              <ImagePreview>
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </ImagePreview>
              <UploadButton>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </UploadButton>
            </ImageUpload>
          </FormGroup>

          <FormGroup>
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup>
            <Label>Role *</Label>
            <Input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Marketing Director"
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
            <Label>LinkedIn</Label>
            <Input
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </FormGroup>

          <FormGroup>
            <Label>Twitter</Label>
            <Input
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
              placeholder="https://twitter.com/johndoe"
            />
          </FormGroup>

          <FormGroup $full>
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="A brief biography..."
            />
          </FormGroup>

          <FormGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Publish immediately
            </CheckboxLabel>
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <Button onClick={() => router.push('/admin/team')}>Cancel</Button>
          <Button $primary onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Add Team Member'}
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
