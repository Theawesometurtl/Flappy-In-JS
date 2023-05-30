import { NN } from "../classes/NN";
import { globals, entityList } from "../../index";

/* I want to make a dictionary of the fitness of 100 NNs, and take the best 50 ones, but also have some controlled randomness to the selection.


*/

export function artificialSelection(randomness: number = 100): number[][] {
    let fitness: { [key: number]: number } = globals.fitnessDictionary;
    globals.fitnessDictionary = {};

    // Create fitnessCopy array
    let fitnessCopy = Object.keys(fitness).map(function(key: string) {
    return [parseInt(key), fitness[parseInt(key)]];
    });

    
    // Sort the array based on the second element
    fitnessCopy.sort(function(first, second) {
        return second[1] - first[1];
    });
    // console.log(fitnessCopy);
    
    let best = fitnessCopy[0][1]
    console.log(best);
    // Create a new array with only the first 5 fitnessCopy
    // console.log(fitnessCopy.length / 2);
    fitnessCopy = fitnessCopy.slice(0, globals.NNKeepers);
    // console.log(fitness);
    // fitness.reverse();
    // console.log(fitness);
    let finalFitnessArray: number[][] = [];
    for (let nn = 0; nn < globals.simulatedFlappies / fitnessCopy.length; nn++) {
        finalFitnessArray.push(...fitnessCopy);
    }
    // console.log(finalFitnessArray)
    // console.log(fitness[0]);


    return finalFitnessArray;
}

export function restockEntityList(fitness: number[][]) {
    //replace fitness values with NNs
    let networkList: NN[] = [];
    for (let fit: number = 0; fit < fitness.length; fit++) {
        networkList[fit] = entityList.NNs[fitness[fit][0]];
    }
    // console.log(fitness);


    entityList.NNs = [];
    //replace NNs with new fitness NNs
    for (let net: number = 0; net < networkList.length; net++) {
        entityList.NNs.push(networkList[net]);
        // console.log(entityList.NNs);

    }
    entityList.Pipes = [];
    entityList.Flappies = [];

    for (let net = globals.NNKeepers; net < globals.simulatedFlappies; net++) {
        entityList.NNs[net].fullMutate(0, 1000, 0.05);
    }    

}