import { ArgumentType } from '../argument-type';

export class StringArgumentType implements ArgumentType {
    readonly name = String.name;

    formatAliases(aliases: string[]): string {
        return aliases
            .map(a => `-${a.length > 4 ? '-' : ''}${a} <value>`)
            .join(', ');
    }

    parseInputs(inputs: string[]): any[] {
        return inputs;
    }
}