import { NN } from "../classes/NN";

/* I want to make a dictionary of the fitness of 100 NNs, and take the best 50 ones, but also have some controlled randomness to the selection.


*/

export function artificialSelection(fitness, randomness) {
    console.log(fitness);
    let fitnessCopy = Object.keys(fitness).map(function(key) {
        return [key, fitness[key]];
    }); 
    
    // Sort the array based on the second element
    fitnessCopy.sort(function(first, second) {
        return second[1] - first[1];
    });
    console.log(fitnessCopy[0]);

    for (const [key, value] of Object.entries(fitness)) {
        fitness[key] *= (Math.random() + randomness) / randomness;
    }
    // Create fitnessCopy array https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    fitnessCopy = Object.keys(fitness).map(function(key) {
        return [key, fitness[key]];
    }); 
    
    // Sort the array based on the second element
    fitnessCopy.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    // Create a new array with only the first 5 fitnessCopy
    // console.log(fitnessCopy.length / 2);
    fitness = fitnessCopy.slice(0, (fitnessCopy.length / 2));
    // fitness.reverse();
    // console.log(fitness);

    fitness = [...fitness, ...fitness];
    console.log(fitness);
    for (let net = 0; net < fitness.length; net++) {
        fitness[net][1].fullMutate();
    }    

    return fitness;
}