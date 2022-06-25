'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if(url == "views/inicio.html"){
                        const dirUrl = window.location.href;
                        dirUrl.split('/?')[1] !== undefined ? definirRegion(dirUrl.split('/?')[1]) : this.region = 'bogota';
                    }
                    scope.rootElem.innerHTML = this.responseText;
                    if (url == "views/./respuestas/acercaDelReporte.html" || url == "views/./respuestas/acercaDeLosResultados.html") {

                        window.addEventListener("resize", function(){
                            if(window.innerWidth>767){
                                $("#btn-menu").prop("checked", false);
                                $(".menu").css("width", "100%");
                                $(".menu").css("right", "0px");
                                $(".menuBack").css("width", "0px");
                                $(".menuBack").css("right", "250px");
                            }
                        });
                        
                    }
                    if (url == "views/./respuestas/interesVocacional.html" || url == "views/./respuestas/predominanciaDePersonalidad.html" || url == "views/./respuestas/intencionDeCarrera.html" || url == "views/./respuestas/informacionProfesional.html") {
                        cambiar();

                        window.addEventListener("resize", function(){
                            if(window.innerWidth>767){
                                $("#btn-menu").prop("checked", false);
                                $(".menu").css("width", "100%");
                                $(".menu").css("right", "0px");
                                $(".menuBack").css("width", "0px");
                                $(".menuBack").css("right", "-250px");
                            }
                        });
                        
                    }
                    if(url == "views/./respuestas/vistaPDF.html" ){
                        cambiar();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        setTimeout(function(){ pantallazos()},1000);
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};