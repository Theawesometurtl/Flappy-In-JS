import { flappyStart } from "./app/actions/flappyStart";
import { setDynamicInterval } from "./app/actions/setDynamicInterval";
import { main } from "./app/flappyGame";

flappyStart();
setDynamicInterval(main);
