class counter {
    
    private c: number = -1;
    get count(): number {
        this.c++;
        return this.c;
    }
    set count(num) {
        this.c = num;
    }
}
export function encodeNetwork(weights: number[][][], biases: number[][]) {
    let encodedNetwork: string = biases.length.toString();
    for (let layer = 0; layer < biases.length; layer++) {
        encodedNetwork = encodedNetwork + " " + biases[layer].length.toString();
        
    }
    // console.log(encodedNetwork);
    for (let layer = 0; layer < biases.length; layer++) {
        for (let neuron = 0; neuron < biases[layer].length; neuron++) {
            encodedNetwork = encodedNetwork + " " + biases[layer][neuron].toString()
        }
    }
    // console.log(encodedNetwork);

    for (let layer = 1; layer < weights.length; layer++) {
        for (let neuron = 0; neuron < weights[layer].length; neuron++) {
            for (let weight = 0; weight < weights[layer][neuron].length; weight++) {
                encodedNetwork = encodedNetwork + " " + weights[layer][neuron][weight].toString();
            }
        }
    }
    return encodedNetwork;
}

export function decodeNetwork(encodedNetwork: string): [biases: number[][], weights: number[][][]] {
    let encodedNetworkStringArray: string[] = encodedNetwork.split(" ");
    let encodedNetworkFloatArray: number[] = [];
    for (let index = 0; index < encodedNetworkStringArray.length; index++) {
        encodedNetworkFloatArray.push(parseFloat(encodedNetworkStringArray[index]));
    }
    let c = new counter()
    let layers: number = encodedNetworkFloatArray[c.count];
    let neurons: number[] = [];
    let biases: number[][] = [];
    let weights: number[][][] = [];
    for (let layer = 0; layer < layers; layer++) {
        neurons[layer] = encodedNetworkFloatArray[c.count]
    }
    // console.log(neurons);

    for (let layer = 0; layer < layers; layer++) {
        biases[layer] = [];
        for (let neuron = 0; neuron < neurons[layer]; neuron++) {
            biases[layer][neuron] = encodedNetworkFloatArray[c.count];
        }
    }
    // console.log(encodedNetwork);
    
    for (let layer = 1; layer < layers; layer++) {
        weights[layer] = [];
        for (let neuron = 0; neuron < neurons[layer-1]; neuron++) {
            weights[layer][neuron] = [];
            for (let weight = 0; weight < neurons[layer]; weight++) {
                weights[layer][neuron][weight] = encodedNetworkFloatArray[c.count];
            }
        }
    }
    // console.log(biases, weights);
    return [biases, weights];
}
