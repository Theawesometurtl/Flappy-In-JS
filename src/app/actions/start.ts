import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { Pipes } from  "../classes/Pipes"
import { entityList, human, globals } from "../../index";
import { NN } from "../classes/NN"
import { simulationReset } from "./simulationReset";
import { decodeNetwork } from "./encodeDecode";

export function start() {    
    if (human) {
        entityList.Flappies.push(new Flappy());
        entityList.Pipes.push(new Pipes());
    } else {
        
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedFlappies; i++) {
            entityList.NNs.push(new NN(4, 5, 5, 1));
            entityList.NNs[i].createNeuralNet(0);
            console.log(entityList.NNs[i].biasArray, entityList.NNs[i].weightArray);
            let network = decodeNetwork("4 4 5 5 1 -0.00021588947880520144 0 -0.000023265330112736475 0 0.00013502399976842442 0 -0.00007704358402487845 -0.00004216561931907527 0 -0.0002686056787697321 0 -0.00021945117821394022 0 -0.016984953137621925 -0.009621124316236369 0 0 -0.16713649724436985 0.19602168328567285 0 0 0 0 -0.36714975965038943 0.42907296434947556 0 0 0 0 0 0 0.2432604568737264 -0.43237807028931213 0 0 0 0.26957221972906575 -0.0841222716378538 0 0 0 0.009400660373704019 0.32290525307728407 0 0.1826652276965497 0 -0.24465138430310973 -0.42404275446412026 0 -0.0074779662018127505 -0.3183902112561584 1.0535493170340708 0.1798990356103476 -0.45755120344788447 0 0.177889209057244 -0.31539622225051006 0 0 0 0.48238283322234793 0 -0.26344924147079585 -0.20437338894456247 0")
            entityList.NNs[i].biasArray = network[0]
            entityList.NNs[i].weightArray = network[1]
            // entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset();
    }
    if (human) {
        setInterval(main, 20);
    } else {
        setInterval(main, 1);
    }

}