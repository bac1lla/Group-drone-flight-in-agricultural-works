function getLines(array) {


    // console.log("go", array)
    var score = 100000000
    var bestWay = []
    array.pop()
    let V = [[], []]
    for (let i = 0; i < array.length; i++) {
        V[0].push(array[i][0])
        V[1].push(array[i][1])
    }
    // console.log("out", V)


    var T = [[], []]
    var B, l, L, n;
    var x = [];
    var y = [];
    for (let i = 0; i < V[0].length; i++) {
//L=53//*Math.PI/180;//долгота
//B=53*Math.PI/180;//широта
        B = V[0][i] * Math.PI / 180;
        L = V[1][i]//*Math.PI/180;
        n = Math.trunc((6 + L) / 6);
        l = (L - (3 + 6 * (n - 1))) * Math.PI / 180;

        x[i] = 6367558.4968 * B - Math.sin(2 * B) * (16002.8900 + 66.9607 * Math.pow(Math.sin(B), 2) + 0.3515 * Math.pow(Math.sin(B), 4) - Math.pow(l, 2) * (1594561.25 + 5336.535 * Math.pow(Math.sin(B), 2) + 26.79 * Math.pow(Math.sin(B), 4) + 0.149 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (672483.4 - 811219.9 * Math.pow(Math.sin(B), 2) + 5420.0 * Math.pow(Math.sin(B), 4) - 10.6 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (278194 - 830174 * Math.pow(Math.sin(B), 2) + 572434 * Math.pow(Math.sin(B), 4) - 16010 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (109500 - 574700 * Math.pow(Math.sin(B), 2) + 863700 * Math.pow(Math.sin(B), 4) - 398600 * Math.pow(Math.sin(B), 6))))));


        y[i] = (5 + 10 * n) * Math.pow(10, 5) + l * Math.cos(B) * (6378245 + 21346.1415 * Math.pow(Math.sin(B), 2) + 107.1590 * Math.pow(Math.sin(B), 4) + 0.5977 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (1070204.16 - 2136826.66 * Math.pow(Math.sin(B), 2) + 17, 98 * Math.pow(Math.sin(B), 4) - 11.99 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (270806 - 1523417 * Math.pow(Math.sin(B), 2) + 1327645 * Math.pow(Math.sin(B), 4) - 21701 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (79690 - 866190 * Math.pow(Math.sin(B), 2) + 1730360 * Math.pow(Math.sin(B), 4) - 945460 * Math.pow(Math.sin(B), 6)))))

        T[0][i] = x[i]
        T[1][i] = y[i]

    }
//console.log(x,y);
//let T =[[1,3,7,9],[1,6,7,1]];
//T =  [[55.76217542820761, 55.76284083836579, 55.76119543975626, 55.75964676560552], [37.570644103470876, 37.57630892891034, 37.58315392631635, 37.57371255058391]]
    var b, K, h, d, ch, r
    let t;
    let h2;
    let j;
    let A;
    let C;
    var goodK
    for (let k = 0; k < 360; k += 10) {

        K = Math.tan((Math.PI * k) / 180)
        if ((K > 1000000000) || (K < -1000000000)) K = Infinity


        d = document.getElementById('rangeinput1').value
        t = 0;
        ch = 0;
        r = 0;

//Добавления и исправления 1
        h = Math.abs(d / Math.cos(Math.atan(K)));
        h2 = Math.abs(d / Math.sin(Math.atan(K)));
        let R2 = [];

        R2[ch] = []
        R2[ch + 1] = []
        let bt, bmin, bmax, bxmin, bxmax, bx

        if ((K !== Infinity) && (K !== -Infinity)) {
            bmin = Infinity;
            for (let i = 0; i < T[0].length; i++) {
                bt = T[1][i] - K * T[0][i]
                if (bt < bmin) {
                    bmin = bt
                }
            }
            bmax = -Infinity;
            for (let i = 0; i < T[0].length; i++) {
                bt = T[1][i] - K * T[0][i]
                if (bt > bmax) {
                    bmax = bt
                }
            }
        } else {
            bxmin = Infinity;
            for (let i = 0; i < T[0].length; i++) {
                bx = T[0][i]
                if (bx < bxmin) {
                    bxmin = bx
                }
            }
            bxmax = -Infinity;
            for (let i = 0; i < T[0].length; i++) {
                bx = T[0][i]
                if (bx > bxmax) {
                    bxmax = bx
                }
            }
        }
//Добавления и исправления 1

        if ((K !== Infinity) && (K !== -Infinity)) {
            for (let b = bmin; b < bmax;) {
                ch = 0
                // eslint-disable-next-line no-restricted-globals
                for (let i = 0; i < T[length]['length']; i++) {
                    j = i + 1
                    //console.log(i,j)
                    // eslint-disable-next-line no-restricted-globals
                    if (i === T[length]['length'] - 1) {
                        j = 0;
                    }
                    A = T[1][j] - T[1][i];
                    B = T[0][j] - T[0][i];
                    C = T[1][i] - ((A / B) * T[0][i]);
                    if (A / B === K) continue;
                    if (B === 0) {
                        if (T[1][i] >= T[1][j]) {
                            if ((T[1][i] >= (K * T[0][i] + b)) && T[1][j] <= (K * T[0][i] + b)) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = T[0][i]
                                R2[ch + 1][t] = K * T[0][i] + b
                                ch = ch + 2;
                                r = r + 1
                            }
                        } else {
                            if ((T[1][i] <= (K * T[0][i] + b)) && (T[1][j] >= (K * T[0][i] + b))) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = T[0][i]
                                R2[ch + 1][t] = K * T[0][i] + b
                                ch = ch + 2;
                                r = r + 1
                            }
                        }
                    } else {
                        if (T[0][i] >= T[0][j]) {
                            if ((T[0][i] >= ((C - b) / (K - A / B))) && (T[0][j] <= ((C - b) / (K - A / B)))) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = (C - b) / (K - A / B)
                                R2[ch + 1][t] = K * R2[ch][t] + b
                                ch = ch + 2;
                                r = r + 1
                            }
                        } else {
                            if ((T[0][i] < ((C - b) / (K - A / B))) && (T[0][j] > ((C - b) / (K - A / B)))) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = (C - b) / (K - A / B)
                                R2[ch + 1][t] = K * R2[ch][t] + b
                                ch = ch + 2;
                                r = r + 1
                            }
                        }
                    }
                }
                if (r !== 0) {
                    t = t + 1
                }
                r = 0;
                b = b + h
            }
        } else {

//Добавления 1
            for (bx = bxmin; bx < bxmax;) {
                ch = 0
                // eslint-disable-next-line no-restricted-globals
                for (let i = 0; i < T[length]['length']; i++) {
                    j = i + 1
                    // eslint-disable-next-line no-restricted-globals
                    if (i === T[length]['length'] - 1) {
                        j = 0;
                    }
                    A = T[1][j] - T[1][i];
                    B = T[0][j] - T[0][i];
                    C = T[1][i] - ((A / B) * T[0][i]);
                    if (B === 0) {

                    } else {
                        if (T[0][i] >= T[0][j]) {
                            if ((T[0][i] > bx) && (T[0][j] < bx)) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = bx;
                                R2[ch + 1][t] = (A / B) * R2[ch][t] + C
                                ch = ch + 2;
                                r = r + 1
                            }
                        } else {
                            if ((T[0][i] < bx) && (T[0][j] > bx)) {
                                if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }
                                R2[ch][t] = bx
                                R2[ch + 1][t] = (A / B) * R2[ch][t] + C
                                ch = ch + 2;
                                r = r + 1
                            }
                        }
                    }
                }
                if (r !== 0) {
                    t = t + 1
                }
                r = 0;
                bx = bx + h2
            }
//Добавления 1
        }
// console.log(R2)

        var P = [[], [], [], []]
        var z0, BB0, BB, delB, q1//дельта B

        for (let i = 0; i < R2[0].length; i++) {
            for (let j = 0; j < 2; j++) {
                if (j === 0) {
                    q1 = 0
                } else {
                    q1 = 2
                }
                x = R2[q1][i]
                y = R2[q1 + 1][i]
                BB = x / 6367558.4968//бетта

                BB0 = BB + Math.sin(2 * BB) * (0.00252588685 - 0.00001491860 * Math.pow(Math.sin(BB), 2) + 0.00000011904 * Math.pow(Math.sin(BB), 4))

                n = Math.trunc(y * Math.pow(10, -6))

                z0 = (y - (10 * n + 5) * Math.pow(10, 5)) / (6378245 * Math.cos(BB0))

                l = z0 * (1 - 0.0033467108 * Math.pow(Math.sin(BB0), 2) - 0.0000056002 * Math.pow(Math.sin(BB0), 4) - 0.0000000187 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.16778975 + 0.16273586 * Math.pow(Math.sin(BB0), 2) - 0.00052490 * Math.pow(Math.sin(BB0), 4) - 0.00000846 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0420025 + 0.1487407 * Math.pow(Math.sin(BB0), 2) + 0.0059420 * Math.pow(Math.sin(BB0), 4) - 0.0000150 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01225 + 0.09477 * Math.pow(Math.sin(BB0), 2) + 0.03282 * Math.pow(Math.sin(BB0), 4) - 0.00034 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0038 + 0.0524 * Math.pow(Math.sin(BB0), 2) + 0.0482 * Math.pow(Math.sin(BB0), 4) + 0.0032 * Math.pow(Math.sin(BB0), 6))))));

                delB = -Math.pow(z0, 2) * Math.sin(2 * BB0) * (0.251684631 - 0.003369263 * Math.pow(Math.sin(BB0), 2) + 0.000011276 * Math.pow(Math.sin(BB0), 4) - Math.pow(z0, 2) * (0.10500614 - 0.04559916 * Math.pow(Math.sin(BB0), 2) + 0.00228901 * Math.pow(Math.sin(BB0), 4) - 0.00002987 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.042858 - 0.025318 * Math.pow(Math.sin(BB0), 2) + 0.014346 * Math.pow(Math.sin(BB0), 4) - 0.001264 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01672 - 0.00630 * Math.pow(Math.sin(BB0), 2) + 0.01188 * Math.pow(Math.sin(BB0), 4) - 0.00328 * Math.pow(Math.sin(BB0), 6)))))
                //console.log(z0,delB)
                P[q1][i] = (BB0 + delB) * 180 / Math.PI
                P[q1 + 1][i] = (6 * (n - 0.5) / 57.29577951 + l) * 180 / Math.PI
            }
        }

        if (P[0].length < score) {
            score = P[0].length
            // goodK = K
            // console.log(score)
            bestWay = P
        }
    }

//
//     //перевод точки старта
//     q1 = 0
//     x = Xst
//     y = Yst
//     /*x=T[q1][i]
//     y=T[q1+1][i]*/
//     BB = x / 6367558.4968//бетта
//
//     BB0 = BB + Math.sin(2 * BB) * (0.00252588685 - 0.00001491860 * Math.pow(Math.sin(BB), 2) + 0.00000011904 * Math.pow(Math.sin(BB), 4))
//
//     n = Math.trunc(y * Math.pow(10, -6))
//
//     z0 = (y - (10 * n + 5) * Math.pow(10, 5)) / (6378245 * Math.cos(BB0))
//
//     l = z0 * (1 - 0.0033467108 * Math.pow(Math.sin(BB0), 2) - 0.0000056002 * Math.pow(Math.sin(BB0), 4) - 0.0000000187 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.16778975 + 0.16273586 * Math.pow(Math.sin(BB0), 2) - 0.00052490 * Math.pow(Math.sin(BB0), 4) - 0.00000846 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0420025 + 0.1487407 * Math.pow(Math.sin(BB0), 2) + 0.0059420 * Math.pow(Math.sin(BB0), 4) - 0.0000150 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01225 + 0.09477 * Math.pow(Math.sin(BB0), 2) + 0.03282 * Math.pow(Math.sin(BB0), 4) - 0.00034 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0038 + 0.0524 * Math.pow(Math.sin(BB0), 2) + 0.0482 * Math.pow(Math.sin(BB0), 4) + 0.0032 * Math.pow(Math.sin(BB0), 6))))));
//     let Xstart, Ystart
//     delB = -Math.pow(z0, 2) * Math.sin(2 * BB0) * (0.251684631 - 0.003369263 * Math.pow(Math.sin(BB0), 2) + 0.000011276 * Math.pow(Math.sin(BB0), 4) - Math.pow(z0, 2) * (0.10500614 - 0.04559916 * Math.pow(Math.sin(BB0), 2) + 0.00228901 * Math.pow(Math.sin(BB0), 4) - 0.00002987 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.042858 - 0.025318 * Math.pow(Math.sin(BB0), 2) + 0.014346 * Math.pow(Math.sin(BB0), 4) - 0.001264 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01672 - 0.00630 * Math.pow(Math.sin(BB0), 2) + 0.01188 * Math.pow(Math.sin(BB0), 4) - 0.00328 * Math.pow(Math.sin(BB0), 6)))))
//     //console.log(z0,delB)
//     Xstart = (BB0 + delB) * 180 / Math.PI
//     Ystart = (6 * (n - 0.5) / 57.29577951 + l) * 180 / Math.PI
// // точка старта


    console.log("goodK", goodK)
    console.log(bestWay)

    let firstPoly = []
    let secondPoly = []
    // let res = []
    // console.log(ttt)

    let ttt = 10000000
    for (let i = 0; i < P[0].length; i++) {
        if (bestWay[0][i] !== undefined) {
            if (i < ttt) {
                firstPoly[i] = []
                firstPoly[i][0] = []
                firstPoly[i][1] = []

                firstPoly[i][0][0] = bestWay[0][i]
                firstPoly[i][0][1] = bestWay[1][i]
                firstPoly[i][1][0] = bestWay[2][i]
                firstPoly[i][1][1] = bestWay[3][i]
            } else {
                secondPoly[i - ttt] = []
                secondPoly[i - ttt][0] = []
                secondPoly[i - ttt][1] = []

                secondPoly[i - ttt][0][0] = bestWay[0][i]
                secondPoly[i - ttt][0][1] = bestWay[1][i]
                secondPoly[i - ttt][1][0] = bestWay[2][i]
                secondPoly[i - ttt][1][1] = bestWay[3][i]
            }
        }
    }


    return firstPoly
}


function timeCounter(capacity = 29, mass = 26.4, fluidCapacity = 30, consumption = 0.042, maxPull = 24.7, maxCurrent = 54.7) {
    let t = 0.5
    let k = 0

    let fullDroneMass = mass + fluidCapacity

    while ((capacity > 5.8) && (fullDroneMass >= mass)) {
        // print("t = ", t)

        capacity = capacity - maxCurrent / 7200
        // print("capacity(емкость) = ", capacity)

        fullDroneMass = fullDroneMass - consumption * 0.5
        // print("fullDroneMass(масса) = ", fullDroneMass)

        maxPull = fullDroneMass / 2.28
        // print("maxPull(тяга) = ", maxPull)

        maxCurrent = maxPull ** (1.23 - k)
        // print("maxCurrent(ток) = ", maxCurrent)

        t += 0.5
        k += 0.001
    }

    return t / 1000
}

function newGetLines(array) {
    var ttt
    let T = [[], []]

    var score = 100000000
    var bestWay = []
    array.pop()
    let V = [[], []]
    for (let i = 0; i < array.length; i++) {
        V[0].push(array[i][0])
        V[1].push(array[i][1])
    }


    let B, l, L, n;
    let x = [];
    let y = [];
    for (i = 0; i < V[0].length; i++) {
//L=53//*Math.PI/180;//долгота
//B=53*Math.PI/180;//широта
        B = V[0][i] * Math.PI / 180;
        L = V[1][i]//*Math.PI/180;
        n = Math.trunc((6 + L) / 6);
        l = (L - (3 + 6 * (n - 1))) * Math.PI / 180;

        x[i] = 6367558.4968 * B - Math.sin(2 * B) * (16002.8900 + 66.9607 * Math.pow(Math.sin(B), 2) + 0.3515 * Math.pow(Math.sin(B), 4) - Math.pow(l, 2) * (1594561.25 + 5336.535 * Math.pow(Math.sin(B), 2) + 26.79 * Math.pow(Math.sin(B), 4) + 0.149 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (672483.4 - 811219.9 * Math.pow(Math.sin(B), 2) + 5420.0 * Math.pow(Math.sin(B), 4) - 10.6 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (278194 - 830174 * Math.pow(Math.sin(B), 2) + 572434 * Math.pow(Math.sin(B), 4) - 16010 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (109500 - 574700 * Math.pow(Math.sin(B), 2) + 863700 * Math.pow(Math.sin(B), 4) - 398600 * Math.pow(Math.sin(B), 6))))));


        y[i] = (5 + 10 * n) * Math.pow(10, 5) + l * Math.cos(B) * (6378245 + 21346.1415 * Math.pow(Math.sin(B), 2) + 107.1590 * Math.pow(Math.sin(B), 4) + 0.5977 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (1070204.16 - 2136826.66 * Math.pow(Math.sin(B), 2) + 17, 98 * Math.pow(Math.sin(B), 4) - 11.99 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (270806 - 1523417 * Math.pow(Math.sin(B), 2) + 1327645 * Math.pow(Math.sin(B), 4) - 21701 * Math.pow(Math.sin(B), 6) + Math.pow(l, 2) * (79690 - 866190 * Math.pow(Math.sin(B), 2) + 1730360 * Math.pow(Math.sin(B), 4) - 945460 * Math.pow(Math.sin(B), 6)))))

        T[0][i] = x[i]
        T[1][i] = y[i]

    }

//console.log(x,y);
//let T =[[1,3,7,9],[1,6,7,1]];
//T =  [[55.76217542820761, 55.76284083836579, 55.76119543975626, 55.75964676560552], [37.570644103470876, 37.57630892891034, 37.58315392631635, 37.57371255058391]]
    let b, K, h, d, ch, r


    var goodK
    for (let k = 0; k < 360; k += 10) {

        K = Math.tan((Math.PI * k) / 180)
        if ((K > 1000000000) || (K < -1000000000)) K = Infinity


        d = document.getElementById('rangeinput1').value
        t = 0;
        ch = 0;
        r = 0;


//центр тяжести
        var xct, yct, bct, bctK, Xst, Yst, DL, DLM
        xct = 0
        yct = 0
        for (let i = 0; i < T[0].length; i++) {
            xct = xct + T[0][i]
            yct = yct + T[1][i]
        }
        xct = xct / T[0].length
        yct = yct / T[1].length
        bct = yct - K * xct
        bctK = Infinity
        DL = Infinity
//центр тяжести


//Добавления и исправления 1
        h = Math.abs(d / Math.cos(Math.atan(K)));
        h2 = Math.abs(d / Math.sin(Math.atan(K)));
        let R2 = [[], [], [], []];

        let bt, bmin, bmax, bxmin, bxmax, bx
        if ((K !== Infinity) && (K !== -Infinity)) {
            bmin = Infinity;
            for (i = 0; i < T[0].length; i++) {
                bt = T[1][i] - K * T[0][i]
                if (bt < bmin) {
                    bmin = bt
                }
            }
            bmax = -Infinity;
            for (i = 0; i < T[0].length; i++) {
                bt = T[1][i] - K * T[0][i]
                if (bt > bmax) {
                    bmax = bt
                }
            }
        } else {
            bxmin = Infinity;
            for (i = 0; i < T[0].length; i++) {
                bx = T[0][i]
                if (bx < bxmin) {
                    bxmin = bx
                }
            }
            bxmax = -Infinity;
            for (i = 0; i < T[0].length; i++) {
                bx = T[0][i]
                if (bx > bxmax) {
                    bxmax = bx
                }
            }
        }
//Добавления и исправления 1
        if ((K !== Infinity) && (K !== -Infinity)) {
            for (let b = bmin; b < bmax;) {
                if (bct < b) if (b < bctK) bctK = b;
                ch = 0
                for (let i = 0; i < T[length]['length']; i++) {
                    j = i + 1
                    //console.log(i,j)
                    if (i == T[length]['length'] - 1) {
                        j = 0;
                    }
                    A = T[1][j] - T[1][i];
                    B = T[0][j] - T[0][i];
                    C = T[1][i] - ((A / B) * T[0][i]);
                    if (A / B === K) continue;
                    if (B === 0) {
                        if (T[1][i] >= T[1][j]) {
                            if ((T[1][i] >= (K * T[0][i] + b)) && T[1][j] <= (K * T[0][i] + b)) {
                                /*if (R2[ch] === undefined) {
                                                R2[ch] = []
                                                R2[ch + 1] = []
                                            }*/
                                R2[ch][t] = T[0][i]
                                R2[ch + 1][t] = K * T[0][i] + b
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        } else {
                            if ((T[1][i] <= (K * T[0][i] + b)) && (T[1][j] >= (K * T[0][i] + b))) {
                                /*if (R2[ch] === undefined) {
                                                R2[ch] = []
                                                R2[ch + 1] = []
                                            }*/
                                R2[ch][t] = T[0][i]
                                R2[ch + 1][t] = K * T[0][i] + b
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        }
                    } else {
                        if (T[0][i] >= T[0][j]) {
                            if ((T[0][i] >= ((C - b) / (K - A / B))) && (T[0][j] <= ((C - b) / (K - A / B)))) {
                                /*if (R2[ch] === undefined) {
                                                R2[ch] = []
                                                R2[ch + 1] = []
                                            }*/
                                R2[ch][t] = (C - b) / (K - A / B)
                                R2[ch + 1][t] = K * R2[ch][t] + b
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        } else {
                            if ((T[0][i] <= ((C - b) / (K - A / B))) && (T[0][j] >= ((C - b) / (K - A / B)))) {
                                //console.log(t)
                                /*if (R2[ch] === undefined) {
                                                R2[ch] = []
                                                R2[ch + 1] = []
                                            }*/
                                R2[ch][t] = (C - b) / (K - A / B)
                                R2[ch + 1][t] = K * R2[ch][t] + b
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        }
                    }
                }

                //Добавления 2
                if (b === bctK) {
                    for (let p = 0; p < R2.length; p += 2) {
                        if (R2[p][t] !== undefined) {
                            let x = R2[p][t] - xct
                            let y = R2[p + 1][t] - yct
                            DLM = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                            if (DLM < DL) {
                                DL = DLM
                                ttt = t
                                if (R2[p][t] < xct) {
                                    Xst = R2[p][t] - h2
                                } else {
                                    if (R2[p][t] = xct) {
                                        Xst = R2[p][t]
                                    } else {
                                        Xst = R2[p][t] + h2
                                    }
                                }
                                if (R2[p + 1][t] < yct) {
                                    Yst = R2[p + 1][t] - h
                                } else {
                                    if (R2[p + 1][t] = yct) {
                                        Yst = R2[p + 1][t]
                                    } else {
                                        Yst = R2[p + 1][t] + h
                                    }
                                }

                            }
                        } else break;
                    }
                }
                //Добавления 2
                if (r !== 0) {
                    t = t + 1
                }
                r = 0;
                b = b + h
            }
        } else {

//Добавления 1
            for (bx = bxmin; bx < bxmax;) {
                if (xct < bx) if (bx < bctK) bctK = bx;
                ch = 0
                for (let i = 0; i < T[length]['length']; i++) {
                    j = i + 1
                    if (i == T[length]['length'] - 1) {
                        j = 0;
                    }
                    A = T[1][j] - T[1][i];
                    B = T[0][j] - T[0][i];
                    C = T[1][i] - ((A / B) * T[0][i]);
                    if (B === 0) {
                        continue
                    } else {
                        if (T[0][i] >= T[0][j]) {
                            if ((T[0][i] >= bx) && (T[0][j] <= bx)) {
                                /*if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }*/
                                R2[ch][t] = bx;
                                R2[ch + 1][t] = (A / B) * R2[ch][t] + C
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        } else {
                            if ((T[0][i] <= bx) && (T[0][j] >= bx)) {
                                /*if (R2[ch] === undefined) {
                                    R2[ch] = []
                                    R2[ch + 1] = []
                                }*/
                                R2[ch][t] = bx
                                R2[ch + 1][t] = (A / B) * R2[ch][t] + C
                                ch = ch + 2;
                                r = r + 1
                            } else {
                                continue
                            }
                        }
                    }
                }

                //Добавления 2
                if (bx === bctK) {
                    for (let p = 0; p < R2.length; p += 2) {
                        if (R2[p][t] !== undefined) {
                            DLM = Math.abs(R2[p + 1][t] - yct)
                            if (DLM < DL) {
                                DL = DLM
                                ttt = t
                                if (R2[p + 1][t] < yct) {
                                    Yst = R2[p + 1][t] - h
                                    Xst = bx
                                } else {
                                    Yst = R2[p + 1][t] + h
                                    Xst = bx
                                }

                            }
                        } else break;
                    }
                }
                //Добавления 2

                if (r !== 0) {
                    t = t + 1
                }
                r = 0;
                bx = bx + h2
            }
//Добавления 1
        }
//console.log(R2)

        var P = [[], [], [], []]
        let z0, BB0, BB, delB, q1//дельта B

        for (i = 0; i < R2[0].length; i++) {
            q1 = 0
            for (j = 0; j < 2; j++) {
                if (j === 0) {
                    q1 = 0
                } else {
                    q1 = 2
                }
                x = R2[q1][i]
                y = R2[q1 + 1][i]
                /*x=T[q1][i]
                y=T[q1+1][i]*/
                BB = x / 6367558.4968//бетта

                BB0 = BB + Math.sin(2 * BB) * (0.00252588685 - 0.00001491860 * Math.pow(Math.sin(BB), 2) + 0.00000011904 * Math.pow(Math.sin(BB), 4))

                n = Math.trunc(y * Math.pow(10, -6))

                z0 = (y - (10 * n + 5) * Math.pow(10, 5)) / (6378245 * Math.cos(BB0))

                l = z0 * (1 - 0.0033467108 * Math.pow(Math.sin(BB0), 2) - 0.0000056002 * Math.pow(Math.sin(BB0), 4) - 0.0000000187 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.16778975 + 0.16273586 * Math.pow(Math.sin(BB0), 2) - 0.00052490 * Math.pow(Math.sin(BB0), 4) - 0.00000846 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0420025 + 0.1487407 * Math.pow(Math.sin(BB0), 2) + 0.0059420 * Math.pow(Math.sin(BB0), 4) - 0.0000150 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01225 + 0.09477 * Math.pow(Math.sin(BB0), 2) + 0.03282 * Math.pow(Math.sin(BB0), 4) - 0.00034 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0038 + 0.0524 * Math.pow(Math.sin(BB0), 2) + 0.0482 * Math.pow(Math.sin(BB0), 4) + 0.0032 * Math.pow(Math.sin(BB0), 6))))));

                delB = -Math.pow(z0, 2) * Math.sin(2 * BB0) * (0.251684631 - 0.003369263 * Math.pow(Math.sin(BB0), 2) + 0.000011276 * Math.pow(Math.sin(BB0), 4) - Math.pow(z0, 2) * (0.10500614 - 0.04559916 * Math.pow(Math.sin(BB0), 2) + 0.00228901 * Math.pow(Math.sin(BB0), 4) - 0.00002987 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.042858 - 0.025318 * Math.pow(Math.sin(BB0), 2) + 0.014346 * Math.pow(Math.sin(BB0), 4) - 0.001264 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01672 - 0.00630 * Math.pow(Math.sin(BB0), 2) + 0.01188 * Math.pow(Math.sin(BB0), 4) - 0.00328 * Math.pow(Math.sin(BB0), 6)))))
                //console.log(z0,delB)
                P[q1][i] = (BB0 + delB) * 180 / Math.PI
                P[q1 + 1][i] = (6 * (n - 0.5) / 57.29577951 + l) * 180 / Math.PI
            }
        }


        if (P[0].length < score) {
            score = P[0].length
            // goodK = K
            // console.log(score)
            bestWay = P
            var goodX = Xst
            var goodY = Yst
            var goodTtt = ttt
        }
    }

    q1 = 0
    x = goodX
    y = goodY
    /*x=T[q1][i]
    y=T[q1+1][i]*/
    BB = x / 6367558.4968//бетта

    BB0 = BB + Math.sin(2 * BB) * (0.00252588685 - 0.00001491860 * Math.pow(Math.sin(BB), 2) + 0.00000011904 * Math.pow(Math.sin(BB), 4))

    n = Math.trunc(y * Math.pow(10, -6))

    z0 = (y - (10 * n + 5) * Math.pow(10, 5)) / (6378245 * Math.cos(BB0))

    l = z0 * (1 - 0.0033467108 * Math.pow(Math.sin(BB0), 2) - 0.0000056002 * Math.pow(Math.sin(BB0), 4) - 0.0000000187 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.16778975 + 0.16273586 * Math.pow(Math.sin(BB0), 2) - 0.00052490 * Math.pow(Math.sin(BB0), 4) - 0.00000846 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0420025 + 0.1487407 * Math.pow(Math.sin(BB0), 2) + 0.0059420 * Math.pow(Math.sin(BB0), 4) - 0.0000150 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01225 + 0.09477 * Math.pow(Math.sin(BB0), 2) + 0.03282 * Math.pow(Math.sin(BB0), 4) - 0.00034 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.0038 + 0.0524 * Math.pow(Math.sin(BB0), 2) + 0.0482 * Math.pow(Math.sin(BB0), 4) + 0.0032 * Math.pow(Math.sin(BB0), 6))))));
    var Xstart, Ystart
    delB = -Math.pow(z0, 2) * Math.sin(2 * BB0) * (0.251684631 - 0.003369263 * Math.pow(Math.sin(BB0), 2) + 0.000011276 * Math.pow(Math.sin(BB0), 4) - Math.pow(z0, 2) * (0.10500614 - 0.04559916 * Math.pow(Math.sin(BB0), 2) + 0.00228901 * Math.pow(Math.sin(BB0), 4) - 0.00002987 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.042858 - 0.025318 * Math.pow(Math.sin(BB0), 2) + 0.014346 * Math.pow(Math.sin(BB0), 4) - 0.001264 * Math.pow(Math.sin(BB0), 6) - Math.pow(z0, 2) * (0.01672 - 0.00630 * Math.pow(Math.sin(BB0), 2) + 0.01188 * Math.pow(Math.sin(BB0), 4) - 0.00328 * Math.pow(Math.sin(BB0), 6)))))
    //console.log(z0,delB)
    Xstart = (BB0 + delB) * 180 / Math.PI
    Ystart = (6 * (n - 0.5) / 57.29577951 + l) * 180 / Math.PI


    // console.log(ttt)
    // console.log(P[0])
    // ttt = Math.floor(ttt)
    // ttt = ttt - 20
    let firstPoly = []
    let secondPoly = []
    // let res = []
    // console.log(ttt)
    for (let i = 0; i < P[0].length; i++) {
        if (bestWay[0][i] !== undefined) {
            if (i + 1 <= goodTtt) {
                firstPoly[i] = []
                firstPoly[i][0] = []
                firstPoly[i][1] = []

                firstPoly[i][0][0] = bestWay[0][i]
                firstPoly[i][0][1] = bestWay[1][i]
                firstPoly[i][1][0] = bestWay[2][i]
                firstPoly[i][1][1] = bestWay[3][i]
            } else {
                secondPoly[i - goodTtt] = []
                secondPoly[i - goodTtt][0] = []
                secondPoly[i - goodTtt][1] = []

                secondPoly[i - goodTtt][0][0] = bestWay[0][i]
                secondPoly[i - goodTtt][0][1] = bestWay[1][i]
                secondPoly[i - goodTtt][1][0] = bestWay[2][i]
                secondPoly[i - goodTtt][1][1] = bestWay[3][i]
            }
        }
    }


    return [firstPoly, secondPoly, [Xstart, Ystart]]

}