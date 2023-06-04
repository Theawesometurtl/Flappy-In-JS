export function wrapIndex(array: any[], index: number) {
    return array[index % array.length];
  }