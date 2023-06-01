import { human, entityList, globals } from "../../sharedGlobals";
import { NN } from "../classes/NN";
import { simulationReset } from "./simulationReset";
import { drivingGame } from "../drivingGame";
import { Car } from "../classes/Car";

export function drivingStart() {
    console.log("starting")
    if (human) {
        entityList.Cars.push(new Car());
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
        setInterval(drivingGame, 20);
    } else {
        setInterval(drivingGame, 1);
    }
}