import { Ticket } from './types';
declare function compile(template: string, transforms?: {}): (ticket?: Ticket) => string;
export default compile;
