import { canvas, ctx, globals, entityList, pressedKeys } from '../sharedGlobals';
import { displayNetwork } from './actions/displayNetwork';
import { activationFunction } from './actions/activationFunction';
import { artificialSelection, restockEntityList } from './actions/artificialSelection';
import { simulationReset } from './actions/simulationReset';
import { basicCheck } from './actions/networkCheck';
import { drawText } from './actions/drawInputs';
import { rayCreator } from './actions/rayCreator';
import { pythagTheorem } from './actions/trig';
import { drivingStart } from './actions/drivingStart';
// import { parralaxBackground } from './actions/parralaxBackground';




export function drivingGame() {
    ctx.fillStyle = '#af73b1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // parralaxBackground(globals.timer, 1, 2, 3, 4, 5);

    var checkbox = document.getElementById("checkbox")  as HTMLInputElement;
    
    
    if (globals.human) {
        if (pressedKeys[65] === true || pressedKeys[37] === true ) {
            entityList.Cars[0].steer(0);
        }
        if (pressedKeys[68] === true || pressedKeys[39] === true ) {
            entityList.Cars[0].steer(1);
        }
        entityList.Barrier[0].draw()
        // entityList.Cars[0].steer(1);
        if (entityList.Cars[0].update()) {
            entityList.Cars[0].position = {x: globals.checkpoints[0][0], y: globals.checkpoints[0][1]};
            entityList.Cars[0].velocity = {x: 0, y: 0};
            entityList.Cars[0].angle = 0
            entityList.Cars[0].angularVelocity = 0;
        }
        entityList.Cars[0].draw();

        if (checkbox.checked) {
            globals.human = false;
            drivingStart();
        }
        
    } else {
        
        entityList.Barrier[0].draw()
        // entityList.Cars[0].draw();
        let ray1: number;
        let ray2: number;
        let ray3: number;
        let ray4: number;
        let ray5: number;
        let ray6: number;
        let ray7: number;
        let ray8: number;
        let ray9: number;
        
        let checkpointD;
        for (let c=0; c<entityList.NNs.length; c++) {
            if (entityList.Cars[c] !== undefined) { 
                ray1 = rayCreator(entityList.Cars[c].position, 130 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray2 = rayCreator(entityList.Cars[c].position, 120 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray3 = rayCreator(entityList.Cars[c].position, 110 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray4 = rayCreator(entityList.Cars[c].position, 100 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray5 = rayCreator(entityList.Cars[c].position, 90 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray6 = rayCreator(entityList.Cars[c].position, 80 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray7 = rayCreator(entityList.Cars[c].position, 70 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray8 = rayCreator(entityList.Cars[c].position, 60 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                ray9 = rayCreator(entityList.Cars[c].position, 40 - entityList.Cars[c].angle, entityList.Barrier[0].vectors);
                
                let checkpoint = globals.checkpoints[entityList.Cars[c].checkpointReached % globals.checkpoints.length];
                checkpointD = [checkpoint[0] - entityList.Cars[c].position.x, checkpoint[1] - entityList.Cars[c].position.y]
                let xVel = entityList.Cars[c].velocity.x;
                let yVel = entityList.Cars[c].velocity.y;
                let angularVelocity = entityList.Cars[c].angularVelocity;
                
                // console.log(ray1, ray2, rayCreator(entityList.Cars[c].position, entityList.Cars[c].angle, entityList.Barrier[0].vectors), ray4, ray5);
                // console.log(activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY));
                let inputs: number[] = [ray1/100, ray2/100, ray3/100, ray4/100, ray5/100, ray6/100, ray7/100, ray8/100, ray9/100, checkpointD[0]/100, checkpointD[1]/100, xVel/10, yVel/10, angularVelocity];
                // console.log(inputs)
                
                let outputs = entityList.NNs[c].update(0, ...inputs);
                entityList.Cars[c].steer(outputs[0])
                // console.log(outputs);
                if (entityList.Cars[c].update() || globals.timer > globals.timerLimit) {
                    
                    let angleToCheckpoint = Math.atan((checkpointD[0]) / (checkpointD[1]))
                    ctx.strokeStyle = 'yellow';
                    ctx.lineWidth = 2;
                    // ctx.beginPath();
                    // ctx.moveTo(entityList.Cars[c].position.x, entityList.Cars[c].position.y);
                    // ctx.lineTo(entityList.Cars[c].position.x +Math.sin(angleToCheckpoint) * 500, entityList.Cars[c].position.y + Math.cos(angleToCheckpoint) * 500);
                    // ctx.stroke();
                    let angleDifference = entityList.Cars[c].angle - Math.abs(angleToCheckpoint)
                    let fitness = entityList.Cars[c].checkpointReached ;
                    fitness = fitness + 1/ ( 1 + Math.abs(checkpointD[0])/100 + Math.abs(checkpointD[1])/100);
                    fitness = fitness + 1/ (1 + Math.abs(angleDifference)/10);
                    globals.fitnessDictionary[c] = fitness;
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
            // console.log(entityList.Cars[0])
            // console.log(ray1, ray2, ray3, ray4, ray5)
            // console.log(globals.checkpoints[entityList.Cars[0].checkpointReached % globals.checkpoints.length][0], globals.checkpoints[entityList.Cars[0].checkpointReached % globals.checkpoints.length][1])
            let inputs: number[] = activationFunction(ray1, ray2, ray3, ray4, ray5, ray6, ray7, ray8, ray9, ...checkpointD);
            
            let outputs = entityList.NNs[0].update(0, ...inputs);
            //drawText(canvas.width-100, 50, 50, ray1, ray2, ray3, ray4, ray5, ray6, ray7, ray8, ray9, ...checkpointD, outputs[0]);
        }
        drawText(650, 45, 100, "Generation: " + globals.generationNum.toString())

        
        for (let i = 0; i < globals.checkpoints.length; i++) {
            ctx.fillStyle = 'green';
            ctx.lineWidth = 0;
            ctx.fillRect(globals.checkpoints[i][0] - globals.checkpointSize/4, globals.checkpoints[i][1] - globals.checkpointSize/4, globals.checkpointSize/2, globals.checkpointSize/2);
        }
        
        displayNetwork(50, 30, canvas.width -300, canvas.height - 200, entityList.NNs[0].weightArray, entityList.NNs[0].biasArray, 0);
        //basicCheck()
        globals.timer++;

        if (!checkbox.checked) {
            globals.human = true;
            drivingStart();
        }
    }
}




