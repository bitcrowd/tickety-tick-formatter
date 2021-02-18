export type FormatterName = 'branch' | 'commit' | 'command';
export type stringConverterFn = (input: string) => string;
/* eslint-disable @typescript-eslint/no-explicit-any */
export type parseFn = (values?: any) => string;
