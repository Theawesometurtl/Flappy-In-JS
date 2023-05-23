import { main } from "../game";
import { Flappy } from "../classes/Flappy"
import { entityList } from "../../index";

export function start() {    
    entityList.Flappies.push(new Flappy());
    setInterval(main, 20);

}