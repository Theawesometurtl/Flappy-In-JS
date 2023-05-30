import { entityList, globals } from "../../index";
import { Pipes } from "../classes/Pipes";
import { Flappy } from "../classes/Flappy";
import { NN } from "../classes/NN";
import { main } from "../game";
import { artificialSelection, restockEntityList } from "./artificialSelection";




export function simulationReset() {
    let fitness: number[][] = artificialSelection(10);
    restockEntityList(fitness);
    globals.timer = 0;
    globals.pipeTimer = 0;
    Pipes.numOfPipes = 0;
    
    entityList.Pipes.push(new Pipes());
    for (let i = 0; i < globals.simulatedFlappies; i++) {
        entityList.Flappies.push(new Flappy());
    }
    // console.log(entityList.NNs);
    // console.log(entityList.Flappies);
    // console.log(entityList.Pipes);
    
}