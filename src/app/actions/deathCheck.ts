import { entityList, canvas } from "../../sharedGlobals";


export function flappyDeathCheck(fx: number, fy: number, width: number, height: number): boolean {
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

export function collisionDetector(obj1Vectors: number[][], obj2Vectors: number[][]): boolean {

    for (let i = 0; i < obj1Vectors.length; i++) { 
        for (let j = 0; j < obj2Vectors.length; j++) {
            let r = rayCaster(obj1Vectors[i], obj1Vectors[i + 1], obj2Vectors[i], obj2Vectors[i + 1]);
            if (r === 0) {
                console.log("parrelell lines");
            }
            if (inBetween(obj1Vectors[i][0], obj1Vectors[i+1][0], r) && inBetween(obj2Vectors[i][0], obj2Vectors[i+1][0], r)) {
                return true;
            }
        }
    }
    return false;
}

export function rayCaster(line1P1: number[], line1P2: number[], line2P1: number[], line2P2: number[]): number {
    let sAI = slopeAndIntercept(line1P1, line1P2)
    let line1Slope =  sAI[1];
    let line1Intercept = sAI[0];
    sAI = slopeAndIntercept(line2P1, line2P2);
    let line2Slope =  sAI[1];
    let line2Intercept = sAI[0];
    let intersect = (line1Intercept - line2Intercept) / (line1Slope - line2Slope);
    let intersectPos = intersect * line1Slope + line1Intercept;
    return intersect;
}

function slopeAndIntercept(vector1: number[], vector2: number[]): number[] {
    let lineSlope =  (vector1[1] - vector2[1]) / (vector1[0] - vector2[0]);
    let lineIntercept = vector1[1] - vector1[0]*lineSlope;
    return [lineIntercept, lineSlope];
}

function inBetween(n1: number, n2: number, inBetween: number): boolean {
    let l = [n1, n2, inBetween];
    l.sort(function(first, second) {
        return second - first;
    });
    if (l[1] === inBetween) {
        return true;
    }
    return false;
}