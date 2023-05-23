import { canvas, ctx, globals, entityList } from '../index';
import { Pipes } from './classes/Pipes'




export function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    globals.pipeTimer ++;

    if (globals.pipeTimer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
    }
}


    

