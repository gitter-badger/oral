import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Match(regex: RegExp): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found.match(regex)) {
        fail(key, "Match");
        global.tests[target["index"]].failed =
          global.tests[target["index"]].failed + 1;
        console.log(
          chalk.green(`given pattern :- ${regex}\n`) +
            chalk.red(`doesnt match :- ${found}`)
        );
      } else {
        global.tests[target["index"]].passed =
          global.tests[target["index"]].passed + 1;
        pass(key, "Match");
      }
      return found;
    };
    return descriptor;
  };
}
