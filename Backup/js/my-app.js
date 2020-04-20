// Initialize app
var myApp = new Framework7();
  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/index/', url: 'index.html',  } ,
      { path: '/Perdidos/', url: 'Perdidos.html',  } ,
      { path: '/Encontrados/', url: 'Encontrados.html',  } ,
      { path: '/Campañas/', url: 'Campañas.html',  } ,
      { path: '/MapaVet/', url: 'MapaVet.html',  } ,
      { path: '/Registro/', url: 'Registro.html',  } ,
      { path: '/Logeo/', url: 'Logeo.html',  } ,
      { path: '/Publicar/', url: 'Publicar.html',  } ,
   
        
    ],
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var logeado= false;
var latitud=0;
var longitud=0;





// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
  });
    
   


// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
});


$$(document).on('page:init', '.page[data-name="index"]', function (e) {
     console.log(e);
     //Aparicion o no de la toolbar
    console.log("logeado esta en"+logeado);
    if(logeado!=false)
        {
            $$("#t1").removeClass("visible").addClass("oculto");
            $$("#panel").removeClass("oculto").addClass("visible");
            
        }
        else
        {
            $$("#t1").removeClass("oculto").addClass("visible");
            $$("#panel").removeClass("visible").addClass("oculto");
        }

    //botones de navegacion
    $$("#bp").on('click', function(){
      mainView.router.navigate("/Perdidos/");
    });
    $$("#be").on('click', function(){
        mainView.router.navigate("/Encontrados/");
    });
    $$("#bc").on('click', function(){
        mainView.router.navigate("/Campañas/");
    });
    $$("#bm").on('click', function(){
       mainView.router.navigate("/MapaVet/");
    });
    $$("#logout").on('click',function(){
        
        logeado= false;
        console.log(""+logeado);
        firebase.auth().signOut().then(function() {
            if($$("#t1").hasClass("oculto"))
            {
                $$("#t1").removeClass("oculto").addClass("visible");
                $$("#panel").removeClass("visible").addClass("oculto");
            
            }
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        
        
});
    });
    
});
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="Registro"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    
 
    
    $$("#reg").on('click', function()
    {   
        var mail= $$("#user").val();
        var pw= $$("#contra").val();
        
        
        
        console.log("el mail ingresado es "+mail);
        console.log("la contraseña es "+pw);
        firebase.auth().createUserWithEmailAndPassword(mail, pw).then(function(){
            alert("Registro completo!");
            //guardado en la base de datos
            var nombre=$$("#rnom").val();
            var apellido=$$("#rape").val();
            var ciudad=$$("#rciu").val();
            var contacto=$$("#tel").val();
            /*db.collection("Usuarios").add({
            
            nombre: nombre ,
            apelido: apellido,
            mail: mail ,
            ciudad: ciudad
            })*/
            var data = {

            nombre: nombre,
            apellido: apellido,
            ciudad: ciudad ,
            mail: mail , 
            contacto : contacto
            
            };
            db.collection("Usuarios").doc(mail).set
            (data);
            /*.then(function(docRef) {
            console.log("OK! Con el ID: " + docRef.id);
            console.log("funca")
            })
            .catch(function(error) {
            console.log("Error: " + error);
            });*/
            
            mainView.router.navigate("/Logeo/"); 
        })
        
        
        .catch(function(error) 
        {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
        
        alert('Clave muy débil.');
        
        } else {
        
        alert(errorMessage);
        
        }
        console.log(error);
        });
        
        
        
        
    });
});

$$(document).on('page:init', '.page[data-name="Logeo"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('#init').on('click',function(){
        

        var mail=$$("#mail").val();
        var pw=$$("#pw").val();
        
        
        console.log("el mail ingresado es"+mail);
        console.log("La contraseña ingresada es"+pw);
        
        firebase.auth().signInWithEmailAndPassword(mail, pw)
        
        .then(function(){
            
            
            logeado= true;
            console.log("logeado esta en true");
            mainView.router.navigate("/index/");
             
             
        })
        
        .catch(function(error) {
            alert("Datos incorectos");
        });
    });
    
});

$$(document).on('page:init', '.page[data-name="MapaVet"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e); 
    
    var onSuccess = function(position) {
       
            latitud=position.coords.latitude;
            longitud=position.coords.longitude;
            
        alert('Latitude: '        + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
             var platform = new H.service.Platform({
    'apikey': 'MPUc-5whMPQGVau539oFnxGtcyj2aKF8nfiFWDwWRFk'
    });
    // Obtain the default map types from the platform object
    var defaultLayers = platform.createDefaultLayers();
    
    
    // Instantiate (and display) a map object:
    
   console.log(latitud);
    console.log(longitud);
    
    var map = new H.Map(document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,{
     
      center: {lat:latitud, 
      lng:longitud},
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    });
    position={
        lat:latitud,
        lng:longitud
    };
    marker = new H.map.Marker(position);
    map.addObject(marker);
    // interfaz de usuario
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES');
                
    };
   
    
    
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    
    
    



});
$$(document).on('page:init', '.page[data-name="Perdidos"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
           
            $$('.popup-about').on('popup:open', function (e, popup) {
              console.log('About popup open');
            });
            $$('.popup-about').on('popup:opened', function (e, popup) {
              console.log('About popup opened');
            });
            $$("#pcam").on('click', function(){
                    function getImage() {   // FOTO DESDE CAMARA
                	setTimeout(function() {    
                		navigator.camera.getPicture(uploadPhoto,onError,
                		{
                			quality: 50,
                		    destinationType: Camera.DestinationType.FILE_URI,
                		    sourceType: Camera.PictureSourceType.CAMERA
                		});
                	}, 0);    
                }
            });
            $$("#pgal").on('click', function(){
                function selImage() {     // SELECCIONA DESDE GALERIA
                	setTimeout(function() {    
                		navigator.camera.getPicture(uploadPhoto,onError,
                		{
                			quality: 50,
                		    destinationType: Camera.DestinationType.FILE_URI,
                		    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                		});
                	}, 0);    
                }

            });
            $$("#pperd").on('click', function(){
                alert("hola");
                var db= firebase.firestore();
                var usuariosRef = db.collection("Usuarios");
                var i=0;
                usuariosRef.get()
                .then(function(querySnapshot){
                    i++;
                $$("#publicacionesPerd").prepend(`
                                                <div class="card demo-facebook-card swiper-slide">
                                                    <div class="card-header">
                                                        <div class="demo-facebook-name" id="np${i}">John Doe</div>
                                                    </div>
                                                          <div class="card-content card-content-padding">
                                                               <img src="https://scontent.faep12-1.fna.fbcdn.net/v/t1.0-9/11898606_10206189633613193_5259961071496413925_n.jpg?_nc_cat=101&_nc_oc=AQmD_SntQSJnO8ll0OpiiywLeDOTDLkTsodKvRunoLl53cq5Q8oB87bsj544s-VO6gQ&_nc_ht=scontent.faep12-1.fna&oh=dfd0beeefb8af7be106d2ae5dbd236c1&oe=5DF4AB33" height="75%" width="100%"/>
                                                                <h2 id="nmp0">Lito</h2>
                                                                <p><label >Visto por ultima vez en:</label><div id="vmp${i}"></div></p>
                                                                <p><label >Descripcion:</label><div id="dmp${i}"></div></p>
                                                                <p><label>Particularidades:</label><div id="pmp${i}"></div></p>
                                                                <p><label>Contacto:</label><div id="cmp${i}"></div ></p>
                                                            
                                                          </div>
                                                          <div class="card-footer"><a href="#" class="link">Share</a></div>
                                                </div>
                                                `)
                    $$("#np"+i).text("Leandro");
                
                })
                .catch(function(error){
                    console.log("Error: ", error) 
                });
                
            });
});