import * as helpers from './helpers';
import { FormatFn } from './types';
export { helpers };
export declare const templateDefaults: {
    branch: string;
    commit: string;
    command: string;
};
interface Parser {
    branch: FormatFn;
    command: FormatFn;
    commit: FormatFn;
}
declare const _default: (templates?: {}, prettify?: boolean) => Parser;
export default _default;
