import { Arg, Task } from '..';

export default class CopyTask extends Task {
    @Arg() source: string = '';
    @Arg() target: string = '';

    execute(@Arg() from: string, @Arg() to: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}