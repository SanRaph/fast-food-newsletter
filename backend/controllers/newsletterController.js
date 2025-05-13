// controllers/newsletterController.js
const Subscriber = require('../models/Subscriber');
const { sendNewsletter } = require('../utils/mailer');

// Subscribe
exports.subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const sub = await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed', email: sub.email });
  } catch {
    res.status(400).json({ error: 'Already subscribed or invalid' });
  }
};

// Unsubscribe
exports.unsubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    await Subscriber.deleteOne({ email });
    res.json({ message: 'Unsubscribed successfully' });
  } catch {
    res.status(400).json({ error: 'Email not found' });
  }
};

// Send newsletter (admin-only route)
exports.send = async (req, res) => {
  const { subject, html } = req.body;
  const subscribers = await Subscriber.find({});
  const emails = subscribers.map(sub => sub.email);

  try {
    await sendNewsletter(emails, subject, html);
    res.json({ message: 'Newsletter sent!' });
  } catch {
    res.status(500).json({ error: 'Sending failed' });
  }
};