import { createSlug } from 'speakingurl';
import { StringConverterFn } from './types';

export const lowercase = (): StringConverterFn => (s: string): string => s.toLowerCase();

export const shellquote = (): StringConverterFn => (s: string): string =>
  typeof s === 'string' ? `'${s.replace(/'/g, "'\\''")}'` : "''";

export const slugify = (separator = '-'): StringConverterFn => createSlug({ separator });

export const substring = (start: number, end?: number | undefined): StringConverterFn => (s: string) => s.substring(start, end);
substring.description = 'substring(start-index[, end-index])';

export const trim = (): StringConverterFn => (s: string) => s.trim();

export const truncate = (limit: number): StringConverterFn => (s: string) =>
  s.length > limit ? `${s.substring(0, limit - 1)}…` : s;
truncate.description = 'truncate(max-length)';

export const uppercase = (): StringConverterFn => (s: string) => s.toUpperCase();
