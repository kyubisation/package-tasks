export class ArgumentParser {
    readonly argumentMap: Map<string, string[]>;
    readonly executionArguments: string[];
    readonly helpRequested: boolean;
    private _executionArgumentsKey = '';

    constructor(args: string[]) {
        const map = this._buildMap(args);
        this.executionArguments = map.get(this._executionArgumentsKey) || [];
        map.delete(this._executionArgumentsKey);
        this.argumentMap = map;
        this.helpRequested = this.argumentMap.has('h') || this.argumentMap.has('help');
    }

    private _buildMap(args: string[]) {
        let currentArgCollection: string[] = [];
        const argsMap = new Map<string, string[]>(
            [[this._executionArgumentsKey, currentArgCollection]]);
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
}