import rateLimit from 'express-rate-limit';

// Strict: Protects login/register routes from hackers
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: 'Too many login attempts, please try again after 15 minutes.',
});

// Loose: Protects your regular database endpoints from spam
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: 'Too many requests, please try again after 15 minutes.',
});