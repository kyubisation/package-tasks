import { ArgumentParser } from './argument-parser';
import { ExecutionContext } from './execution-context';
import { Task } from './task';

export class TaskRunner extends Task {
    constructor(
        private _task: string,
        private _taskDirs: string[],
    ) {
        super();
    }

    async execute(...args: string[]): Promise<void> {
        if (!this._task) {
            console.log(this.help());
        } else {
            const argumentParser = new ArgumentParser(args);
            const Task = await this._findTask();
            const executionContext = new ExecutionContext(
                Task, argumentParser.argumentMap, argumentParser.executionArguments);
            if (argumentParser.helpRequested) {
                console.log(executionContext.generateHelp());
            } else {
                await executionContext.execute();
            }
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
}
