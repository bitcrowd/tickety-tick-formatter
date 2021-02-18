import { ParseFn } from "./types";
declare function compile(template: string, transforms?: {}): ParseFn;
export default compile;
