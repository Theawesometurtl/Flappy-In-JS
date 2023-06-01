import { entityList, globals } from "../../sharedGlobals";
import { Pipes } from "../classes/Pipes";
import { Flappy } from "../classes/Flappy";
import { NN } from "../classes/NN";
import { main } from "../flappyGame";
import { artificialSelection, restockEntityList } from "./artificialSelection";




export function simulationReset() {
    console.log(new Error().stack)
    let fitness: number[][] = artificialSelection(10);
    restockEntityList(fitness);
    globals.timer = 0;
    globals.pipeTimer = 0;
    Pipes.numOfPipes = 0;
    
    entityList.Pipes.push(new Pipes());
    for (let i = 0; i < globals.simulatedNNs; i++) {
        entityList.Flappies.push(new Flappy());
    }
    // console.log(entityList.NNs);
    // console.log(entityList.Flappies);
    // console.log(entityList.Pipes);
    
}