import { ArgumentBase } from './argument-base';

export class StringArgument extends ArgumentBase {
    readonly type = 'String';

    protected _parseInputs(args: string[]): string[] {
        return args;
    }
}