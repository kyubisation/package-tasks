export interface ArgumentOptions {
    /**
     * Aliases.
     * e.g.: For argument input have an alias i
     */
    alias?: string | string[];
    /**
     * Description of the argument.
     */
    description?: string;
    /**
     * The type of the argument. Supported are String, Boolean and Number.
     * Will be infered from the meta information, if available and not an array.
     */
    type?: StringConstructor | NumberConstructor | BooleanConstructor;
    /**
     * Whether to allow multiple arguments. Default is false;
     * Is automatically enabled, when the the declaration type is an array.
     */
    allowMultiple?: boolean;
}
