import {z} from 'zod';

const minPassLen = 8, maxPassLen = 50;

export const passwordSchema = z.string()
  .min(minPassLen, {message: 'Password must be at least 8 characters long'})
  .max(maxPassLen, {message: 'Password must be at most 50 characters long'})
  .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
  .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
  .regex(/[0-9]/, {message: 'Password must contain at least one number'})
  .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one special character'})
  .trim();
1
export const loginSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, {message: 'First name must not be empty'}).max(50, {message: 'First name must be at most 50 characters long'}).trim(),
  lastName: z.string().min(1, {message: 'Last name must not be empty'}).max(50, {message: 'Last name must be at most 50 characters long'}).trim(),
  confirmPassword: passwordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterSchema = z.infer<typeof registerSchema>;