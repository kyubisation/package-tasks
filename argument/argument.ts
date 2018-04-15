export interface Argument {
    name: string;
    type: string;
    alias: string[];
    description: string;
    allowMultiple?: boolean;
    formatAliases(): string;
    parseAndValidateInputs(args: string[]): any[];
}
