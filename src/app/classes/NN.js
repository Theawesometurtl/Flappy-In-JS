import { ctx } from '../../index'
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
            outputs[i] += this.biasArray[layer][i];
        }
        
        for (let i = 0; i < outputs.length; i++) {
            outputs[i] = this.activationFunction(outputs[i]);// sigmoid function
        }
        
        layer++;
        if (layer > this.neuronsPerLayer.length) {//end of recursion
            return outputs;
        }
        
        
        console.log(layer, inputs)
        for (let i = 0; i < this.biasArray.length; i++) {
            for (let j = 0; j < this.weightArray[layer].length; j++) {
                outputs[i] += this.weightArray[layer][i][j] * inputs[i];//weights
            }
                }
        return this.update(layer, ...outputs);//recursion (I think linear recursion, but not suure)
    }
    activationFunction(num) {
        return 1 / (1 + Math.exp(-num));
    }

    displayNetwork() {
        for (let i = 0; i < this.biasArray.length; i++) {
            for (let j = 0; j < this.biasArray[i].length; j++) {
                this.drawCircle(15, 'yellow', 'black', 5, i * 20, j * 20);
            }
            for (let j = 0; j < this.neuronsPerLayer[i]; j++) {
                this.weightArray[i][j] = []
                //assign weight to neuron connection
                for (let k = 0; k < this.neuronsPerLayer[i]; k++) {
                    this.weightArray[i][j][k] = 1
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