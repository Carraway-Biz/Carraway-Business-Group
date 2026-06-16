'use client';
import { useState } from 'react';
import Eyebrow from './Eyebrow';
import styles from './ContactSection.module.css';

const FUNDING_OPTIONS = [
  '$50,000 – $150,000',
  '$150,000 – $500,000',
  '$500,000 – $1,000,000',
  '$1,000,000 – $5,000,000',
  '$5,000,000+',
];

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    fundingAmount: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.section} id="contact">
        <div className={`container ${styles.successWrap}`}>
          <div className={styles.successInner}>
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <h2 className={styles.successHead}>Message received.</h2>
            <p className={styles.successSub}>
              We'll be in touch within one business day. If your need is
              time-sensitive, email us directly at{' '}
              <a href="mailto:ben@gocarraway.com">ben@gocarraway.com</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="contact">
      <div className={`container ${styles.inner}`}>

        <div className={styles.left}>
          <Eyebrow>Get in Touch</Eyebrow>
          <h2 className={styles.headline}>
            Start the conversation.
          </h2>
          <p className={styles.sub}>
            Tell us about your business and what you're trying to accomplish.
            We'll respond within one business day.
          </p>

          <div className={styles.directContact}>
            <a href="mailto:ben@gocarraway.com" className={styles.directLink}>
              ben@gocarraway.com
            </a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                className={styles.input}
                value={form.firstName}
                onChange={set('firstName')}
                placeholder="First"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                className={styles.input}
                value={form.lastName}
                onChange={set('lastName')}
                placeholder="Last"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={styles.input}
                value={form.email}
                onChange={set('email')}
                placeholder="you@company.com"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={styles.input}
                value={form.phone}
                onChange={set('phone')}
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="organization"
              className={styles.input}
              value={form.businessName}
              onChange={set('businessName')}
              placeholder="Acme Corp"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                name="businessType"
                className={styles.input}
                value={form.businessType}
                onChange={set('businessType')}
              >
                <option value="">Select business type</option>
                <option value="LLC">LLC</option>
                <option value="S-Corp">S-Corp</option>
                <option value="C-Corp">C-Corp</option>
                <option value="Sole Proprietor">Sole Proprietor</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fundingAmount">Funding Need</label>
              <select
                id="fundingAmount"
                name="fundingAmount"
                className={`${styles.input} ${styles.select}`}
                value={form.fundingAmount}
                onChange={set('fundingAmount')}
              >
                <option value="">Select a range</option>
                {FUNDING_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">What are you trying to accomplish?</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${styles.input} ${styles.textarea}`}
              value={form.message}
              onChange={set('message')}
              placeholder="Tell us about the business, the funding need, and your timeline."
            />
          </div>

          {status === 'error' && (
            <p className={styles.errorMsg} role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.submit}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          <p className={styles.privacy}>
            No obligation. Your information is never shared or sold.
          </p>

        </form>
      </div>
    </section>
  );
}
