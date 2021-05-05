import * as helpers from './helpers';
import { Formatter } from './types';
export { helpers };
export declare const templateDefaults: {
    branch: string;
    commit: string;
    command: string;
};
declare const _default: (templates?: {}, prettify?: boolean) => Formatter;
export default _default;
