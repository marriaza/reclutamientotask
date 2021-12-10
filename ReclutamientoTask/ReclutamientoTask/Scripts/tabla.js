jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function (arg) {
    return function (elem) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// Dar formato a una fecha

Date.prototype.formato = function (Formato) {
    var segmento = "";
    var resultado = "";

    for (var i = 0; i <= (Formato.length - 1); i++) {

        if ((segmento == "" || segmento.indexOf(Formato[i]) > -1)
            && (i + 1) < Formato.length) {

            // Agrupar
            segmento += Formato[i];
        }
        else {

            if ((i + 1) == Formato.length) {

                segmento += Formato[i];
            }

            // Mostrar
            switch (segmento) {

                case "dd":
                    segmento = this.getDate();

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "ddd":
                    segmento = Date.nombres.dias[this.getDay()].substring(0, 3);

                    break;
                case "dddd":
                    segmento = Date.nombres.dias[this.getDay()];

                    break;
                case "MM":
                    segmento = this.getMonth() + 1;

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "MMM":
                    segmento = Date.nombres.meses[this.getMonth()].substring(0, 3);

                    break;
                case "MMMM":
                    segmento = Date.nombres.meses[this.getMonth()];

                    break;
                case "yyyy":
                    segmento = this.getFullYear();

                    while (segmento.toString().length < 4) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "HH":
                    segmento = this.getHours();

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "hh":
                    segmento = this.getHours();

                    if (segmento > 11) {
                        segmento -= 12;
                    }

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "mm":
                    segmento = this.getMinutes();

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "ss":
                    segmento = this.getSeconds();

                    while (segmento.toString().length < 2) {

                        segmento = "0" + segmento;
                    }

                    break;
                case "tt":
                    segmento = this.getHours();

                    if (segmento < 12) {
                        segmento = "AM";
                    }
                    else {
                        segmento = "PM";
                    }

                    break;
            }

            resultado += segmento;

            segmento = Formato[i];
        }
    }

    return resultado;
}

Date.nombres = {
    meses: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
    dias: ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
};

// Dar formato a un decimal

Number.prototype.formato = function (Formato) {
    var val = this;
    var resultado = "";

    // Decimales

    var IndiceDecimal = Formato.lastIndexOf(".");
    var Indice = val.toString().indexOf(".");

    if (IndiceDecimal > -1) {
        // Dar formato a los decimales

        resultado = ".";

        for (var i = IndiceDecimal + 1; i < Formato.length; i++) {
            var digito = Indice != -1 ? val.toString().charAt(Indice + (i - IndiceDecimal)) : "0";

            // Mostrar
            switch (Formato[i]) {
                case "#":
                    resultado += digito;
                    break;
                case "0":
                    resultado += (digito == "") ? "0" : digito;
                    break;
                default:
                    resultado += Formato[i];
            }
        }
    }
    else {
        // Aproximar a enteros
        val = Math.round(val);
        IndiceDecimal = Formato.length;
        Indice = val.toString().length;
    }

    // Si el valor no tiene punto decimal todos los digitos son enteros

    if (Indice == -1) {
        Indice = val.toString().length;
    }

    // Enteros
    var ModoExtra = false;

    for (var i = (IndiceDecimal - 1); i >= 0; i--) {
        Indice--;

        var digito = val.toString().charAt(Indice);

        if (ModoExtra == false) {
            if (Formato[i] == "0") {
                resultado = (digito == "" ? "0" : digito) + resultado;
            }
            else if (Formato[i] == "#" && digito != "") {
                resultado = digito + resultado;
            }
            else if (Formato[i] == "#" && digito == "") {
                break;
            }
            else if (Formato[i] == ",") {
                if (Formato[i - 1] == "0") {
                    resultado = "," + resultado;
                    Indice++;
                }
                else if (Formato[i - 1] == "#" && digito != "") {
                    resultado = "," + resultado;
                    ModoExtra = true;
                    i = IndiceDecimal;
                    Indice++;
                }
                else {
                    break;
                }
            }
            else {
                resultado = Formato[i] + resultado;
            }
        }
        else {
            if (Formato[i] == ",") {
                if (digito != "") {
                    resultado = "," + resultado;
                    i = IndiceDecimal;
                    Indice++;
                }
                else {
                    break;
                }
            }
            else {
                // El simbolo es #
                if (digito != "") {
                    resultado = digito + resultado;
                }
                else {
                    break;
                }
            }
        }
    }

    return resultado;
};

// Obtener otra columna de la misma fila

function obtenerValorCol(btn, Campo) {
    var Indice = $(btn).parent().parent().parent().prev().find("tr > th[data-campo=" + Campo + "]").index();

    var codigo = $(btn).parent().parent().children('td:eq(' + Indice + ')').text();

    return codigo;
}

// Mostrar informacion extra

$("table[data-filtro=true] > tbody > tr").hover(

    function () {
        $(this).popover("show");
    },
    function () {
        $(this).popover("hide");
    }
);

// Mostrar cursor en el encabezado para ordenar

$("table[data-orden=true] > thead > tr > th").css("cursor", "pointer");

// Funcion - Agregar una tabla

$.fn.tabla = function (MetodoWeb, Parametros) {
    Nombre = $(this).attr('id');
    llenarTablaAsync(Nombre, MetodoWeb, Parametros, true, false);
};

$.fn.tabla = function (MetodoWeb, Parametros, Async) {
    Nombre = $(this).attr('id');
    llenarTablaAsync(Nombre, MetodoWeb, Parametros, Async, false);
};

$.fn.tabla = function (MetodoWeb, Parametros, Async, Metodo) {
    Nombre = $(this).attr('id');
    llenarTablaAsync(Nombre, MetodoWeb, Parametros, Async, Metodo);
};

$.fn.tablalocal = function (Datos, metodo) {
    Nombre = $(this).attr('id');
    llenarTablaLocal(Nombre, Datos, metodo);
};

// La funcion ejecuta el ajax para llenar la tabla
function llenarTablaAsync(Nombre, MetodoWeb, Parametros, Async, Metodo) {
    $("#" + Nombre + " > tbody > tr").remove();
    var Columnas = $("#" + Nombre + " > thead > tr > th").size();
    var tr = $(document.createElement('tr'));
    var td = $(document.createElement('td'));
    var i = $(document.createElement('i'));
    tr.attr("name", "trloading");
    td.attr("colspan", Columnas);
    td.attr("class", "text-center");
    i.attr("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    td.append(i);
    tr.append(td);
    $("#" + Nombre + " > tbody").append(tr);
    $.ajax({
        type: "POST",
        url: MetodoWeb,
        data: JSON.stringify(Parametros),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: Async,
        success: function (msg) {
            msg = JSON.parse(msg.d);

            var Fuente = $("#" + Nombre).attr("data-fuente");

            window[Fuente] = msg;

            // Filtrar, ordenar, calcular y generar

            var Buscar = $("div.form-search[data-tabla=" + Nombre + "] > input");

            var Datos = FiltrarFilas(Buscar.val(), Fuente);

            OrdenarFilas(Datos, null, null, true);
            CalcularPaginas(Nombre, Datos);

            GenerarFilas(Nombre, Datos);
            //Utilizado para no tener que depender del async
            if (Metodo) {
                Metodo();
            }
        },
        error: function (msg) {
            var Columnas = $("#" + Nombre + " > thead > tr > th").size();
            var tr = $(document.createElement('tr'));
            var td = $(document.createElement('td'));

            td.attr("colspan", Columnas);
            td.text("Ha ocurrido un problema al cargar la tabla.");
            tr.append(td);

            $("#" + Nombre + " > tbody").append(tr);

            $("div.pagination > ul[data-tabla=" + Nombre + "]").parent().hide();
        }
    });
};

// Filtrar JSON

function FiltrarFilas(Buscar, Datos) {
    Buscar = removeDiacritics(Buscar)
    if (Buscar != "") {
        var Criterios;
        var Tipo;

        if (Buscar.toUpperCase().indexOf(" AND ") !== -1) {
            Criterios = Buscar.toUpperCase().split(" AND ");
            Tipo = "AND";
        }
        else if (Buscar.toUpperCase().indexOf(" OR ") !== -1) {
            Criterios = Buscar.toUpperCase().split(" OR ");
            Tipo = "OR";
        }
        else {
            Criterios = Buscar.toUpperCase();
            Tipo = "";
        }

        var filtrado = $(window[Datos]).filter(function (index, fila) {
            var Respuesta = false;

            if (Tipo == "AND") {
                $.each(Criterios, function (j, val) {
                    var Encontrado = false;

                    if (val != "") {
                        $.each(fila, function (i, celda) {
                            celda = removeDiacritics(celda)
                            if (celda != null && celda.toString().toUpperCase().indexOf(val) !== -1) {
                                Encontrado = true;
                                return false;
                            }
                        });
                    }

                    if (Encontrado == true) {
                        Respuesta = true;
                    }
                    else {
                        Respuesta = false;
                        return false;
                    }
                });
            }
            else {
                $.each(this, function (i, celda) {
                    celda = removeDiacritics(celda)
                    if (Tipo == "") {
                        if (celda != null && celda.toString().toUpperCase().indexOf(Criterios) !== -1) {
                            Respuesta = true;
                            return false;
                        }
                    }
                    else {
                        $.each(Criterios, function (j, val) {
                            val = removeDiacritics(val)
                            if (val != "" && celda != null && celda.toString().toUpperCase().indexOf(val) !== -1) {
                                Respuesta = true;
                                return false;
                            }
                        });
                    }
                });
            }

            return Respuesta;
        });

        return filtrado;
    }
    else {
        return window[Datos];
    }
}

// Ordenar JSON

function OrdenarFilas(datos, columna, tipo, asc) {
    if (columna != null) {

        if (asc) {
            datos.sort(function (a, b) {
                if (tipo == "string") {
                    // 2013-10-08 - Se verifica antes para no comparar null
                    if (b[columna] != null && a[columna] != null) {
                        return a[columna].localeCompare(b[columna]);
                    }
                    else {
                        if (b[columna] == null && a[columna] != null) {
                            return 1;
                        }
                        else if (a[columna] == null && b[columna] != null) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                else {
                    if (a[columna] < b[columna]) return -1;
                    if (a[columna] > b[columna]) return 1;
                    return 0;
                }
            });
        }
        else {
            datos.sort(function (a, b) {
                if (tipo == "string") {
                    // 2013-10-08 - Se verifica antes para no comparar null
                    if (a[columna] != null && b[columna] != null) {
                        return b[columna].localeCompare(a[columna]);
                    }
                    else {
                        if (b[columna] == null && a[columna] != null) {
                            return -1;
                        }
                        else if (a[columna] == null && b[columna] != null) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                else {
                    if (a[columna] < b[columna]) return 1;
                    if (a[columna] > b[columna]) return -1;
                    return 0;
                }
            });
        }

    }
}

// Calcular las paginas

function CalcularPaginas(Tabla, Datos) {

    // Datos

    var n = $(Datos).size();
    var q = $("ul[data-tabla=" + Tabla + "]").attr("data-cantidad");

    var pq = Math.ceil(n / q);

    if (pq > 0) {

        $("div.pagination > ul[data-tabla=" + Tabla + "]").parent().show();

        // Elementos

        var li = $(document.createElement('li'));
        var a = $(document.createElement('a'));

        a.attr("href", "#");
        a.html("&laquo;");
        li.append(a);

        // Filtrar los botones de paginacion

        var pa = $("ul[data-tabla=" + Tabla + "] > li.active");
        var qa = $("ul[data-tabla=" + Tabla + "]").attr("data-grupo");

        var numero = Number(pa.text());

        if (numero > 0) {

            // Es un numero
            var ga = Math.ceil(pa.text() / qa);

            var gp1 = ga * qa;
            var gp0 = (gp1 - qa) + 1;
        }
        else if (pa.text() == "..." && pa.prev().text() == String.fromCharCode(171)) {

            // Retroceder un grupo
            numero = Number(pa.next().text());

            var gp1 = numero - 1;
            var gp0 = (gp1 - qa) + 1;

            numero = gp1;
        }
        else if (pa.text() == "..." && pa.next().text() == String.fromCharCode(187)) {

            // Avanzar un grupo
            numero = Number(pa.prev().text());

            var gp1 = numero + Number(qa);
            var gp0 = (gp1 - qa) + 1;

            numero = gp0;
        }
        else {

            numero = 1;

            // No es numero
            var gp1 = qa;
            var gp0 = 1;
        }

        gp1 = (pq > gp1) ? gp1 : pq;

        $("ul[data-tabla=" + Tabla + "] > li").remove();

        // Boton anterior

        $("ul[data-tabla=" + Tabla + "]").append(li);

        // Hay mas paginas a la izquierda

        if (gp0 > 1) {

            li = $(document.createElement('li'));
            a = $(document.createElement('a'));

            a.attr("href", "#");
            a.text("...");
            li.append(a);

            $("ul[data-tabla=" + Tabla + "]").append(li);
        }

        // Numeros del centro

        for (var i = gp0; i <= gp1; i++) {

            li = $(document.createElement('li'));
            a = $(document.createElement('a'));

            a.attr("href", "#");
            a.text(i);
            li.append(a);

            if (numero == i) {

                li.addClass("active");
            }

            $("ul[data-tabla=" + Tabla + "]").append(li);
        }

        // Hay mas paginas a la derecha

        if (pq > gp1) {

            li = $(document.createElement('li'));
            a = $(document.createElement('a'));

            a.attr("href", "#");
            a.text("...");
            li.append(a);

            $("ul[data-tabla=" + Tabla + "]").append(li);
        }

        // Boton siguiente

        li = $(document.createElement('li'));
        a = $(document.createElement('a'));

        a.attr("href", "#");
        a.html("&raquo;");
        li.append(a);

        $("ul[data-tabla=" + Tabla + "]").append(li);

        if ($("ul[data-tabla=" + Tabla + "] > li.active").index() == 1) {

            // Inhabilitar el boton anterior
            $("ul[data-tabla=" + Tabla + "] > li:eq(0)").addClass("disabled");
        }

        if ($("ul[data-tabla=" + Tabla + "] > li.active").index() == ($("ul[data-tabla=" + Tabla + "] > li").size() - 2)) {

            // Inhabilitar el boton siguiente
            $("ul[data-tabla=" + Tabla + "] > li:eq(" + ($("ul[data-tabla=" + Tabla + "] > li").size() - 1) + ")").addClass("disabled");
        }
    }
    else {

        $("div.pagination > ul[data-tabla=" + Tabla + "]").parent().hide();
    }
}



// funcion para llenar una tabla sin necesidad de ajax
function llenarTablaLocal(Nombre, data, metodo) {
    try {
        var Fuente = $("#" + Nombre).attr("data-fuente");
        window[Fuente] = data;
        // Filtrar, ordenar, calcular y generar
        var Buscar = $("div.form-search[data-tabla=" + Nombre + "] > input");
        var Datos = FiltrarFilas(Buscar.val(), Fuente);

        OrdenarFilas(Datos, null, null, true);
        CalcularPaginas(Nombre, Datos);

        GenerarFilas(Nombre, Datos);
        //Utilizado para no tener que depender del async
        if (metodo) {
            metodo();
        }
    } catch (e) {
        $("#" + Nombre + " > tbody > tr[name=trloading]").remove();
        var Columnas = $("#" + Nombre + " > thead > tr > th").size();
        var tr = $(document.createElement('tr'));
        var td = $(document.createElement('td'));
        td.attr("colspan", Columnas);
        td.text("Ha ocurrido un problema al cargar la tabla." + e.message);
        tr.append(td);
        $("#" + Nombre + " > tbody").append(tr);

        $("div.pagination > ul[data-tabla=" + Nombre + "]").parent().hide();
    }
};

// Generar las filas en pantallas
// 2013-07-05 - Si a alguna celda del thead tiene una clase, se le asigna dicha clase
// a toda la columna si dicha celda tiene un data-campo asignado

function GenerarFilas(Tabla, Datos) {

    var n = $(Datos).size();
    var q = $("ul[data-tabla=" + Tabla + "]").attr("data-cantidad");
    var p = $("ul[data-tabla=" + Tabla + "] > li.active").text();

    if (p == "") {

        p = 1;
    }

    var tr1 = p * q;
    var tr0 = tr1 - q;

    var datos = $(Datos).slice(tr0, tr1);

    $("#" + Tabla + " > tbody > tr").remove();

    datos.each(function (indice, fila) {

        // Crear la fila

        var tr = $(document.createElement('tr'));

        // Barrer las columnas

        $("#" + Tabla + " > thead > tr > th").each(function (key) {

            var Campo = $(this).attr("data-campo");
            var Tipo = $(this).attr("data-tipo");
            var Alineacion = $(this).attr("data-alineacion");
            var VerticalAlineacion = $(this).attr("data-valineacion");
            var Tooltip = $(this).attr("data-tooltip");

            if (Campo == undefined) {
                // 2013-07-05 - Se obtiene la clase del header
                var Oculto = $(this).attr("class");

                var td = $(document.createElement('td'));

                // 2013-05-07 - Se anade la clase a las casillas de la columna
                if (Oculto != undefined) {
                    td.addClass(Oculto);
                }


                if (Tipo == "icono") {

                    var Formato = $(this).attr("data-formato");

                    var i = $(document.createElement('i'));
                    i.addClass("glyphicon glyphicon-" + Formato);
                    i.css("cursor", "pointer");
                    i.attr("data-toggle", "tooltip");
                    if (Tooltip != undefined) {
                        i.attr("title", Tooltip);
                    } else if (Formato == "edit") {
                        i.attr("title", "Editar");
                    }

                    td.append(i);
                    // 2013-09-02 - Se anade el tipo autonumerico para generar los correlativos en cada fila de la tabla
                }
                else if (Tipo == "autonumerico") {
                    var pa = Number($("ul[data-tabla=" + Tabla + "] > li.active").text());
                    var qa = $("ul[data-tabla=" + Tabla + "]").attr("data-cantidad");

                    td.text($("#" + Tabla + " tr").length + (pa - 1) * qa);
                }
                else {
                    // Determinar si es boton
                    var Boton = $(this).attr("data-boton");



                    switch (Boton) {

                        // 2013-09-12 - se agrega boton ver
                        case "ver":
                            var i = $(document.createElement('i'));
                            i.addClass("glyphicon glyphicon-search");
                            i.css("cursor", "pointer");
                            i.attr("data-toggle", "tooltip");
                            i.attr("title", "Ver");
                            if (Tooltip != undefined) {
                                i.attr("title", Tooltip);
                            } else {
                                i.attr("title", "Ver");
                            }
                            td.append(i);

                            break;
                        case "editar":
                            var i = $(document.createElement('i'));
                            i.addClass("glyphicon glyphicon-edit");
                            i.css("cursor", "pointer");
                            i.attr("data-toggle", "tooltip");
                            i.attr("title", "Editar");
                            if (Tooltip != undefined) {
                                i.attr("title", Tooltip);
                            } else {
                                i.attr("title", "Editar");
                            }

                            td.append(i);

                            break;
                        case "borrar":
                            var i = $(document.createElement('i'));

                            i.addClass("glyphicon glyphicon-trash");
                            i.css("cursor", "pointer");
                            i.attr("data-toggle", "tooltip");
                            i.attr("title", "Eliminar");
                            if (Tooltip != undefined) {
                                i.attr("title", Tooltip);
                            } else {
                                i.attr("title", "Eliminar");
                            }

                            td.append(i);

                            break;
                        default:
                            var button = $(document.createElement('button'));

                            button.addClass("btn btn-default");
                            button.text(Boton);
                            td.append(button);
                    }
                }

                if (VerticalAlineacion == "middle") {
                    td.css("vertical-align", "middle");
                }
                td.css("text-align", "center");
                tr.append(td);
            }
            else {
                // 2013-07-05 - Se obtiene la clase del header
                var Oculto = $(this).attr("class");

                var td = $(document.createElement('td'));

                // 2013-07-05 - Se anade la clase a las casillas de la columna
                if (Oculto != undefined) {
                    td.addClass(Oculto);
                }

                switch (Tipo) {
                    // 2013-07-20 - Si el campo viene null, se inserta un string vacio y no la palabra null
                    case "string":
                        if (fila[Campo] != null) {
                            td.text(fila[Campo]);
                        } else {
                            td.text("");
                        }

                        break;
                    case "int":
                        // 2013-12-11 - Se verifica si el campo es null, para
                        // no aplicar el metodo Number que convierte null en 0

                        if (fila[Campo] != null) {
                            var x = Number(fila[Campo]);
                            var Formato = $(this).attr("data-formato");

                            if (Formato != undefined && Formato != "") {
                                td.text(x.formato(Formato));
                            }
                            else {
                                td.text(x);
                            }
                        }
                        else {
                            td.text("");
                        }

                        break;
                    case "decimal":
                        // 2013-12-11 - Se verifica si el campo es null, para
                        // no aplicar el metodo Number que convierte null en 0

                        if (fila[Campo] != null) {
                            var x = Number(fila[Campo]);
                            var Formato = $(this).attr("data-formato");

                            if (Formato != undefined && Formato != "") {
                                td.text(x.formato(Formato));
                            }
                            else {
                                td.text(x);
                            }
                        }
                        else {
                            td.text("");
                        }

                        break;
                    case "datetime":

                        if (fila[Campo] != null) {
                            // 2013-09-02 - Se le da formato manualmente a la fecha para que sea mostrada tal y como es recibida.
                            var arr = fila[Campo].split("T");
                            var re = new RegExp("-", "g"); // Creamos expresion regular para remplazar “-” por “/”
                            var fecha_barra = arr[0].replace(re, "/"); // reemplazamos
                            fecha = new Date(fecha_barra + " " + arr[1]);
                            var Formato = $(this).attr("data-formato");

                            if (Formato != undefined && Formato != "") {
                                td.text(fecha.formato(Formato));
                            }
                            else {
                                td.text(fecha.toLocaleString());
                            }
                        }
                        else {
                            td.text("");
                        }

                        break;
                    case "bool":

                        var icono = $(document.createElement('i'));

                        if (fila[Campo] == false || fila[Campo] == 0 || fila[Campo] == null) {
                            icono.addClass("glyphicon glyphicon-remove");
                        }
                        else {
                            icono.addClass("glyphicon glyphicon-ok");
                        }

                        td.append(icono);

                        break;
                    case "checkbox":

                        var checkbox = $(document.createElement('input'));
                        checkbox.attr("type", "checkbox");
                        checkbox.addClass("info");

                        td.append(checkbox);

                        if (fila[Campo] != false && fila[Campo] != 0 && fila[Campo] != null) {
                            checkbox.attr("checked", true);
                        }

                        break;
                    case "foto":
                        var img = $(document.createElement('img'));

                        img.addClass("img-polaroid");
                        img.css("height", "80px");
                        img.css("width", "60px");
                        img.attr("src", fila[Campo]);

                        td.append(img);

                        break;
                    case "html":
                        if (fila[Campo] != null) {
                            td.html(fila[Campo]);
                        } else {
                            td.html("");
                        }

                        break;
                }

                if (VerticalAlineacion == "middle") {

                    td.css("vertical-align", "middle");
                }

                if (Alineacion == "centro") {

                    td.css("text-align", "center");
                }
                else if (Alineacion == "derecha") {

                    td.css("text-align", "right");
                }

                tr.append(td);
            }
        });

        $("#" + Tabla + " > tbody").append(tr);
    });

    // Mostrar la manita sobre cada fila

    $("#" + Tabla + "[data-seleccion=true] > tbody").css("cursor", "pointer");

    // Mostrar mensaje cuando no hay filas

    if (datos.size() == 0) {

        var Columnas = $("#" + Tabla + " > thead > tr > th").size();
        var tr = $(document.createElement('tr'));
        var td = $(document.createElement('td'));

        td.attr("colspan", Columnas);
        td.text("No hay filas para mostrar.");
        tr.append(td);

        $("#" + Tabla + " > tbody").append(tr);
    }
}

// Evento - Filtrar la tabla

$("div.form-search > input.search-query").keydown(function (event) {
    if (event.which == 13) {
        event.preventDefault();
    }
});

$("div.form-search > input.search-query").keyup(function (event) {
    var tabla = $(this).parent().attr("data-tabla");
    var Buscar = $(this).val();
    var Fuente = $("#" + tabla).attr("data-fuente");

    // Determinar el orden

    var asc = $("#" + tabla + " > thead > tr > th > i.glyphicon-chevron-up").parent();
    var desc = $("#" + tabla + " > thead > tr > th > i.glyphicon-chevron-down").parent();
    var Columna = null;
    var tipo = null;
    var orden;

    if (asc.size() > 0) {

        Columna = asc.attr("data-campo");
        tipo = asc.attr("data-tipo");
        orden = true;
    }
    else if (desc.size() > 0) {

        Columna = desc.attr("data-campo");
        tipo = desc.attr("data-tipo");
        orden = false;
    }

    // Reiniciar la paginacion

    $("div.pagination > ul[data-tabla=" + tabla + "] > li.active").removeClass("active");

    var Datos = FiltrarFilas(Buscar, Fuente);
    OrdenarFilas(Datos, Columna, tipo, orden);
    CalcularPaginas(tabla, Datos);
    GenerarFilas(tabla, Datos);
});

// Evento - Ordenar la tabla

$("table[data-orden=true] > thead > tr > th").click(function () {

    if ($(this).text() != "") {
        var tabla = $(this).parent().parent().parent().attr("id");
        var tipo = $(this).attr("data-tipo");
        var campo = $(this).attr("data-campo");
        var orden = $(this).children("i").hasClass("glyphicon-chevron-up");
        var Fuente = $("#" + tabla).attr("data-fuente");

        $(this).siblings().children("i").removeClass("glyphicon glyphicon-chevron-up");
        $(this).siblings().children("i").removeClass("glyphicon glyphicon-chevron-down");

        if (orden == true) {
            $(this).children("i").removeClass("glyphicon glyphicon-chevron-up");
            $(this).children("i").addClass("glyphicon glyphicon-chevron-down");
            orden = false;
        }
        else {
            $(this).children("i").removeClass("glyphicon glyphicon-chevron-down");
            $(this).children("i").addClass("glyphicon glyphicon-chevron-up");
            orden = true;
        }

        // Filtrar, ordenar, calcular y generar

        var Buscar = $("div.form-search[data-tabla=" + tabla + "] > input").val();

        var Datos = FiltrarFilas(Buscar, Fuente);
        OrdenarFilas(Datos, campo, tipo, orden);
        CalcularPaginas(tabla, Datos);
        GenerarFilas(tabla, Datos);
    }
});

// Evento - Calcular las paginas de la tabla

$(document).on("click", "div.pagination > ul > li", function () {

    if ($(this).hasClass("disabled") == false && $(this).hasClass("active") == false) {

        var p = Number($(this).text());

        if (isNaN(p) == false) {

            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        }
        else {

            var html = $("a", this).html();

            if (html == String.fromCharCode(171)) {

                p = $(this).siblings("li.active");

                p.removeClass("active");
                p.prev().addClass("active");
            }
            else if (html == String.fromCharCode(187)) {

                p = $(this).siblings("li.active");

                p.removeClass("active");
                p.next().addClass("active");
            }
            else {

                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
        }

        // Valores para actualizar la tabla

        var tabla = $(this).parent().attr("data-tabla");
        var Buscar = $("div.form-search[data-tabla=" + tabla + "] > input").val();
        var Fuente = $("#" + tabla).attr("data-fuente");

        var asc = $("#" + tabla + " > thead > tr > th > i.glyphicon-chevron-up");
        var desc = $("#" + tabla + " > thead > tr > th > i.glyphicon-chevron-down");
        var Columna = null;
        var tipo = null;
        var orden;

        if (asc.size() > 0) {

            Columna = asc.parent().attr("data-campo");
            tipo = asc.parent().attr("data-tipo");
            orden = true;
        }
        else if (desc.size() > 0) {

            Columna = desc.parent().attr("data-campo");
            tipo = desc.parent().attr("data-tipo");
            orden = false;
        }

        // Filtrar, ordenar, calcular y generar

        var Datos = FiltrarFilas(Buscar, Fuente);
        OrdenarFilas(Datos, Columna, tipo, orden);
        CalcularPaginas(tabla, Datos);
        GenerarFilas(tabla, Datos);
    }

    return false;
});

// Agregar iconos al encabezado

$("table[data-orden=true] > thead > tr > th").append('<i class="pull-right"></i>');

// Agregar evento a la fila

$("table[data-orden=true] > tbody > tr > td > ").append('<i class="pull-right"></i>');

// Se utiliza para eliminar acentos al texto al momento de buscar.
var defaultDiacriticsRemovalMap = [
    { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
    { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
    { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
    { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
    { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
    { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
    { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
    { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
    { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
    { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
];

function removeDiacritics(str) {
    if (str != null) {
        str = str + "";
        var changes;
        if (!changes) {
            changes = defaultDiacriticsRemovalMap;
        }
        for (var i = 0; i < changes.length; i++) {
            try {
                str = str.replace(changes[i].letters, changes[i].base);
            }
            catch (err) {
                str = null;
            }
        }
        return str;
    } else {
        return str;
    }
}