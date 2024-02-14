import { drivingStart } from './app/actions/drivingStart';
import { globals } from './sharedGlobals';
import { setDynamicInterval } from './app/actions/setDynamicInterval';
import { drivingGame } from './app/drivingGame';


globals.checkpoints = JSON.parse(localStorage.getItem("checkpoint"))
globals.NNBrain = [11, 11, 13, 10, 7, 6, 4, 1]
drivingStart();
setDynamicInterval(drivingGame);




