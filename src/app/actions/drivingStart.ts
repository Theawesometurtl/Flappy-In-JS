import { human, entityList, globals, canvas } from "../../sharedGlobals";
import { NN } from "../classes/NN";
import { simulationReset } from "./simulationReset";
import { drivingGame } from "../drivingGame";
import { Car } from "../classes/Car";
import { Barrier } from "../classes/Barrier";


canvas.addEventListener("click", function(){
    let v = entityList.Barrier[0].vectors
    v.push([globals.mousePos.x, globals.mousePos.y]);
    entityList.Barrier[0].vectors = v;
    let s: string = '';
    for (let i = 0; i < v.length; i++) {
        s = s + '[' +v[i][0] + ',' + v[i][1] +'], '
    }
    entityList.Barrier[0].draw();
    console.log(s);
});

export function drivingStart() {
    if (human) {
        entityList.Cars.push(new Car());
        entityList.Barrier.push(new Barrier([120,309], [162,163], [256,69], [534,43], [852,57], [975,129], [1000,232], [1020,386], [975,489], [889,561], [592,597], [381,555], [216,513], [155,436], [118,305], [336,223], [532,202], [655,212], [819,244], [875,312], [840,382], [755,410], [566,425], [429,425], [368,399], [577,309], [662,309], [208,208], [489,122], [697,132], [907,196], [920,394], [794,481], [550,494], [350,466], [261,349], [453,292], [705,253], [770,334], [580,374],))

    } else {
        // entityList.Barrier.push(new Barrier([217,64], [362,41], [565,34], [770,33], [889,47], [1075,61], [1229,63], [1296,109], [1329,138], [1368,213], [1373,296], [1374,379], [1349,467], [1325,570], [1282,609], [1196,612], [975,623], [799,597], [532,589], [405,584], [273,560], [126,477], [109,394], [90,273], [112,189], [222,61], [111,187], [89,269], [104,362], [253,283], [319,191], [483,180], [688,153], [833,157], [1016,197], [1142,249], [1193,302], [1124,393], [996,406], [803,429], [647,426], [516,417], [439,394], [171,237], [295,124], [419,105], [554,99], [675,93], [828,94], [1029,113], [1201,174], [1272,280], [1276,408], [1164,480], [961,499], [843,495], [638,497], [500,495], [365,462], [277,386], [421,267], [610,270], [731,271], [875,284], [1044,293]));
        entityList.Barrier.push(new Barrier([120,309], [162,163], [256,69], [534,43], [852,57], [975,129], [1000,232], [1020,386], [975,489], [889,561], [592,597], [381,555], [216,513], [155,436], [118,305], [336,223], [532,202], [655,212], [819,244], [875,312], [840,382], [755,410], [566,425], [429,425], [368,399], [577,309], [662,309], [208,208], [489,122], [697,132], [907,196], [920,394], [794,481], [550,494], [350,466], [261,349], [453,292], [705,253], [770,334], [580,374],))
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.Cars.push(new Car())
            entityList.NNs.push(new NN(...globals.NNBrain));
            entityList.NNs[i].createNeuralNet(0);

            // entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset(false);
    }
    if (human) {
        // setInterval(drivingGame, 20);
    } else {
        setInterval(drivingGame, 1);
    }
}