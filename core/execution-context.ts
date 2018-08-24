import { PropertyArgument, propertyArguments } from './argument';
import { Task } from './task';

export class ExecutionContext {
    private _arguments: PropertyArgument[];
    private task: Task & { [arg: string]: any };

    constructor(
        Task: new () => Task,
        private _argumentMap: Map<string, string[]>,
        private _executeArguments: string[] = [],
    ) {
        this._arguments = propertyArguments(Task) || [];
        this.task = new Task();
    }

    generateHelp() {
        return this.task.help();
    }

    async execute() {
        this._applyArguments();
        await this.task.execute(...this._executeArguments);
    }

    private _applyArguments() {
        for (const arg of this._arguments) {
            try {
                this._applyArgument(arg);
            } catch (e) {
                if (e instanceof Error) {
                    throw new Error(`--${arg.name}: ${e.message}`);
                } else {
                    throw e;
                }
            }
        }
    }

    private _applyArgument(argument: PropertyArgument) {
        const inputs = this._resolveArgumentInputs(argument);
        const typedInputs = argument.type.parseInputs(inputs);
        if (!typedInputs.length) {
            return;
        } else if (!argument.allowMultiple && typedInputs.length > 1) {
            throw new Error(
                `Multiple arguments are not allowed! (Received ${typedInputs.length})`);
        }

        this.task[argument.name] = argument.allowMultiple ? typedInputs : typedInputs[0];
    }

    private _resolveArgumentInputs(arg: PropertyArgument) {
        return new Array<string>(arg.name)
            .concat(arg.alias || [])
            .map(n => this._argumentMap.get(n) || [])
            .reduce((current, next) => current.concat(next), new Array<string>());
    }
}