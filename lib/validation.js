import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Newsletter blog validation schemas
export const newsletterBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'scheduled', 'published']),
  scheduled_at: z.string().nullable().optional(),
  banner_image_url: z.string().url().nullable().optional(),
});

export const updateNewsletterBlogSchema = newsletterBlogSchema.partial();

// Type inference
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type NewsletterBlogInput = z.infer<typeof newsletterBlogSchema>;
export type UpdateNewsletterBlogInput = z.infer<typeof updateNewsletterBlogSchema>;