import { entityList, canvas, ctx } from "../../sharedGlobals";
import { wrapIndex } from "./wrapIndex"


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

    for (let i = 0; i < obj1Vectors.length -1; i++) { 
        for (let j = 0; j < obj2Vectors.length; j++) {
            let r = rayCaster(obj1Vectors[i], wrapIndex(obj1Vectors, i+1), obj2Vectors[i], wrapIndex(obj2Vectors, i + 1));
            console.log(i, j, r, obj1Vectors[i], wrapIndex(obj1Vectors, i+1), obj2Vectors[i], wrapIndex(obj2Vectors, i + 1))
            if (r === 0) {
                console.log("parrelell lines");
            }
            if (inBetween(obj1Vectors[i][0], obj1Vectors[(i+1) / obj1Vectors.length][0], r) && inBetween(obj2Vectors[i][0], obj2Vectors[(i+1) / obj2Vectors.length][0], r)) {
                return true;
            }
        }
    }
    return false;
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    let denominator: number;
    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
      }
  
      denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
    // Lines are parallel
      if (denominator === 0) {
          return false
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
  
    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
      }
  
    // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1)
      let y = y1 + ua * (y2 - y1)
  
      return {x, y}
  }

/**
I tried to use linear equations to find the intersection point of two lines, and I got quite close, I think, but I decided that it would be best to just use some someone else made, for optimization reasons, and because I don't have alot of time
it seems linear algebra helps solve this
 */
// export function rayCaster(line1P1: number[], line1P2: number[], line2P1: number[], line2P2: number[]): number {
//     console.log(line1P1, line1P2);
//     let sAI = slopeAndIntercept(line1P1, line1P2);
//     console.log(sAI)
//     let line1Slope =  sAI[1];
//     let line1Intercept = sAI[0];
//     sAI = slopeAndIntercept(line2P1, line2P2);
//     let line2Slope =  sAI[1];
//     let line2Intercept = sAI[0];
//     let intersect = (line1Intercept - line2Intercept) / (line1Slope - line2Slope);
//     let intersectPos = intersect * line1Slope + line1Intercept;
//     ctx.strokeStyle = "red";
//     ctx.lineWidth = 20;
//     ctx.moveTo(line1P1[0], line1P1[1]);
//     ctx.lineTo(line1P2[0], line1P1[0]*line1Slope + line1Intercept);
//     return intersect;
// }

// function slopeAndIntercept(vector1: number[], vector2: number[]): number[] {
//     let lineSlope =  (vector1[0] - vector2[0]) / (vector1[1] - vector2[1]);
//     let lineIntercept = vector1[1] - vector1[0]*lineSlope;
//     return [lineIntercept, lineSlope];
// }

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