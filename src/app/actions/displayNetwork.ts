import { rgbToHex } from './rgbToHex';
import { drawCircle } from './drawCircle';
import { ctx } from '../../flappy';


export function displayNetwork(xSpace: number, ySpace: number, xPos: number, yPos: number, weightArray: number[][][], biasArray: number[][], layer: number = 0): void {
    drawBiases(xSpace, ySpace, xPos, yPos, biasArray, layer)

    layer++;
    if (layer === biasArray.length) {
        return
    }
    drawWeights(xSpace, ySpace, xPos, yPos, weightArray, layer)
    
    return displayNetwork(xSpace, ySpace, xPos, yPos, weightArray, biasArray, layer);

}

export function drawBiases(xSpace: number, ySpace: number, xPos: number, yPos: number, biasArray: number[][], layer: number = 0): void {
    for (let j = 0; j < biasArray[layer].length; j++) {
        drawCircle(12, 'yellow', 'black', 3, (layer * xSpace) + xPos, (j * ySpace) + yPos);
    }
}

export function drawWeights(xSpace: number, ySpace: number, xPos: number, yPos: number, weightArray: number[][][], layer: number = 0): void {
    for (let j = 0; j < weightArray[layer].length; j++) {
        for (let k = 0; k < weightArray[layer][j].length; k++) {
            let colour = weightArray[layer][j][k]
            colour = Math.round(colour)
            drawWeightLine(xSpace, ySpace, xPos, yPos, layer, j, k, colour)
        }
    }
}

export function drawWeightLine(xSpace: number, ySpace: number, xPos: number, yPos: number, layer: number, j: number, k: number, colour: number): void {
    let finalColour: string;
    if (colour < 0) {
        colour= 225 - colour*200
        finalColour = rgbToHex(255, colour, colour);
    } else {
        colour= 225 - colour*200
        finalColour = rgbToHex(colour, 255, colour);
    }

    ctx.strokeStyle = finalColour;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.moveTo(((layer-1)*xSpace) + xPos, j*ySpace + yPos)
    ctx.lineTo(layer * xSpace + xPos, k*ySpace + yPos)
    ctx.stroke()
}

