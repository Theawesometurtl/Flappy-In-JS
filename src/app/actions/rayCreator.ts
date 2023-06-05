import { intersect } from "./deathCheck";
import { pythagTheorem } from "./trig";
import { ctx } from "../../sharedGlobals";

export function rayCreator(rayPos: {[key: string]: number}, rayAngle: number, obstacles: number[][]): number {
    let i;
    let largeNum = 10000;
    rayAngle = rayAngle * Math.PI / 180;
    let rayPos2:number[] = [rayPos.x + Math.sin(rayAngle) * largeNum, rayPos.y + Math.cos(rayAngle) * largeNum];
    let closestIntersection = 0;
    let intersectionPos;
    for (let o = 0; o < obstacles.length; o++) {
        i = intersect([rayPos.x, rayPos.y], rayPos2, obstacles[o], obstacles[(o + 1) % obstacles.length]);
        if (i[0] && pythagTheorem(i[1] - rayPos.x, i[2] - rayPos.y) > closestIntersection) {
            closestIntersection = pythagTheorem(i[1] - rayPos.x, i[2] - rayPos.y);
            intersectionPos = [i[1], i[2]];
        }
    }
    if (closestIntersection !== 0) { //kinda useless if I return either way but whatever
        ctx.strokeStyle = 'red';
        ctx.moveTo(rayPos.x, rayPos.y);
        ctx.lineTo(intersectionPos[0], intersectionPos[1]);
        return pythagTheorem(i[1], i[2]);
    }
}