import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { Pipes } from  "../classes/Pipes"
import { entityList, fitnessDictionary, human } from "../../index";
import { NN } from "../classes/NN"
import { simulationReset } from "./simulationReset";

export function start() {    
    if (human) {
        entityList.Flappies.push(new Flappy());
    } else {
        
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < 100; i++) {
            entityList.NNs.push(new NN(4, 5, 5, 1));
            entityList.NNs[i].createNeuralNet(0);
            entityList.NNs[i].fullMutate(0, 10);

            fitnessDictionary[i] = i;
            // fitnessDictionary[i].createNeuralNet(0);
        }
        console.log(fitnessDictionary);
        simulationReset(100);
    }
    setInterval(main, 20);

}