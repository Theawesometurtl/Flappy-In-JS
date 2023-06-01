import { main } from "../flappyGame";
import { Flappy } from "../classes/Flappy"
import { Pipes } from  "../classes/Pipes"
import { entityList, human, globals } from "../../flappy";
import { NN } from "../classes/NN"
import { simulationReset } from "./simulationReset";
import { decodeNetwork } from "./encodeDecode";

export function flappyStart() {    
    console.log(new Error().stack)

    if (human) {
        entityList.Flappies.push(new Flappy());
        entityList.Pipes.push(new Pipes());
    } else {
        
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.NNs.push(new NN(...globals.NNBrain));
            entityList.NNs[i].createNeuralNet(0);

            // entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset();
    }
    if (human) {
        setInterval(main, 20);
    } else {
        setInterval(main, 1);
    }

}