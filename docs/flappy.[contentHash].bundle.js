(()=>{"use strict";var t={pipeTimer:100,timer:0,simulatedNNs:300,fitnessDictionary:{},NNKeepers:30,NNBrain:[4,8,8,8,6,4,1],bestNNs:{},mousePos:{},mutationRateMutationRate:.3,mutationMutationAmount:2,checkpoints:[[208,208],[489,122],[697,132],[907,196],[920,394],[794,481],[550,494],[350,466],[261,349],[453,292],[580,374]],checkpointSize:50,timerLimit:1e3,delay:20,human:!0,generationNum:0},i=document.querySelector("canvas");i.width=window.innerWidth,i.height=window.innerHeight;var e=i.getContext("2d"),o={Flappies:[],Pipes:[],Cars:[],NNs:[],Barrier:[]},r={};window.onkeyup=function(t){r[t.keyCode]=!1},window.onkeydown=function(t){r[t.keyCode]=!0};var n=document.getElementById("checkbox"),s=document.getElementById("rangeValue"),a=document.querySelector("#range");null!=n&&n.addEventListener("keydown",(function(t){32===t.keyCode&&t.preventDefault()})),null!=a&&null!=s&&(a.addEventListener("change",(function(i){s.innerHTML=a.value+" Simulation Speed",t.delay=20-.02*parseInt(a.value)})),a.addEventListener("mousemove",(function(i){s.innerHTML=a.value+" Simulation Speed",t.delay=20-.02*parseInt(a.value)})));var h=function(){function o(){this.position={x:50,y:i.height/2},this.velocity={x:0,y:0},this.width=50,this.height=50,this.jumpVelocity=21,this.drag=.9,this.gravity=3}return o.prototype.jump=function(){this.velocity.y=-this.jumpVelocity},o.prototype.update=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.velocity.x*=this.drag,this.velocity.y+=this.gravity,this.velocity.y*=this.drag,!0===r[32]&&t.human&&this.jump()},o.prototype.draw=function(){e.fillStyle="yellow",e.fillRect(this.position.x-this.width/2,this.position.y-this.height/2,this.width,this.height),e.strokeStyle="black",e.lineWidth=3,e.beginPath(),e.moveTo(this.position.x-this.width/2,this.position.y-this.height/2),e.lineTo(this.position.x+this.width/2,this.position.y-this.height/2),e.lineTo(this.position.x+this.width/2,this.position.y+this.height/2),e.lineTo(this.position.x-this.width/2,this.position.y+this.height/2),e.closePath(),e.stroke()},o.prototype.die=function(){this.position.y=100,this.velocity.y=0},o}(),l=function(){function t(){this.width=50,this.gapHeight=200,t.numOfPipes++,this.pipeNum=t.numOfPipes,this.position={x:i.width+this.width,y:Math.random()*(i.height-this.gapHeight)+this.gapHeight/2},this.velocity={x:-9,y:0}}return t.prototype.update=function(){if(this.position.x+=this.velocity.x,this.velocity.y+=this.velocity.y,this.position.x<0-this.width){var t=void 0;for(t in o.Pipes)o.Pipes[t].pipeNum===this.pipeNum&&o.Pipes.splice(t,1)}},t.prototype.draw=function(){e.fillStyle="green",e.fillRect(this.position.x-this.width/2,0,this.width,this.position.y-this.gapHeight/2),e.fillRect(this.position.x-this.width/2,this.position.y+this.gapHeight/2,this.width,i.height+1e3)},t.numOfPipes=0,t}(),u=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return t.map((function(t){return 1/(1+Math.exp(-t))}))},p=function(t,i,e){if(e||2===arguments.length)for(var o,r=0,n=i.length;r<n;r++)!o&&r in i||(o||(o=Array.prototype.slice.call(i,0,r)),o[r]=i[r]);return t.concat(o||Array.prototype.slice.call(i))},c=function(){function t(){for(var i=[],e=0;e<arguments.length;e++)i[e]=arguments[e];this.neuronsPerLayer=i,this.biasArray=[],this.weightArray=[],t.NNAmount++,this.networkNumber=t.NNAmount,this.biasMutationRate=.1,this.biasMutationAmount=1,this.weightMutationRate=.1,this.weightMutationAmount=1}return t.prototype.createNeuralNet=function(t){void 0===t&&(t=0),this.biasArray[t]=[];for(var i=0;i<this.neuronsPerLayer[t];i++)Math.random()<.5?this.biasArray[t][i]=1:this.biasArray[t][i]=-1;if(++t!==this.neuronsPerLayer.length){this.weightArray[t]=[];for(i=0;i<this.neuronsPerLayer[t-1];i++){this.weightArray[t][i]=[];for(var e=0;e<this.neuronsPerLayer[t];e++)Math.random()<.5?this.weightArray[t][i][e]=1:this.weightArray[t][i][e]=-1}return this.createNeuralNet(t)}},t.prototype.fullMutate=function(t,i,e){void 0===t&&(t=0),void 0===e&&(e=.01);for(var o=0;o<this.biasArray[t].length;o++)Math.random()<this.biasMutationRate&&(this.biasArray[t][o]+=Math.random()-.5,this.biasArray[t][o]*=(Math.random()-.5+this.biasMutationAmount)/this.biasMutationAmount);if(++t!==this.biasArray.length){for(o=0;o<this.weightArray[t].length;o++)for(var r=0;r<this.weightArray[t][o].length;r++)Math.random()<this.weightMutationRate&&(this.weightArray[t][o][r]+=Math.random()-.5,this.weightArray[t][o][r]*=(Math.random()-.5+this.weightMutationAmount)/this.weightMutationAmount);return this.fullMutate(t,i,e)}},t.prototype.update=function(t){void 0===t&&(t=0);for(var i=[],e=1;e<arguments.length;e++)i[e-1]=arguments[e];if(++t>=this.neuronsPerLayer.length)return i;var o=[];return o=this.updateBiases(t,0,o),o=this.updateWeights(t,0,0,o,i),o=u.apply(void 0,o),this.update.apply(this,p([t],o,!1))},t.prototype.updateBiases=function(t,i,e){return void 0===t&&(t=0),void 0===i&&(i=0),e[i]=this.biasArray[t][i],++i>=this.biasArray[t].length?e:this.updateBiases(t,i,e)},t.prototype.updateWeights=function(t,i,e,o,r){return void 0===t&&(t=0),o[e]+=this.weightArray[t][i][e]*r[i],++e>=this.weightArray[t][i].length&&(e=0,++i>=this.biasArray[t-1].length)?o:this.updateWeights(t,i,e,o,r)},t.NNAmount=0,t}(),y=function(){function t(){this.c=-1}return Object.defineProperty(t.prototype,"count",{get:function(){return this.c++,this.c},set:function(t){this.c=t},enumerable:!1,configurable:!0}),t}();function g(t,i){for(var e=i.length.toString(),o=0;o<i.length;o++)e=e+" "+i[o].length.toString();for(o=0;o<i.length;o++)for(var r=0;r<i[o].length;r++)e=e+" "+i[o][r].toString();for(o=1;o<t.length;o++)for(r=0;r<t[o].length;r++)for(var n=0;n<t[o][r].length;n++)e=e+" "+t[o][r][n].toString();return e}function f(t){for(var i=t.split(" "),e=[],o=0;o<i.length;o++)e.push(parseFloat(i[o]));for(var r=new y,n=e[r.count],s=[],a=[],h=[],l=0;l<n;l++)s[l]=e[r.count];for(l=0;l<n;l++){a[l]=[];for(var u=0;u<s[l];u++)a[l][u]=e[r.count]}for(l=1;l<n;l++){h[l]=[];for(u=0;u<s[l-1];u++){h[l][u]=[];for(var p=0;p<s[l];p++)h[l][u][p]=e[r.count]}}return[a,h]}function v(t,i,e){return Math.random()<t&&(e*=(i+Math.random()-.5)/i),e}var d=function(t,i,e){if(e||2===arguments.length)for(var o,r=0,n=i.length;r<n;r++)!o&&r in i||(o||(o=Array.prototype.slice.call(i,0,r)),o[r]=i[r]);return t.concat(o||Array.prototype.slice.call(i))};function m(t,e,r,n){if(e>i.height-n/2)return!0;if(e<0+n/2)return!0;for(var s,a,h,l,u=r,p=n,c=0;c<o.Pipes.length;c++)if(s=o.Pipes[c].position.x,a=o.Pipes[c].position.y,h=o.Pipes[c].width,l=o.Pipes[c].gapHeight,t>s-h/2-u/2&&t<s+h/2+u/2&&(e>a+l/2-p/2||e<a-l/2+p/2))return!0;return!1}function N(t,i){for(var e=0;e<t.length-1;e++)for(var o=0;o<i.length-1;o++){if(w(t[e],t[e+1],i[o],i[o+1])[0])return!0}return!1}function w(t,i,e,o){var r,n=t[0],s=t[1],a=i[0],h=i[1],l=e[0],u=e[1],p=o[0],c=o[1];if(n===a&&s===h||l===p&&u===c)return[!1];if(0===(r=(c-u)*(a-n)-(p-l)*(h-s)))return[!1];var y=((p-l)*(s-u)-(c-u)*(n-l))/r,g=((a-n)*(s-u)-(h-s)*(n-l))/r;return y<0||y>1||g<0||g>1?[!1]:[!0,n+y*(a-n),s+y*(h-s)]}function A(t,i,e){var o=[t,i,e];return o.sort((function(t,i){return i-t})),o[1]===e}var M=function(){function i(){for(var i=[],e=0;e<arguments.length;e++)i[e]=arguments[e];this.angularDrag=.85,this.position={x:t.checkpoints[0][0],y:t.checkpoints[0][1]},this.velocity={x:0,y:0},this.angle=0,this.accelleration=.4,this.length=4,this.width=10,this.angularVelocity=0,this.angularAcceleration=3,this.drag=.95,this.vertices=[[this.length,this.width],[-this.length,this.width],[-this.length,-this.width],[this.length,-this.width]],this.vertexCoords=[];for(var o=0;o<this.vertices.length;o++)this.vertexCoords[o]=[],this.vertexCoords[o][0]=this.vertices[o][0]+this.position.x,this.vertexCoords[o][1]=this.vertices[o][1]+this.position.y;this.checkpointReached=0}return i.prototype.draw=function(){e.strokeStyle="purple",e.lineWidth=1,e.fillStyle="white",e.beginPath(),e.moveTo(this.vertexCoords[0][0],this.vertexCoords[0][1]);for(var t=1;t<this.vertices.length;t++)e.lineTo(this.vertexCoords[t][0],this.vertexCoords[t][1]);e.closePath(),e.fill(),e.stroke()},i.prototype.update=function(){this.angularVelocity*=this.angularDrag,this.angle+=this.angularVelocity;var i=Math.PI/180*this.angle,e=Math.cos(i),r=Math.sin(i);this.velocity.x+=this.accelleration*e,this.velocity.y+=this.accelleration*r;var n,s,a=(n=this.velocity.x,s=this.velocity.y,Math.sqrt(Math.pow(n,2)+Math.pow(s,2)));if(0!==a){var h=0;this.velocity.y<0?(h=Math.PI,h+=-Math.atan(this.velocity.x/-this.velocity.y)):h+=Math.atan(this.velocity.x/this.velocity.y),a*=this.drag,this.velocity.x=a*Math.sin(h),this.velocity.y=a*Math.cos(h),A(t.checkpoints[this.checkpointReached%t.checkpoints.length][0]-t.checkpointSize,t.checkpoints[this.checkpointReached%t.checkpoints.length][0]+t.checkpointSize,this.position.x)&&A(t.checkpoints[this.checkpointReached%t.checkpoints.length][1]-t.checkpointSize,t.checkpoints[this.checkpointReached%t.checkpoints.length][1]+t.checkpointSize,this.position.y)&&this.checkpointReached++}this.position.x+=this.velocity.x,this.position.y+=this.velocity.y;for(var l=0;l<this.vertices.length;l++)this.vertexCoords[l][0]=r*this.vertices[l][0]+e*this.vertices[l][1]+this.position.x,this.vertexCoords[l][1]=r*this.vertices[l][1]-e*this.vertices[l][0]+this.position.y;for(var u=0;u<o.Barrier[0].vectors.length;u++)if(N(this.vertexCoords,o.Barrier[0].vectors[u]))return!0;return!1},i.prototype.steer=function(t){t>.5?(t=1-t,t=.5-(t=Math.pow(t,2)),this.angularVelocity+=t*this.angularAcceleration):t<.5&&(t=-.5+(t=Math.pow(t,2)),this.angularVelocity+=t*this.angularAcceleration)},i}(),b=function(){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];this.vectors=t}return t.prototype.draw=function(){e.strokeStyle="black",e.lineWidth=5,e.beginPath();for(var t=0;t<this.vectors.length;t++){e.moveTo(this.vectors[t][0][0],this.vectors[t][0][1]);for(var i=1;i<this.vectors[t].length;i++)e.lineTo(this.vectors[t][i][0],this.vectors[t][i][1]);e.stroke()}},t}(),x=function(t,i,e){if(e||2===arguments.length)for(var o,r=0,n=i.length;r<n;r++)!o&&r in i||(o||(o=Array.prototype.slice.call(i,0,r)),o[r]=i[r]);return t.concat(o||Array.prototype.slice.call(i))};function k(i){o.Pipes=[],o.Flappies=[],o.Barrier=[],o.Cars=[],t.generationNum++;var e=function(i){void 0===i&&(i=1);var e=t.fitnessDictionary;t.fitnessDictionary={};var r=Object.keys(e).map((function(t){return[parseInt(t),e[parseInt(t)]]}));r.sort((function(t,i){return i[1]-t[1]}));var n=r[0][1],s=o.NNs[r[0][0]];n>=4&&(console.log(n,s.networkNumber,g(s.weightArray,s.biasArray)),t.bestNNs[r[0][1]]=g(s.weightArray,s.biasArray));for(var a=1;a<t.simulatedNNs;a++)r[a][1]*=(Math.random()+i)/i;r.sort((function(t,i){return i[1]-t[1]})),r=r.slice(0,t.NNKeepers);for(var h=[],l=0;l<t.simulatedNNs/r.length;l++)h.push.apply(h,r);return h}(10);if(function(i){for(var e=[],r=0;r<i.length;r++){e[r]=new(c.bind.apply(c,d([void 0],t.NNBrain,!1))),e[r].createNeuralNet();var n=f(g(o.NNs[i[r][0]].weightArray,o.NNs[i[r][0]].biasArray));e[r].biasArray=n[0],e[r].weightArray=n[1],e[r].biasMutationAmount=o.NNs[i[r][0]].biasMutationAmount,e[r].biasMutationRate=o.NNs[i[r][0]].biasMutationRate,e[r].weightMutationAmount=o.NNs[i[r][0]].weightMutationAmount,e[r].weightMutationRate=o.NNs[i[r][0]].weightMutationRate}o.NNs=[];for(var s=0;s<e.length;s++)o.NNs.push(e[s]);for(var a=0;a<t.NNKeepers;a++);for(s=t.NNKeepers;s<t.simulatedNNs;s++){o.NNs[s].fullMutate(0,.3,.03);var h=o.NNs[s],l=h.biasMutationAmount,u=h.biasMutationRate,p=h.weightMutationAmount,y=h.weightMutationRate;o.NNs[s].biasMutationAmount=v(t.mutationRateMutationRate,t.mutationMutationAmount,l),o.NNs[s].weightMutationAmount=v(t.mutationRateMutationRate,t.mutationMutationAmount,p),o.NNs[s].biasMutationRate=v(t.mutationRateMutationRate,t.mutationMutationAmount,u),o.NNs[s].weightMutationRate=v(t.mutationRateMutationRate,t.mutationMutationAmount,y)}}(e),t.timer=0,i){t.pipeTimer=0,l.numOfPipes=0,o.Pipes.push(new l);for(var r=0;r<t.simulatedNNs;r++)o.Flappies.push(new h)}else{for(r=0;r<t.simulatedNNs;r++)o.Cars.push(new M);var n=JSON.parse(localStorage.getItem("barrier"));console.log(n),o.Barrier.push(new(b.bind.apply(b,x([void 0],n,!1))))}}var P=function(t,i,e){if(e||2===arguments.length)for(var o,r=0,n=i.length;r<n;r++)!o&&r in i||(o||(o=Array.prototype.slice.call(i,0,r)),o[r]=i[r]);return t.concat(o||Array.prototype.slice.call(i))};function S(){if(t.generationNum=0,t.pipeTimer=0,o.Pipes=[],o.Flappies=[],o.Barrier=[],o.Cars=[],t.human)o.Flappies.push(new h),o.Pipes.push(new l);else{for(var i=0;i<t.simulatedNNs;i++){if(o.NNs.push(new(c.bind.apply(c,P([void 0],t.NNBrain,!1)))),o.NNs[i].createNeuralNet(0),JSON.parse(localStorage.getItem("preTrained"))){var e=f("7 4 8 8 8 6 4 1 -0.5759472252579748 4.407397505575808 5.773152572215523 3.963891658109468 -0.86874739954632 0.8607702211942887 -1.146729642053869 -0.20031994396415453 -0.39224305437609225 -1.1081562824369986 -8.732876818715239 0.027970443079826563 -2.219895260505376 4.15873937768212 0.4384047810044784 0.25840845331708917 1.857388967795492 -0.3218628572442761 -0.16883447064028956 -0.4091218551559853 -0.2956230140546134 0.8019278471827469 -1.804829550859526 -1.119520898622265 -1.764832512516631 -1.9300116031772567 -0.2699501455629024 -1.1204848709893105 -5.897512185554247 0.746189880889357 -0.7170894844527151 -0.14738095964411244 -1.1372443512764596 0.362128985376668 0.15109130068186072 -0.7317490953719965 -0.919397451026728 -1.2674064804266971 -1.0337058982202112 0.4294715004880386 0.6751364758959404 7.682900839122195 -0.9940660920445843 1.2582241627339117 -0.24091686691012104 0.18094780000686234 -0.0031601243187750305 0.3722954662954449 3.9477509782801685 1.2714930705824212 0.3044627943199449 2.7670158985759197 -2.365569981251934 -1.1650315947894427 1.647879123508584 -0.19729179366715408 -0.9318131179855741 0.4897079174254852 -1.8975581467308602 1.2730473515789664 -0.3260265674106884 -0.954889692918161 -1.6213976515127673 -0.0818782961435485 -4.003513035889436 -6.400962155385668 0.4911842870477474 -0.5700725580332326 1.7020286740708874 2.0114349300845835 -3.8371276814665514 -0.32011483667536117 -1.2364025828018625 -0.5275865880587279 -0.5814228337309808 -21.243865520093244 -0.13558519021169738 2.828826030555816 -0.21328376626136822 -0.4055701618288551 -0.18223073446434146 0.44588941596715476 -0.20512793134980328 17.26601375780609 -0.22149065323398065 -0.6990922680478955 0.6196088898906171 -0.23770970213095804 -1.3716771585256868 -3.466147504016586 1.6002225085816515 -0.15846809399369705 2.681761978097617 -4.238216675688393 -2.798802855427645 1.2927828972067212 20.464489332535347 1.1137795826515964 0.01591326796302711 -0.22954278547182497 0.621781061461909 -0.253253645428674 0.1367009833823071 0.2634117613468031 -0.13367753859086115 0.577669548566035 -0.3176352703798892 3.594809899318065 0.7131245907465428 0.5827374465910805 -0.768991831135659 -2.649054615383164 -0.6751700542274575 4.8604276237062125 1.168113659520354 0.32570240894820834 -0.8502235955065766 -2.270062620180816 -1.2250379881595348 -0.22824144443734093 0.11278829227247202 -0.9423827851164602 -0.5142113743658523 3.3032417700412835 0.2775226945950079 -1.146597723135004 0.9731544684677833 0.7607496198396874 -0.9720996421525758 -1.1741529669192976 -1.8136522825249517 0.3608027570490507 -0.701859568214203 -0.2390700368426043 3.9164373248588076 2.4561744223509785 1.6039241652963228 3.177931385126435 -1.4452517038829227 -2.184007103285353 1.2522293194270824 1.4302610779914127 0.9098235783650188 0.11160963381255744 -0.2569824435149255 -0.32308773128869817 -0.9954236223542995 -1.020927023846948 2.195846322943446 4.652283122445227 0.054829093485091795 -6.431220155398287 0.4327857810381446 -0.7983438331018171 -0.6004798218724731 -3.2879011705161996 2.115670069742827 -2.9585451837188175 0.8478734191174053 0.48423771514383285 0.5954135487898777 2.8628483170033108 -1.2597870480671534 -0.4988515392751559 2.5523579947911306 0.8019593266734558 1.4033831219047084 0.7777565550488975 1.233908438432457 -0.3579097982878723 0.6271549588710843 -3.7700688292827116 -2.1397792376513483 -3.281770378529232 0.9421014533244465 -0.4742118092244471 1.0079908338108812 1.5790156371743806 -0.16775438667163334 0.45290662076262705 0.0941707854361729 2.959945476965639 -0.6660385333594974 0.41754821583681595 -0.06310207983738032 -1.9141373468513603 -0.7810163231464516 -0.03424555452354481 0.9814945946993081 -2.8502123833439508 -0.43984557227748305 1.207734110930287 -1.51380401512506 0.9658717399388912 0.4578108601285789 -1.8963222564991786 -0.33207824881874143 0.39368836159440546 -2.625972279413333 1.049113479261931 0.5489534336979727 -3.130308575923296 -11.457135261742522 -0.4176955579265717 0.8064286569051056 1.2193051442203213 -0.7893905418201983 0.19725271195842162 1.6804114324495596 -0.7025484489277353 0.9113594032404041 -13.068875800972311 4.477481470925265 0.26345970844346167 -1.4203520149088027 0.5670969074251723 0.6281156062274 -0.8844824606838682 1.3890501008641412 1.913481010411544 0.5373377659700036 -4.016456828610848 -0.7374454286775912 -3.293969925046508 -1.552364633828206 0.3322623202260544 -0.6241806464998213 0.26779056664457435 -0.943714168509763 -0.4619227892534644 0.19572862031364568 -0.6401809284530566 -0.33013015938553586 -0.879638453766372 4.937705396579154 -1.4661106408354645 -0.266570485089404 2.7524092021196243 2.6413618905696703 -1.505509929132853 0.8780098543151406 -0.12004859920235948 -1.058993818943499 -2.112950452011003 0.06701131897677425 7.001027643313685 2.125070268224568 -0.4940446566816252 2.959645108838712 -1.0102095067924273 -0.5661443251344385 -0.45177490639216505 0.2889770261951319 0.9910446353794874 0.042805964765145074 -1.9932249173990635 -1.5596373258394567 0.7202645863256513 -0.4910363079252301 0.3681847084851313 -6.306350526575843 0.4129110977055191 -0.7158572885729727 -0.9820742775502295 0.32960642875109825 1.2755883636533787 0.6876691007777431 14.315508585079932 2.0107586238859616 1.8346680785569198 -1.112219244156559 -0.9661381404259729 10.236621233430677 0.40606970674365495 0.5019780170029801");o.NNs[i].weightArray=e[1],o.NNs[i].biasArray=e[0]}t.fitnessDictionary[i]=i}k(!0)}}function R(t){var i=t.toString(16);return 1==i.length?"0"+i:i}function F(t,i,e){return"#"+R(t)+R(i)+R(e)}function T(t,i,o,r,n,s){e.beginPath(),e.arc(n,s,t,0,2*Math.PI,!1),e.fillStyle=i,e.fill(),e.lineWidth=r,e.strokeStyle=o,e.stroke()}function C(t,i,o,r,n,s,a){if(void 0===a&&(a=0),function(t,i,e,o,r,n){void 0===n&&(n=0);for(var s=0;s<r[n].length;s++)B(r[n][s]),T(9,B(r[n][s]),"black",3,n*t+e,s*i+o)}(t,i,o,r,s,a),++a!==s.length)return function(t,i,o,r,n,s){void 0===s&&(s=0);for(var a=0;a<n[s].length;a++)for(var h=0;h<n[s][a].length;h++){var l=n[s][a][h],u=B(l=Math.round(l));e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo((s-1)*t+o,a*i+r),e.lineTo(s*t+o,h*i+r),e.stroke()}}(t,i,o,r,n,a),C(t,i,o,r,n,s,a)}function B(t){return t<0?F(255,t=225-100*t,t):F(t=225-100*t,255,t)}function I(t,i,o){for(var r=[],n=3;n<arguments.length;n++)r[n-3]=arguments[n];e.font="30px Arial",e.fillStyle="white";for(var s=0;s<r.length;s++)e.fillText(r[s].toString(),t,i+s*o)}var L,H,D=function(t,i,e){if(e||2===arguments.length)for(var o,r=0,n=i.length;r<n;r++)!o&&r in i||(o||(o=Array.prototype.slice.call(i,0,r)),o[r]=i[r]);return t.concat(o||Array.prototype.slice.call(i))};S(),L=function(){var r;if(e.fillStyle="#b0332a",e.fillRect(0,0,i.width,i.height),t.human){o.Flappies[0].update(),o.Flappies[0].draw();for(var n=0;n<o.Pipes.length;n++)o.Pipes[n].update(),o.Pipes[n].draw();m(o.Flappies[0].position.x,o.Flappies[0].position.y,o.Flappies[0].width,o.Flappies[0].height)&&S();var s=document.getElementById("checkbox");s.checked&&(t.human=!1,S())}else{for(var a=0;a<o.Pipes.length;a++)o.Pipes[a].draw();for(a=0;a<o.Pipes.length;a++)o.Pipes[a].update();for(var h=2*o.Pipes[0].position.x/i.width,p=o.Pipes[0].position.y/i.height,c=void 0,y=void 0,f=0;f<o.Flappies.length;f++)if(void 0!==o.Flappies[f]){c=o.Flappies[f].position.y/i.height,y=o.Flappies[f].velocity.y/8;var v=u(c,y,h,p);(r=o.NNs[f]).update.apply(r,D([0],v,!1))[0]>.5&&o.Flappies[f].jump(),m(o.Flappies[f].position.x,o.Flappies[f].position.y,o.Flappies[f].width,o.Flappies[f].height)?(t.fitnessDictionary[f]=t.timer-2*Math.abs(o.Flappies[f].position.y-o.Pipes[0].gapHeight),o.Flappies[f]=void 0,Object.keys(t.fitnessDictionary).length===t.simulatedNNs&&k(!0)):(o.Flappies[f].update(),o.Flappies[f].draw())}void 0!==o.Flappies[0]&&I(i.width-100,50,50,h,p,c,y),I(650,45,100,"Generation: "+t.generationNum.toString()),C(100,50,i.width-620,i.height-375,o.NNs[0].weightArray,o.NNs[0].biasArray,0),t.timer++,t.timer>1e4&&console.log(g(o.NNs[0].weightArray,o.NNs[0].biasArray)),s.checked||(t.human=!0,S())}t.pipeTimer++,t.pipeTimer%80==0&&o.Pipes.push(new l)},(H=function(){L();var i=t.delay;window.setTimeout(H,i)})()})();