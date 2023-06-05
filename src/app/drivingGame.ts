import { canvas, ctx, globals, entityList, human, pressedKeys } from '../sharedGlobals';
import { displayNetwork } from './actions/displayNetwork';
import { activationFunction } from './actions/activationFunction';
import { artificialSelection, restockEntityList } from './actions/artificialSelection';
import { simulationReset } from './actions/simulationReset';
import { basicCheck } from './actions/networkCheck';
import { drawText } from './actions/drawInputs';
import { rayCreator } from './actions/rayCreator';
// import { parralaxBackground } from './actions/parralaxBackground';




export function drivingGame() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // parralaxBackground(globals.timer, 1, 2, 3, 4, 5);


    if (human) {
        if (pressedKeys[65] === true || pressedKeys[37] === true ) {
            entityList.Cars[0].steer(0);
        }
        if (pressedKeys[68] === true || pressedKeys[39] === true ) {
            entityList.Cars[0].steer(1);
        }
        entityList.Barrier[0].draw()
        // entityList.Cars[0].steer(1);
        if (entityList.Cars[0].update()) {
            let death = true;
        }
        entityList.Cars[0].draw();

    } else {

        entityList.Barrier[0].draw()
        // entityList.Cars[0].draw();
        let ray1: number;
        let ray2: number;
        let ray3: number;
        let ray4: number;
        let ray5: number;
        for (let c=0; c<entityList.NNs.length; c++) {
            if (entityList.Cars[c] !== undefined) { 
                ray1 = rayCreator(entityList.Cars[c].position, 130 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray2 = rayCreator(entityList.Cars[c].position, 100 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray3 = rayCreator(entityList.Cars[c].position, 90 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray4 = rayCreator(entityList.Cars[c].position, 80 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray5 = rayCreator(entityList.Cars[c].position, 40 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);

                // console.log(ray1, ray2, rayCreator(entityList.Cars[c].position, entityList.Cars[c].angle, entityList.Barrier[0].vectors), ray4, ray5);
                // console.log(activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY));
                let inputs: number[] = activationFunction(ray1, ray2, ray3, ray4, ray5);
    
                let outputs = entityList.NNs[c].update(0, ...inputs);
                entityList.Cars[c].steer(outputs[0])
                // console.log(outputs);
                if (entityList.Cars[c].update()) {
                    globals.fitnessDictionary[c] = entityList.Cars[c].position.x + entityList.Cars[c].position.y;
                    entityList.Cars[c] = undefined;
                    if (Object.keys(globals.fitnessDictionary).length === globals.simulatedNNs) {
                        simulationReset(false);
                    }
                } else {
                    entityList.Cars[c].draw();
                }
            }
        }
        
        // ctx.fillText(outputs, 10, 50);
        if (entityList.Cars[0] !== undefined) {
            drawText(ray1, ray2, ray3, ray4, ray5);
        }
        
        displayNetwork(100, 50, canvas.width -400, canvas.height - 300, entityList.NNs[0].weightArray, entityList.NNs[0].biasArray, 0);
        //basicCheck()
        globals.timer++;
    }
}


    

