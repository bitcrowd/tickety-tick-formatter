/*
  Tickets usually contain the following keys, but depending on the template may contain any key:
  * id?: number | string,
  * title?: string,
  * description?: string,
  * type?: string,
  * url?: string,
  * branch?: string,
  * commit?: string,
*/
export type Ticket = {
  [key: string]: number | string
};
export type Templates = {
  branch?: string,
  commit?: string,
  command?: string
};
export type FormatterName = 'branch' | 'commit' | 'command';
export type StringMappingFn = (input: string) => string;
export type FormatFn = (ticket: Ticket) => string;
