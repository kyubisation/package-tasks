import { Argument, taskArguments } from './argument';

export abstract class Task {
    async safeExecute(...args: any[]) {
        try {
            await this._execute(...args);
        } catch (error) {
            console.error(`Task failed: ${error}`);
        }
    }

    help() {
        this._printName();
        this._printArguments();
    }

    protected abstract async _execute(...args: any[]): Promise<void>;

    protected _printName() {
        console.log(Object.getPrototypeOf(this).constructor.name);
    }

    protected _printArguments() {
        const args = taskArguments(Object.getPrototypeOf(this));
        for (const arg of args || []) {
            console.log(this._formatArgument(arg));
        }
    }

    private _formatArgument(arg: Argument) {
        const defaultValue = (this as any)[arg.name];
        return [
            `  --${arg.name}${arg.type ? ` (${arg.type})` : ''}`,
            ![undefined, ''].includes(defaultValue) ? ` (Default: ${defaultValue})` : '',
            arg.description ? ` ${arg.description}` : '',
            arg.alias.length ? `\n    Aliases: ${arg.formatAliases()}` : '']
            .join('');
    }
}
