/**
 * Utility type to extract the value type from an object type.
 * @alias T - The object type to extract the value type from.
 * @returns The value type of the object.
 * @example
 * type MyObject = { a: number; b: string };
 * type ValueType = ValueOf<MyObject>; // ValueType is number | string
 */
type ValueOf<T> = T[keyof T];

/**
 * Extracts the element type from an array type.
 * @alias T - The array type to extract the element type from.
 * @returns The element type of the array.
 * @example
 * type NumberArray = number[];
 * type ElementType = ExtractElementType<NumberArray>; // ElementType is number
 */
type ExtractElementType<T extends unknown[]> = T[number];
