// checks if object is empty or all its values are empty
export const isEmpty = (obj: object) =>
    Object.values(obj).every((x) => x === null || x === '' || x === undefined)
