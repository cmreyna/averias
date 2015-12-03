var montofac;
function verFacturacion()
{
    $("#total-fac").hide();
    $("#leyenda7").hide();
    $("#nota").hide();
    document.getElementById('charts').style.display = "none";
    document.getElementById('table1').style.display = "none";
    
    var x=document.getElementById('myselect').selectedIndex;
    var mes;
    var mesinicio;
    var mesfinal;
    var f = new Date();
    if(x == 0)
        {
            var dia = f.getDate();
            if(dia<10)
                {
                    dia = "0"+dia;
                }
            mesfinal = dia+"/"+datos4[0][1];
            mesinicio = "01"+"/"+datos4[0][1];
            montofac = datos4[1][1];
        }
    else if(x == 1)
        {
            var dia1 = verificarDia(2);
            mesfinal = dia1+"/"+datos4[0][2];
            mesinicio = "01"+"/"+datos4[0][2];
             montofac = datos4[1][2];
        }
    else if(x == 2)
        {
            var dia1 = verificarDia(3);
            mesinicio = "01/"+datos4[0][3];
            mesfinal = dia1+"/"+datos4[0][3];
             montofac = datos4[1][3];
        }
    else if(x == 3)
        {
            var dia1 = verificarDia(4);
            mesinicio = "01/"+datos4[0][4];
            mesfinal = dia1+"/"+datos4[0][4];
             montofac = datos4[1][4];
        }
    else{
        if(dia<10)
                {
                    dia = "0"+dia;
                }
        var dia = f.getDate();
        mesfinal = "01"+"/"+datos4[0][1];
        mesinicio = dia+"/"+datos4[0][1];
         montofac = datos4[1][1];
    }
    $("#LoadingImage1").show();
    $.ajax({
            type: "POST",
            url: "http://land.sedalib.com.pe/moviles/cobranza/facturacion1.php",
            data: ({fechai:mesinicio,fechaf:mesfinal}),
            cache: false,
            dataType: "text",
            success: onSuccess
            });        
}

function onSuccess(data)
{
    
    $("#LoadingImage1").hide();
    if(data=="")
        {
            alert("No se obtuvo éxito");
        }
    else{
        var ancho= $(window).width();
        var ancho = ancho - 40;
        var alto = $(window).height();
        var alto = alto - 50;
        //document.getElementById('ver-grafico').width = ancho;
        //document.getElementById('ver-grafico').height = alto;
        
        var montos = new Array();
        var cantidades = new Array();
        var nombres = new Array();

        var cadena="";
        var cadena1 = "";
        var cadena2 = "";
        var k = 0;
        var cont=0;
        var cont1 = 0;
        var cont2 = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data.charAt(i) != "$" && k==0)
                {
                    cadena = cadena + data.charAt(i);
                    k = 0;
                }
            else if(data.charAt(i) != "$" && k==1)
                {
                    cadena1 = cadena1 + data.charAt(i);
                    k = 1;
                }  
            else if(data.charAt(i) != "$" && k==2)
                {
                    cadena2 = cadena2 + data.charAt(i);
                    k = 2;
                }
            else if(data.charAt(i) == "$" && k == 0)
                {  
                    nombres[cont] = cadena;
                    cadena= "";
                    i++;
                    cont++;
                    k=1;
                }
            else if(data.charAt(i) == "$" && k == 1)
                {
                    cantidades[cont1] = cadena1;
                    cadena1 = "";
                    i++;
                    cont1++;
                    k = 2;
                }
            else if(data.charAt(i) == "$" && k==2)
                {
                    montos[cont2] = cadena2;
                    cadena2 = "";
                    i++;
                    cont2++;
                    k = 0;
                }
        }
        
        var tam = montos.length;
        var datos = new Array(new Array(tam+1),new Array(tam +1),new Array(tam+1));      
              
        datos[0][0] = "Documento";
        datos[1][0] = "Cantidad";
        datos[2][0] = "Importe";
        for(var i = 1; i<tam+1; i++)
            {
                datos[0][i] = nombres[i-1];
                datos[1][i] = cantidades[i-1];
                datos[2][i] = parseFloat(montos[i-1]);
            }
        
        for(var i = 1;i<tam+1;i++)
                {
                    for(var j = i+1; j<tam+1;j++)
                        {
                            if(datos[2][i]<datos[2][j])
                                {
                                    var ayuda= datos[2][i];
                                    datos[2][i] = datos[2][j];
                                    datos[2][j] = ayuda;
                                    
                                    var ayuda1 = datos[0][i];
                                    datos[0][i] = datos[0][j];
                                    datos[0][j] = ayuda1;
                                    
                                    var ayuda2 = datos[1][i];
                                    datos[1][i] = datos[1][j];
                                    datos[1][j] = ayuda2;
                                    
                                }
                        }
                }
        
        var datos1 = new google.visualization.DataTable();
                datos1.addColumn('string','Documentos');
                datos1.addColumn('number','Montos');
                for(var z = 1;z<tam+1;z++)
                    {
                        datos1.addRows([
                             [datos[0][z],datos[2][z]]
                         ]);
                    }
                
        var porcen = new Array(tam);
        
        for(var i=1;i<tam+1;i++)
            {
                if(datos[0][i] == "N/CREDITO")
                    {
                        porcen[i-1] = "-"+(Math.round(((datos[2][i]*100)/montofac)*100))/100 + "%";
                        datos[2][i] = "-"+obtenerValor1(String(datos[2][i]));
                    }
                else{
                     porcen[i-1] = (Math.round(((datos[2][i]*100)/montofac)*100))/100 + "%";
                    datos[2][i] = obtenerValor1(String(datos[2][i]));
                }
               
            }
        
        var datos2 = new google.visualization.DataTable();
                datos2.addColumn('string','Documento');
                datos2.addColumn('string','Monto');
                datos2.addColumn('string','Porcentaje');
                for(var z = 1;z<tam+1;z++)
                    {
                        datos2.addRows([
                             [datos[0][z],datos[2][z],porcen[z-1]]
                         ]);
                    }
        
        var x3 = document.getElementById('myselect2').selectedIndex;
                var grafica1;
                if(x3 == 0)
                {
                    grafica1 =  new  google.visualization.ColumnChart(document.getElementById('charts'));
                }
                else if(x3 == 1)
                {
                     grafica1 =  new  google.visualization.PieChart(document.getElementById('charts'));       
                }
                else if(x3 == 2)
                {
                    grafica1 =  new  google.visualization.BarChart(document.getElementById('charts'));       
                }
                else if(x3 == 3)
                {
                     grafica1 =  new  google.visualization.AreaChart(document.getElementById('charts'));         
                } 
                else if(x3 == 4)
                {
                     grafica1 =  new  google.visualization.LineChart(document.getElementById('charts'));         
                }
                else{
                    grafica1 =  new  google.visualization.columnChart(document.getElementById('charts'));   
                }
                    
        
        
        dibujar76(datos1,ancho,grafica1);
        dibujar176(datos2,ancho);
        
        document.getElementById('monto-facturado').innerHTML = obtenerValor1(String(montofac));
        
        document.getElementById('charts').style.display = "block";
        $("#total-fac").show();
        $("#nota").show();
        $("#leyenda7").show();
        document.getElementById('table1').style.display = "block";
       //genera_tabla(datos,tam);
    }
}

function verificarDia(dat)
    {
        var dd;
        var f =  new Date();
        if(dat == 1)
            {
                var mm = f.getMonth() + 1;
            }
        else if(dat == 2)
            {
                var mm = f.getMonth() + 1;
                if(mm < 2)
                    {
                        mm = 12;
                    }
                else{
                    mm = mm - 1;
                }
            }
        else if(dat==3)
            {
                var mm = f.getMonth() + 1;
                if(mm < 3)
                    {
                        mm = 12;
                    }
                else if(mm < 2){
                    mm = 11;
                }
                else
                    {
                        mm = mm -2;
                    }
            }
        else{
            var mm = f.getMonth() +1;    
        }
        
        if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm==12)
            {
                dd = 31;
            }
        else if(mm==2)
            {
                var aa = f.getFullYear();
                if((aa%4 == 0) && ((aa%100 != 0) || (aa%400 == 0)))
                   {
                        dd = 29;
                   }
                   else{
                        dd = 28;
                   }           
            }
        else
        {
            dd=30;
        }
    return dd;
}

