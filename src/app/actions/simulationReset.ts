import { entityList, globals } from "../../sharedGlobals";
import { Pipes } from "../classes/Pipes";
import { Flappy } from "../classes/Flappy";
import { NN } from "../classes/NN";
import { main } from "../flappyGame";
import { artificialSelection, restockEntityList } from "./artificialSelection";
import { Car } from "../classes/Car";
import { Barrier } from "../classes/Barrier";




export function simulationReset(flappy: boolean) {
    let fitness: number[][] = artificialSelection(10);
    restockEntityList(fitness);
    globals.timer = 0;
    
    if (flappy) {
        globals.pipeTimer = 0;
        Pipes.numOfPipes = 0;
        
        entityList.Pipes.push(new Pipes());
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.Flappies.push(new Flappy());
        }
    } else {
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.Cars.push(new Car());
            // entityList.Barrier.push(new Barrier([2,2], [140,17], [392,27], [546,45], [753,54], [828,102], [907,142], [955,201], [994,263], [1006,349], [1005,426], [1009,556], [956,657], [908,646], [871,589], [876,519], [876,450], [878,401], [899,366], [904,313], [874,269], [841,256], [796,221], [747,204], [648,188], [555,174], [488,121], [440,89], [390,113], [280,122], [213,118], [128,110], [11,69], [29,3]));
            // entityList.Barrier.push(new Barrier([[120,309], [162,163], [256,69], [534,43], [852,57], [975,129], [1000,232], [1020,386], [975,489], [889,561], [592,597], [381,555], [216,513], [155,436], [118,305], [336,223], [532,202], [655,212], [819,244], [875,312], [840,382], [755,410], [566,425], [429,425], [368,399], [577,309]]))
            
        }
        const barrier = JSON.parse(localStorage.getItem('barrier'));
        console.log(barrier);
        entityList.Barrier.push(new Barrier(...barrier))
        console.log(entityList.Barrier[0    ])
    }
    
    // console.log(entityList.NNs);
    // console.log(entityList.Flappies);
    // console.log(entityList.Pipes);
    
}