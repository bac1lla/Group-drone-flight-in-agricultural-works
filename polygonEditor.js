var GPC
import 'poly-decomp'
ymaps.ready(['util.calculateArea', 'AnimatedLine']).then(function () {
    var myMap = new ymaps.Map("map", {
        center: [55.762, 37.57835813659775], zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });

    var polygon = null;
    var projection = myMap.options.get('projection')
    $('.chk').change(function () {
        if (this.checked) {


            var polygon = new ymaps.Polygon([], {}, {
                // Курсор в режиме добавления новых вершин.
                editorDrawingCursor: "crosshair", // Максимально допустимое количество вершин.
                editorMaxPoints: 50, // Цвет заливки.
                fillColor: 'rgba(255,173,181,0.68)', // Цвет обводки.
                strokeColor: '#e3ce95', // Ширина обводки.
                strokeWidth: 1
            });

            // Добавляем многоугольник на карту.
            myMap.geoObjects.add(polygon);

            // В режиме добавления новых вершин меняем цвет обводки многоугольника.
            var stateMonitor = new ymaps.Monitor(polygon.editor.state);
            stateMonitor.add("drawing", function (newValue) {
                polygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
                draw()
            })


            // Включаем режим редактирования с возможностью добавления новых вершин.
            polygon.editor.startDrawing();


            function stopDraw() {
                polygon.editor.stopDrawing();
            }

            function draw() {
                var coordinates = polygon.geometry.getCoordinates()[0]
                var area = Math.round(ymaps.util.calculateArea(polygon)), // Вычисляем центр для добавления метки.
                    center = ymaps.util.bounds.getCenter(polygon.geometry.getBounds());
                // Если площадь превышает 1 000 000 м², то приводим ее к км².
                if (area <= 1e6) {
                    area += ' м²';
                } else {
                    area = (area / 1e6).toFixed(3) + ' км²';
                }
                polygon.properties.set('balloonContent', area);

                myMap.geoObjects.add(new ymaps.Placemark(center, {'iconCaption': area}, {preset: 'islands#greenDotIconWithCaption'}));


                function calcDistance(point1, point2) {

                    var lineStringGeometry = new ymaps.geometry.LineString([point1, point2])
                    var line = new ymaps.GeoObject({geometry: lineStringGeometry});

                    myMap.geoObjects.add(line);

                    let distance = line.geometry.getDistance()

                    myMap.geoObjects.remove(line);

                    return distance
                }


                function drawNewLines(array) {
                    for (let i = 0; i < array.length; i++) {
                        var lineStringGeometry = new ymaps.geometry.LineString(array[i])
                        var line = new ymaps.GeoObject({geometry: lineStringGeometry});
                        myMap.geoObjects.add(line);

                    }
                }


                // console.log(coordinates)

                let linesCoord = zhenya(coordinates)
                let linesCount = linesCoord.length

                function calcScore(array) {
                    let score = 0
                    let distance = 0

                    for (let i = 0; i < array.length; i++) {
                        distance += calcDistance(array[i][0], array[i][1])
                    }

                    score = Math.floor(distance / 10) - array.length * 2 * 10


                    return score
                }

                console.log(calcScore(linesCoord))

                let test = coordinates
                test.pop()
                var convexPolygons = decomp.quickDecomp(test);
                console.log(convexPolygons)

                drawNewLines(linesCoord)


                // let smoothCoord = []
                // for (let i = 0; i < coordinates.length - 1; i++) {
                //     smoothCoord[i] = generateSmoothCoords([coordinates[i], coordinates[i + 1]], 0.000001)
                // }

                // console.log(smoothCoord)
                let carPoint = [55.760837, 37.576147]

                // let otvr = [[55.754976833867877722, 37.574737381953764707], [55.755305878097899258, 37.574697140879197977], [55.75545703133107163, 37.574174929589792155], [55.754495202028416097, 37.574292564410739578], [55.754075977059621364, 37.573860232228813693], [55.755602141803707927, 37.573673595113325864], [55.755753295036880299, 37.573151383823920041], [55.754228346549300477, 37.573337871808586642], [55.75438071603897959, 37.572815511388359591], [55.755904448270052671, 37.572629172534514219], [55.755553454441726208, 37.572168377608824521], [55.754533085528658703, 37.572293150968127884], [55.754685455018337816, 37.571770790547900833], [55.755104546136502177, 37.571719547910266556]]
                let otvr = []
                for (let i = 0; i < linesCoord.length; i++) {
                    for (let j = 0; j < linesCoord[i].length; j++) {
                        // if (linesCoord[i][j][0] !== undefined) {
                            otvr.push(linesCoord[i][j])
                        // }
                    }
                }

                let newOtvr = []
                for (let i = 0; i < otvr.length; i += 2) {
                    if (i % 4 === 2) {
                        newOtvr.push(otvr[i + 1])
                        newOtvr.push(otvr[i])
                    } else {
                        newOtvr.push(otvr[i])
                        newOtvr.push(otvr[i + 1])
                    }
                }

                console.log("wer", newOtvr)
                newOtvr.unshift(carPoint)
                newOtvr.push(carPoint)
                // console.log(coordinates)
                // var firstAnimatedLine = new ymaps.AnimatedLine([maxDistance.point1, maxDistance.point2], {}, {
                var firstAnimatedLine = new ymaps.AnimatedLine(newOtvr, {}, {
                    // Задаем цвет.
                    strokeColor: "#ED4543", // Задаем ширину линии.
                    strokeWidth: 5, // Задаем длительность анимации.
                    animationTime: 10000
                });

                // console.log(maxDistance.distance)
                // console.log([maxDistance.point1[0] + 0.000000090033, maxDistance.point1[1] + 0.000000090033])


                // Добавляем линии на карту.
                myMap.geoObjects.add(firstAnimatedLine);
                // Создаем метки.
                // var firstPoint = new ymaps.Placemark(maxDistance.point1, {}, {
                var firstPoint = new ymaps.Placemark(carPoint, {}, {
                    preset: 'islands#redRapidTransitCircleIcon'
                });

                // Функция анимации пути.
                function playAnimation() {
                    // Добавляем первую метку на карту.
                    myMap.geoObjects.add(firstPoint);
                    // Анимируем первую линию.
                    firstAnimatedLine.animate()
                        // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
                        // После паузы перезапускаем анимацию.
                        .then(function () {
                            // Удаляем метки с карты.
                            myMap.geoObjects.remove(firstPoint);
                            // Перезапускаем анимацию.
                            // playAnimation();
                        });
                }

                // Запускаем анимацию пути.
                playAnimation();
            }


            // myMap.geoObjects.add(polygon);


        } else {
            if (polygon) {
                myMap.geoObjects.remove(polygon);
                polygon = null;
            }
        }
    });
});


function zhenya(array) {


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


        function updateTextInput() {
            return document.getElementById('rangeinput1').value

        }

        d = updateTextInput();
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
            for (j = 0; j < 2; j++) {
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
    console.log("goodK", goodK)
    console.log(bestWay)

    let res = []
    for (let i = 0; i < P[0].length; i++) {
        if (bestWay[0][i] !== undefined) {
            res[i] = []
            res[i][0] = []
            res[i][1] = []

            res[i][0][0] = bestWay[0][i]
            res[i][0][1] = bestWay[1][i]
            res[i][1][0] = bestWay[2][i]
            res[i][1][1] = bestWay[3][i]
        }
    }

    return res
}


// function lineCoord(point1, point2) {
//
//     let arr = []
//
//     arr[0] = []
//     arr[0][0] = (point1[1] - point2[1]) / (point1[0] - point2[0])
//     arr[0][1] = point2[1] - arr[0][0] * point2[0]
//
//
//     return arr
//
// }

//
// function generateSmoothCoords(coords, interval) {
//     var smoothCoords = [];
//     smoothCoords.push(coords[0]);
//     for (var i = 1; i < coords.length; i++) {
//         var difference = [coords[i][0] - coords[i - 1][0], coords[i][1] - coords[i - 1][1]];
//         var maxAmount = Math.max(Math.abs(difference[0] / interval), Math.abs(difference[1] / interval));
//         var minDifference = [difference[0] / maxAmount, difference[1] / maxAmount];
//         var lastCoord = coords[i - 1];
//         while (maxAmount > 1) {
//             lastCoord = [lastCoord[0] + minDifference[0], lastCoord[1] + minDifference[1]];
//             smoothCoords.push(lastCoord);
//             maxAmount--;
//         }
//         smoothCoords.push(coords[i])
//     }
//     return smoothCoords;
// }


// const SPLIT_NUM = 10000;//Количество точек разбиения граней
// const EPSILON = 0.0001;//Точность сравнения чисел с плавающей запятой
// const GONE = 0.1;//Диаметр зоны опрыскивания
//
//
// //Печать массива точек
// function PrintField(field) {
//     for (let i = 0; i < field.length; i++) {
//         console.log(field[i][0], field[i][1])
//     }
//     console.log(' ')
// }
//
// // Расстояние между двумя точками
// function Distance(a, b) {
//     return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
// }
//
// // Поиск самой длинной диагонали
// function LongestDiagonal(field) {
//     let m1
//     let m2
//     let max_dist = 0;
//     for (let i = 0; i < field.length; i++) {
//         for (let j = 0; j < field.length; j++) {
//             if (Distance(field[i], field[j]) > max_dist) {
//                 max_dist = Distance(field[i], field[j]);
//                 m1 = field[i];
//                 m2 = field[j];
//             }
//         }
//     }
//     return [m1, m2];
// }
//
// // Угол между прямыми ab и cd
// function Angle(a, b, c, d) {
//     b[0] -= a[0];
//     b[1] -= a[1];
//     d[0] -= c[0];
//     d[1] -= c[1];
//
//     return Math.acos((b[0] * d[0] + b[1] * d[1]) / (Math.sqrt(b[0] * b[0] + b[1] * b[1]) * Math.sqrt(d[0] * d[0] + d[1] * d[1])));
// }
//
// // Сдвинуть точку на вектор shift
// function ShiftPoint(p, shift) {
//     let p1 = [];
//     p1[0] = p[0] - shift[0];
//     p1[1] = p[1] - shift[1];
//     return p1;
// }
//
// // Поворот точки на угол
// function RotatePoint(p, angle) {
//     let p1 = [];
//     // console.log(p)
//     p1[0] = p[0] * Math.cos(angle) - p[1] * Math.sin(angle);
//     p1[1] = p[0] * Math.sin(angle) + p[1] * Math.cos(angle);
//     return p1;
// }
//
// // Сдвиг и поворот точки
// function ShiftRotatePoint(p, shift, angle) {
//     // console.log(p)
//     let p1 = ShiftPoint(p, shift);
//     p1 = RotatePoint(p1, angle);
//     return p1;
// }
//
// // Поворот и сдвиг точки
// function RotateShiftPoint(p, shift, angle) {
//     // console.log(p)
//     let p1 = RotatePoint(p, angle);
//     p1 = ShiftPoint(p1, shift);
//     return p1;
// }
//
// // Сдвиг и поворот поля
// function ShiftRotate(field, shift, angle) {
//     let res = field
//     for (let i = 0; i < res.length; i++) {
//         res[i] = ShiftRotatePoint(res[i], shift, angle);
//     }
//     return res;
// }
//
// // Поворот и сдвиг поля
// function RotateShift(field, shift, angle) {
//     let res = field
//     for (let i = 0; i < res.length; i++) {
//         // console.log(res[i])
//         res[i] = RotateShiftPoint(res[i], shift, angle);
//     }
//     return res;
// }
//
// // Добавления точек по границам поля
// function SplitField(field) {
//     let s_field = [];
//     s_field.push(field[0]);
//     for (let i = 1; i < field.length; i++) {
//         let dif = [field[i][0] - field[i - 1][0], field[i][1] - field[i - 1][1]];
//         for (let j = 1; j < SPLIT_NUM; ++j) {
//             let p = [field[i - 1][0] + j * dif[0] / SPLIT_NUM, field[i - 1][1] + j * dif[1] / SPLIT_NUM];
//             s_field.push(p);
//         }
//         s_field.push(field[i]);
//     }
//
//     //Для отрезка между первой и последней точками
//     let dif = [field[0][0] - field[field.length - 1][0], field[0][1] - field[field.length - 1][1]];
//     for (let j = 1; j < SPLIT_NUM; ++j) {
//         let p = [field[field.length - 1][0] + j * dif[0] / SPLIT_NUM, field[field.length - 1][1] + j * dif[1] / SPLIT_NUM];
//         s_field.push(p);
//     }
//
//     return s_field;
// }
//
// // Сравнение чисел с плавающей запятой
// function IsEqual(a, b) {
//     return (b - EPSILON < a) && (a < b + EPSILON);
// }
//
// // Поиск самой левой точки
// function FindLeftIdx(field) {
//     let minIdx = 0;
//     let min = field[0][0];
//     for (let i = 1; i < field.length; ++i) {
//         if (field[i][0] < min) {
//             min = field[i][0];
//             minIdx = i;
//         }
//     }
//     return minIdx;
// }
//
// // Поиск самой правой точки
// function FindRightIdx(field) {
//     let maxIdx = 0;
//     let max = field[0][0];
//     for (let i = 1; i < field.length; ++i) {
//         if (field[i][0] > max) {
//             max = field[i][0];
//             maxIdx = i;
//         }
//     }
//     return maxIdx;
// }
//
// // Нарезка поля отрезками
// function SliceField(field) {
//     let slices = [];
//     let leftIdx = FindLeftIdx(field);
//     let rightIdx = FindRightIdx(field);
//     // console.log(field[leftIdx][0] + GONE / 2, field[rightIdx][0], GONE)
//     for (let x = field[leftIdx][0] + GONE / 2; x < field[rightIdx][0]; x += GONE) {
//         //console.log(x)
//         let slice = [];
//         for (let i = 0; i < field.length; i++) {
//             if (IsEqual(field[i][0], x)) {
//                 slice.push(field[i]);
//             }
//         }
//
//         slice = [slice[0], slice[slice.length - 1]];
//         //console.log(slice)
//         // console.log(slice[0][0])
//         slices.push(slice);
//     }
//
//     return slices;
// }
//
// // Основная функция
// function GetRoute(field) {
//     PrintField(field)
//
//     let dia = LongestDiagonal(field);// нашли диагональ
//     // PrintField(dia);
//
//     let shift = dia[0];
//     let angle = Angle(dia[0], dia[1], [0, 0], [1, 0]);
//     // console.log(shift[0],shift[1],angle)
//     // console.log(' ')
//
//     let rot_field = ShiftRotate(field, shift, angle);// сменили систему координат (вдоль диагонали)
//     PrintField(rot_field);
//
//     let split_field = SplitField(rot_field);
//     PrintField(split_field);
//
//     let slices = SliceField(split_field);// нарезали
//
// //     for (let i = 0; i < slices.length; ++i)
// // {
// //     PrintField(slices[i]);
// // }
//
//     for (let i = 0; i < slices.length; i++) {
//
//         slices[i] = RotateShift(slices[i], [-shift[0], -shift[1]], -angle)// вернули отрезки в изначальную систему координат
//     }
//     return slices;
// }
//
// function govnoed(coordinates) {
//     // let field = [[1, 1], [3, 6], [7, 7], [9, 1]];
//     let qwe = coordinates
//     qwe = [[6.2671, 6.85519], [6.33610, 7.061], [6.24657, 7.232853], [6.07840, 7.12771]];
//     // qwe.pop()
//     let slices = GetRoute(qwe);
//     // let slices = GetRoute(coordinates);
//     for (let i = 0; i < slices.length; i++) {
//         PrintField(slices[i]);
//     }
// }