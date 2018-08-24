import { ArgumentType } from '../argument-type';

export interface PropertyArgument {
    name: string;
    type: ArgumentType;
    alias: string[];
    description: string;
    allowMultiple: boolean;
}
