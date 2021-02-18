import { createSlug } from 'speakingurl';
import { stringConverterFn } from './types';

export const lowercase = ():stringConverterFn => (s:string):string => s.toLowerCase();

export const shellquote = ():stringConverterFn => (s:string):string =>
  typeof s === 'string' ? `'${s.replace(/'/g, "'\\''")}'` : "''";

export const slugify = (separator = '-'):stringConverterFn => createSlug({ separator });

export const substring = (start: number, end?: number | undefined):stringConverterFn => (s:string) => s.substring(start, end);
substring.description = 'substring(start-index[, end-index])';

export const trim = ():stringConverterFn => (s:string) => s.trim();

export const truncate = (limit:number):stringConverterFn => (s:string) =>
  s.length > limit ? `${s.substring(0, limit - 1)}…` : s;
truncate.description = 'truncate(max-length)';

export const uppercase = ():stringConverterFn => (s:string) => s.toUpperCase();
