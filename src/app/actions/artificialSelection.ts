import { NN } from "../classes/NN";
import { globals, entityList } from "../../sharedGlobals";
import { encodeNetwork, decodeNetwork } from "./encodeDecode";

/* I want to make a dictionary of the fitness of 100 NNs, and take the best 50 ones, but also have some controlled randomness to the selection.


*/

export function artificialSelection(randomness: number = 5): number[][] {
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
    
    let best = fitnessCopy[0][1];
    let bestNN = entityList.NNs[fitnessCopy[0][0]];
    if (best >= 100) {
        console.log(best, bestNN.networkNumber, encodeNetwork(bestNN.weightArray, bestNN.biasArray));
        globals.bestNNs[fitnessCopy[0][1]] = encodeNetwork(bestNN.weightArray, bestNN.biasArray)
    }

    for (let i = 1; i < globals.simulatedNNs; i++) {
        fitnessCopy[i][1] *= (Math.random() + randomness) / randomness;
    }
    // Sort the array based on the second element
    fitnessCopy.sort(function(first, second) {
        return second[1] - first[1];
    });
    // console.log(fitnessCopy);
    // Create a new array with only the first 5 fitnessCopy
    // console.log(fitnessCopy.length / 2);
    fitnessCopy = fitnessCopy.slice(0, globals.NNKeepers);
    // console.log(fitnessCopy);
    // console.log(fitness);
    // fitness.reverse();
    // console.log(fitness);
    let finalFitnessArray: number[][] = [];
    for (let nn = 0; nn < globals.simulatedNNs / fitnessCopy.length; nn++) {
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
        networkList[fit] = new NN(...globals.NNBrain);
        networkList[fit].createNeuralNet();
        let encodedNetwork = encodeNetwork(entityList.NNs[fitness[fit][0]].weightArray, entityList.NNs[fitness[fit][0]].biasArray)
        let decodedNetwork = decodeNetwork(encodedNetwork);
        networkList[fit].biasArray = decodedNetwork[0];
        networkList[fit].weightArray = decodedNetwork[1];
        // networkList[fit] = structuredClone(entityList.NNs[fitness[fit][0]])
    }
    // console.log(fitness);


    entityList.NNs = [];
    //replace NNs with new fitness NNs
    for (let net: number = 0; net < networkList.length; net++) {
        entityList.NNs.push(networkList[net]);
        // console.log(entityList.NNs);

    }
    // console.log(networkList.length);

    entityList.Pipes = [];
    entityList.Flappies = [];
    entityList.Barrier = [];
    entityList.Cars = [];
    for (let i = 0; i < globals.NNKeepers; i++) {
        // console.log(entityList.NNs[i].networkNumber, "keepers")

    }
    for (let net = globals.NNKeepers; net < globals.simulatedNNs; net++) {
        entityList.NNs[net].fullMutate(0, 1, 1);
        // console.log(entityList.NNs[net].networkNumber)
    }    

}