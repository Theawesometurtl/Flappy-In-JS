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
            let network = decodeNetwork("4 4 5 5 1 -0.00021588947880520144 0 -0.000023265330112736475 -0.000056462716606084947 0.00013502399976842442 0 -0.00007704358402487845 -0.0002285511044422181 -0.00012172789570136848 0.00010303857276830112 -0.00007857800084244128 -0.00021945117821394022 0 -0.016984953137621925 -0.005007388567052212 0.3753977535335407 -0.44413087373791654 0.06885737546410882 -0.11407024445168612 0 0 0 -0.6538831566608293 0.11771333405500178 0.42907296434947556 0 0 -0.3459220721594968 0 -0.40263784793251145 0 0.2432604568737264 -0.43237807028931213 0 0 0 0.26957221972906575 0.16818747498315398 -0.09702623907759918 -0.952946107168274 0 -0.410900532983518 0.32290525307728407 0 0.1826652276965497 -0.45868511281862057 -0.24465138430310973 -0.42404275446412026 -0.0695589313922348 -0.0074779662018127505 0.7055490553198613 1.0535493170340708 0.10098681184594516 -0.45755120344788447 0.11049050323861104 0.177889209057244 -0.31539622225051006 0 0 0 0.48238283322234793 0.31894289930347436 -0.6748630540958452 -0.20437338894456247 0")
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
        setInterval(main, 20);
    }

}