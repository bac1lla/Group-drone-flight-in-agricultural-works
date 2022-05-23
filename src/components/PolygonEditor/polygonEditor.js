var GPC
ymaps.ready(['util.calculateArea', 'AnimatedLine']).then( function(){
    var myMap = new ymaps.Map("map", {
        center: [55.762, 37.57835813659775],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });

    var polygon = null;
    var projection = myMap.options.get('projection')
    $('.chk').change(function(){
        if(this.checked){



                // Перевод координат из пиксельных в географические
                // coordinates = coordinates.map(function(x){
                //     return projection.fromGlobalPixels([x[0] + GPC[0], x[1] + GPC[1]], myMap.getZoom());
                // });
                // // Cимплифицирование линии - оставляем только каждую третью координату
                // // coordinates = coordinates.filter(function (_, index){
                // //     return index % 3 === 0;
                // // });
                // // Создаем новый полигон
                // polygon = new ymaps.Polygon([coordinates], {}, {
                //     strokeColor: '#0000ff',
                //     fillColor: '#8080ff',
                //     interactivityModel: 'default#transparent',
                //     strokeWidth: 2,
                //     opacity: 0.7
                // });

                var polygon = new ymaps.Polygon([], {}, {
                    // Курсор в режиме добавления новых вершин.
                    editorDrawingCursor: "crosshair",
                    // Максимально допустимое количество вершин.
                    editorMaxPoints: 50,
                    // Цвет заливки.
                    fillColor: 'rgba(255,173,181,0.68)',
                    // Цвет обводки.
                    strokeColor: '#e3ce95',
                    // Ширина обводки.
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

                // function getCoord() {
                //     return polygon.geometry.getCoordinates()
                // }
                // Включаем режим редактирования с возможностью добавления новых вершин.
                polygon.editor.startDrawing();




                function stopDraw() {
                    polygon.editor.stopDrawing();
                }
                function draw() {
                    var coordinates = polygon.geometry.getCoordinates()[0]



                    var area = Math.round(ymaps.util.calculateArea(polygon)),
                        // Вычисляем центр для добавления метки.
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
                        return Math.sqrt(
                            Math.pow((point2[0] - point1[0]), 2) + Math.pow((point2[1] - point1[1]), 2)
                        );
                    }

                    let maxDistance = {
                        distance: 0,
                        point1: 0,
                        point2: 0,
                    }
                    let distance = 0
                    let arrDistance = []
                    for (let i = 0; i < coordinates.length - 1; i++) {
                        for (let j = 0; j < coordinates.length - 1; j++) {
                            console.log(1)
                            distance = calcDistance(coordinates[i], coordinates[j])
                            if (distance > 0)
                                arrDistance.push(distance)

                            if (distance > maxDistance.distance) {
                                maxDistance = {
                                    distance: distance,
                                    point1: coordinates[i],
                                    point2: coordinates[j]
                                }
                            }
                        }
                    }
                    console.log(arrDistance)
                    console.log("max", maxDistance)


                    let arrLineCoord = drawLines(lineCoord(maxDistance.point1, maxDistance.point2, coordinates), coordinates)

                    console.log(arrLineCoord)

                    // console.log(coordinates)
                    var firstAnimatedLine = new ymaps.AnimatedLine([maxDistance.point1, maxDistance.point2], {}, {
                        // Задаем цвет.
                        strokeColor: "#ED4543",
                        // Задаем ширину линии.
                        strokeWidth: 5,
                        // Задаем длительность анимации.
                        animationTime: 4000
                    });



                    // Добавляем линии на карту.
                    myMap.geoObjects.add(firstAnimatedLine);
                    // Создаем метки.
                    var firstPoint = new ymaps.Placemark(arrLineCoord[0], {}, {
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
                            .then(function() {
                                // Удаляем метки с карты.
                                myMap.geoObjects.remove(firstPoint);
                                // Перезапускаем анимацию.
                                playAnimation();
                            });
                    }
                    // Запускаем анимацию пути.
                    playAnimation();
                }






                // myMap.geoObjects.add(polygon);


        } else {
            if(polygon){
                myMap.geoObjects.remove(polygon);
                polygon = null;
            }
        }
    });
});


/* Рисование области на карте */
// function drawLineOverMap(map){
//     var canvas = document.querySelector('.draw-canvas');
//     $('.draw-canvas').removeClass('hide');
//     var ctx2d = canvas.getContext('2d');
//     var drawing = false;
//     var coordinates = [];
//     // Задаем размеры канвасу как у карты
//     var rect = map.container.getSize();
//     canvas.style.width = rect[0] + 'px';
//     canvas.style.height = rect[1] + 'px';
//     canvas.width = rect[0];
//     canvas.height = rect[1];
//     // Применяем стили
//     ctx2d.strokeStyle = '#0000ff';
//     ctx2d.lineWidth = 3;
//     canvas.style.opacity = 0.7;
//     ctx2d.clearRect(0, 0, canvas.width, canvas.height);
//     // Показываем канвас - он будет сверху карты из-за position: absolute
//     canvas.style.display = 'block';
//     canvas.onmousedown = function(e){
//         // При нажатии мыши запоминаем координаты и что мы начали рисовать
//         coordinates.push([e.offsetX, e.offsetY]);
//         //console.log([e.offsetX, e.offsetY])
//         drawing = true;
//     };
//     canvas.onmousemove = function(e){
//         // При движении мыши запоминаем координаты и рисуем линию
//         if(drawing){
//             var last = coordinates[coordinates.length - 1];
//             ctx2d.beginPath();
//             ctx2d.moveTo(last[0], last[1]);
//             ctx2d.lineTo(e.offsetX, e.offsetY);
//             ctx2d.stroke();
//             coordinates.push([e.offsetX, e.offsetY]);
//         }
//     };
//     return new Promise(function(resolve){
//         // При отпускании мыши запоминаем координаты и скрываем канвас
//         canvas.onmouseup = function(e){
//             coordinates.push([e.offsetX, e.offsetY]);
//
//
//             canvas.style.display = 'none';
//             drawing = false;
//             GPC = map.getGlobalPixelBounds()[0];
//             // console.log(coordinates)
//             resolve(coordinates);
//             $("#drawButton").attr('disabled', true)
//             $('.draw-canvas').addClass('hide');
//             // document.querySelector('#map').style.display = 'none';
//         };
//
//
//     });
//
// }


function lineCoord(point1, point2, coordinates) {

    let arrLinesK = []
    let arrLinesB = []

    let x = 0
    let y = 0



    let arr = []

        arr[0] = []
        arr[0][0] = (point1[1] - point2[1]) / (point1[0] - point2[0])
        arr[0][1] = point2[1] - arr[0][0] * point2[0]



    return arr

}
//
function drawLines(arr, coordinates) {

    let slope = arr[0][0]
    console.log(slope)

    let arrMass = []
    for (let i = 0 ; i < coordinates.length; i++) {
        arrMass[i] = []
        arrMass[i][0] = (-1 * +coordinates[i][1] - +coordinates[i][0] * +slope) / +slope
        arrMass[i][1] = (-1 * slope *  +coordinates[i][0]) / +slope
    }

    return arrMass


}