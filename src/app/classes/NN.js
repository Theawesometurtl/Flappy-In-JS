import { ctx } from '../../index'
import { rgbToHex } from '../actions/rgbToHex';
export class NN {
    constructor(...neuronsPerLayer) {
        this.neuronsPerLayer = neuronsPerLayer;
        this.biasArray = []
        this.weightArray = []

        
    }
    createNeuralNet(layer) {
        this.biasArray[layer] = [];
        //make value for every bias in layer
        for (let j = 0; j < this.neuronsPerLayer[layer]; j++) {
            this.biasArray[layer][j] = 0.5
        }

        layer++;
        if (layer === this.neuronsPerLayer.length) { //when I put this reset check in between bias and weight creators, the weight creator skips the first layer
            return 
        }


        this.weightArray[layer] = [];
        //create weight array for every neuron in layer array (excluding input layer)
        for (let j = 0; j < this.neuronsPerLayer[layer]; j++) {
            this.weightArray[layer][j] = []
            //assign weight to neuron connection
            for (let k = 0; k < this.neuronsPerLayer[layer]; k++) {
                this.weightArray[layer][j][k] = 1
            }
        }

        
        return this.createNeuralNet(layer);

    }

    fullMutate(layer) {
        for (let j = 0; j < this.biasArray[layer].length; j++) {//biases
            this.biasArray[layer][j] *= (Math.random() + 0.5);
        }


        layer++;//this skips over the first layer of the weight array
        if (layer === this.biasArray.length) {
            return
        }

        for (let j = 0; j < this.weightArray[layer].length; j++) {
            for (let k = 0; k < this.weightArray[layer][j].length; k++) {
                this.weightArray[layer][j][k] *= (Math.random() + 0.5);//weights
            }
        }
        
        return this.fullMutate(layer)
    }
    

    update(layer, ...inputs) {
        let outputs = [];
        for (let i = 0; i < this.biasArray[layer].length; i++) {//biases
            outputs[i] = this.biasArray[layer][i];
            
        }
        
        for (let i = 0; i < outputs.length; i++) {
            outputs[i] = this.activationFunction(outputs[i]);// sigmoid function
        }
        
        layer++;
        if (layer === this.neuronsPerLayer.length) {//end of recursion
            return outputs;
        }
        
        
        for (let i = 0; i < this.biasArray[layer].length; i++) {//node in layer
            for (let j = 0; j < this.weightArray[layer][i].length; j++) {//weight in node
                outputs[i] += this.weightArray[layer][i][j] * inputs[j];//weights
            }
        }
        return this.update(layer, ...outputs);//recursion (I think linear recursion, but not suure)
    }
    activationFunction(num) {
        return 1 / (1 + Math.exp(-num));
    }

    displayNetwork(xSpace, ySpace, xpos, ypos) {
        for (let i = 0; i < this.biasArray.length; i++) {
            for (let j = 0; j < this.biasArray[i].length; j++) {
                this.drawCircle(12, 'yellow', 'black', 3, (i * xSpace) + xpos, (j * ySpace) + ypos);
            }

        }
        for (let i = 1; i < this.biasArray.length; i++) {
            for (let j = 0; j < this.neuronsPerLayer[i-1]; j++) {
                for (let k = 0; k < this.neuronsPerLayer[i]; k++) {
                    colour = (this.activationFunction(this.neuronsPerLayer[i][j][k]) -0.5) * 250
                    if (colour < 0) {
                        colour = rgbToHex(-colour, 0, 0)
                    } else {
                        colour = rgbToHex(0, 0, colour)
                    }
                    ctx.strokeStyle = 'green';
                    ctx.lineWidth = 1;
                    ctx.beginPath
                    ctx.moveTo(((i-1)*xSpace) + xpos, j*ySpace + ypos)
                    ctx.lineTo(i * xSpace + xpos, k*ySpace + ypos)
                    ctx.stroke()
                }
            }
        }

            

        
    }
    drawCircle(radius, fillColour, strokeColour, strokeWidth, posX, posY) {
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillColour;
        ctx.fill();
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColour;
        ctx.stroke();
    }

}