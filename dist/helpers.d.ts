import { StringMappingFn } from './types';
export declare const lowercase: () => StringMappingFn;
export declare const shellquote: () => StringMappingFn;
export declare const slugify: (separator?: string) => StringMappingFn;
export declare const substring: {
    (start: number, end?: number | undefined): StringMappingFn;
    description: string;
};
export declare const trim: () => StringMappingFn;
export declare const truncate: {
    (limit: number): StringMappingFn;
    description: string;
};
export declare const uppercase: () => StringMappingFn;
