import chalk from "chalk";
import { fail, pass } from "../utils/prints";
import "reflect-metadata";

export function LessThan(given: number): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found < given) {
        pass(key, "LessThan");
        global.tests[target["index"]].passed =
          global.tests[target["index"]].passed + 1;
      } else {
        fail(key, "LessThan");
        global.tests[target["index"]].failed =
          global.tests[target["index"]].failed + 1;
        console.log(
          chalk.green(`found number :- ${found}\n`) +
            chalk.red(`is not less than :- ${given}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
