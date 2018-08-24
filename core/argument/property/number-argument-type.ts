import { StringArgumentType } from './string-argument-type';

export class NumberArgumentType extends StringArgumentType {
    readonly name = Number.name;

    parseInputs(inputs: string[]): any[] {
        return inputs.map(a => this._parseNumber(a));
    }

    private _parseNumber(value: string) {
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
            throw new Error(`Expected a number! (Received ${value})`);
        }

        return numberValue;
    }
}