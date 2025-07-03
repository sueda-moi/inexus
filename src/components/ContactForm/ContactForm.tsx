'use client';

import React, { useState } from 'react';
import './ContactForm.css';
import { useToast } from '@/lib/useToast';
import { useMessage } from '@/lib/useMessage';

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const toast = useToast();
  const getMessage = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name')?.toString().trim() || '';
    const company = formData.get('company')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name) {
      toast.warn(getMessage('Pg005', 'toast_missing_name'));
      return;
    }

    if (!phone && !email) {
      toast.warn(getMessage('Pg005', 'toast_missing_contact'));
      return;
    }

    setLoading(true);
    setFormStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, phone, email, message }),
      });

      if (res.ok) {
        setFormStatus('success');
        form.reset();
        toast.success(getMessage('Pg005', 'toast_success'));
      } else {
        setFormStatus('error');
        toast.error(getMessage('Pg005', 'toast_fail'));
      }
    } catch (err) {
      setFormStatus('error');
      toast.error(getMessage('Pg005', 'toast_error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          {getMessage('Pg005', 'form_name_label')}
          <span className="required">*</span>
        </label>
        <input id="name" name="name" type="text" required />
      </div>

      <div className="form-group">
        <label htmlFor="company">{getMessage('Pg005', 'form_company_label')}</label>
        <input id="company" name="company" type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="phone">{getMessage('Pg005', 'form_phone_label')}</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={getMessage('Pg005', 'form_phone_placeholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">{getMessage('Pg005', 'form_email_label')}</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={getMessage('Pg005', 'form_email_placeholder')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">
          {getMessage('Pg005', 'form_message_label')}
          <span className="required">*</span>
        </label>
        <textarea id="message" name="message" rows={5} required></textarea>
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading
          ? getMessage('Pg005', 'form_submitting')
          : getMessage('Pg005', 'form_submit_button')}
      </button>

      {formStatus === 'success' && (
        <div className="form-success">
          <svg className="success-checkmark check-icon" viewBox="0 0 52 52">
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M14 27l7 7 17-17"
            />
          </svg>
          <p>{getMessage('Pg005', 'form_success_message')}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
