export function activationFunction(...nums) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = 1 / (1 + Math.exp(-nums[i]));
    }
    return nums;
}