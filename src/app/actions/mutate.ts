export function mutate(mutationLikelyhood: number, mutationAmount: number, num: number): number {
    if (Math.random() < mutationLikelyhood) {
        num *= (mutationAmount + Math.random() -0.5) /mutationAmount;
    }
    // if (Math.random() < mutationLikelyhood) {
    //     num += 1/mutationAmount * Math.random()-.5;
    // }
    return num;
}