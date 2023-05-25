import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { Pipes } from  "../classes/Pipes"
import { entityList, human } from "../../index";
import { NN } from "../classes/NN"

export function start() {    
    entityList.Flappies.push(new Flappy());
    if (!human) {
        entityList.NNs.push(new NN(4, 5, 5, 1));
        entityList.NNs[0].createNeuralNet(0);
        entityList.NNs[0].fullMutate(0);
        console.log(entityList.NNs[0].weightArray);
        entityList.Pipes.push(new Pipes());
    }
        
    setInterval(main, 20);

}