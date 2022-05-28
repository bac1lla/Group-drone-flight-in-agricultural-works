var GPC

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

ymaps.ready(['util.calculateArea', 'AnimatedLine']).then(function () {
    var myMap = new ymaps.Map("map", {
        center: [53.928148, 43.706111], zoom: 15, type: 'yandex#hybrid'
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

                // console.log(selected)
                // let test = coordinates
                // test.pop()
                // var convexPolygons = decomp.quickDecomp(test);
                // console.log(convexPolygons)
                //
                // for (let o = 0; o < convexPolygons.length; o++) {

                let dronesCount = +document.getElementById('rangeinput3').value


                let twoPoly = newGetLines(coordinates)
                // let linesCoord = getLines(coordinates)

                let linesCoord
                let carPoint
                if (dronesCount === 2) {
                    linesCoord = twoPoly[0]
                    var linesCoordSec = twoPoly[1]
                    carPoint = twoPoly[2]
                    drawNewLines(linesCoord)
                    drawNewLines(linesCoordSec)
                } else {
                    linesCoord = [...twoPoly[0], ...twoPoly[1]]
                    carPoint = twoPoly[2]
                }


                // let linesCount = linesCoord.length - 1

                // let carPoint = linesCoord.pop()

                // function calcScore(array) {
                //     let score = 0
                //     let distance = 0
                //
                //     for (let i = 0; i < array.length; i++) {
                //         distance += calcDistance(array[i][0], array[i][1])
                //     }
                //
                //     score = Math.floor(distance / 10) - array.length * 2 * 10
                //
                //
                //     return score
                // }

                // console.log(calcScore(linesCoord))


                // let smoothCoord = []
                // for (let i = 0; i < coordinates.length - 1; i++) {
                //     smoothCoord[i] = generateSmoothCoords([coordinates[i], coordinates[i + 1]], 0.000001)
                // }

                // console.log(smoothCoord)
                // let carPoint = [55.760837, 37.576147]

                // let otvr = [[55.754976833867877722, 37.574737381953764707], [55.755305878097899258, 37.574697140879197977], [55.75545703133107163, 37.574174929589792155], [55.754495202028416097, 37.574292564410739578], [55.754075977059621364, 37.573860232228813693], [55.755602141803707927, 37.573673595113325864], [55.755753295036880299, 37.573151383823920041], [55.754228346549300477, 37.573337871808586642], [55.75438071603897959, 37.572815511388359591], [55.755904448270052671, 37.572629172534514219], [55.755553454441726208, 37.572168377608824521], [55.754533085528658703, 37.572293150968127884], [55.754685455018337816, 37.571770790547900833], [55.755104546136502177, 37.571719547910266556]]

                $('.chk2').change(function () {
                    if (this.checked) {
                        let otvr = []
                        let otvr2 = []
                        for (let i = 0; i < linesCoord.length; i++) {
                            for (let j = 0; j < linesCoord[i].length; j++) {
                                // if (linesCoord[i][j][0] !== undefined) {
                                otvr.push(linesCoord[i][j])
                                // }
                            }
                        }
                        if (dronesCount === 2) {
                            for (let i = 0; i < linesCoordSec.length; i++) {
                                for (let j = 0; j < linesCoordSec[i].length; j++) {
                                    // if (linesCoord[i][j][0] !== undefined) {
                                    otvr2.push(linesCoordSec[i][j])
                                    // }
                                }
                            }
                        }


                        let newOtvr = []
                        let newOtvr2 = []
                        for (let i = 0; i < otvr.length; i += 2) {
                            // if
                            if (i % 4 === 2) {
                                newOtvr.push(otvr[i + 1])
                                newOtvr.push(otvr[i])
                            } else {
                                newOtvr.push(otvr[i])
                                newOtvr.push(otvr[i + 1])
                                newOtvr.push(carPoint)
                            }
                        }

                        if (dronesCount === 2) {
                            for (let i = 0; i < otvr2.length; i += 2) {
                                if (i % 4 === 2) {
                                    newOtvr2.push(otvr2[i + 1])
                                    newOtvr2.push(otvr2[i])
                                } else {
                                    newOtvr2.push(otvr2[i])
                                    newOtvr2.push(otvr2[i + 1])
                                    newOtvr2.push(carPoint)
                                }
                            }
                        }

                        // console.log("12341", timeCounter())
                        // console.log("wer", newOtvr)
                        // function timeCounter(capacity = 29, mass = 26.4, fluidCapacity = 30, consumption = 0.042, maxPull = 24.7, maxCurrent = 54.7) {
                        let select = $('.selectpicker').val()
                        let selectDrone = drones.find(e => e.id === +select) || drones[2]

                        // console.log("select", select)
                        // console.log("selectDrone", selectDrone)

                        let consumption = document.getElementById('rangeinput2').value

                        consumption = (28 * consumption) / 10000

                        let time = timeCounter(selectDrone.capacity, selectDrone.mass, selectDrone.fluidCapacity, consumption, selectDrone.maxPull, selectDrone.maxCurrent) * 1000

                        // let carPoint = [45.441211, 39.600726]
                        newOtvr.unshift(carPoint)
                        newOtvr.unshift(carPoint)
                        newOtvr.push(carPoint)

                        if (dronesCount === 2) {
                            newOtvr2.unshift(carPoint)
                            newOtvr2.push(carPoint)
                            newOtvr = newOtvr.reverse()
                            newOtvr.push(carPoint)
                        }


                        // for (let i = 0; i < newOtvr.length; i++) {
                        //
                        // }

                        let stopPoint = newOtvr[0]
                        let distance = 0
                        let maxDistance = time * selectDrone.speed






                        // console.log(coordinates)
                        // var firstAnimatedLine = new ymaps.AnimatedLine([maxDistance.point1, maxDistance.point2], {}, {
                        var firstAnimatedLine = new ymaps.AnimatedLine(newOtvr, {}, {
                            // Задаем цвет.
                            strokeColor: "#ED4543", // Задаем ширину линии.
                            strokeWidth: 3, // Задаем длительность анимации.
                            // animationTime: 2000001
                            animationTime: 20002
                        });

                        if (dronesCount === 2) {
                            var secondAnimatedLine = new ymaps.AnimatedLine(newOtvr2, {}, {
                                // Задаем цвет.
                                strokeColor: "#62ed43", // Задаем ширину линии.
                                strokeWidth: 3, // Задаем длительность анимации.
                                // animationTime: 2000000
                                animationTime: 20001
                            });
                            myMap.geoObjects.add(secondAnimatedLine);
                        }


                        // // Добавляем линии на карту.
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
                                    // myMap.geoObjects.remove(firstPoint);
                                    // Перезапускаем анимацию.
                                    // playAnimation();
                                });
                            if (dronesCount === 2) {
                                secondAnimatedLine.animate()
                                    .then(function () {
                                        // Удаляем метки с карты.
                                        // myMap.geoObjects.remove(firstPoint);
                                        // Перезапускаем анимацию.
                                        // playAnimation();
                                    });
                            }
                        }

                        // Запускаем анимацию пути.
                        playAnimation();
                    }

                })

            }

            // console.log(coordinates)


            // }


            // myMap.geoObjects.add(polygon);


        } else {
            if (polygon) {
                myMap.geoObjects.remove(polygon);
                polygon = null;
            }
        }
    });
});

