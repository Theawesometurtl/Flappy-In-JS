import { drivingStart } from './app/actions/drivingStart';
import { canvas, globals } from './sharedGlobals';
import { findMousePos } from './app/actions/findMousePos';
import { setDynamicInterval } from './app/actions/setDynamicInterval';
import { drivingGame } from './app/drivingGame';


localStorage.setItem("barrier", JSON.stringify([[[120,309], [162,163], [256,69], [534,43], [852,57], [975,129], [1000,232], [1020,386], [975,489], [889,561], [592,597], [381,555], [216,513], [155,436], [118,305], [336,223], [532,202], [655,212], [819,244], [875,312], [840,382], [755,410], [566,425], [429,425], [368,399], [577,309]]]));
globals.NNBrain = [11, 11, 13, 10, 7, 6, 4, 1]

drivingStart();
setDynamicInterval(drivingGame);





