
import { XMLtoJSON } from "../../dep.ts";

export interface NmapResult{
    output?:string;
    xml?:string;
    // deno-lint-ignore no-explicit-any
    json:any;
  }
export class NmapScannerOptions{
    /**输出文件名 无则随机 */
    oX?:boolean;


}
export class NmapScanner {
  async scan(
    target: string,
    options: NmapScannerOptions = {},
  ): Promise<NmapResult> {
    const cmdOptions: string[] = [];
    const uuid = Date.now();

    const p = Deno.run({
      cmd: ["nmap", target, "-oX", `./${uuid}.xml`].concat(...cmdOptions),
      stdout: "piped",
    });
    const status = await p.status();
    if (status.code == 0) {
      const rawOutput = await p.output();
      const text = new TextDecoder().decode(rawOutput);
      const xml = await Deno.readTextFileSync(`./${uuid}.xml`);
      await Deno.removeSync(`./${uuid}.xml`);
      let json = null;
      if (xml) {
        json =await XMLtoJSON(xml);
      }
      return { xml, output: text, json };
    } else {
      return { xml: "", output: "", json: null };
    }
  }
}
