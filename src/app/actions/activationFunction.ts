export let activationFunction = (...nums: number[]) => nums.map(n => 1 / (1 + Math.exp(-n)))