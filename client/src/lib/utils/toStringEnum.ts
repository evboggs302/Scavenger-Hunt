export const toStringEnum = <T extends string>(list: T[]): { [K in T]: K } => {
  return list.reduce((item, key) => {
    item[key] = key;
    return item;
  }, Object.create(null));
};
