ymaps.ready(init);

function init () {
    let myMap = new ymaps.Map("map", {
            center: [56.317655,43.994362],
            zoom: 15
        }),
        polygon = new ymaps.GeoObject({
            geometry: {
                type: "Polygon",
                coordinates: []
            }
        });

    myMap.geoObjects.add(polygon);
    polygon.editor.startDrawing();

    $('input').attr('disabled', false);

    // Обработка нажатия на любую кнопку.
    $('input').click(
        function () {
            // Отключаем кнопки, чтобы на карту нельзя было
            // добавить более одного редактируемого объекта (чтобы в них не запутаться).
            $('input').attr('disabled', true);

            polygon.editor.stopEditing();

            printGeometry(polygon.geometry.getCoordinates());

        });


}

// Выводит массив координат геообъекта в <div id="geometry">
function printGeometry (coords) {
    $('#geometry').html('Координаты: ' + stringify(coords));

}

function stringify (coords) {
    console.log(coords)
    let res = '';
    if ($.isArray(coords)) {
        res = '[ ';
        for (let i = 0, l = coords.length; i < l; i++) {
            if (i > 0) {
                res += ', ';
            }
            res += stringify(coords[i]);
        }
        res += ' ]';
    } else if (typeof coords == 'number') {
        res = coords.toPrecision(6);
    } else if (coords.toString) {
        res = coords.toString();
    }

    return res;
}



var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');