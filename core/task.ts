import { Argument, taskArguments } from './argument';

export abstract class Task {
    abstract execute(...args: any[]): Promise<void>;

    help() {
        return `${this._printName()}\n${this._printArguments()}`;
    }

    protected _printName() {
        return Object.getPrototypeOf(this).constructor.name;
    }

    protected _printArguments() {
        const args = taskArguments(Object.getPrototypeOf(this));
        return (args || [])
            .map(arg => this._formatArgument(arg))
            .join('\n');
    }

    private _formatArgument(arg: Argument) {
        const defaultValue = (this as any)[arg.name];
        return `  --${arg.name}${arg.type ? ` (${arg.type})` : ''}`
            + (![undefined, ''].includes(defaultValue) ? ` (Default: ${defaultValue})` : '')
            + (arg.description ? ` ${arg.description}` : '')
            + (arg.alias.length ? `\n    Aliases: ${arg.formatAliases()}` : '');
    }
}
