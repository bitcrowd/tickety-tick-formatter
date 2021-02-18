import { stringConverterFn } from './types';
export declare const lowercase: () => stringConverterFn;
export declare const shellquote: () => stringConverterFn;
export declare const slugify: (separator?: string) => stringConverterFn;
export declare const substring: {
    (start: number, end?: number | undefined): stringConverterFn;
    description: string;
};
export declare const trim: () => stringConverterFn;
export declare const truncate: {
    (limit: number): stringConverterFn;
    description: string;
};
export declare const uppercase: () => stringConverterFn;
