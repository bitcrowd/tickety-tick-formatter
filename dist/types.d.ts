export declare type Ticket = {
    [key: string]: number | string;
};
export declare type Templates = {
    branch?: string;
    commit?: string;
    command?: string;
};
export declare type FormatFn = (ticket: Ticket) => string;
export interface Formatter {
    branch: FormatFn;
    command: FormatFn;
    commit: FormatFn;
}
export declare type FormatterName = keyof Formatter;
export declare type StringMappingFn = (input: string) => string;
