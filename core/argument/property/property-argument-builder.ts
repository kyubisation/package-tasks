import { ArgumentOptions } from '../argument-options';
import { ArgumentType } from '../argument-type';
import { BooleanArgumentType } from './boolean-argument-type';
import { NumberArgumentType } from './number-argument-type';
import { PropertyArgument } from './property-argument';
import { StringArgumentType } from './string-argument-type';

const DESIGN_METADATA = 'design:type';

export class PropertyArgumentBuilder {
    buildPropertyArgument(target: Object, propertyKey: string | symbol, args: ArgumentOptions): PropertyArgument {
        const name = this._resolveName(propertyKey);
        const type = this._resolveType(target, propertyKey, args);
        const argumentType = this._resolveArgumentType(type);
        if (!argumentType) {
            throw new Error(`--${name} has unsupported type ${type}!`);
        }

        return {
            name,
            description: args.description || '',
            alias: this._formatAlias(args.alias),
            type: argumentType,
            allowMultiple: !!args.allowMultiple,
        };
    }

    private _resolveName(propertyKey: string | symbol) {
        return typeof propertyKey === 'symbol'
            ? propertyKey.toString().slice(7, -1) : propertyKey;
    }

    private _resolveType(target: Object, propertyKey: string | symbol, args: ArgumentOptions) {
        return args.type
            || Reflect.getMetadata(DESIGN_METADATA, target, propertyKey)
            || String;
    }

    private _resolveArgumentType(type: any): ArgumentType | undefined {
        if (type.formatAliases && type.parseInputs) {
            return type;
        }

        switch (type) {
            case Boolean:
                return new BooleanArgumentType();
            case Number:
                return new NumberArgumentType();
            case String:
            case Object:
                return new StringArgumentType();
            default:
                return undefined;
        }
    }

    private _formatAlias(alias: string | string[] | undefined) {
        return new Array<string>()
            .concat(alias || [])
            .filter(a => !!a)
            .map(a => a.trim().replace(/^-+/, ''))
    }
}