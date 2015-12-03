var fechas1 = new Array();
var factu = new Array();
var cobra = new Array();

function verPorfechas()
{
    
    $("#charts1").hide();
    $("#table2").hide();
    $("#tabla342").hide();
    $("#leyenda5").hide();
    $("#LoadingImage2").show();
    $("#btns").hide();
    var date1 = new Date();
    var dia = date1.getDate();
    var mes = date1.getMonth()+1;
    var anio = date1.getFullYear();
    var anio2 = anio-1;
    anio1 = String(anio);
    anio1 = anio1.charAt(2) + anio1.charAt(3);
    anio3 = String(anio2);
    anio3 = anio3.charAt(2)+anio3.charAt(3);
    mes1 = mes -1;
    mes2 = mes-2;
    if(dia < 10)
        {
            dia = "0"+dia;
        }
    if(mes<10)
        {
            mes = "0"+mes;
        }
    if(mes1<10)
        {
            mes1 = "0"+mes1;
        }
    if(mes2<10)
        {
            mes2 = "0"+mes2;
        }
    fechaActual=dia+"/"+mes+"/"+anio1;
    fechaInicio = "01/"+mes+"/"+anio1;
    fechaActual2 = dia+"/"+mes1+"/"+anio;
    fechaInicio2 = "01/"+mes1+"/"+anio;
    fechaActual3 = dia+"/"+mes2+"/"+anio;
    fechaInicio3 = "01/"+mes2+"/"+anio;
    fechaActual4 = dia+"/"+mes+"/"+anio3;
    fechaInicio4 = "01/"+mes+"/"+anio3;
    fechas1[0] =  fechaActual;
    fechas1[1] =  fechaActual2;
    fechas1[2] =  fechaActual3;
    fechas1[3] =  fechaActual4;
    
    $.ajax({
        type: "POST",
        url: "http://land.sedalib.com.pe/moviles/cobranza3.0/FyCfechas.php",
        data: ({fecha1:fechaInicio,fecha2:fechaActual,fecha3:fechaInicio2,fecha4:fechaActual2,fecha5:fechaInicio3,fecha6:fechaActual3,fecha7:fechaInicio4,fecha8:fechaActual4}),
        cache: false,
        dataType: "text",
        success: onSuccess50 
    });
    
}

function onSuccess50(data)
{
    if(data == "")
        {
            alert("Los datos no fueron cargados correctamente");
        }
    else{
        var cadayuda = "";var cadayuda2 = "";
        var cont = 0;var cont1 = 0;
        var k = 0;
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i) != "$" && k < 4)
                    {
                        cadayuda = cadayuda + data.charAt(i);
                    }
                else if(data.charAt(i)!="*" && k >= 4)
                    {
                        cadayuda2 = cadayuda2 + data.charAt(i);
                    }
                else if(data.charAt(i) == "$" && k<4)
                    {
                        factu[cont] = cadayuda;
                        cont++;i++;k++;
                        cadayuda = "";
                    }
                else if(data.charAt(i) == "*" && k>= 4)
                    {
                        cobra[cont1] = cadayuda2;
                        i++;cont1++;k++;
                        cadayuda2 = "";
                    }
            }
        
        var tam12 = factu.length;
        dato45 = new Array(new Array(tam12+1),new Array(tam12+1),new Array(tam12+1),new Array(tam12+1));
        dato45[0][0] = "Fecha";
        dato45[1][0] = "Facturación";
        dato45[2][0] = "Cobranza";
        dato45[3][0] = "Porcentaje";
        
        for(var i = 1; i<tam12+1;i++)
            {
                dato45[0][i] = fechas1[i-1];
                dato45[1][i] = parseFloat(factu[i-1]);
                dato45[2][i] = parseFloat(cobra[i-1]);
                dato45[3][i] = Math.round(((dato45[2][i]*100)/dato45[1][i])*100)/100;
            }
        
        graficarMonto2(dato45);
    dato46 = new Array(new Array(tam12),new Array(tam12),new Array(tam12),new Array(tam12));
        for(var i = 0; i<tam12;i++)
            {
                dato46[0][i] = fechas1[i];
                dato46[1][i] = obtenerValor3(String(parseFloat(factu[i])));
                dato46[2][i] = obtenerValor3(String(parseFloat(cobra[i])));        
                dato46[3][i] = String(Math.round(((parseFloat(cobra[i])*100)/parseFloat(factu[i]))*100)/100) + "%";
            }
        
        graficarMonto3(dato46);
        verificar =2;
        
    }
}

function graficarMonto2(x)
{
    var ancho= $(window).width();
    ancho = ancho - 40;
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
    
    var datos31 = new google.visualization.DataTable();
    datos31.addColumn('string','Mes');
    datos31.addColumn('number','Facturacion');
    datos31.addColumn('number','Recaudación');
    for(var j=x.length;j>0;j--)
    {
        datos31.addRows([
            [x[0][j],x[1][j],x[2][j]]
            ]);
    }
    
    dibujar34(datos31,ancho,grafica);
}

function dibujar34(x,y,z)
{
    var dia = new Date();
    var d = dia.getDate();
    var opciones = {title:'FACTURACIÓN Y COBRANZA AL '+ d + " DE CADA MES",
                    width:y+50,
                    backgroundColor:'#F6F6F6',
                    legend:{position: 'none'},
                    height:300,
                    colors: ['#4285F4','#DB4437','#F4B400']};          
    z.draw(x,opciones);
    $("#LoadingImage2").hide();
    $("#charts1").show();
    $("#leyenda5").show();
    $("#btns").show();
    
}

function graficarMonto3(x)
{
    var datos34 = new google.visualization.DataTable();
    datos34.addColumn('string','Mes');
    datos34.addColumn('string','Facturacion');
    datos34.addColumn('string','Recaudación');
    datos34.addColumn('string','Porcentaje');
    for(var j=0;j<x.length;j++)
    {
        datos34.addRows([
            [x[0][j],x[1][j],x[2][j],x[3][j]]
            ]);
    }
    var ancho= $(window).width();
    ancho = ancho - 40;
    var grafica;
    var opciones = {'title':'Cobranza',
                    'width':ancho,
                    'height':300,
                    colors: ['#78123A']};          
    var grafica =   new  google.visualization.Table(document.getElementById('table2'));
    grafica.draw(datos34,opciones);
    $("#table2").show();
    
}

function obtenerValor3(valor)
{
    var cadena = "";
    if(valor == "0")
        {
            cadena = "0.00"
        }
    else if(valor.indexOf('.') == -1)
        {
            var p = 0;
            var tam7 = valor.length;
            for(var i = tam7-1;i>=0;i--)
                {
                    if(p == 3)
                        {
                            cadena = "," + cadena;
                        }
                    else if(p == 6){
                        cadena = "'"+cadena;
                    }
                    cadena = valor.charAt(i) + cadena;
                    p++;
                }
            cadena = cadena + ".00";
        }
    else if(valor.indexOf('.') != -1)
        {
            var p = 0;
            var x = valor.indexOf('.');
            for(var i=x-1;i>=0;i--)
                {
                    if(p == 3)
                        {
                            cadena = "," + cadena;
                        }
                    else if(p == 6){
                        cadena = "'"+cadena;
                    }
                    cadena = valor.charAt(i) + cadena;
                    p++;
                }
            for(var i=x;i<valor.length;i++)
                {
                    cadena = cadena + valor.charAt(i);
                }
            
        }
    return cadena;
}