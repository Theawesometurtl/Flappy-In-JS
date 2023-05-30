import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { Pipes } from  "../classes/Pipes"
import { entityList, human, globals } from "../../index";
import { NN } from "../classes/NN"
import { simulationReset } from "./simulationReset";

export function start() {    
    if (human) {
        entityList.Flappies.push(new Flappy());
    } else {
        
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedFlappies; i++) {
            entityList.NNs.push(new NN(4, 5, 5, 1));
            entityList.NNs[i].createNeuralNet(0);
            entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset();
    }
    setInterval(main, 1);

}