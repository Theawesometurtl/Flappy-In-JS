import { entityList, canvas } from "../../index.js";


export function deathCheck(fx, fy, width, height) {
    if (fy > canvas.height - height/2) {
        return true;
    }
    if (fy < 0 + height/2) { 
        return true;
    }

    let fw = width;
    let fh = height;
    let px;
    let py;
    let pw;
    let ph;
    for (let pipe = 0; pipe < entityList.Pipes.length; pipe++) {
        px = entityList.Pipes[pipe].position.x;
        py = entityList.Pipes[pipe].position.y;
        pw = entityList.Pipes[pipe].width;
        ph = entityList.Pipes[pipe].gapHeight;
        if (fx > px - pw/2 - fw/2 && fx < px + pw/2 + fw/2 && (fy > py + ph/2 - fh/2 || fy < py - ph/2 + fh/2)) {
            return true;
        }
    }
    return false;
}