import * as helpers from './helpers';
import { parseFn } from './types';
export { helpers };
export declare const defaults: {
    branch: string;
    commit: string;
    command: string;
};
interface Parser {
    branch: parseFn;
    command: parseFn;
    commit: parseFn;
}
declare const _default: (templates?: {}, prettify?: boolean) => Parser;
export default _default;
