import { createSlug } from 'speakingurl';

import { StringMappingFn } from './types';

export const lowercase = (): StringMappingFn => (s: string): string =>
  s.toLowerCase();

export const shellquote = (): StringMappingFn => (s: string): string =>
  typeof s === 'string' ? `'${s.replace(/'/g, "'\\''")}'` : "''";

export const slugify = (separator = '-'): StringMappingFn =>
  createSlug({ separator });

export const substring = (
  start: number,
  end?: number | undefined
): StringMappingFn => (s: string) => s.substring(start, end);
substring.description = 'substring(start-index[, end-index])';

export const trim = (): StringMappingFn => (s: string) => s.trim();

export const truncate = (limit: number): StringMappingFn => (s: string) =>
  s.length > limit ? `${s.substring(0, limit - 1)}…` : s;
truncate.description = 'truncate(max-length)';

export const uppercase = (): StringMappingFn => (s: string) => s.toUpperCase();
