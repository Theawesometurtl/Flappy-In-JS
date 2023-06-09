import { human, entityList, globals, canvas } from "../../sharedGlobals";
import { NN } from "../classes/NN";
import { simulationReset } from "./simulationReset";
import { drivingGame } from "../drivingGame";
import { Car } from "../classes/Car";
import { Barrier } from "../classes/Barrier";
import { decodeNetwork } from "./encodeDecode";
import { setDynamicInterval } from "./setDynamicInterval";




export function drivingStart() {
    const barrier: number[][][]= JSON.parse(localStorage.getItem("barrier"));
    if (human) {
        entityList.Cars.push(new Car());
        entityList.Barrier.push(new Barrier(...barrier))

        // entityList.Barrier.push(new Barrier([[120,309], [162,163], [256,69], [534,43], [852,57], [975,129], [1000,232], [1020,386], [975,489], [889,561], [592,597], [381,555], [216,513], [155,436], [118,305], [336,223], [532,202], [655,212], [819,244], [875,312], [840,382], [755,410], [566,425], [429,425], [368,399], [577,309], [662,309], [208,208], [489,122], [697,132], [907,196], [920,394], [794,481], [550,494], [350,466], [261,349], [453,292], [705,253], [770,334], [580,374],]))

    } else {
        // entityList.Barrier.push(new Barrier([217,64], [362,41], [565,34], [770,33], [889,47], [1075,61], [1229,63], [1296,109], [1329,138], [1368,213], [1373,296], [1374,379], [1349,467], [1325,570], [1282,609], [1196,612], [975,623], [799,597], [532,589], [405,584], [273,560], [126,477], [109,394], [90,273], [112,189], [222,61], [111,187], [89,269], [104,362], [253,283], [319,191], [483,180], [688,153], [833,157], [1016,197], [1142,249], [1193,302], [1124,393], [996,406], [803,429], [647,426], [516,417], [439,394], [171,237], [295,124], [419,105], [554,99], [675,93], [828,94], [1029,113], [1201,174], [1272,280], [1276,408], [1164,480], [961,499], [843,495], [638,497], [500,495], [365,462], [277,386], [421,267], [610,270], [731,271], [875,284], [1044,293]));
        // entityList.Barrier.push(new Barrier(...barrier))
        // console.log(entityList.NNs[0].weightArray);
        for (let i = 0; i < globals.simulatedNNs; i++) {
            entityList.Cars.push(new Car())
            entityList.NNs.push(new NN(...globals.NNBrain));
            entityList.NNs[i].createNeuralNet(0);
            let brain = decodeNetwork('7 4 8 8 8 6 4 1 -0.13719220917595898 -1.1194268779390801 6.696097411632826 1.9499970741204367 -1.2958397774204606 0.62672047822188 -5.251533877838209 -0.0032549338828420653 -1.6901930538233993 -0.2588694937233665 0.8412890671880321 -2.7050153837500654 4.620869460280591 0.7217298351966643 0.17109395514340253 0.09127773952020092 0.2756211056558732 0.17555978047362977 -1.551425929924325 -0.7476164539767264 -0.06599285340597796 -0.09803459196096437 0.6904234995374405 0.3888804137216944 -0.184361590612881 -0.30695280431850597 -0.35141230181033084 5.023618578454072 1.103547772032302 -1.4290673055996497 0.9053348741541288 0.8578864540633563 -0.1564962249934434 3.422904897767449 -0.5803318011791656 -0.09932561732029098 0.5574362993674784 -0.8597888606311122 0.8014529369824437 0.5722299471304211 0.22951718926030099 1.3304540460212286 0.14304789786788344 -0.5839684904306875 0.7554591224375479 0.06955504680647696 0.2535276208439975 0.14220365057625328 1.5140055865780726 -0.5778089200525539 0.06580902255462519 -2.313490700861579 -0.06811833800774472 -0.5808757281512698 -0.1265920483202893 0.4934716254965657 -1.1880423154641273 2.2811359655003525 -1.451902139073642 0.07819650871015708 -6.105245451167958 -0.1324072673989869 4.615936498606452 -0.5467649002582826 -0.363990505844579 -0.13650389941538213 0.2752074271707381 -0.3338655170036476 2.9487780193088717 0.40019821287813795 4.117986003148169 -0.026780959863113973 -1.1101917759188504 -0.23498474453383608 -1.3228632798048785 -2.354262419036712 0.24308420750931362 -0.1645818411419609 -1.4437550922892162 2.8941579875924344 0.2558467956036607 -0.08814459780887136 0.07087471383894861 2.267507278497597 0.031031443922044502 2.0854726459304396 -0.21733283625573724 -0.1999819336344184 -1.2599866554388457 -0.6871966470843829 1.2455147633396286 -6.526568175634388 1.0307782621458168 -7.048425872433805 0.600579116169935 0.2504273897566358 -0.09427408745581874 -0.33465465162859115 -0.32308019811531374 -3.2159980190640893 -0.16908430382433298 2.0067478951264635 -0.22150819000851285 -3.161536253245908 -7.822592146183477 -0.2632029546935608 0.20856390088984353 -0.22587124732303063 3.1985033387556667 0.01901510816848335 1.281960882048975 -0.6101326365447916 0.4066794227871143 0.032749370204041846 0.580749212327569 0.020218605304891224 6.102399767840279 0.5403363351368605 -1.8743004829536034 0.9134016819901375 0.31985540246334 0.31610311325584417 -2.9528052359256196 -0.16821194217868546 -0.3270534216716528 0.25430533868517585 0.039953323272309695 0.5129078864175823 -1.0878582947501119 -3.0006443577337114 14.482635959067574 -2.205866485139602 2.7404762721349303 1.7497671894086355 0.9583198636903864 -0.013949195263217617 -0.14315511662414362 -0.4397927522661131 -1.3577501945701076 -0.8037514701853001 -2.532449030688125 0.20338491560072233 -0.4507899161410843 -2.2274339272979184 -0.8647814586351603 0.11184881058792277 -0.22822736718419911 -1.9544104517925607 4.48881498689881 -0.015070123006925666 0.23803318676770988 -0.4676579075702204 4.762046592567611 -1.065157665518599 0.36698649976607184 -1.5879018789144397 0.20002589482689223 -9.041748409257522 -2.2672525020911616 -0.9345114241516673 -3.4811402951716857 0.022063383481803863 0.2059936460595231 -0.35740396629588805 -2.3699239112771893 -1.027495575748089 -0.5996610497575394 -0.12186993995018584 -0.8240663689794188 -1.2999587839357876 -1.9482074149323636 -1.4927417583631173 -3.1211408918927446 1.48027679829537 3.8191195438135566 0.25980925939836114 0.19006342230271714 0.499530598113595 2.4391044095659065 -0.1176207064475447 2.174703713289498 0.9217790529193932 0.2625844764234777 0.06777408551092733 -2.0872472586208257 -2.8122299430939925 -0.403084920900534 -1.4024672072477558 4.845740592451458 0.5036364915196372 1.5426561911817338 -0.3821305320163758 3.6832726290129956 0.480329624070939 -1.985249587507281 0.7889348801484201 -0.40341887738958343 -0.25915722889705617 1.3435106810331616 0.05568610322559019 -0.4549430423844065 -0.007186081549999131 0.7489207834255752 0.45978050583417834 -0.6568806714228086 -0.10495150118059714 0.06218937626306283 0.3547073733461225 0.6833622242523779 -0.4741583573543017 -0.54401128181521 -0.2867410499528524 -0.161017511036551 -6.024143323470697 0.23118278365856362 1.314777099100193 -0.030581536631722805 -7.665897662827148 -0.06957086223406536 -3.126610315641824 -0.3664874835156559 0.08952693783212654 -0.40142456191898224 -0.9760336314051915 -4.0331730406373465 0.5506756694354595 0.05767685896761133 -0.5353456205186418 -0.4170011099740233 0.17264469127434132 -0.3778222189272209 0.139728841521226 -0.055037478538710334 -0.22315604973054257 2.647906952538418 1.292665427457963 -0.06918049451020476 -0.6081817884918073 -0.15496785586286013 -0.2510473623856085 -1.0148718285446956 -1.3523704462743185 -7.271101640737253 0.3461364851325806 0.6720616629669748 -0.16919546580714218 -0.11119618680210956 0.08901327960328412 4.02155343660051 -0.07825219503193623 0.8172067821747365 -1.30395355090693 -6.200558542244187 0.25678308078120987 -0.981293711063376 1.4168019953398936 0.09966926060544423 -14.671767000302156 0.009571147677278432 0.6347082481436137 -1.8843019425461434 -0.9723801053668709 -0.8685414978482838 -11.677441636572498 -0.08477232295914232 0.5644398299969121 -0.013559337551321342 1.7044892059684662 -0.018806745957084366 0.44753191570877887 -3.7704113159587465 -0.20838856291620889 0.27172289627818347 -8.441462041682742 -0.07899501613127134')
            entityList.NNs[i].biasArray = brain[0];
            entityList.NNs[i].weightArray = brain[1];
            // entityList.NNs[i].fullMutate(0, 10, 0.1);

            globals.fitnessDictionary[i] = i;
        }
        simulationReset(false);
    }
    if (human) {
        setDynamicInterval(drivingGame);
    } else {
        setInterval(drivingGame);
    }
}