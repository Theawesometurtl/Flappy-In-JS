import { ctx } from '../../index'
import { displayNetwork } from '../actions/displayNetwork';
import { activationFunction } from '../actions/activationFunction';
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
        this.updateBiases(layer, 0, outputs);
        // console.log(outputs)
        
        outputs = activationFunction(...outputs);
        // console.log(outputs)

        layer++;
        if (layer === this.neuronsPerLayer.length) {//end of recursion
            return outputs;
        }
        
        this.updateWeights(layer, 0, 0, outputs, inputs)
        // console.log(outputs)
        

        // displayNetwork(100, 50, canvas.width -400, canvas.height - 300, 'weight', 'bias', 0, false);

        return this.update(layer, ...outputs);//recursion (I think linear recursion, but not suure)
    }

    updateBiases(layer, neuron, outputs) {
        outputs[neuron] = this.biasArray[layer][neuron];
        neuron++;
        if (neuron === this.biasArray[layer].length) {
            return outputs;
        }
        // console.log(outputs);
        return this.updateBiases(layer, neuron, outputs);
    }

    updateWeights(layer, neuron, weight, outputs, inputs) {
        
        
        outputs[neuron] += this.weightArray[layer][neuron][weight] * inputs[weight];
        // console.log(outputs, inputs);
        console.log(layer, neuron, weight);
        console.log(this.weightArray[layer][neuron].length);
        // console.log(this.weightArray, this.weightArray[layer], this.weightArray[layer][neuron])
        // console.log(outputs[neuron], this.weightArray[layer][neuron][weight], inputs[weight]);

        weight++;
        if (weight === this.weightArray[layer][neuron].length-1) {
            neuron++;
            weight = 0;
            if (neuron === this.biasArray[layer-1].length) {
                return outputs
            }
        }
        
        return this.updateWeights(layer, neuron, weight, outputs, inputs);
    }


}