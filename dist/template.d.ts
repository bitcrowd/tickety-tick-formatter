import { parseFn } from "./types";
declare function compile(template: string, transforms?: {}): parseFn;
export default compile;
