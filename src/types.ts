export type FormatterName = 'branch' | 'commit' | 'command';
export type StringConverterFn = (input: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParseFn = (values?: any) => string;
