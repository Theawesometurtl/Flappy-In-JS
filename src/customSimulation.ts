import { drivingStart } from './app/actions/drivingStart';
import { canvas, globals } from './sharedGlobals';
import { findMousePos } from './app/actions/findMousePos';

globals.checkpoints = JSON.parse(localStorage.getItem('checkpoints'));
console.log('hi')
console.log(globals.checkpoints)


drivingStart();



