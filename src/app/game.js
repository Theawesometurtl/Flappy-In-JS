import { canvas, ctx, globals, entityList, human } from '../index';
import { Pipes } from './classes/Pipes';
import { displayNetwork } from './actions/displayNetwork';




export function main() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (human) {
        for (const [key, value] of Object.entries(entityList)) {
            for (let j = 0; j < entityList[key]?.length; j++) {
                //console.log(key, entityList[key][j]);
                entityList[key][j].update();
                try {//I have no clue at all why this part of code will give an error when the enemy is destroyed but this works ig
                entityList[key][j].draw();
                }
                catch (e) {
                }
            }
        }
    } else {
        
        for (let i=0; i<entityList.NNs.length; i++) {
            
            let outputs = entityList.NNs[i].update(0, entityList.Flappies[i].position.y, entityList.Flappies[i].velocity.y, entityList.Pipes[0].position.x, entityList.Pipes[0].position.y)
            ctx.font = "30px Arial";
            ctx.fillText(outputs, 10, 50);
            if (outputs[0] > .5) {
                entityList.Flappies[i].jump();
            } 
        }
        for (let i=0; i<entityList.Flappies.length; i++)   {
            entityList.Flappies[0].draw();
            entityList.Flappies[0].update();
        }
        for (let i=0; i<entityList.Pipes.length; i++)   {
            entityList.Pipes[i].draw();
        }
        for (let i=0; i<entityList.Pipes.length; i++)   {// bad code, but pipes destroying themselves messes things up
            entityList.Pipes[i].update();
        }

        displayNetwork(100, 50, canvas.width -400, canvas.height - 300, entityList.NNs[0].weightArray, entityList.NNs[0].biasArray, 0);
    }
    globals.pipeTimer ++;

    if (globals.pipeTimer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
    }
}


    

