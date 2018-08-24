import { ArgumentType } from '../argument-type';

export interface ExecutionArgument {
    name: string;
    type: ArgumentType;
    allowMultiple: boolean;
}
