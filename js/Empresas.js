var empresas2 = new Array();
var fechasEmpresa = new Array();
var MEmpresa = new Array();
var datos38;
var datos381;
var datos385;
var datos386;
var datoscadena1; 
var datoscadena; 
var datoscadena3; 
var datoscadena4; 
var var12 = 0;
var EmpresaSeleccionad = "";
var y ="";

function cargarEmpresas()
{
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/empresas.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess70
            });  
    
}

function onSuccess70(data)
{
    var k = 0;
    var cadena = "";
    if(data=="")
        {
            alert("Error al cargar la data");
        }
    else
        {
            for(var i=0;i<data.length;i++)
                {
                    if(data.charAt(i) != "#")
                        {
                            cadena = cadena + data.charAt(i);
                        }
                    else
                        {
                            empresas2[k] = cadena;
                            cadena = "";
                            k++;
                            i++;
                        }
                }
        }

    
    for(var i = 0;i<empresas2.length;i++)
        {
           var variable2 = new Option(empresas2[i],"value","defaultSelected","selected");
        document.getElementById("myselect8").options[i] = variable2;
        }
    $.mobile.changePage( "index.html#cobranzaxEmpresa", { transition: "slideup", changeHash: true });
}


function empresasPorFechas()
{
    var x1=document.getElementById('myselect8').selectedIndex;
    if(x1 < 0)
        {
            x1 = 1;
           // EmpresaSeleccionad = document.getElementById('myselect8').value;
        }
    else
        {
            x1 = x1 +1;
            //EmpresaSeleccionad = "SATT";
        }
    EmpresaSeleccionad = empresas2[x1-1];
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/Efechas.php",
            data: ({empresa:x1}),
            cache: false,
            dataType: "text",
            success: onSuccess76
            });  
}


function onSuccess76(data)
{

    if(data=="")
        {
            alert("Los datos nos e cargaron correctamente");
        }
    else if(data =="$$$$$$$$")
        {
            alert("La empresa no tiene recaudado nada hasta el momento")
            $("#charts6").hide();
            $("#tabla9").hide();
        }
    else
        {
            var k=0;
            var cadena = "";
            for(var i=0;i<data.length;i++)
                {
                    if(data.charAt(i) != "$")
                        {
                            cadena = cadena + data.charAt(i);
                        }
                    else{
                        fechasEmpresa[k] = cadena;
                        cadena ="";
                        k++;
                        i++;
                    }
                }
            
            var Porcentaje = new Array(fechasEmpresa.length);
            Porcentaje[0] = "0.00";
            datoscadena = new Array(fechasEmpresa.length); 
            
            for(var i=0;i<fechasEmpresa.length;i++)
                {
                    datoscadena[i] = parseFloat(fechasEmpresa[i]);
                    Porcentaje[i] = parseFloat(fechasEmpresa[i+1]-fechasEmpresa[i]);
                }
            
            
            datos38 = new google.visualization.DataTable();
                datos38.addColumn('string','Mes');
                datos38.addColumn('number','Cobranza');
                for(var j=0;j<fechasEmpresa.length;j++)
                    {
                        datos38.addRows([
                            [datos16[2][j],datoscadena[j]]
                            ]);
                    }
             y = "Cobranza "+ EmpresaSeleccionad+" A la Fecha Actual";
            dibujar234(datos38,y);
            
            datoscadena1 = new Array(fechasEmpresa.length);
            
            for(var i=0;i<fechasEmpresa.length;i++)
                {
                    if(fechasEmpresa[i] == "")
                        {
                            datoscadena1[i] = "0.00";
                        }
                    else
                        {
                             datoscadena1[i] = obtenerValor1(String(parseFloat(fechasEmpresa[i])));
                        }
                    
                   
                }
            
             datos381 = new google.visualization.DataTable();
                datos381.addColumn('string','Mes');
                datos381.addColumn('string','Cobranza');
                for(var j=0;j<fechasEmpresa.length;j++)
                    {
                        datos381.addRows([
                            [ayuda1223[j],datoscadena1[j]]
                            ]);
                    }
           
            dibujar235(datos381);
             $("#charts6").show();
            $("#tabla9").show();
            $("#leyenda9").show();
            var12 = 1;
        }
}

function empresasMensual()
{
    var x1=document.getElementById('myselect8').selectedIndex;
    if(x1 < 0)
        {
            x1 = 1;
        }
    else
        {
            x1 = x1 +1;
        }
    EmpresaSeleccionad = empresas2[x1-1];
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/EMensual.php",
            data: ({empresa:x1}),
            cache: false,
            dataType: "text",
            success: onSuccess75
            });  
}

function onSuccess75(data)
{
    if(data=="")
        {
            alert("Los datos no se cargaron correctamente");
        }
     else if(data =="$$$$$$$$")
        {
            alert("La empresa no tiene recaudado nada hasta el momento")
            $("#charts6").hide();
            $("#tabla9").hide();
        }
    else
        {
            var k=0;
            var cadena = "";
            for(var i=0;i<data.length;i++)
                {
                    if(data.charAt(i) != "$")
                        {
                            cadena = cadena + data.charAt(i);
                        }
                    else{
                        MEmpresa[k] = cadena;
                        cadena ="";
                        k++;
                        i++;
                    }
                }
            
            datoscadena3 = new Array(MEmpresa.length); 
            
            
            for(var i=0;i<MEmpresa.length;i++)
                {
                    datoscadena3[i] = parseFloat(MEmpresa[i]);
                    //Porcentaje[i] = parseFloat(fechasEmpresa[i+1]-fechasEmpresa[i]);
                }
            
            
            datos385 = new google.visualization.DataTable();
                datos385.addColumn('string','Mes');
                datos385.addColumn('number','Cobranza');
                for(var j=0;j<MEmpresa.length;j++)
                    {
                        datos385.addRows([
                            [datos16[2][j],datoscadena3[j]]
                            ]);
                    }
            y = "Cobranza "+ EmpresaSeleccionad+" Mensual";
            dibujar234(datos385,y);
            
            datoscadena4 = new Array(MEmpresa.length);
            
            for(var i=0;i<MEmpresa.length;i++)
                {
                    if(MEmpresa[i] == "")
                        {
                            datoscadena4[i] = "0.00";
                        }
                    else
                        {
                            datoscadena4[i] = obtenerValor1(String(parseFloat(MEmpresa[i])));
                        }
                    
                }
            
             datos386 = new google.visualization.DataTable();
                datos386.addColumn('string','Mes');
                datos386.addColumn('string','Cobranza');
                for(var j=0;j<MEmpresa.length;j++)
                    {
                        datos386.addRows([
                            [ayuda1223[j],datoscadena4[j]]
                            ]);
                    }
            
            dibujar235(datos386);
             $("#charts6").show();
            $("#tabla9").show();
            $("#leyenda9").show();
            
            var12 = 1;
        }
}

function dibujar234 (valor,y)
{
    var ancho= $(window).width();
        var ancho = ancho + 20;
    var datos1= valor;
    var opciones = {'title':y,
                    'width':ancho,
                    backgroundColor:'#F6F6F6',
                    legend:{position: 'none'},
                    colors: ['#F5821F'],
                    'height':400};     
    grafica3 =  new  google.visualization.ColumnChart(document.getElementById('charts6'));
    grafica3.draw(datos1,opciones);
}
function dibujar235 (valor)
{
    var ancho= $(window).width();
        var ancho = ancho - 40;
    var datos1= valor;
    var opciones = {'title':'Cobranza por Empresa',
                    'width':ancho,
                    'height':400};     
    grafica3 =  new  google.visualization.Table(document.getElementById('tabla9'));
    grafica3.draw(datos1,opciones);
}

function redibujar()
{
    if(var12 == 0)
        {
            alert("Debe graficar por Fechas o Meses antes");
        }
    else{
        dibujar234(datos38);
        dibujar235(datos381);
    }
    
   
}