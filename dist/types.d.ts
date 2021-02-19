export declare type Ticket = {
    [key: string]: number | string;
};
export declare type Templates = {
    branch?: string;
    commit?: string;
    command?: string;
};
export declare type FormatterName = 'branch' | 'commit' | 'command';
export declare type StringMappingFn = (input: string) => string;
export declare type FormatFn = (ticket: Ticket) => string;
