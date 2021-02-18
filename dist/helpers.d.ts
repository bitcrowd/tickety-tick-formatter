import { StringConverterFn } from './types';
export declare const lowercase: () => StringConverterFn;
export declare const shellquote: () => StringConverterFn;
export declare const slugify: (separator?: string) => StringConverterFn;
export declare const substring: {
    (start: number, end?: number | undefined): StringConverterFn;
    description: string;
};
export declare const trim: () => StringConverterFn;
export declare const truncate: {
    (limit: number): StringConverterFn;
    description: string;
};
export declare const uppercase: () => StringConverterFn;
