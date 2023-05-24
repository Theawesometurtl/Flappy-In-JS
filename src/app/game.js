import { canvas, ctx, globals, entityList, human } from '../index';
import { Pipes } from './classes/Pipes';




export function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        for (let i=0; i<entityList.Pipes.length; i++)   {
            entityList.Pipes[i].update();
            entityList.Pipes[i].draw();
        }
        for (let i=0; i<entityList.NNs.length; i++) {
            
            entityList.NNs[i].update(0, entityList.Flappies[i].position.y, entityList.Flappies[i].velocity.y, entityList.Pipes[0].position.x, entityList.Pipes[0].position.y)
            if (outputs[0] > .5) {
                entityList.Flappies[i].jump();
            } 
        }
    }
    globals.pipeTimer ++;

    if (globals.pipeTimer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
    }
}


    

