export class NN {
    constructor(neuronsPerLayer) {
        
        this.neuronsPerLayer = neuronsPerLayer;
        this.biasArray = [];
        
        this.weightArray = []; 
        
    }
    createNeuralNet() {

        //bias base array
        //create layer arrays
        for (let i = 0; i < neuronsPerLayer.length; i++) {
            this.biaseArray[i] = [];
            //make value for every bias in layer
            for (let j = 0; j < neuronsPerLayer[i]; j++) {
                this.biaseArray[i][j] = 0.5
            }
        }

        //base weight array
        //create layer arrays (excluding input layer)
        for (let i = 1; i < neuronsPerLayer.length; i++) {
            this.weightArray[i] = [];
            //create weight array for every neuron in layer array (excluding input layer)
            for (let j = 0; j < neuronsPerLayer[i]; j++) {
                this.weightArray[i][j] = []
                //assign weight to neuron connection
                for (let k = 0; k < neuronsPerLayer[i]; k++) {
                    this.weightArray[i][j] = 1
                }
            }
        }
    }
    /*In order to make an array of my biases, I need to make an individual array of biases for each layer neurons, then fill in the values of biases

    To make an array of weights, I need to make an array of layers, then an array of the weights for each individual connection between neurons,
    then fill in the values of weights.
    
    I want my onionPeeler function to be able to fill an array of arrays of arrays with values. I want every array of values to be a certain length, the first will be the length of all the layers, the second will be the length of an individual layer, the third will be the length of the activations on the previous layer. I'm going to focus on just he first two layers, just to start


    */ 
   recursion(i, j) {
    if (j > array.length) {
        j = 0;
        i++;
    }
    
    if (i > array.length) {
        return 
    }
    
    j++;
   }
    biasCreator(value, layout, array, layer, neuron) {
        // once we have the required number of biases, we go to the next layer
        if (neuron >= layout[layer]) {
            neuron = 0;
            layer++;
            //if the next layer doesn't exist, we return array value
            if (layer === layout.length) {
                return array;
            }
            //we need a new array for each layer
            array[layer] = [];
        }
        array[layer][neuron] = value;
        neuron++;
    }

    weightCreator(value, layout, array, layer, neuron) {
        // once we have the required number of biases, we go to the next layer
        if (neuron >= layout[layer]) {
            neuron = 0;
            layer++;
            //if the next layer doesn't exist, we return array value
            if (layer === layout.length) {
                return array;
            }
            //we need a new array for each layer
            array[layer] = [];
        }
        array[layer][neuron] = value;
        neuron++;
    }
}