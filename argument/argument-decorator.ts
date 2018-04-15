import 'reflect-metadata';

import { Argument } from './argument';
import { ArgumentBase } from './argument-base';
import { ArgumentOptions } from './argument-options';
import { BooleanArgument } from './boolean-argument';
import { NumberArgument } from './number-argument';
import { StringArgument } from './string-argument';

type ArgumentConstructor = {
    new(
        name: string,
        alias?: string[],
        description?: string,
        allowMultiple?: boolean): ArgumentBase
};
const STORE = new WeakMap<Object, Argument[]>();
const DESIGN_METADATA = 'design:type';
const SUPPORTED_TYPES = new Map<any, ArgumentConstructor>()
    .set(Object, StringArgument)
    .set(String, StringArgument)
    .set(Number, NumberArgument)
    .set(Boolean, BooleanArgument);

export function Arg(args: ArgumentOptions = {}): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const name = typeof propertyKey === 'symbol'
            ? propertyKey.toString().slice(7, -1) : propertyKey;
        const type = args.type
            || Reflect.getMetadata(DESIGN_METADATA, target, propertyKey)
            || String;
        const ArgumentType = SUPPORTED_TYPES.get(type);
        if (!ArgumentType) {
            throw new Error(`Unsupported argument type '${type}'`);
        }

        const argument = new ArgumentType(
            name, new Array<string>().concat(args.alias || []), args.description, args.allowMultiple);
        STORE.set(target, (STORE.get(target) || []).concat(argument));
    };
}

export function taskArguments(task: Object): Argument[] | undefined {
    return STORE.get(task);
}
