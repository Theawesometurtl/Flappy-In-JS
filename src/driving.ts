import { drivingStart } from './app/actions/drivingStart';
import { canvas } from './sharedGlobals';
import { findMousePos } from './app/actions/findMousePos';

canvas.addEventListener("mousemove", findMousePos);

drivingStart();




