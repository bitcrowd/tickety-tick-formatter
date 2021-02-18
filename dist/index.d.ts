import * as helpers from './helpers';
import { ParseFn } from './types';
export { helpers };
export declare const defaults: {
    branch: string;
    commit: string;
    command: string;
};
interface Parser {
    branch: ParseFn;
    command: ParseFn;
    commit: ParseFn;
}
declare const _default: (templates?: {}, prettify?: boolean) => Parser;
export default _default;
