import { Argument, taskArguments } from './argument';
import { Task } from './task';

export class ExecutionContext {
    private _arguments: Argument[];
    private task: Task & { [arg: string]: any };

    constructor(
        Task: new () => Task,
        private _argumentMap: Map<string, string[]>,
        private _executeArguments: string[] = [],
    ) {
        this._arguments = taskArguments(Task) || [];
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
            this._applyArgument(arg);
        }
    }

    private _applyArgument(argument: Argument) {
        const inputs = this._resolveArgumentInputs(argument);
        const typedInputs = argument.parseAndValidateInputs(inputs);
        if (!typedInputs.length) {
            return;
        }

        this.task[argument.name] = argument.allowMultiple ? typedInputs : typedInputs[0];
    }

    private _resolveArgumentInputs(arg: Argument) {
        return new Array<string>()
            .concat(arg.name)
            .concat(arg.alias || [])
            .reduce(
                (current, next) => current.concat(this._argumentMap.get(next) || []),
                new Array<string>());
    }
}