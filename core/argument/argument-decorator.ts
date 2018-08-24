import 'reflect-metadata';

import { ArgumentOptions } from './argument-options';
import { PropertyArgumentBuilder, PropertyArgument } from './property';

const PROPERTY_ARGUMENT_BUILDER = new PropertyArgumentBuilder();
const PROPERTY_ARGUMENTS_KEY = Symbol('arguments:property');
const PARAMETER_ARGUMENTS_KEY = Symbol('arguments:parameter');

export function Arg(args: ArgumentOptions = {}): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const argument = PROPERTY_ARGUMENT_BUILDER.buildPropertyArgument(target, propertyKey, args);
        const propertyArguments = Reflect.getMetadata(PROPERTY_ARGUMENTS_KEY, target) || [];
        Reflect.defineMetadata(PROPERTY_ARGUMENTS_KEY, propertyArguments.concat(argument), target);
    };
}

export function Param(): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    };
}

export function propertyArguments(task: Object): PropertyArgument[] {
    return Reflect.getMetadata(PROPERTY_ARGUMENTS_KEY, task) || [];
}

export function parameterArguments(task: Object): PropertyArgument[] {
    return Reflect.getMetadata(PARAMETER_ARGUMENTS_KEY, task) || [];
}
