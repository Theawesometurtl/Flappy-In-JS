(()=>{(null===localStorage.getItem("preTrained")&&localStorage.setItem("preTrained",JSON.stringify(!0)),!1===JSON.parse(localStorage.getItem("preTrained")))&&(document.getElementById("checkbox").checked=!0);document.getElementById("FlappyButton").addEventListener("click",(function(){window.location.href="./flappy.html"})),document.getElementById("DrivingButton").addEventListener("click",(function(){window.location.href="./driving.html"})),document.getElementById("DrawTrackButton").addEventListener("click",(function(){window.location.href="./drawTrack.html"})),document.getElementById("CircularRaceTrack").addEventListener("click",(function(){window.location.href="./customSimulation.html",localStorage.setItem("barrier",JSON.stringify([[[220,88],[524,38],[844,67],[896,147],[963,375],[888,603],[734,631],[411,604],[266,478],[164,297],[244,81]],[[414,212],[540,166],[680,206],[727,313],[736,398],[653,495],[483,456],[375,401],[437,187]]])),localStorage.setItem("checkpoint",JSON.stringify([[320,152],[790,176],[636,520]]))})),document.getElementById("mazyRaceTrack").addEventListener("click",(function(){window.location.href="./customSimulation.html",localStorage.setItem("barrier",JSON.stringify([[[287,88],[556,79],[792,119],[916,212],[997,440],[979,578],[771,635],[531,612],[310,601],[215,520],[269,437],[474,429],[601,430],[704,440],[736,391],[692,326],[612,319],[477,314]],[[301,214],[520,217],[668,227],[813,278],[849,379],[822,481],[703,541],[408,519]],[[270,441],[167,345],[121,282],[126,202],[306,81]],[[308,212],[250,257],[267,321],[314,345]]])),localStorage.setItem("checkpoint",JSON.stringify([[350,151],[737,195],[871,535],[342,516],[751,425],[542,254],[380,370],[179,264]]))})),document.getElementById("videoExplanation").addEventListener("click",(function(){window.location.href="https://youtu.be/p8uk8ov3pWM"})),document.getElementById("checkbox").addEventListener("change",(function(){document.getElementById("checkbox").checked?localStorage.setItem("preTrained",JSON.stringify(!1)):localStorage.setItem("preTrained",JSON.stringify(!0)),console.log(localStorage.getItem("preTrained"))}))})();