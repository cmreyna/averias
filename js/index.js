var tam1 = 0;
var fechas = new Array();
var facturacion = new Array();
var cobranza = new Array();
var cobranzaRegular =  new Array();
 var datos16;
 var dato45;
var dato46;
var ayuda1223;
/*function verCF()
{
    $("#LoadingImage2").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/consulta-cobranza2.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess1
            });  
}

function onSuccess1(data)
{
    
    $("#LoadingImage2").hide();
    
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        vancho = ancho - 40;
        var alto = $(window).height();
        var alto = alto - 50;
        var fechas = new Array();
        var facturacion = new Array();
        var cobranza = new Array();
        var CReal = new Array();
        var cad = "";var cad1 = ""; var cad2 = "";var cad3 = "";
        var cont = 0; var cont1 = 0; var cont2 = 0; var cont3 = 0;
        var k = 0;
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!= "|" && k<4)
                    {
                        cad = cad + data.charAt(i);
                    }
                else if(data.charAt(i) != "$" && k >= 4 && k<8)
                    {
                        cad1 = cad1 + data.charAt(i);
                    }
                else if(data.charAt(i) != "*" && k >=8 && k<12)
                    {
                        cad2 = cad2 + data.charAt(i);
                    }
                else if(data.charAt(i) != "#" && k >=12)
                    {
                        cad3 = cad3 +  data.charAt(i);
                    }
                else if(data.charAt(i) == "|" && k<4)
                    {
                        fechas[cont] = cad;
                        cont++;
                        i++;
                        k++;
                        cad = "";
                    }
                else if(data.charAt(i) == "$" && k>=4 && k<8)
                    {
                        facturacion[cont1] = cad1;
                        cont1++;
                        k++;
                        i++;
                        cad1 = "";
                    }
                else if(data.charAt(i) == "*" && k>=8 && k<12)
                    {
                        cobranza[cont2] = cad2;
                        cad2 = "";
                        i++;
                        k++;
                        cont2++;
                    }
                else if(data.charAt(i) == "#" && k>=12)
                    {
                        CReal[cont3] = cad3;
                        cad3 = "";
                        i++;
                        k++;
                        cont3++;
                    }
            }
         tam1 = fechas.length;
        datos4 = new Array(new Array(tam1+1), new Array(tam1+1), new Array(tam1+1), new Array(tam1+1));
        datos4[0][0] = "Fechas";
        datos4[1][0] = "Facturación";
        datos4[2][0] = "Recaudación Mes";
        datos4[3][0] = "C. Regular";
        
         for(var i = 1; i<tam1+1; i++)
            {
                datos4[0][i] = fechas[i-1];
                datos4[1][i] = parseFloat(facturacion[i-1]);
                datos4[2][i] = parseFloat(cobranza[i-1]);
                localStorage.setItem('cobraMes'+String(i),datos4[2][i]);
                datos4[3][i] = parseFloat(CReal[i-1]);
            }
        alert("Graficos cargados Correctamente");
        verificar = 1;
        graficarMontos1();
        $("#btns").show();
    }
    
}*/

function graficarMontos()
{
    var ancho= $(window).width();
    ancho = ancho - 40;
    if(verificar == 1)
        {
    var grafica;
        var x1=document.getElementById('myselect1').selectedIndex;
        if(x1 == 0)
            {
                grafica =   new  google.visualization.ColumnChart(document.getElementById('charts1'));
            }
        else if(x1 == 1)
            {
                grafica =   new  google.visualization.BarChart(document.getElementById('charts1'));
            }
        else if(x1 == 2)
            {
                grafica =   new  google.visualization.ComboChart(document.getElementById('charts1'));
            }
        else if(x1==3){
             grafica =   new  google.visualization.AreaChart(document.getElementById('charts1'));
            }
        else
            {
                var container = document.getElementById('charts1')
                grafica =   new  google.visualization.LineChart(container);
            }
        var datos16 = new Array(new Array(tam1),new Array(tam1),new Array(tam1),new Array(tam1),new Array(tam1));
             for(var i = 0;i <tam1;i++)
            {
                datos16[2][i] = cargarMeses2(datos4[0][i+1]);
                datos16[0][i] = obtenerValor1(String(datos4[1][i+1]));
                var Porcentaje = Math.round(((datos4[2][i+1]*100)/datos4[1][i+1])*100)/100;
                datos16[1][i] = obtenerValor1(String(datos4[2][i+1])) + " -> " + String(Porcentaje)+"%";
                datos16[3][i] = obtenerValor1(String(Math.round(((datos4[1][i+1] - datos4[2][i+1])*100)/100))); 
                datos16[4][i] = obtenerValor1(String(datos4[3][i+1]));
            }
            
        var datos3 = new google.visualization.DataTable();
                datos3.addColumn('string','Mes');
                datos3.addColumn('number','Facturacion');
                datos3.addColumn('number','Recaudación Mes');
                datos3.addColumn('number','C.Regular');
                for(var j=tam1;j>0;j--)
                    {
                        datos3.addRows([
                            [datos16[2][j-1],datos4[1][j],datos4[2][j],datos4[3][j]]
                            ]);
                    }
            
        dibujar3(datos3,ancho,grafica);
            
            
            var datos13 = new google.visualization.DataTable();
                datos13.addColumn('string','Mes');
                datos13.addColumn('string','Facturacion');
                datos13.addColumn('string','Cobranza');
                datos13.addColumn('string','Saldo');
                for(var j=1;j<tam1+1;j++)
                    {
                        datos13.addRows([
                            [datos16[2][j-1],datos16[0][j-1],datos16[1][j-1],datos16[3][j-1]]
                            ]);
                    }
        dibujar4(datos13,ancho);
            }
    else
        {
            alert("De primero en el boton de Cargar Montos");
        }
        
}


function graficarMontos1()
{
    var ancho= $(window).width();
    ancho = ancho - 40;
    if(verificar == 1)
        {
    var grafica;
        var x1=document.getElementById('myselect1').selectedIndex;
        if(x1 == 0)
            {
                grafica =   new  google.visualization.ColumnChart(document.getElementById('charts1'));
            }
        else if(x1 == 1)
            {
                grafica =   new  google.visualization.BarChart(document.getElementById('charts1'));
            }
        else if(x1 == 2)
            {
                grafica =   new  google.visualization.ComboChart(document.getElementById('charts1'));
            }
        else if(x1==3){
             grafica =   new  google.visualization.AreaChart(document.getElementById('charts1'));
            }
        else
            {
                var container = document.getElementById('charts1')
                grafica =   new  google.visualization.LineChart(container);
            }
        datos16 = new Array(new Array(tam1),new Array(tam1),new Array(tam1),new Array(tam1),new Array(tam1));
             for(var i = 0;i <tam1;i++)
            {
                datos16[2][i] = cargarMeses2(datos4[0][i+1]);
                datos16[0][i] = obtenerValor1(String(datos4[1][i+1]));
                var Porcentaje = Math.round(((datos4[2][i+1]*100)/datos4[1][i+1])*100)/100;
                datos16[4][i] = String(Porcentaje)+"%";
                datos16[1][i] = obtenerValor1(String(datos4[2][i+1]));
                datos16[3][i] = obtenerValor1(String(Math.round(((datos4[1][i+1] - datos4[2][i+1])*100)/100))); 
            }
            
        var datos3 = new google.visualization.DataTable();
                datos3.addColumn('string','Mes');
                datos3.addColumn('number','Facturacion');
                datos3.addColumn('number','Recaudación Mes');
                for(var j=tam1;j>0;j--)
                    {
                        datos3.addRows([
                            [datos16[2][j-1],datos4[1][j],datos4[2][j]]
                            ]);
                    }

            ayuda1223 = new Array(tam1);            
            for(var i = 0;i <tam1;i++)
                {
                    ayuda1223[i] = cargarMeses3(datos4[0][i+1]);
                }
            
        dibujar3(datos3,ancho,grafica);
            
            document.getElementById('Mes_1').innerHTML = ayuda1223[0];
            document.getElementById('Mes_2').innerHTML = ayuda1223[1];
            document.getElementById('Mes_3').innerHTML = ayuda1223[1];
            document.getElementById('Mes_4').innerHTML = ayuda1223[2];
            document.getElementById('Mes_5').innerHTML = ayuda1223[0];
            document.getElementById('Mes_6').innerHTML = ayuda1223[3];
            document.getElementById('Monto_1').innerHTML = datos16[1][0];
            document.getElementById('Monto_2').innerHTML = datos16[1][1];
            document.getElementById('Monto_3').innerHTML = datos16[1][1];
            document.getElementById('Monto_4').innerHTML = datos16[1][2];
            document.getElementById('Monto_5').innerHTML = datos16[1][0];
            document.getElementById('Monto_6').innerHTML = datos16[1][3];
            
            document.getElementById('diferencia_1').innerHTML = obtenerValor1(String((Math.round((datos4[2][1]-datos4[2][2])*100))/100));
            document.getElementById('diferencia_2').innerHTML = obtenerValor1(String((Math.round((datos4[2][2]-datos4[2][3])*100))/100));
            document.getElementById('diferencia_3').innerHTML = obtenerValor1(String((Math.round((datos4[2][1]-datos4[2][4])*100))/100));
            
            
            
            var datos13 = new google.visualization.DataTable();
                datos13.addColumn('string','Mes');
                datos13.addColumn('string','Facturacion');
                datos13.addColumn('string','Cobranza');
                datos13.addColumn('string','%');
                datos13.addColumn('string','Saldo');
                for(var j=1;j<tam1+1;j++)
                    {
                        datos13.addRows([
                            [ayuda1223[j-1],datos16[0][j-1],datos16[1][j-1],datos16[4][j-1],datos16[3][j-1]]
                            ]);
                    }
        dibujar4(datos13,ancho);
            }
    else if(verificar == 2)
        {
            graficarMonto2(dato45);
            graficarMonto3(dato46);
        }
    
    else
        {
            alert("De primero en el boton de Cargar Montos");
        }
        
}



function cargarMeses1()
{
    if(verificar == 1 || verificar == 2)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#facturacion", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    alert(cadena);
    var variable2 = new Option(cadena,"value","defaultSelected","selected");
    document.getElementById("myselect").options[valor] = variable2;
}


function cargarMeses2(valor)
{
    
    var respuesta = "";
    var cad1 = "";
    var cad2 = "";
    var k = 0;
    for(var i = 0; i<valor.length;i++)
        {
            if(valor.charAt(i) != '/' && k==0)
            {
                cad1 = cad1 + valor.charAt(i);
            }
            else if(valor.charAt(i)  != '/' && k == 1)
            {
                cad2 = cad2 + valor.charAt(i);
            }
            else if(valor.charAt(i) == '/'){
                 k++;
            }
        }
    respuesta = colocar2(cad1,cad2);
    return respuesta;
}


function colocar2(cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENE - ";
        }
    else if(cad == '02')
        {
            cadena = "FEB - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MAR - ";
        }
    else if(cad == '04')
        {
            cadena = "ABR - ";
        }
    else if(cad == '05')
        {
            cadena = "MAY - ";
        }
    else if(cad == '06')
        {
            cadena = "JUN - ";
        }
    else if(cad == '07')
        {
            cadena = "JUL - ";
        }
    else if(cad == '08')
        {
            cadena = "AGO - ";
        }
    else if(cad == '09')
        {
            cadena = "SET - ";
        }
    else if(cad == '10')
        {
            cadena = "OCT - ";
        }
    else if(cad == '11')
        {
            cadena = "NOV - ";
        }
    else if(cad == '12')
        {
            cadena = "DIC - ";
        }
    cad1 = cad1;
    cadena = cadena + cad1;
    return cadena;
}


function cargarMeses3(valor)
{
    
    var respuesta = "";
    var cad1 = "";
    var cad2 = "";
    var k = 0;
    for(var i = 0; i<valor.length;i++)
        {
            if(valor.charAt(i) != '/' && k==0)
            {
                cad1 = cad1 + valor.charAt(i);
            }
            else if(valor.charAt(i)  != '/' && k == 1)
            {
                cad2 = cad2 + valor.charAt(i);
            }
            else if(valor.charAt(i) == '/'){
                 k++;
            }
        }
    respuesta = colocar3(cad1,cad2);
    return respuesta;
}


function colocar3(cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENE - ";
        }
    else if(cad == '02')
        {
            cadena = "FEB - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MAR - ";
        }
    else if(cad == '04')
        {
            cadena = "ABR - ";
        }
    else if(cad == '05')
        {
            cadena = "MAY - ";
        }
    else if(cad == '06')
        {
            cadena = "JUN - ";
        }
    else if(cad == '07')
        {
            cadena = "JUL - ";
        }
    else if(cad == '08')
        {
            cadena = "AGO - ";
        }
    else if(cad == '09')
        {
            cadena = "SET - ";
        }
    else if(cad == '10')
        {
            cadena = "OCT - ";
        }
    else if(cad == '11')
        {
            cadena = "NOV - ";
        }
    else if(cad == '12')
        {
            cadena = "DIC - ";
        }
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    return cadena;
}


function cargarMeses1()
{
    if(verificar == 1 || verificar==2)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#facturacion", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cad1 = "20"+cad1;
    cadena = cadena + cad1;
    var variable2 = new Option(cadena,"value","defaultSelected");
    document.getElementById("myselect").options[valor] = variable2;
}

function cargarMeses()
{
    if(verificar == 1 || verificar==2)
        {
    for(var i = 1; i<tam1+1;i++)
        {
            var cad1 = "";
            var cad2 = "";
            var ayuda = datos4[0][i];
            var k = 0;
            for(var j = 0; j<ayuda.length;j++)
                {
                    if(ayuda.charAt(j) != '/' && k==0)
                        {
                            cad1 = cad1 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j)  != '/' && k == 1)
                        {
                            cad2 = cad2 + ayuda.charAt(j);
                        }
                    else if(ayuda.charAt(j) == '/'){
                        k++;
                    }
                }
            colocar1(i-1,cad1,cad2);
        }
            $.mobile.changePage( "index.html#cobranza", { transition: "slideup", changeHash: true });
            
            }
    else
        {
            alert("Debe Cargar Datos Primero");
        }
}

function colocar1(valor, cad, cad1)
{
    var cadena = "";
    if(cad == '01')
        {
            cadena = "ENERO - ";
        }
    else if(cad == '02')
        {
            cadena = "FEBRERO - ";
        }
    
    else if(cad == '03')
        {
            cadena = "MARZO - ";
        }
    else if(cad == '04')
        {
            cadena = "ABRIL - ";
        }
    else if(cad == '05')
        {
            cadena = "MAYO - ";
        }
    else if(cad == '06')
        {
            cadena = "JUNIO - ";
        }
    else if(cad == '07')
        {
            cadena = "JULIO - ";
        }
    else if(cad == '08')
        {
            cadena = "AGOSTO - ";
        }
    else if(cad == '09')
        {
            cadena = "SETIEMBRE - ";
        }
    else if(cad == '10')
        {
            cadena = "OCTUBRE - ";
        }
    else if(cad == '11')
        {
            cadena = "NOVIEMBRE - ";
        }
    else if(cad == '12')
        {
            cadena = "DICIEMBRE - ";
        }
    
    cadena = cadena + "20"+cad1;
    var variable2 = new Option(cadena,"value","defaultSelected");
    document.getElementById("myselect4").options[valor] = variable2;
}

function ingresoUsuarioValido()
{
    var name=document.getElementById('txt-email').value;
    name = name.toUpperCase();
    var pass = document.getElementById('txt-pass').value;
    localStorage.setItem("nombre1",name);
    localStorage.setItem("contrasenia",pass);
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/login.php",
            data: ({nom:name,psw:pass}),
            cache: false,
            dataType: "text",
            success: onSuccess6
            });
    
    $("#tipo-moneda").hide();
    
}

function onSuccess6(data)
{
    if(data == "")
        {
            alert("Usuario y contraseña no valido");
            $.mobile.changePage( "index.html", {
            transition: "slide",
            reverse: false,
            changeHash: true
            });
            document.getElementById('txt-email').value = "";
            document.getElementById('txt-pass').value = "";
        }
    else{
        
        alert("BIENVENIDO " + data);
        localStorage.setItem('usuario',data);
            $.mobile.changePage( "index.html#inicio", {
            transition: "slide",
            reverse: false,
            changeHash: true
            });       
        document.getElementById("nom-user").innerHTML = localStorage.getItem('usuario');
        VerFacturas();
    }
    
}

function VerFacturas()
{
    $("#btns").hide();
    $('#charts1').hide();
    $('#tabla342').hide();
    $('#leyenda5').hide();
    $('#table2').hide();
    $("#LoadingImage2").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/facturacion.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess10
            });
}

function onSuccess10(data)
{

    $("#LoadingImage2").hide();
    
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        vancho = ancho - 40;
        var alto = $(window).height();
        var alto = alto - 50;
        var cad = "";var cad1 = "";
        var cont = 0; var cont1 = 0; 
        var k = 0;
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!= "|" && k<4)
                    {
                        cad = cad + data.charAt(i);
                    }
                else if(data.charAt(i) != "$" && k >= 4)
                    {
                        cad1 = cad1 + data.charAt(i);
                    }
                else if(data.charAt(i) == "|" && k<4)
                    {
                        fechas[cont] = cad;
                        cont++;
                        i++;
                        k++;
                        cad = "";
                    }
                else if(data.charAt(i) == "$" && k>=4)
                    {
                        facturacion[cont1] = cad1;
                        cont1++;
                        k++;
                        i++;
                        cad1 = "";
                    }
            }
        tam1 = fechas.length;
        datos4 = new Array(new Array(tam1+1), new Array(tam1+1), new Array(tam1+1), new Array(tam1+1));
        datos4[0][0] = "Fechas";
        datos4[1][0] = "Facturación";
        datos4[2][0] = "Recaudación Mes";
        datos4[3][0] = "C. Regular";
        
         for(var i = 1; i<tam1+1; i++)
            {
                datos4[0][i] = fechas[i-1];
                datos4[1][i] = parseFloat(facturacion[i-1]);
            }   
        cargarCobranza();
    }
}

function  cargarCobranza()
{
     $("#LoadingImage2").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/cobranza.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess11
            });
}

function onSuccess11(data)
{
    var ancho= $(window).width();
        vancho = ancho - 40;
        var alto = $(window).height();
        var alto = alto - 50;
        var cad = "";
        var cont = 0; 
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!= "*")
                    {
                        cad = cad + data.charAt(i);
                    }
                else if(data.charAt(i) == "*" )
                    {
                        cobranza[cont] = cad;
                        cont++;
                        i++;
                        cad = "";
                    }
            }
    for(var i = 1; i<tam1+1; i++)
            {
                datos4[2][i] = parseFloat(cobranza[i-1]);
                localStorage.setItem('cobraMes'+String(i),datos4[2][i]);
            }
    verificar = 1;
    graficarMontos1();
    $("#btns").show();
    $("#LoadingImage2").hide();
    $("#tipo-moneda").show();
    $("#charts1").show();
    $("#leyenda5").show();
    $("#tabla342").show();
    $("#table2").show();
}

function cargarCobranzaRegular()
{
    //$("#LoadingImage2").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/cobranza3.0/cobranzaR.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess12
            });
}

function onSuccess12(data)
{
    //$("#LoadingImage2").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        vancho = ancho - 40;
        var alto = $(window).height();
        var alto = alto - 50;
        var cad = "";
        var cont = 0; 
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!= "#")
                    {
                        cad = cad + data.charAt(i);
                    }
                else if(data.charAt(i) == "#")
                    {
                        cobranzaRegular[cont] = cad;
                        cont++;
                        i++;
                        cad = "";
                    }
            }
        for(var i = 1; i<tam1+1; i++)
            {
                datos4[3][i] = parseFloat(cobranzaRegular[i-1]);
            }
         verificar = 1;
        //graficarMontos();
        alert("datos1 cargados");
        //verDetalles();
    }
}

function verDetalles()
{
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/ayuda2.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess13
            });
}

function onSuccess13(data)
{
    alert("datos Cargados");
    
}