import chalk from "chalk";

export function True(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found) {
        this.emit("fail", key, "True");
        console.log(
          chalk.green(`given :- true \n`) + chalk.red(`found :- ${found}`)
        );
      } else {
        this.emit("pass", key, "True");
      }
      return found;
    };
    return descriptor;
  };
}
