export const toStringEnum = <T extends string>(list: T[]) => {
  return list.reduce((item, key) => {
    item[key] = key;
    return item;
  }, Object.create(null));
}
