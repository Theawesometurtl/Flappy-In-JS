import { human, entityList, globals, canvas } from "../../sharedGlobals";
import { NN } from "../classes/NN";
import { simulationReset } from "./simulationReset";
import { drivingGame } from "../drivingGame";
import { Car } from "../classes/Car";
import { Barrier } from "../classes/Barrier";


// canvas.addEventListener("click", function(){
//     let v = entityList.Barrier[0].vectors
//     v.push([globals.mousePos.x, globals.mousePos.y]);
//     entityList.Barrier[0].vectors = v;
//     let s: string = '';
//     for (let i = 0; i < v.length; i++) {
//         s = s + '[' +v[i][0] + ',' + v[i][1] +'], '
//     }
//     console.log(s);
// });

export function drivingStart() {
    if (human) {
        entityList.Cars.push(new Car());
        entityList.Barrier.push(new Barrier([2,2], [140,17], [392,27], [546,45], [753,54], [828,102], [907,142], [955,201], [994,263], [1006,349], [1005,426], [1009,556], [956,657], [908,646], [871,589], [876,519], [876,450], [878,401], [899,366], [904,313], [874,269], [841,256], [796,221], [747,204], [648,188], [555,174], [488,121], [440,89], [390,113], [280,122], [213,118], [128,110], [11,69], [29,3]));
    } else {
        entityList.Barrier.push(new Barrier([2,2], [140,17], [392,27], [546,45], [753,54], [828,102], [907,142], [955,201], [994,263], [1006,349], [1005,426], [1009,556], [956,657], [908,646], [871,589], [876,519], [876,450], [878,401], [899,366], [904,313], [874,269], [841,256], [796,221], [747,204], [648,188], [555,174], [488,121], [440,89], [390,113], [280,122], [213,118], [128,110], [11,69], [29,3]));
        
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.Cars.push(new Car())
            entityList.NNs.push(new NN(...globals.NNBrain));
            entityList.NNs[i].createNeuralNet(0);

            // entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset();
    }
    if (human) {
        setInterval(drivingGame, 20);
    } else {
        setInterval(drivingGame, 20);
    }
}