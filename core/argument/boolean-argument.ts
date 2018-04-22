import { ArgumentBase } from './argument-base';

export class BooleanArgument extends ArgumentBase {
    readonly type = 'Boolean';

    formatAliases(): string {
        return this.alias
            .map(a => `-${a.length > 4 ? '-' : ''}${a}`)
            .join(', ');
    }

    protected _parseInputs(args: string[]): boolean[] {
        return args.length ? args.map(a => this._parseBoolean(a)) : [true];
    }

    private _parseBoolean(value: string) {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else {
            throw new Error(
                `--${this.name} expects either 'true' or 'false'! Received '${value}'`);
        }
    }
}