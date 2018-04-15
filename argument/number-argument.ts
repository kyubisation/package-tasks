import { ArgumentBase } from './argument-base';

export class NumberArgument extends ArgumentBase {
    readonly type = 'Number';

    protected _parseInputs(args: string[]): number[] {
        return args.map(a => this._parseNumber(a));
    }

    private _parseNumber(value: string) {
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
            throw new Error(`--${this.name} expects a number! Received ${value}`);
        }

        return numberValue;
    }
}