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
        for (let j = 0; j < this.neuronsPerLayer[layer-1]; j++) {
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
            console.log(this.weightArray, this.biasArray)
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
            // console.log(outputs);
            
        }
        
        for (let i = 0; i < outputs.length; i++) {
            outputs[i] = this.activationFunction(outputs[i]);// sigmoid function
            // console.log(outputs);

        }
        
        layer++;
        if (layer === this.neuronsPerLayer.length) {//end of recursion
            return outputs;
        }
        
        
        for (let i = 0; i < this.biasArray[layer-1].length; i++) {//node in first layer
            for (let j = 0; j < this.weightArray[layer].length; j++) {//nodes in second layer
                outputs[i] += this.weightArray[layer][i][j] * inputs[j];//weights
                // console.log(outputs);

            }
        }
        return this.update(layer, ...outputs);//recursion (I think linear recursion, but not suure)
    }
    activationFunction(num) {
        return 1 / (1 + Math.exp(-num));
    }

    
            

        
    

}