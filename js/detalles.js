var PA = new Array();
var valida = 0;
 var datos53;
 var datos19;

function verDetalles1()
{
    if(valida == 0)
        {
             $.mobile.changePage( "index.html#detalles-cobranza", { transition: "slideup", changeHash: true });
    
    
    $("#LoadingImage4").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/CR.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess40
            });  
            valida= 1;
        }
    else if(valida == 1)
        {
            $.mobile.changePage( "index.html#detalles-cobranza", { transition: "slideup", changeHash: true });
        }    
}

function onSuccess40(data)
{
    
   
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        vancho = ancho - 40;
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
        
        
        
       datos19 = new google.visualization.DataTable();
            datos19.addColumn('string','Mes');
            datos19.addColumn('number','Facturación');
            datos19.addColumn('number','Cobranza');
            datos19.addColumn('number','C. Regular');
        
        for(var j=tam1;j>0;j--)
                    {
                        datos19.addRows([
                            [datos16[2][j-1],datos4[1][j],datos4[2][j],datos4[3][j]]
                            ]);
                    }
        
        cargarAnteriores();
       // alert("datos1 cargados");
    }
}

function cargarAnteriores()
{
     $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza3.0/CP.php",
            data: ({}),
            cache: false,
            dataType: "text",
            success: onSuccess41
            });  
}

function onSuccess41(data)
{
     $("#LoadingImage4").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var cadena = "";
        k=0;
        for(var i=0;i<data.length;i++)
            {
                if(data.charAt(i)!='#')
                    {
                        cadena = cadena + data.charAt(i);
                    }
                else{
                    PA[k] = cadena;
                    cadena = "";
                    k++;
                    i++;
                }
            } 
    }
    
    var cobra = new Array(cobranza.length);
    var fechaaux = new Array(fechas.length);
    var cobRegular = new Array(cobranzaRegular.length);
    var por1 = new Array(cobranzaRegular.length);
    var cobPeriodo = new Array(PA.length);
    var por2 = new Array(cobranzaRegular.length);
    for(var i=0;i<cobranza.length;i++)
        {
            cobra[i] = obtenerValor1(String(parseFloat(cobranza[i])));
            fechaaux[i] = cargarMeses2(fechas[i]);
            cobRegular[i] = obtenerValor1(String(parseFloat(cobranzaRegular[i])));
            por1[i] = obtenerValor1(String(Math.round(((parseFloat(cobranzaRegular[i])*100)/parseFloat(cobranza[i]))*100)/100)) + "%";
            cobPeriodo[i] = obtenerValor1(String(parseFloat(PA[i])));
            por2[i] = String(Math.round(((parseFloat(PA[i])*100)/parseFloat(cobranza[i]))*100)/100) + "%";
        }    
   datos53 = new google.visualization.DataTable();
                datos53.addColumn('string','Mes');
                datos53.addColumn('string','Recaudación');
                datos53.addColumn('string','C. Regular');
                datos53.addColumn('string','%');
                datos53.addColumn('string','C. Periodo');
                datos53.addColumn('string','%');
                for(var j=0;j<cobranza.length;j++)
                    {
                        datos53.addRows([
                            [fechaaux[j],cobra[j],cobRegular[j],por1[j],cobPeriodo[j],por2[j]]
                            ]);
                    }
    dibujar13(datos19);
    dibujar52(datos53);
     $("#tabla7").show();
   $("#charts3").show();
    $("#leyenda6").show();
    
}

function dibujar13(x)
{
    var ancho= $(window).width();
    ancho = ancho + 40;
    var datos = x;
    var opciones = {'title':'Facturación, Recaudación y C. Regular',
                    'width':ancho,
                    'backgroundColor':'#eee',
                    'height':300,
                    backgroundColor:'#F6F6F6',
                    legend:{position: 'none'},
                    colors: ['#4285F4','#DB4437','#F4B400']};     
    var grafica =   new  google.visualization.ColumnChart(document.getElementById('charts3'));
    grafica.draw(datos,opciones);
}

function dibujar52(x)
{
    var ancho= $(window).width();
    ancho = ancho - 40;
    var datos = x;
    var opciones = {'title':'Facturación por Recibo',
                                    'width':ancho,
                                    'height':300,
                                    colors: ['#78123A']};          
                    var grafica =   new  google.visualization.Table(document.getElementById('tabla7'));
                    grafica.draw(datos,opciones);
}

function grafica()
{
    dibujar13(datos19);
    dibujar52(datos53);
    $("#leyenda6").show();

}

function actualiza()
{
   $("#tabla7").hide();
   $("#charts3").hide();
   $("#leyenda6").hide();
    valida=0;
    verDetalles1();
}