// import { canvas, ctx } from "../../index.js";
// import { tImage } from "../../.././images/Super Mountain Dusk Files/Layers/trees.png";
// import { mNImage } from "../../.././images/Super Mountain Dusk Files/Layers/mountains.png"
// import { cNImage } from "../../.././images/Super Mountain Dusk Files/Layers/near-clouds.png";
// import { mFImage } from "../../.././images/Super Mountain Dusk Files/Layers/far-mountains.png";
// import { cFImage } from "../../.././images/Super Mountain Dusk Files/Layers/far-clouds.png";
// import { sImage } from "../../.././images/Super Mountain Dusk Files/Layers/sky.png";

const treesImage = new Image();
const mountainsNearImage = new Image();
const cloudNearImage = new Image();
const mountainsFarImage = new Image();
const cloudFarImage = new Image();
const skyImage = new Image();

treesImage.src = tImage;
mountainsNearImage.src = mNImage;
cloudNearImage.src = cNImage;
mountainsFarImage.src = mFImage;
cloudFarImage.src = cFImage;
skyImage.src = sImage;





export function parralaxBackground(time, treesSpeed, mountainsNearSpeed, cloudNearSpeed, mountainsFarSpeed, cloudFarSpeed) {
    treesSpeed *= time;
    treesSpeed = canvas.width - treesSpeed;
    ctx.drawImage(treesImage, treesSpeed, 0);
}