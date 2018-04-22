import { Argument, taskArguments } from './argument';
import { Task } from './task';

export class TaskRunner extends Task {
    private _args = new Map<string, string[]>();

    constructor(
        private _task: string,
        private _taskDirs: string[],
    ) {
        super();
    }

    protected async _execute(...args: string[]): Promise<void> {
        if (!this._task) {
            this.help();
        } else {
            this._args = this._parseArguments(args);
            await this._executeTask();
        }
    }

    private _parseArguments(args: string[]) {
        let currentArgCollection: string[] = [];
        const argsMap = new Map<string, string[]>([['_', currentArgCollection]]);
        for (const arg of args) {
            if (arg.startsWith('-')) {
                currentArgCollection = [];
                argsMap.set(arg.replace(/^-+/, ''), currentArgCollection);
            } else {
                currentArgCollection.push(arg);
            }
        }

        return argsMap;
    }

    private async _executeTask(): Promise<void> {
        const Task = await this._findTask();
        const task = new Task();
        if (this._args.has('h') || this._args.has('help')) {
            task.help();
            return;
        }

        const args = taskArguments(Task);
        for (const arg of args || []) {
            const argumentInputs = this._resolveArgumentInputs(arg);
        }
    }

    private async _findTask() {
        const potentialTaskFiles = this._taskDirs
            .map(d => ['js', 'mjs', 'ts'].map(e => `${d}/${this._task}.${e}`))
            .reduce((current, next) => current.concat(next));
        for (const file of potentialTaskFiles) {
            try {
                const task: { default: { new(): Task } } = await import(file);
                return task.default;
            } catch (error) {
            }
        }

        throw new Error(`Could not find task '${this._task}'`);
    }

    private _resolveArgumentInputs(arg: Argument) {
        return new Array<string>()
            .concat(arg.name)
            .concat(arg.alias || [])
            .reduce(
                (current, next) => current.concat(this._args.get(next) || []),
                new Array<string>());
    }
}
