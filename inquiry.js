/* The static site prepares a reviewable email; it never claims a booking was sent. */
(function (root) {
  'use strict';
  const recipient = 'ask.sociallycurated@gmail.com';
  const services = ['Not sure yet', 'Content creation', 'Social media management', 'Event content', 'Curated Content', 'Curated Growth', 'Curated Management', 'The Moment Edit', 'The Event Edit', 'The Fully Curated', 'A custom package'];
  function prepare(data) {
    const clean = key => String(data[key] || '').trim();
    const name = clean('name'), email = clean('email'), message = clean('message');
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) throw new Error('Add your name, a valid email and at least 10 characters about your project.');
    const service = services.includes(data.service) ? data.service : services[0];
    const body = ['Hello Anum & Alyna,', '', 'I’d love to talk about a project with Socially Curated.', '', 'Name: ' + name, 'Email: ' + email, 'Brand / event: ' + (clean('brand') || 'To be discussed'), 'Interested in: ' + service, 'Timing: ' + (clean('timing') || 'Flexible / let’s talk'), '', message, '', 'Looking forward to connecting,', name].join('\n');
    const subject = 'Booking inquiry — ' + (clean('brand') || name);
    return { body, subject, href: 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) };
  }
  const api = { prepare, recipient, services };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SociallyInquiry = api;
})(typeof window === 'undefined' ? this : window);
