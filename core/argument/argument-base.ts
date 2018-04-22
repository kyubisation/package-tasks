import { Argument } from './argument';

export abstract class ArgumentBase implements Argument {
    readonly abstract type: string;

    constructor(
        public readonly name: string,
        public readonly alias: string[] = [],
        public readonly description: string = '',
        public readonly allowMultiple: boolean = false,
    ) {
        this.alias = new Array<string>()
            .concat(alias || [])
            .filter(a => !!a)
            .map(a => a.trim().replace(/^-+/, ''));
    }

    get names() {
        return [this.name].concat(this.alias);
    }

    formatAliases(): string {
        return this.alias
            .map(a => `-${a.length > 4 ? '-' : ''}${a} <value>`)
            .join(', ');
    }

    parseAndValidateInputs(args: string[]): any[] {
        if (!this.allowMultiple && args.length > 1) {
            throw new Error(`--${this.name} allows only one argument!`);
        }

        return this._parseInputs(args);
    }

    protected abstract _parseInputs(args: string[]): any[];
}
