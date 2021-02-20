import { assertStrictEquals } from "../../dep.ts";
import { NmapScanner } from "./nmap.ts";

export interface NmapResult{
    output?:string;
    xml?:string;
    // deno-lint-ignore no-explicit-any
    json:any;
  }

const scanner= new NmapScanner();
const result=await scanner.scan("127.0.0.1",{});

Deno.test('nmap test',  () => {
    // console.log(result.json);
    assertStrictEquals(true, result.output!==null,"no nmap terminal output result ")
    assertStrictEquals(true, result.xml!==null,"no nmap xml output result ")
    
});