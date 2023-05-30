import { ctx } from '../../index'
import { displayNetwork } from '../actions/displayNetwork';
import { activationFunction } from '../actions/activationFunction';

interface NNInterface {
    neuronsPerLayer: number[];
    biasArray: number[][];
    weightArray: number[][][];
  }
  

export class NN implements NNInterface {
    neuronsPerLayer: number[];
    biasArray: number[][];
    weightArray: number[][][];

    constructor(...neuronsPerLayer : number[]) {
        this.neuronsPerLayer = neuronsPerLayer;
        this.biasArray = []
        this.weightArray = []
    }

    createNeuralNet(layer = 0) : void {
        // console.log("ran")
        this.biasArray[layer] = [];
        //make value for every bias in layer
        for (let j = 0; j < this.neuronsPerLayer[layer]; j++) {
            this.biasArray[layer][j] = 0;
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
                this.weightArray[layer][j][k] = 0;
            }
        }


        return this.createNeuralNet(layer);

    }

    fullMutate(layer = 0, amount : number = 10, chance: number = 0.01) : void {
        for (let j = 0; j < this.biasArray[layer].length; j++) {//biases
            if (Math.random() < chance) {
                this.biasArray[layer][j] += (Math.random() -.5) / amount;
                this.biasArray[layer][j] *= (Math.random() + amount/2) / amount;
            }
        }


        layer++;//this skips over the first layer of the weight array
        if (layer === this.biasArray.length) {
            // console.log(this.weightArray, this.biasArray)
            return
        }

        for (let j = 0; j < this.weightArray[layer].length; j++) {
            for (let k = 0; k < this.weightArray[layer][j].length; k++) {
                if (Math.random() < chance) {
                    this.weightArray[layer][j][k] += Math.random() -0.5;
                    this.weightArray[layer][j][k] *= (Math.random() + amount) / amount;
                }
            }
        }
        
        return this.fullMutate(layer, amount, chance)
    }
    

    update(layer = 0, ...inputs : number[]) : number[] {
        
        layer++;
        if (layer >= this.neuronsPerLayer.length) {//end of recursion
            return inputs;
        }
        let outputs : number[] = [];

        outputs = this.updateBiases(layer, 0, outputs);
        // console.log(layer, outputs);
        
        outputs = this.updateWeights(layer, 0, 0, outputs, inputs)
        // console.log(layer, outputs)
        
        outputs = activationFunction(...outputs);
        // console.log(layer, outputs)
        

        // displayNetwork(100, 50, canvas.width -400, canvas.height - 300, 'weight', 'bias', 0, false);

        return this.update(layer, ...outputs);//recursion (I think linear recursion, but not suure)
    }

    updateBiases(layer = 0, neuron: number = 0, outputs: number[]) : number[] {
        outputs[neuron] = this.biasArray[layer][neuron];
        neuron++;


        if (neuron >= this.biasArray[layer].length) {
            return outputs;
        }
        // console.log(layer, outputs);
        return this.updateBiases(layer, neuron, outputs);
    }

    updateWeights(layer: number = 0, neuron: number, weight:number, outputs: number[], inputs: number[]):number[] {
        
        
        outputs[weight] += this.weightArray[layer][neuron][weight] * inputs[neuron];
        // console.log(outputs, inputs);
        // console.log(layer, neuron, weight);
        // console.log(this.weightArray[layer][neuron].length);
        // console.log(this.weightArray, this.weightArray[layer], this.weightArray[layer][neuron])
        // console.log(outputs[weight], this.weightArray[layer][neuron][weight], inputs[neuron]);

        weight++;
        if (weight >= this.weightArray[layer][neuron].length) {
            neuron++;
            weight = 0;
            if (neuron >= this.biasArray[layer-1].length) {
                // console.log(layer, outputs)
                return outputs
            }
        }
        
        return this.updateWeights(layer, neuron, weight, outputs, inputs);
    }


}