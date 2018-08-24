export interface ArgumentType {
    readonly name: string;
    formatAliases(aliases: string[]): string;
    parseInputs(inputs: string[]): any[];
}