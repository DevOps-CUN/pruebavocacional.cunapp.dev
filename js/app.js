'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('inicio', 'inicio.html', true),
            new Route('TyC', './encuestas/TyC.html'),
            new Route('encuestaV1', './encuestas/encuestaV1.html'),
            new Route('encuestaV2', './encuestas/encuestaV2.html'),
            new Route('encuestaV3', './encuestas/encuestaV3.html'),
            new Route('encuestaV4', './encuestas/encuestaV4.html'),
            new Route('encuestaV5', './encuestas/encuestaV5.html'),
            new Route('encuestaV6', './encuestas/encuestaV6.html'),
            new Route('encuestaV7', './encuestas/encuestaV7.html'),
            new Route('encuestaV8', './encuestas/encuestaV8.html'),
            new Route('encuestaV9', './encuestas/encuestaV9.html'),
            new Route('encuestaV10', './encuestas/encuestaV10.html'),
            new Route('encuestaV11', './encuestas/encuestaV11.html'),
            new Route('encuestaV12', './encuestas/encuestaV12.html'),
            new Route('encuestaV13', './encuestas/encuestaV13.html'),
            new Route('encuestaV14', './encuestas/encuestaV14.html'),
            new Route('acercaDelReporte', './respuestas/acercaDelReporte.html'),
            new Route('interesVocacional', './respuestas/interesVocacional.html'),
            new Route('predominanciaDePersonalidad', './respuestas/predominanciaDePersonalidad.html'),
            new Route('intencionDeCarrera', './respuestas/intencionDeCarrera.html'),
            new Route('informacionProfesional', './respuestas/informacionProfesional.html'),
            new Route('acercaDeLosResultados', './respuestas/acercaDeLosResultados.html'),
            new Route('vistaPDF', './respuestas/vistaPDF.html')
        ]);
    }
    init();
}());
