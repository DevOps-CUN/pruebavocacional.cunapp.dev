const datosPrueba = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ''];

let datosPersonales = ['hora', 'correo', 'nombre', 'apellido', 'cc', 'genero', 'color', 'edad', 'numero', 'estudio1', 'estudio2', 'estudio3', 'ocupacion', 'carrera', 'cargo', 'estrato'];

let objRespuestas = {}, objResultados = {}; let carrerasRec = []; var region = '';

const objCarrerasSeccion = {
    DINAMICO: ["<a href='https://cun.edu.co/programa-negocios-internacionales' target='_blank'>Negocios Internacionales, </a>","<a href='https://cun.edu.co/programa-contaduria-publica' target='_blank'>Contaduria Pública.</a>","<a href='https://cun.edu.co/programa-derecho' target='_blank'>Derecho, </a>", '<a target="_blank" href="https://cun.edu.co/programa-administracion-publica">Administración pública.</a>'],

    ADAPTABLE: ["<a href='https://cun.edu.co/programa-ingenieria-industrial' target='_blank'> Ingeniería industrial, </a>","<a href='https://cun.edu.co/programa-administracion-de-empresas' target='_blank'>Administración de empresas, </a>","<a href='https://cun.edu.co/programa-administracion-servicios-salud' target='_blank'>Administracion de servicios de salud, </a>","<a href='https://cun.edu.co/programa-administracion-de-empresas-agroindustrial' target='_blank'>Administración de empresas agroindustrial, </a>",'<a target="_blank" href="https://cun.edu.co/programa-administracion-publica">Administración pública, </a>','<a target="_blank" href="https://cun.edu.co/programa-administracion-turistica-hotelera">Administración turistica y hotelera, </a>','<a target="_blank" href="https://cun.edu.co/programa-administracion-deportiva">Administración deportiva.</a>'],

    PRACTICO: ["<a href='https://cun.edu.co/programa-ingenieria-electronica' target='_blank'>Ingeniería electrónica</a>"],

    METODICO: ["<a href='https://cun.edu.co/programa-ingenieria-de-sistemas' target='_blank'>Ingeniería de sistemas</a>"],

    IMAGINATIVO: ["<a href='https://cun.edu.co/programa-diseno-grafico' target='_blank'>Diseño gráfico, </a>","<a href='https://cun.edu.co/programa-direccion-y-produccion-de-medios-audiovisuales' target='_blank'>Dirección y producción de medios audiovisuales, </a>","<a href='https://cun.edu.co/programa-diseno-de-modas' target='_blank'>Diseño de modas.</a>"],

    ATENTO: ["<a href='https://cun.edu.co/programa-comunicacion-social' target='_blank'>Comunicación social, </a>","<a href='https://cun.edu.co/programa-publicidad-y-mercadeo' target='_blank'>Publicidad y mercadeo.</a>"]
}

const datosNegativos = [127, 129, 132, 136, 137];

let respuestas = datosPrueba;

function carreraXSeccion(personalidad){
    let cadenaCarreras = '';
    objCarrerasSeccion[personalidad].forEach((element, index) => {
        cadenaCarreras += element;
    });
    return cadenaCarreras;
}

function getRepo(event){
    event.preventDefault();
    var db = firebase.firestore();
    var ccRepo = document.querySelector('input[name="ccRepo"]').value;

    db.collection("pv2020").doc(String(ccRepo)).get()
        .then(function (doc) {
            if (doc.exists) {
                var dataDoc = doc.data();
                respuestas = dataDoc.respuestas;

                datosPersonales[0] = dataDoc.hora;
                datosPersonales[1] = dataDoc.correo;
                datosPersonales[2] = dataDoc.nombre;
                datosPersonales[3] = dataDoc.apellido
                datosPersonales[4] = dataDoc.cc;
                datosPersonales[5] = dataDoc.genero; 
                datosPersonales[6] = dataDoc.color; 
                datosPersonales[7] = dataDoc.edad;
                datosPersonales[8] = dataDoc.numero;
                datosPersonales[9] = dataDoc.estudio1;
                datosPersonales[10] = dataDoc.estudio2;
                datosPersonales[11] = dataDoc.estudio3;
                datosPersonales[12] = dataDoc.ocupacion;
                datosPersonales[13] = dataDoc.carrera;
                datosPersonales[14] = dataDoc.cargo;
                datosPersonales[15] = dataDoc.estrato;

                objRespuestas = {
                    'hora': datosPersonales[0],
                    'correo': datosPersonales[1],
                    'nombre': datosPersonales[2],
                    'apellido': datosPersonales[3],
                    'cc': datosPersonales[4],
                    'genero': datosPersonales[5],
                    'color': datosPersonales[6],
                    'edad': datosPersonales[7],
                    'numero': datosPersonales[8],
                    'estudio1': datosPersonales[9],
                    'estudio2': datosPersonales[10],
                    'estudio3': datosPersonales[11],
                    'ocupacion': datosPersonales[12],
                    'carrera': datosPersonales[13],
                    'cargo': datosPersonales[14],
                    'estrato': datosPersonales[15],
                    'respuestas': respuestas,
                    'region' : region
                }

                calcular();
                setTimeout(function () { location.href = '#intencionDeCarrera' }, 0);
            }
        }).catch(function (error) {
            alert("Lo sentimos, no se ha encontrado una prueba realizada con el número de documento ingresado, por favor verifique que la información esta correcta.");
        });
}

function calcular() {
    for (x in datosNegativos) {
        respuestas[datosNegativos[x]] = 6 - respuestas[datosNegativos[x]]; //Valores negativos de la prueba
    }

    // Prueba de intereses
    // Dimensiones
    // Crear variables con las 6 dimensiones de la prueba 
    const int_ipv = respuestas.slice(0, 60);

    const int_din = int_ipv.slice(0, 10)
    const int_ada = int_ipv.slice(10, 20)
    const int_pra = int_ipv.slice(20, 30)
    const int_met = int_ipv.slice(30, 40)
    const int_ima = int_ipv.slice(40, 50)
    const int_ate = int_ipv.slice(50, 60)

    // Prueba de auto-contepto
    // Dimensiones
    // Crear variables con las 3 dimensiones de la prueba
    const self_ipv = respuestas.slice(60, 84)
    const din_met = self_ipv.slice(0, 8)
    const ada_ima = self_ipv.slice(8, 16)
    const pra_ate = self_ipv.slice(16, 24)

    // Prueba de intenciones
    // ### dimensiones
    // Crear variables con las 6 dimensiones de la prueba
    const cint_ipv = respuestas.slice(84, 126)

    const cint_din = cint_ipv.slice(0, 7);
    const cint_ada = cint_ipv.slice(7, 14);
    const cint_pra = cint_ipv.slice(14, 21);
    const cint_met = cint_ipv.slice(21, 28);
    const cint_ima = cint_ipv.slice(28, 35);
    const cint_ate = cint_ipv.slice(35, 42);

    // Prueba de información profesional
    // Calcular puntuaciones de cada dimensión
    // Prueba de intereses

    function sumatoria(total, num) {
        return total + num;
    }

    const din_s = int_din.reduce(sumatoria);
    const ada_s = int_ada.reduce(sumatoria);
    const pra_s = int_pra.reduce(sumatoria);
    const met_s = int_met.reduce(sumatoria);
    const ima_s = int_ima.reduce(sumatoria);
    const ate_s = int_ate.reduce(sumatoria);

    // Prueba autoconcepto
    const din_met_s = din_met.reduce(sumatoria);
    const ada_ima_s = ada_ima.reduce(sumatoria);
    const pra_ate_s = pra_ate.reduce(sumatoria);

    // ## prueba intenciones
    const ci_din_s = cint_din.reduce(sumatoria);
    const ci_ada_s = cint_ada.reduce(sumatoria);
    const ci_pra_s = cint_pra.reduce(sumatoria);
    const ci_met_s = cint_met.reduce(sumatoria);
    const ci_ima_s = cint_ima.reduce(sumatoria);
    const ci_ate_s = cint_ate.reduce(sumatoria);

    // ## información profesional
    const pinfo_ipv = respuestas.slice(126, 142)
    const info_s = pinfo_ipv.reduce(sumatoria);

    // Seleccionar las puntuaciones del examinado con el número de id en cada una de las dimensiones
    // ## puntuaciones de examinado prueba intereses
    let pindin = din_s;
    let pinada = ada_s;
    let pinpra = pra_s;
    let pinmet = met_s;
    let pinima = ima_s;
    let pinate = ate_s;

    // ## puntuaciones de examinado prueba auto-concepto
    let psedinmet = din_met_s;
    let pseadaima = ada_ima_s;
    let psepraate = pra_ate_s;

    // ## puntuaciones de examinado prueba intenciones
    let pcidin = ci_din_s;
    let pciada = ci_ada_s;
    let pcipra = ci_pra_s;
    let pcimet = ci_met_s;
    let pciima = ci_ima_s;
    let pciate = ci_ate_s;

    // #puntuaciones de examinado prueba información profesional
    let pinfo = info_s;

    // -------- Agrupar los resultados del mismo examinado en cada una de las pruebas en la misma fila --------

    // #resultados agrupados prueba de intereses en variable tipo_in
    // #ponderar los resultados en escala de 1 a 10 en variable pt_int
    const tipo_int = [pindin, pinada, pinpra, pinmet, pinima, pinate]
    ponderar_int = (valor) => { return ((valor / 30) * 10); }
    const pt_int = [ponderar_int(pindin), ponderar_int(pinada), ponderar_int(pinpra), ponderar_int(pinmet), ponderar_int(pinima), ponderar_int(pinate)];

    // #resultados agrupados prueba auto-concepto
    // #ponderar los resultados en escala de rango 20 entre -10 y 10 en variable pt_self
    const ras_self = [psedinmet, pseadaima, psepraate];
    ponderar_self = (valor) => { return (((valor / 56) * 20) - 10); }
    const pt_self = [ponderar_self(psedinmet), ponderar_self(pseadaima), ponderar_self(psepraate)];

    // #intención agrupado
    // #ponderar los resultados en escala de 1 a 10 en variable pt_cint
    const tipo_cint = [pcidin, pciada, pcipra, pcimet, pciima, pciate];
    ponderar_cint = (valor) => { return ((valor / 21) * 10); }
    const pt_cint = [ponderar_cint(pcidin), ponderar_cint(pciada), ponderar_cint(pcipra), ponderar_cint(pcimet), ponderar_cint(pciima), ponderar_cint(pciate)];

    // #información profesional agrupado (es una única variable)
    // #ponderar los resultados en escala de 1 a 10 en variable pt_cint
    const pt_info = (pinfo / 80) * 10;

    // #asignar nombres de columnas como convención para los resultados del examinado
    const scoretestName = ["I_Dinamico", "I_Adaptable", "I_Practico", "I_Metodico", "I_Imaginativo", "I_Atento",
        "DinamicoMetodico", "AdaptableImaginativo", "PracticoAtento", "C_Dinamico", "C_Adaptable",
        "C_Practico", "C_Metodico", "C_Imaginativo", "C_Atento", "Informacion_P"]

    // # puntajes ponderados en las distintas pruebas agrupados en una misma tabla 

    const scoretest = pt_int.concat(pt_self, pt_cint, pt_info);
    for (x in scoretestName) { objResultados[scoretestName[x]] = scoretest[x]; }

    const carDim = ['Negocios internacionales, Contaduría pública, Derecho, Asesoría financiera, Publicidad, Marketing, Ciencia política, Administración pública, Comunicación social o Periodismo','https://cun.edu.co/programa-negocios-internacionales,https://cun.edu.co/programa-contaduria-publica,https://cun.edu.co/programa-derecho'];

    const carAda = ['Ingeniería industrial, Administración de empresas, Administración de servicios de salud, Administración de empresas agroindustriales, Administración pública, turistica, hotelera, deportiva, comunicaciones o sistemas','https://cun.edu.co/programa-ingenieria-industrial,https://cun.edu.co/administracion-de-empresas,https://cun.edu.co/programa-administracion-servicios-salud,https://cun.edu.co/programa-administracion-de-empresas-agroindustrial'];

    const carPra = ['Ingeniería electrónica, Ingeniería mecánica, Arquitectura, Diseño industrial, Fisioterapia, Medicina, Veterinaria, Carpintería, Agricultura o Gastronomía','https://cun.edu.co/programa-ingenieria-electronica'];

    const carMet = ['Ingeniería de sistemas, Ingeniería de software, Biología, Estadística, Química, Ciencia de datos o ciencias de la computación','https://cun.edu.co/programa-ingenieria-de-sistemas'];

    const carIma = ['Diseño gráfico, Dirección y producción de medios audiovisuales, Diseño de modas, Literatura, Artes plásticas, Música o Arquitectura','https://cun.edu.co/programa-diseno-grafico,https://cun.edu.co/programa-direccion-y-produccion-de-medios-audiovisuales,https://cun.edu.co/programa-diseno-de-modas'];

    const carAte = ['Comunicación social, Publicidad y mercadeo, Docencia, Pedagogía, Trabajo social, Psicología, Antropología, Enfermería.','https://cun.edu.co/programa-comunicacion-social,https://cun.edu.co/programa-publicidad-y-mercadeo'];

    const nombreCarreras = {
        'carDim': objResultados['C_Dinamico'],
        'carMet': objResultados['C_Metodico'],
        'carIma': objResultados['C_Imaginativo'],
        'carAda': objResultados['C_Adaptable'],
        'carPra': objResultados['C_Practico'],
        'carAte': objResultados['C_Atento']
    }

    let ordenCarreras = [];
    for (let x in nombreCarreras) {
        ordenCarreras.push([x, nombreCarreras[x]]);
    }
    ordenCarreras.sort(function (a, b) { return b[1] - a[1]; });

    let carreras1 = ordenCarreras[0][0];
    let carreras2 = ordenCarreras[1][0];

    if(carreras1 === 'carDim'){carrerasRec[0] = carDim}
    else if(carreras1 === 'carMet'){carrerasRec[0] = carMet}
    else if(carreras1 === 'carIma'){carrerasRec[0] = carIma}
    else if(carreras1 === 'carAda'){carrerasRec[0] = carAda}
    else if(carreras1 === 'carAte'){carrerasRec[0] = carAte}
    else if(carreras1 === 'carPra'){carrerasRec[0] = carPra}
    
    if(carreras2 === 'carDim'){carrerasRec[1] = carDim}
    else if(carreras2 === 'carMet'){carrerasRec[1] = carMet}
    else if(carreras2 === 'carIma'){carrerasRec[1] = carIma}
    else if(carreras2 === 'carAda'){carrerasRec[1] = carAda}
    else if(carreras2 === 'carAte'){carrerasRec[1] = carAte}
    else if(carreras2 === 'carPra'){carrerasRec[1] = carPra}

    objRespuestas['carrerasRec'] = carrerasRec[0][0].concat(carrerasRec[1][0])
    objResultados['carrerasRec1'] = carrerasRec[0]
    objResultados['carrerasRec2'] = carrerasRec[1]
    
    localStorage.setItem('respuestas', JSON.stringify(objResultados));
    localStorage.setItem('resultados', JSON.stringify(objRespuestas));
}

function cambiar() {

    if (Object.keys(objResultados).length === 0) {
        if (localStorage.getItem('respuestas') !== undefined) {
            objResultados = JSON.parse(localStorage.getItem('respuestas'));
            objRespuestas = JSON.parse(localStorage.getItem('resultados'));
        }
    }    

    //------------- Pagina 2: Interes Vocacional --------------//

    $('.nombre').html(objRespuestas.nombre + " " + objRespuestas.apellido);
    $('#txtAtentoVoc').html(objResultados['I_Atento'].toFixed(1));
    $('#txtDinamicoVoc').html(objResultados['I_Dinamico'].toFixed(1));
    $('#txtMetodicoVoc').html(objResultados['I_Metodico'].toFixed(1));
    $('#txtImaginativoVoc').html(objResultados['I_Imaginativo'].toFixed(1));
    $('#txtAdaptableVoc').html(objResultados['I_Adaptable'].toFixed(1));
    $('#txtPracticoVoc').html(objResultados['I_Practico'].toFixed(1));

    const objPag2 = {
        'DINAMICO': objResultados['I_Dinamico'],
        'METODICO': objResultados['I_Metodico'],
        'IMAGINATIVO': objResultados['I_Imaginativo'],
        'ADAPTABLE': objResultados['I_Adaptable'],
        'PRACTICO': objResultados['I_Practico'],
        'ATENTO': objResultados['I_Atento']
    }

    let orderPag2 = [];
    for (let x in objPag2) {
        orderPag2.push([x, objPag2[x]]);
    }
    orderPag2.sort(function (a, b) { return b[1] - a[1]; });

    let carreraxVocacion = carreraXSeccion(orderPag2[0][0])
    $('#vocacionalPers').html('Según tu <b>Interés Vocacional</b>, tu carrera puede ser: '+carreraxVocacion);

    $('#punt1Voc').html(orderPag2[0][1].toFixed(1));
    $('#punt2Voc').html(orderPag2[1][1].toFixed(1));
    $('#med1Voc').attr("src", "./img/medallas/" + orderPag2[0][0] + ".svg");
    $('#med2Voc').attr("src", "./img/medallas/" + orderPag2[1][0] + ".svg");

    const srcVoc = "./img/personajes/interesVocacional/" + objRespuestas.color + "/" + orderPag2[0][0] + "_" + objRespuestas.genero + ".svg";

    $('#personajeVoc').attr("src", srcVoc);


    //------------- Pagina 3: Predominancia de personalidad --------------//

    $('.res1').html(Math.abs(objResultados['AdaptableImaginativo'].toFixed(1)));
    $('.porc1').css({ left: (50 + ((objResultados['AdaptableImaginativo'] * 100) / 20)) + "%" });
    $('.res2').html(Math.abs(objResultados['PracticoAtento'].toFixed(1)));
    $('.porc2').css({ left: (50 + ((objResultados['PracticoAtento'] * 100) / 20)) + "%" });
    $('.res3').html(Math.abs(objResultados['DinamicoMetodico'].toFixed(1)));
    $('.porc3').css({ left: (50 + ((objResultados['DinamicoMetodico'] * 100) / 20)) + "%" });

    const objPag3 = {
        'AdaptableImaginativo': [objResultados['AdaptableImaginativo'], "ADAPTABLE", "IMAGINATIVO"],
        'PracticoAtento': [objResultados['PracticoAtento'], "PRACTICO", "ATENTO"],
        'DinamicoMetodico': [objResultados['DinamicoMetodico'], "DINAMICO", "METODICO"]
    }

    let orderPag3 = [];
    for (let x in objPag3) {
        orderPag3.push([objPag3[x][0], objPag3[x][1], objPag3[x][2]]);
    }
    orderPag3.sort(function (a, b) { return Math.abs(b[0]) - Math.abs(a[0]); });

    let mayorPredom = orderPag3[0][0] < 0 ? orderPag3[0][1] : orderPag3[0][2] 
    let carreraxPredominancia = carreraXSeccion(mayorPredom)

    $('#predominanciaPers').html('Según tu <b>Predominancia de personalidad</b>, tu carrera puede ser: '+carreraxPredominancia);

    $('#punt1Per').html(Math.abs(orderPag3[0][0].toFixed(1)));
    $('#med1Pre').attr("src", orderPag3[0][0] < 0 ? "./img/medallas/" + orderPag3[0][1] + ".svg" : "./img/medallas/" + orderPag3[0][2] + ".svg");
    $('#porc1').attr("src", orderPag3[0][0] < 0 ? "./img/predominanciaDePersonalidad/CIRCULO_ADA.svg" : "./img/predominanciaDePersonalidad/CIRCULO_IMA.svg");

    $('#punt2Per').html(Math.abs(orderPag3[1][0].toFixed(1)));
    $('#med2Pre').attr("src", orderPag3[1][0] < 0 ? "./img/medallas/" + orderPag3[1][1] + ".svg" : "./img/medallas/" + orderPag3[1][2] + ".svg");
    $('#porc2').attr("src", orderPag3[0][0] < 0 ? "./img/predominanciaDePersonalidad/CIRCULO_ATE.svg" : "./img/predominanciaDePersonalidad/CIRCULO_PRA.svg");

    $('#punt3Per').html(Math.abs(orderPag3[2][0].toFixed(1)));
    $('#med3Pre').attr("src", orderPag3[2][0] < 0 ? "./img/medallas/" + orderPag3[2][1] + ".svg" : "./img/medallas/" + orderPag3[2][2] + ".svg");
    $('#porc3').attr("src", orderPag3[0][0] < 0 ? "./img/predominanciaDePersonalidad/CIRCULO_DIN.svg" : "./img/predominanciaDePersonalidad/CIRCULO_MET.svg");

    const srcPre = "./img/personajes/predominanciaPersonalidad/" + objRespuestas.color + "/" + (orderPag3[0][0] < 0 ? orderPag3[0][1] : orderPag3[0][2]) + "_" + objRespuestas.genero + ".svg";

    $('#personajePre').attr("src", srcPre);

    //------------- Pagina 4: Intencion de carrera --------------//

    let total = objResultados['C_Atento'] + objResultados['C_Dinamico'] + objResultados['C_Metodico'] + objResultados['C_Imaginativo'] + objResultados['C_Adaptable'] + objResultados['C_Practico'];
    $('#txtAtentoCar').html(((objResultados['C_Atento'] * 100) / total).toFixed(1) + '%');
    $('#txtDinamicoCar').html(((objResultados['C_Dinamico'] * 100) / total).toFixed(1) + '%');
    $('#txtMetodicoCar').html(((objResultados['C_Metodico'] * 100) / total).toFixed(1) + '%');
    $('#txtImaginativoCar').html(((objResultados['C_Imaginativo'] * 100) / total).toFixed(1) + '%');
    $('#txtAdaptableCar').html(((objResultados['C_Adaptable'] * 100) / total).toFixed(1) + '%');
    $('#txtPracticoCar').html(((objResultados['C_Practico'] * 100) / total).toFixed(1) + '%');

    
    $('#intencionPers').html(((objResultados['C_Practico'] * 100) / total).toFixed(1) + '%');

    const objPag4 = {
        'DINAMICO': objResultados['C_Dinamico'],
        'METODICO': objResultados['C_Metodico'],
        'IMAGINATIVO': objResultados['C_Imaginativo'],
        'ADAPTABLE': objResultados['C_Adaptable'],
        'PRACTICO': objResultados['C_Practico'],
        'ATENTO': objResultados['C_Atento']
    }

    let orderPag4 = [];
    for (let x in objPag4) {
        orderPag4.push([x, objPag4[x]]);
    }
    orderPag4.sort(function (a, b) { return b[1] - a[1]; });

    let carreraxIntencion = carreraXSeccion(orderPag4[0][0])
    $('#intencionPers').html('Según tu <b>Intención de carrera</b>, tu carrera puede ser: '+carreraxIntencion);
    $('#punt1Car').html(((orderPag4[0][1]* 100) / total).toFixed(1) + '%');
    $('#punt2Car').html(((orderPag4[1][1]* 100) / total).toFixed(1) + '%');
    $('#med1Car').attr("src", "./img/medallas/" + orderPag4[0][0] + ".svg");
    $('#med2Car').attr("src", "./img/medallas/" + orderPag4[1][0] + ".svg");

    const srcCar = "./img/personajes/intencionCarrera/" + objRespuestas.color + "/" + orderPag4[0][0] + "_" + objRespuestas.genero + ".svg";

    $('#personajeCar').attr("src", srcCar);

    //------------- Pagina 5: Informacion profesional --------------//

    $('.grado').css({ left: (objResultados['Informacion_P'] * 10) + "%" });
    $('#InfoP_texto').html(objResultados['Informacion_P'].toFixed(1));

    if (objResultados['Informacion_P'] <= 2) {
        $("#InfoP_texto").attr("src", "./img/informacionProfesional/PINFO1.svg");
    } else if (objResultados['Informacion_P'] > 2 && objResultados['Informacion_P'] <= 4) {
        $("#InfoP_texto").attr("src", "./img/informacionProfesional/PINFO2.svg");
    } else if (objResultados['Informacion_P'] > 4 && objResultados['Informacion_P'] <= 6) {
        $("#InfoP_texto").attr("src", "./img/informacionProfesional/PINFO3.svg");
    } else if (objResultados['Informacion_P'] > 6 && objResultados['Informacion_P'] <= 8) {
        $("#InfoP_texto").attr("src", "./img/informacionProfesional/PINFO4.svg");
    } else if (objResultados['Informacion_P'] > 8 && objResultados['Informacion_P'] <= 10) {
        $("#InfoP_texto").attr("src", "./img/informacionProfesional/PINFO5.svg");
    }
}

function closePopUp() {
    $('.popUp').css("display", "none");
    $('.popUpCar').css("display", "none");
}

function showPopUp(name, carreras) {
    
    const carrerasDim = ['<a target="_blank" href="https://cun.edu.co/programa-negocios-internacionales">Negocios internacionales,</a>', '<a target="_blank" href="https://cun.edu.co/programa-contaduria-publica">Contaduría pública,</a>', '<a target="_blank" href="https://cun.edu.co/programa-derecho">Derecho,</a>', '<a target="_blank" href="https://cun.edu.co/programa-administracion-publica">Administración pública,</a>','Asesoría financiera, Publicidad, Marketing, Ciencia política, Comunicación social o Periodismo.'];

    const carrerasAda = ['<a target="_blank" href="https://cun.edu.co/programa-ingenieria-industrial">Ingeniería industrial,</a>', '<a target="_blank" href="https://cun.edu.co/administracion-de-empresas">Administración de empresas,</a>', '<a target="_blank" href="https://cun.edu.co/programa-administracion-servicios-salud">Administración de servicios de salud,</a>', '<a target="_blank" href="https://cun.edu.co/programa-administracion-de-empresas-agroindustrial">Administración de empresas agroindustriales,</a>', '<a target="_blank" href="https://cun.edu.co/programa-administracion-publica">Administración pública,</a>','<a target="_blank" href="https://cun.edu.co/programa-administracion-turistica-hotelera">Administración turistica y hotelera,</a>','<a target="_blank" href="https://cun.edu.co/programa-administracion-deportiva">Administración deportiva,</a>',' comunicaciones o sistemas.'];

    const carrerasPra = ['<a target="_blank" href="https://cun.edu.co/programa-ingenieria-electronica">Ingeniería electrónica,</a>', ' Ingeniería mecánica, Arquitectura, Diseño industrial, Fisioterapia, Medicina, Veterinaria, Carpintería, Agricultura o Gastronomía.'];

    const carrerasMet = ['<a target="_blank" href="https://cun.edu.co/programa-ingenieria-de-sistemas">Ingeniería de sistemas,</a>', ' Ingeniería de software, Biología, Estadística, Química, Ciencia de datos o ciencias de la computación.'];

    const carrerasIma = ['<a target="_blank" href="https://cun.edu.co/programa-diseno-grafico">Diseño gráfico,</a>', '<a target="_blank" href="https://cun.edu.co/programa-direccion-y-produccion-de-medios-audiovisuales">Dirección y producción de medios audiovisuales,</a>', '<a target="_blank" href="https://cun.edu.co/programa-diseno-de-modas">Diseño de modas,</a>', ' Literatura, Artes plásticas, Música o Arquitectura.'];

    const carrerasAte = ['<a target="_blank" href="https://cun.edu.co/programa-comunicacion-social">Comunicación social,</a>', '<a target="_blank" href="https://cun.edu.co/programa-publicidad-y-mercadeo">Publicidad y mercadeo,</a>', ' Docencia, Pedagogía, Trabajo social, Psicología, Antropología, Enfermería.']

    $('.popUp').css("display", "grid");
    $('#popUp').attr("src", "./img/" + name + ".svg");

    if (carreras !== undefined) {
        
        $('.popUpCar').css("display", "grid");
        $('.popUpCar').css("background-image", "url(./img/" + name + ".png");

        document.getElementById("msg").innerHTML = "Tu carrera puede ser: ";
        let arrCarreras = [];
        if (carreras == "Dim") { arrCarreras = carrerasDim; }
        if (carreras == "Ate") { arrCarreras = carrerasAte; }
        if (carreras == "Pra") { arrCarreras = carrerasPra; }
        if (carreras == "Ima") { arrCarreras = carrerasIma; }
        if (carreras == "Ada") { arrCarreras = carrerasAda; }
        if (carreras == "Met") { arrCarreras = carrerasMet; }

        for (x in arrCarreras) {
            document.getElementById("msg").innerHTML += arrCarreras[x] + "  ";
        }
    }
}

function removeRequired(id) {
    $(id).prop('required', false);
}

function selectOnChange(id1, id2, class1, class2) {
    let select = $(id1);
    let textbox = $(id2);
    let div1 = $(class1);
    let div2 = $(class2);

    if (select.val() !== "Otra") {
        div1.css("grid-template-columns", "100% 0%");
        div2.css("display", "none");
        select.prop('required', true);
        textbox.prop('required', false);
    }
    else {
        div2.css("display", "grid");
        div1.css("grid-template-columns", "40% 60%");
        select.prop('required', false);
        textbox.prop('required', true);
    }
}

// ------------- Formulario -------------

function submitButtonClick(event, id) {
    event.preventDefault();
    setTimeout(function () { location.href = id }, 0);
}

function getAnswersV1(event) {
    event.preventDefault();
    let fecha = new Date();
    let rptaCorreo = document.querySelectorAll("input[name=email]")[0].value;
    datosPersonales[0] = String(fecha);
    datosPersonales[1] = rptaCorreo;
    setTimeout(function () { location.href = '#encuestaV2' }, 0);
}

function getAnswersV2(event) {
    event.preventDefault();
    let rptaNombre = document.querySelectorAll("input[name=nombre]")[0].value;
    let rptaCC = document.querySelectorAll("input[name=cc]")[0].value;
    let rptaGenero = document.querySelectorAll("input[name=genero]:checked")[0].value;
    let rptaColor = document.querySelectorAll("input[name=color]:checked")[0].value;
    let rptaEdad = document.querySelectorAll("input[name=edad]")[0].value;
    let rptaApellido = document.querySelectorAll("input[name=apellido]")[0].value;
    let rptaNumero = document.querySelectorAll("input[name=numero]")[0].value;
    datosPersonales[2] = rptaNombre;
    datosPersonales[3] = rptaApellido;
    datosPersonales[4] = rptaCC;
    datosPersonales[5] = rptaGenero;
    datosPersonales[6] = rptaColor;
    datosPersonales[7] = rptaEdad;
    datosPersonales[8] = rptaNumero;
    setTimeout(function () { location.href = '#encuestaV3' }, 0);
}

function getAnswersV3(event) {
    event.preventDefault();
    let rptaEstudio1 = document.querySelectorAll("input[name=estudio1]:checked")[0].value;
    let rptaEstudio2 = document.querySelectorAll("input[name=estudio2]:checked")[0].value;
    let rptaEstudio3 = document.querySelectorAll("input[name=estudio3]")[0].value;
    let rptaOcupacion = document.querySelectorAll("input[name=ocupacion]:checked")[0].value;
    datosPersonales[9] = rptaEstudio1;
    datosPersonales[10] = rptaEstudio2;
    datosPersonales[11] = rptaEstudio3;
    datosPersonales[12] = rptaOcupacion;
    setTimeout(function () { location.href = '#encuestaV4' }, 0);
}

function getAnswersV4(event) {
    event.preventDefault();
    let rptaCarreras = $("#NoEstudioUnaCarrera1 option:selected").val();
    rptaCarreras == "Otra" ? rptaCarreras = document.querySelectorAll("input[name=carreras2]")[0].value : rptaCarreras = rptaCarreras

    let rptaCargos = $("#NoEstoyTrabajando1 option:selected").val();
    rptaCargos == "Otra" ? rptaCargos = document.querySelectorAll("input[name=cargos2]")[0].value : rptaCargos = rptaCargos;

    let rptaEstratos = document.querySelectorAll("input[name=estratos]:checked")[0].value;

    datosPersonales[13] = rptaCarreras;
    datosPersonales[14] = rptaCargos;
    datosPersonales[15] = rptaEstratos;

    setTimeout(function () { location.href = '#encuestaV5' }, 0);
}

function saveZohoLead(dataP){

    var data = JSON.stringify(dataP);

    var xhr = new XMLHttpRequest();

    function request (){
            xhr.open("POST", " https://cvivovimeoapi.herokuapp.com/pv/zoho/lead");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
    }

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        if(JSON.parse(this.responseText).statusCode == 100){
            console.log(this.responseText)
            request();
            
        }else{
            //ejecutar la funcion de resultado
            console.log(JSON.parse(this.responseText).statusCode);
        }
    }
    });
    request();
}

function addToCloud() {
    var db = firebase.firestore();
    objRespuestas = {
        'hora': datosPersonales[0],
        'correo': datosPersonales[1],
        'nombre': datosPersonales[2],
        'apellido': datosPersonales[3],
        'cc': datosPersonales[4],
        'genero': datosPersonales[5],
        'color': datosPersonales[6],
        'edad': datosPersonales[7],
        'numero': datosPersonales[8],
        'estudio1': datosPersonales[9],
        'estudio2': datosPersonales[10],
        'estudio3': datosPersonales[11],
        'ocupacion': datosPersonales[12],
        'carrera': datosPersonales[13],
        'cargo': datosPersonales[14],
        'estrato': datosPersonales[15],
        'respuestas': respuestas,
        'carrerasRec': carrerasRec[0][0].concat(carrerasRec[1][0]),
        'region' : region
    }

    const dataObj = {
        data: [{
            Email: objRespuestas.correo,
            First_Name: objRespuestas.nombre,
            Last_Name: objRespuestas.apellido,
            Phone: objRespuestas.numero,
            Regional_Sede_Complice: region,
            Opci_n_1_de_carrera_prueba_vocacional_CUN: carrerasRec[0][0],
            Opci_n_2_de_carrera_prueba_vocacional_CUN: carrerasRec[1][0],
            Presento_prueba_vocacional_CUN: "si",
            Campa_a: 'Prueba vocacional',
            Fuente_Campana:objRespuestas.region,
            N_mero_de_identificaci_n1:objRespuestas.cc
        }],
        duplicate_check_fields: ["Email", "Phone"],
    }

    db.collection("pv2020").doc(objRespuestas.cc).set(objRespuestas).then(function () {
        saveZohoLead(dataObj)
        setTimeout(function () { location.href = '#intencionDeCarrera' }, 0);
    }).catch(function(error) {
        alert("Error guardando, datos faltantes: ", error);
        setTimeout(function () { location.href = '#inicio' }, 0);
    });
}

function getAnswersV14(event) {
    event.preventDefault();
    calcular();
    let comentario = document.querySelectorAll("input[name=comentario]")[0].value;
    respuestas[142] = comentario;
    addToCloud();
}

let iterator = 1;

function getAnswersIntr(event) {
    event.preventDefault();
    iterator < 1 || iterator > 60 ? iterator = 1 : iterator = iterator

    let respuestaV6 = document.querySelectorAll("input[name=opcIntereses]:checked")[0].value;

    if (iterator !== 60) {
        respuestas[iterator - 1] = parseInt(respuestaV6);

        $("#opcInteres1").prop('checked', false);
        $("#opcInteres2").prop('checked', false);
        $("#opcInteres3").prop('checked', false);

        fetch('./json/preguntas.json')
            .then(response => response.json())
            .then(json => {
                var text = json[iterator];
                document.getElementById('preguntasV6').innerHTML = text;
                $("#preguntasV6").html(function (i, html) {
                    return html.replace(/&nbsp;/g, ' ');
                });
            });

        iterator++;

    } else {
        respuestas[iterator - 1] = parseInt(respuestaV6);
        setTimeout(function () { location.href = '#encuestaV7' }, 0);
    }
}

function getAnswersConc(event) {
    event.preventDefault();
    iterator < 60 || iterator > 83 ? iterator = 60 : iterator = iterator

    let respuestaV8 = parseInt(document.querySelectorAll("input[name=opcConceptos]:checked")[0].value);

    if (iterator !== 83) {

        respuestas[iterator] = respuestaV8;

        $("#opcConceptos1").prop('checked', false);
        $("#opcConceptos2").prop('checked', false);
        $("#opcConceptos3").prop('checked', false);
        $("#opcConceptos4").prop('checked', false);
        $("#opcConceptos5").prop('checked', false);
        $("#opcConceptos6").prop('checked', false);
        $("#opcConceptos7").prop('checked', false);

        fetch('./json/preguntas.json')
            .then(response => response.json())
            .then(json => {
                document.getElementById("concepto1V8").innerHTML = json[(iterator + 1)][0];
                document.getElementById("concepto2V8").innerHTML = json[(iterator + 1)][1];
            });

        iterator++;

    } else {
        respuestas[iterator] = respuestaV8;
        iterator++;
        setTimeout(function () { location.href = "#encuestaV9" }, 0);
    }
}

function getAnswersEje(event) {
    event.preventDefault();
    iterator < 84 || iterator > 125 ? iterator = 84 : iterator = iterator

    let respuestaV10 = parseInt(document.querySelectorAll("input[name=opcEjercer]:checked")[0].value);

    if (iterator !== 125) {
        respuestas[iterator] = respuestaV10;

        $("#opcEjercer1").prop('checked', false);
        $("#opcEjercer2").prop('checked', false);
        $("#opcEjercer3").prop('checked', false);

        fetch('./json/preguntas.json')
            .then(response => response.json())
            .then(json => {
                var text = json[iterator + 1];
                document.getElementById('preguntasV10').innerHTML = text;
                $("#preguntasV10").html(function (i, html) {
                    return html.replace(/&nbsp;/g, ' ');
                });
            });
        iterator++;

    } else {
        respuestas[iterator] = respuestaV10;
        iterator++;
        setTimeout(function () { location.href = "#encuestaV11" }, 0);
    }
}

function getAnswersIntc(event) {
    event.preventDefault();
    iterator < 126 || iterator > 141 ? iterator = 126 : iterator = iterator
    let respuestaV12 = parseInt(document.querySelectorAll("input[name=opcProfesional]:checked")[0].value);

    if (iterator !== 141) {

        respuestas[iterator] = respuestaV12;

        $("#opcProfesional1").prop('checked', false);
        $("#opcProfesional2").prop('checked', false);
        $("#opcProfesional3").prop('checked', false);
        $("#opcProfesional4").prop('checked', false);
        $("#opcProfesional5").prop('checked', false);

        fetch('./json/preguntas.json')
            .then(response => response.json())
            .then(json => {
                var text = json[iterator + 1];
                document.getElementById('preguntasV12').innerHTML = text;
                $("#preguntasV12").html(function (i, html) {
                    return html.replace(/&nbsp;/g, ' ');
                });
            });

        iterator++;
    } else {
        respuestas[iterator] = respuestaV12;
        iterator++;
        setTimeout(function () { location.href = "#encuestaV13" }, 0);
    }
}

function btnNav() {
    if ($('#btn-menu').is(':checked')) {
        $("#btn-menu").prop("checked", true);
        $(".menu").css("width", "250px");
        $(".menu").css("right", "0");
        $(".menuBack").css("width", "250px");
        $(".menuBack").css("right", "0");
    } else {
        $("#btn-menu").prop("checked", false);
        $(".menu").css("width", "250px");
        $(".menu").css("right", "-250px");
        $(".menuBack").css("width", "250px");
        $(".menuBack").css("right", "-250px");
    }
}

function pantallazos() {

    let arrayCar1 = []; let arrayCar2 = []
    let carrerasRec1 = objResultados.carrerasRec1;
    let carrerasRec2 = objResultados.carrerasRec2;

    arrayCar1[0] = carrerasRec1[0].split(',');
    arrayCar1[1] = carrerasRec1[1].split(',');
    arrayCar2[0] = carrerasRec2[0].split(',');
    arrayCar2[1] = carrerasRec2[1].split(',');

    for (x in arrayCar1[0]) {
        document.getElementById("carRec1").innerHTML +=
            "<tr><td>" +
            arrayCar1[0][x] +
            "</td>" +
            (arrayCar1[1][x] !== undefined
                ? "<td>" + arrayCar1[1][x] + "</td>"
                : "") +
            "</tr>";
    }

    for (x in arrayCar2[0]) {
        document.getElementById("carRec2").innerHTML +=
            "<tr><td>" +
            arrayCar2[0][x] +
            "</td>" +
            (arrayCar2[1][x] !== undefined
                ? "<td>" + arrayCar2[1][x] + "</td>"
                : "") +
            "</tr>";
    }

    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
    });

    doc.addFileToVFS("MyFont.ttf", fontThrow);
    doc.addFileToVFS("MyFont2.ttf", fontMontserrat);
    doc.addFont("MyFont.ttf", "throw", "normal");
    doc.addFont("MyFont2.ttf", "montserrat", "normal");

    const canvasSS = [
        "reporte",
        "vocacional",
        "personalidad",
        "carrera",
        "informacion",
        "resultados",
        "carreras1",
    ];
    let imgData2;
    html2canvas(document.getElementById("pieDePagina")) // Llamar a html2canvas y pasarle el elemento
        .then((canvas) => {
            imgData2 = canvas.toDataURL("image/png", 1.0);
        });

    for (let x = 0; x < canvasSS.length; x++) {
        html2canvas(document.getElementById(canvasSS[x])) // Llamar a html2canvas y pasarle el elemento
            .then((canvas) => {
                let imgData = canvas.toDataURL("image/png", 1.0);
                let page = doc.internal.getNumberOfPages();
                console.log(page)
                if (x == 0) {
                    doc.addImage(imgData, "PNG", 3, 50, 195, 160);
                    doc.addImage(imgData2, "PNG", 0, 275, 210, 20);
                }
                if (x > 0 && x < 5) {
                    doc.addPage();
                    doc.addImage(imgData, "PNG", 3, 2, 200, 270);
                    doc.addImage(imgData2, "PNG", 0, 275, 210, 20);
                }
                if (x == 5) {
                    doc.addPage();
                    doc.addImage(imgData, "PNG", 3, 2, 200, 260);
                    doc.addImage(imgData2, "PNG", 0, 275, 210, 20);
                }
                if (page > 4) {
                    if (x <= 5) {
                        console.log('asd')
                        doc.addPage();
                        doc.autoTable({
                            html: "#carreras1",
                            headStyles: {
                                minCellHeight: 15,
                                fillColor: [239, 32, 82],
                                textColor: [255, 255, 255],
                                halign: "center",
                                font: "throw",
                                fontSize: "12",
                                fontStyle: "normal",
                            },
                            bodyStyles: {
                                minCellHeight: 11,
                                font: "montserrat",
                                fontSize: "9",
                                fontStyle: "normal",
                            },
                            columnStyles: {
                                1: {
                                    textColor: [51, 102, 255],
                                    // fontStyle: 'italic'
                                },
                            },
                            styles: {
                                halign: "left",
                                valign: "middle",
                            },
                        });
                        doc.addImage(imgData2, "PNG", 0, 275, 210, 20);
                        doc.save("Resultados de prueba vocacional", {returnPromise:true})
                        .then(()=>{
                            setTimeout(() => {
                                location.href = "#intencionDeCarrera";
                            }, 5000);
                        });
                    }
                }
            }).catch((error)=>{
                console.log(error)
            })
    }
}

function definirRegion(sigla){
    
    if(sigla == "bar"){region = "barranquilla"}
    else if(sigla == "car"){region = "cartagena"}
    else if(sigla == "san"){region = "santa marta"}
    else if(sigla == "sin"){region = "sincelejo"}
    else if(sigla == "mon"){region = "monteria"}
    else if(sigla == "buc"){region = "bucaramanga"}
    else if(sigla == "cuc"){region = "cucuta"}
    else if(sigla == "bog"){region = "bogota"}
    else if(sigla == "eje"){region = "eje cafetero"}
    else if(sigla == "nei"){region = "neiva"}
    else if(sigla == "iba"){region = "ibague"}
    else if(sigla == "caq"){region = "caqueta"}
    else if(sigla == "vil"){region = "villavicencio"}
    else if(sigla == "yop"){region = "yopal"}
    else if(sigla == "med"){region = "medellin"}
    else if(sigla == "cun"){region = "cundinamarca"}
    else if(sigla == "soa"){region = "soacha"}
    else if(sigla == "nar"){region = "nariño"}
    else if(sigla == "byc"){region = "basica y media"}
    else if(sigla == "prs"){region = "proyeccion social"}
    else if(sigla == "vnc"){region = "venecia"}
    else if(sigla == "msq"){region = "mosquera"}
    else if(sigla == "sns"){region = "san andres sotavento"}
    else if(sigla == "apr"){region = "apartado"}
    else if(sigla == "fun"){region = "funza"}
    else if(sigla == "rin"){region = "rionegro"}
    else if(sigla == "cio"){region = "cienaga de oro"}
    else if(sigla == "sub"){region = "suba"}
    else if(sigla == "exp"){region = "experiencia"}
    else if(sigla == "bug"){region = "buga"}
    else if(sigla == "cal"){region = "cali"}
    else if(sigla == "osc"){region = "oscar alvarado"}
    else(region = "bogota")
    console.log(region)
}

function closeModal (){
    $('#exampleModalCenter').modal('hide')
}

