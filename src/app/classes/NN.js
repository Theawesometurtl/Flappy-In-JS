export class NN {
    constructor(neuronsPerLayer) {
        
        this.neuronsPerLayer = neuronsPerLayer;
        this.biasArray = []
        this.weightArray = []

        
    }
    createNeuralNet() {

        //bias base array
        //create layer arrays
        for (let i = 0; i < this.neuronsPerLayer.length; i++) {
            this.biasArray[i] = [];
            //make value for every bias in layer
            for (let j = 0; j < this.neuronsPerLayer[i]; j++) {
                this.biasArray[i][j] = 0.5
            }
        }

        //base weight array
        //create layer arrays (excluding input layer)
        for (let i = 1; i < this.neuronsPerLayer.length; i++) {
            this.weightArray[i] = [];
            //create weight array for every neuron in layer array (excluding input layer)
            for (let j = 0; j < this.neuronsPerLayer[i]; j++) {
                this.weightArray[i][j] = []
                //assign weight to neuron connection
                for (let k = 0; k < this.neuronsPerLayer[i]; k++) {
                    this.weightArray[i][j][k] = 1
                }
            }
        }
        console.log(this.biasArray, this.weightArray)
    }

    fullMutate() {
        for (let i = 0; i < this.biasArray.length; i++) {
            for (let j = 0; j < this.biasArray[i].length; j++) {
                this.biasArray[i][j] *= (Math.random() + 0.5);
            }
        }

        for (let i = 0; i < this.weightArray.length; i++) {
            for (let j = 0; j < this.weightArray[i].length; j++) {
                for (let k = 0; k < this.weightArray[i][j].length; k++) {
                    this.weightArray[i][j][k] *= (Math.random() + 0.5);
                }
            }
        }
    }
    

    update(layer, ...inputs) {
        let outputs = [];
        for (let i = 0; i < this.weightArray[layer].length; i++) {
            for (let j = 0; j < this.weightArray[layer+1].length; j++) {
                outputs[i] += this.weightArray[layer+1][i][j] * inputs[i];//weights
            }
        }

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


        return this.update(layer, outputs);//recursion (I think linear recursion, but not suure)
    }
    activationFunction(num) {
        return 1 / (1 + Math.exp(-num));
    }


}