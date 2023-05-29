import { NN } from "../classes/NN";
import { globals, entityList } from "../../index.js";

/* I want to make a dictionary of the fitness of 100 NNs, and take the best 50 ones, but also have some controlled randomness to the selection.


*/

export function artificialSelection(randomness) {
    let fitness = globals.fitnessDictionary;
    globals.fitnessDictionary = {};
    

    // Create fitnessCopy array https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    let fitnessCopy = Object.keys(fitness).map(function(key) {
        return [key, fitness[key]];
    }); 
    
    // Sort the array based on the second element
    fitnessCopy.sort(function(first, second) {
        return second[1] - first[1];
    });
    console.log(fitnessCopy);
    
    // Create a new array with only the first 5 fitnessCopy
    // console.log(fitnessCopy.length / 2);
    fitness = fitnessCopy.slice(0, (fitnessCopy.length / 20));
    console.log(fitness);
    // fitness.reverse();
    // console.log(fitness);
    fitness = [];
    for (let nn = 0; nn < globals.simulatedFlappies / fitnessCopy.length; nn++) {
        fitness.push(...fitnessCopy);
    }
    console.log(fitness)
    // console.log(fitness[0]);


    return fitness;
}

export function restockEntityList(fitness) {
    //replace fitness values with NNs
    // console.log(fitness);
    for (const [key, value] of Object.entries(fitness)) {
        fitness[key] = entityList.NNs[fitness[key][0]];
        
    }
    // console.log(fitness);

    entityList.NNs = [];
    //replace NNs with new fitness NNs
    for (const [key, value] of Object.entries(fitness)) {
        entityList.NNs.push(fitness[key]);
        // console.log(entityList.NNs);

    }
    entityList.Pipes = [];
    entityList.Flappies = [];
}