import { ArgumentType } from '../argument-type';

export class BooleanArgumentType implements ArgumentType {
    readonly name = Boolean.name;

    formatAliases(aliases: string[]): string {
        return aliases
            .map(a => `-${a.length > 4 ? '-' : ''}${a}`)
            .join(', ');
    }

    parseInputs(inputs: string[]): any[] {
        return inputs.length ? inputs.map(i => this._parseBoolean(i)) : [true];
    }

    private _parseBoolean(value: string) {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else {
            throw new Error(`Expected either 'true' or 'false'! (Received '${value}')`);
        }
    }
}