import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { entityList } from "../../index";
import { NN } from "../classes/NN"

export function start() {    
    let n = new NN([4, 5, 5, 1]);
    n.createNeuralNet();
    entityList.Flappies.push(new Flappy());
    setInterval(main, 20);

}