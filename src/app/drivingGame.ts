import { canvas, ctx, globals, entityList, human } from '../driving';
import { displayNetwork } from './actions/displayNetwork';
import { activationFunction } from './actions/activationFunction';
import { artificialSelection, restockEntityList } from './actions/artificialSelection';
import { simulationReset } from './actions/simulationReset';
import { basicCheck } from './actions/networkCheck';
import { drawText } from './actions/drawInputs';
// import { parralaxBackground } from './actions/parralaxBackground';




export function drivingGame() {
    console.log('running')
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // parralaxBackground(globals.timer, 1, 2, 3, 4, 5);


    if (human) {
        entityList.Cars[0].steer(1);
        entityList.Cars[0].update();
        entityList.Cars[0].draw();

    } else {

        let ray1;
        let ray2;
        let ray3;
        let ray4;
        let ray5;
        for (let f=0; f<entityList.NNs.length; f++) {
            if (entityList.Cars[f] !== undefined) { 
                ray1 = 1
                ray2 = 1
                ray3 = 1
                ray4 = 1
                ray5 = 1

                // console.log(activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY));
                let inputs: number[] = activationFunction(ray1, ray2, ray3, ray4, ray5);
    
                let outputs = entityList.NNs[f].update(0, ...inputs);
                entityList.Cars[f].steer(outputs[0])
                // console.log(outputs);
                if (entityList.Cars[f].update()) {
                    globals.fitnessDictionary[f] = globals.timer;
                    entityList.Cars[f] = undefined;
                    if (Object.keys(globals.fitnessDictionary).length === globals.simulatedNNs) {
                        simulationReset();
                    }
                } else {
                    entityList.Cars[f].draw();
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


    

