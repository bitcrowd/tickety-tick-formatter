export declare type Ticket = any;
export declare type Templates = {
    branch?: string;
    commit?: string;
    command?: string;
};
export declare type FormatterName = 'branch' | 'commit' | 'command';
export declare type StringMappingFn = (input: string) => string;
export declare type FormatFn = (ticket: Ticket) => string;
