
console.log();
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
var User="";
var Umail="";
var Uape="";
var Ucon="";
var i=0;//para crear las publicaciones de mascotas perdidas 
var j=0; //para crear las publicaciones de campañas
var k=0; //para crear las publicaciones de mascotas encontradas





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
    console.log("logeado esta en "+logeado);
   
    if(logeado == true)
        {
            $$("#t1").removeClass("visible").addClass("oculto");
            $$("#panel").removeClass("oculto").addClass("visible");
            $$("#entrar").removeClass("visible").addClass("oculto");
            $$("#logout").removeClass("oculto").addClass("visible")
            console.log(User);
            console.log(Uape);
            console.log(Umail);
            console.log(Ucon);
            
           
            
            
        }
        else
        {
            $$("#t1").removeClass("oculto").addClass("visible");
            $$("#panel").removeClass("visible").addClass("oculto");
            $$("#logout").removeClass("visible").addClass("oculto")
            $$("#entrar").removeClass("oculto").addClass("visible")
            
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
    $$("#entrar").on('click', function(){
        mainView.router.navigate("/Logeo/");
    });
    $$("#logout").on('click',function(){
        
        logeado= false;
        console.log(" " +logeado);
        $$("#nac").text("");
        $$("#aac").text("");
        $$("#mac").text("");
        $$("#cac").text("");
            
        firebase.auth().signOut().then(function() {
            if($$("#t1").hasClass("oculto"))
            {
                $$("#t1").removeClass("oculto").addClass("visible");
                $$("#panel").removeClass("visible").addClass("oculto");
            
            }
        mainView.router.navigate("/index/");
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
            
            var data = {

            nombre: nombre,
            apellido: apellido,
            ciudad: ciudad ,
            contacto : contacto,
            mail : mail
            
            };
            db.collection("Usuarios").doc(mail).set
            (data);
           
            
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
        var db = firebase.firestore();
        //var url="";
        

        var mail=$$("#mail").val();
        var pw=$$("#pw").val();
        
        var datRef=db.collection("Usuarios").where("mail","==",mail);
        
        
        console.log("el mail ingresado es "+mail);
        console.log("La contraseña ingresada es "+pw);
        
        firebase.auth().signInWithEmailAndPassword(mail, pw)
        
        .then(function(){
            
            
            logeado= true;
            console.log("logeado esta en true");
            mainView.router.navigate("/index/");
            datRef.get()
                    .then(function (querySnapshot)
                    {
                        querySnapshot.forEach(function(doc){
                            User= doc.data().nombre;
                            Uape= doc.data().apellido;
                            Ucon= doc.data().contacto;
                            Umail= doc.data().mail;
                            console.log(User);
                            console.log(Uape);
                            console.log(Ucon);
                             $$("#nac").text(User);
                             $$("#aac").text(Uape);
                             $$("#mac").text(Umail);
                             $$("#cac").text(Ucon);
                            
                        });
                        
                        app.dialog.alert('Bienvenido '+User);
                            
                    })
                    .catch(function(error) {

                        console.log("Error: " , error);
                        
                        });        
             
                    })
        
        .catch(function(error) {
            alert("Datos incorectos");
        });
    });
    
});

$$(document).on('page:init', '.page[data-name="MapaVet"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e); 
    app.panel.disableSwipe()
    var onSuccess = function(position) {
            
            latitud=position.coords.latitude;
            longitud=position.coords.longitude;
            
       
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
      zoom: 16,
      pixelRatio: window.devicePixelRatio || 1
    });
    position={
        lat:latitud,
        lng:longitud
    };
    //icono del mapa
    icon = new H.map.Icon('js/marcador.png');
    //crear los marcadores
    marker1= new H.map.Marker({lat:-32.936218, lng:-60.645659 });
    marker2= new H.map.Marker({lat:-32.943548, lng:-60.640543 });
    marker3= new H.map.Marker({lat:-32.943266, lng:-60.643263 });
    marker4= new H.map.Marker({lat:-32.937632, lng:-60.646306 });
    marker5= new H.map.Marker({lat:-32.937776, lng:-60.641730 });
    marker6= new H.map.Marker({lat:-32.936858, lng:-60.643559 });
    marker7= new H.map.Marker({lat:-32.937277, lng:-60.643023 });
    marker8= new H.map.Marker({lat:-32.941621, lng:-60.647043 });
    marker9= new H.map.Marker({lat:-32.941621, lng:-60.647043 });

    
    
    //marker = new H.map.Marker(position);
    //agregar los marcadores
    //map.addObject(marker);
    map.addObject(marker1);
    map.addObject(marker2);
    map.addObject(marker3);
    map.addObject(marker4);
    map.addObject(marker5);
    map.addObject(marker6);
    map.addObject(marker7);
    map.addObject(marker8);
    map.addObject(marker9);
    
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
    var db= firebase.firestore();
    var perdidxsRef = db.collection("Perdidxs");
    var link="ACA NO LLEGO NADA";
    var storageRef = firebase.storage().ref();
    var mySwiper = new Swiper(`.swiper-container`, {
                       speed: 400,
                       spaceBetween: 0,
                       pagination:{
                                    el:`.swiper-pagination`,
                                    type:`bullets`
                                  }
                    });
        perdidxsRef.get()
        
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
                    console.log("data:" + doc.data().numero);
                    i= parseInt(doc.data().numero);
                    
                    
                       var publicacion =  `
                                                    <div class="card demo-facebook-card swiper-slide" id=p${i}>
                                                        <div class="card-header">
                                                            <div class="demo-facebook-name" id="ndp${i}"></div>
                                                        </div>
                                                              <div class="card-content card-content-padding" ">
                                                                   <center><img src="" height="350px" width="100%"" id="fperd${i}"/></center>
                                                                    <h2 id="nmp${i}"></h2>
                                                                    Encontrado en: <b id="vmp${i}"></b></br></br>
                                                                    Descripcion: <b id="dmp${i}"></b></br></br>
                                                                    Contacto: <b id="cmp${i}"></b></br></br>
                                                                
                                                              </div>
                                                              <div class="card-footer"><a href="#" class="link" id="dp{i}">Share</a></div>
                                                    </div>
                                                    `;
                    mySwiper.appendSlide(publicacion);
                    
                    $$("#ndp"+i).text(doc.data().publicante);
                    $$("#nmp"+i).text(doc.data().nombre);
                    $$("#vmp"+i).text(doc.data().VistoPorUltimaVezEn);
                    $$("#dmp"+i).text(doc.data().descripcion);
                    $$("#cmp"+i).text(doc.data().Cpubicante);
                    
                    $$("#fperd"+i).attr('src', doc.data().url);
                    
                    
                    
                    });
                    })
        .catch(function(error) {
        
                console.log("Error: " , error);
        
        });
                            function getImage() {   // FOTO DESDE CAMARA
                            	navigator.camera.getPicture(onSuccess,onError,
                            	{
                            	    quality: 50,
                            	    destinationType: Camera.DestinationType.FILE_URI,
                            	    sourceType: Camera.PictureSourceType.CAMERA
                            	});
                            }
                            
                            
                            function selImage() {     // SELECCIONA DESDE GALERIA
                            	navigator.camera.getPicture(onSuccess,onError,
                            	{
                            	    quality: 50,
                            	    destinationType: Camera.DestinationType.FILE_URI,
                            	    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            	});
                            }
                            
                            
                            function onError() {
                                    console.log("error camara");
                            }
                            
                            
                            function onSuccess(imageData) {
                                
                                var storageRef = firebase.storage().ref();
                                var getFileBlob = function(url, cb) {
                                    var xhr = new XMLHttpRequest();
                                    xhr.open("GET", url);
                                    xhr.responseType = "blob";
                                    xhr.addEventListener('load', function() {
                                        cb(xhr.response);
                                    });
                                    xhr.send();
                                };
                            
                                var blobToFile = function(blob, name) {
                                    blob.lastModifiedDate = new Date();
                                    blob.name = name;
                                    return blob;
                                };
                            
                                var getFileObject = function(filePathOrUrl, cb) {
                                    getFileBlob(filePathOrUrl, function(blob) {
                                        cb(blobToFile(blob, i+'perdido.jpg'));
                                    });
                                };
                            
                                getFileObject(imageData, function(fileObject) {
                                    var uploadTask = storageRef.child(i+'perdido.jpg').put(fileObject);
                            
                                    uploadTask.on('state_changed', function(snapshot) {
                                        console.log(snapshot);
                                    }, function(error) {
                                        console.log(error);
                                    }, function() {
                                        var downloadURL = uploadTask.snapshot.downloadURL;

                                        console.log(downloadURL);
                                       
                                        
                                        // handle image here
                                         storageRef.child(i+"perdido.jpg").getDownloadURL()
                                        .then( 
                                            
                                        function (url)
                                        {
                                            console.log("el link de la imagen es "+ url);
                                                link=String(url);
                                                $$("#prp").attr('src',link);
                                                $$("#prp").removeClass('oculto').addClass('visible');                                            
                                            
                                        }).catch(function(error){
                                            console.log(error);
                                        });
                                        setTimeout(function(){},3000);
                                    });
                                });
                                //prueba para recuperar la url de la imagen
                               
                            
                            }
    
        


         
           if(logeado==true)
           {
               $$("#adp").removeClass("visible").addClass("oculto");
               $$("#botonp").removeClass("oculto").addClass("visible");
           }
           else
           {
               $$("#adp").removeClass("oculto").addClass("visible");
               $$("#botonp").removeClass("visible").addClass("oculto");
           }
           
           
           
            
            $$('.popup-about').on('popup:open', function (e, popup) {
              
              console.log("la cantidad de mascotas en la bd es: "+i);
              ("#prp").removeClass('visible').addClass('oculto');

              
            });
         

         
            $$("#pgal").on('click', function(){
                
                selImage();
            });
            $$("#pperd").on('click', function(){
                
               
                 
                 var mascota = $$("#ndmp").val();
                 var descripcion =$$("#descp").val();
                 var visto=$$("#vpuve").val();
                 var contactopublicante = Ucon;
                 console.log(mascota);
                 console.log(descripcion);
                 console.log(visto);
                 i++;
                var data = {

                    nombre: mascota ,
                    descripcion: descripcion,
                    VistoPorUltimaVezEn: visto,
                    numero: i,
                    publicante: User+" "+ Uape,
                    Cpublicante: contactopublicante,
                    url: link
                
                    
                    };
            
                
                   
                 
                 db.collection("Perdidxs").doc("perdidxs"+i).set
                    (data);
                   
                     perdidxsRef.get()
                     .then(function(querySnapshot){
                         var publicacion =`
                                                    <div class="card demo-facebook-card swiper-slide">
                                                        <div class="card-header">
                                                            <div class="demo-facebook-name" id="ndp${i}">John Doe</div>
                                                        </div>
                                                              <div class="card-content card-content-padding">
                                                                   <center><img src="" height="350px" width="100%" id="fperd${i}"/></center>
                                                                    <h2 id="nmp${i}"></h2>
                                                                    Visto por ultima vez en: <b id="vmp${i}"></b></br></br>
                                                                    Descripcion: <b id="dmp${i}"></b></br></br>
                                                                    Contacto: <b id="cmp${i}"></b></br></br>
                                                                
                                                              </div>
                                                              <div class="card-footer"><a href="#" class="link" id="dp{i}">Share</a></div>
                                                    </div>
                                        `;
                    mySwiper.appendSlide(publicacion);
                    
            
                   
                    $$("#ndp"+i).text(User +" "+Uape);
                    $$("#nmp"+i).text(mascota);
                    $$("#vmp"+i).text(visto);
                    $$("#dmp"+i).text(descripcion);
                    $$("#cmp"+i).text(contactopublicante);
                    $$("#fperd"+i).attr('src',link);
                   
                   
                   
            })
                .catch(function(error){
                    console.log("Error: ", error); 
                    console.log("NO FUNCIONA VIEJ");
                });
                
            });
          



});

$$(document).on('page:init', '.page[data-name="Encontrados"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);

    var db= firebase.firestore();
    var encontradxsRef = db.collection("Encontradxs");
    var link="ACA NO LLEGO NADA";
    var storageRef = firebase.storage().ref();
    var mySwiper = new Swiper(`.swiper-container`, {
                       speed: 400,
                       spaceBetween: 40,
                       pagination:{
                                    el:`.swiper-pagination`,
                                    type:`bullets`
                                  }
                    });
        encontradxsRef.get()
        
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
                    console.log("data:" + doc.data().numero);
                    k= parseInt(doc.data().numero);
                    
                    
                       var publicacion =  `
                                                    <div class="card demo-facebook-card swiper-slide" id=p${k}>
                                                        <div class="card-header">
                                                            <div class="demo-facebook-name" id="nde${k}"></div>
                                                        </div>
                                                              <div class="card-content card-content-padding" ">
                                                                   <center><img src="" height="350px" width="100%"" id="fenc${k}"/></center>
                                                                    <h2 id="nme${k}"></h2>
                                                                    Encontrado en: <b id="ee${k}"></b></br></br>
                                                                    Descripcion: <b id="dme${k}"></b></br></br>
                                                                    Contacto: <b id="cme${k}"></b></br></br>
                                                                
                                                              </div>
                                                              <div class="card-footer"><a href="#" class="link" id="de{k}">Share</a></div>
                                                    </div>
                                                    `;
                    mySwiper.appendSlide(publicacion);
                    
                    $$("#nde"+k).text(doc.data().publicante);
                    $$("#nme"+k).text(doc.data().nombre);
                    $$("#ee"+k).text(doc.data().VistoPorUltimaVezEn);
                    $$("#dme"+k).text(doc.data().descripcion);
                    $$("#cme"+k).text(doc.data().Cpubicante);
                    
                    $$("#fenc"+k).attr('src', doc.data().url);
                    
                    
                    
                    });
                    })
        .catch(function(error) {
        
                console.log("Error: " , error);
        
        });
                            function getImage() {   // FOTO DESDE CAMARA
                            	navigator.camera.getPicture(onSuccess,onError,
                            	{
                            	    quality: 50,
                            	    destinationType: Camera.DestinationType.FILE_URI,
                            	    sourceType: Camera.PictureSourceType.CAMERA
                            	});
                            }
                            
                            
                            function selImage() {     // SELECCIONA DESDE GALERIA
                            	navigator.camera.getPicture(onSuccess,onError,
                            	{
                            	    quality: 50,
                            	    destinationType: Camera.DestinationType.FILE_URI,
                            	    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            	});
                            }
                            
                            
                            function onError() {
                                    console.log("error camara");
                            }
                            
                            
                            function onSuccess(imageData) {
                                var storageRef = firebase.storage().ref();
                                 
                                var getFileBlob = function(url, cb) {
                                    var xhr = new XMLHttpRequest();
                                    xhr.open("GET", url);
                                    xhr.responseType = "blob";
                                    xhr.addEventListener('load', function() {
                                        cb(xhr.response);
                                    });
                                    xhr.send();
                                };
                            
                                var blobToFile = function(blob, name) {
                                    blob.lastModifiedDate = new Date();
                                    blob.name = name;
                                    return blob;
                                };
                            
                                var getFileObject = function(filePathOrUrl, cb) {
                                    getFileBlob(filePathOrUrl, function(blob) {
                                        cb(blobToFile(blob, k+'encontrado.jpg'));
                                    });
                                };
                            
                                getFileObject(imageData, function(fileObject) {
                                    var uploadTask = storageRef.child(k+'encontrado.jpg').put(fileObject);
                            
                                    uploadTask.on('state_changed', function(snapshot) {
                                        console.log(snapshot);
                                    }, function(error) {
                                        console.log(error);
                                    }, function() {
                                        var downloadURL = uploadTask.snapshot.downloadURL;

                                        console.log(downloadURL);
                                       
                                        
                                        // handle image here
                                         storageRef.child(k+"encontrado.jpg").getDownloadURL()
                                        .then( 
                                            
                                        function (url)
                                        {
                                            console.log("el link de la imagen es "+ url);
                                                link=String(url);
                                                $$("#pre").attr('src',link);
                                                $$("#pre").removeClass('oculto').addClass('visible')
                                            
                                            
                                        }).catch(function(error){
                                            console.log(error);
                                        });
                                        setTimeout(function(){},3000);
                                    });
                                });
                                //prueba para recuperar la url de la imagen
                               
                            
                            }
           if(logeado==true)
           {
               $$("#ade").removeClass("visible").addClass("oculto");
               $$("#botone").removeClass("oculto").addClass("visible");
           }
           else
           {
               $$("#ade").removeClass("oculto").addClass("visible");
               $$("#botone").removeClass("visible").addClass("oculto");
           }
           
           
           $$('.popup-about').on('popup:open', function (e, popup) {
              
              console.log("la cantidad de mascotas en la bd es: "+k);
              ("#pre").removeClass('visible').addClass('oculto')
            });
         

            $$("#pcam").on('click', function(){
                
                getImage();
            });
            $$("#pgal").on('click', function(){
                
                selImage();
                
                
            });
           
            
            $$("#penc").on('click', function(){
                
                
                
                
                
                 
                 var mascota = $$("#nde").val();
                 var descripcion =$$("#desce").val();
                 var visto=$$("#vpuvee").val();
                 var contactopublicante = Ucon;
                 
                 k++;
                var data = {

                    nombre: mascota ,
                    descripcion: descripcion,
                    VistoPorUltimaVezEn: visto,
                    numero: k,
                    publicante: User+" "+ Uape,
                    Cpublicante: contactopublicante,
                    url: link
                
                    
                    };
                    db.collection("Encontradxs").doc("encontradx"+k).set
                    (data);
                   
                     encontradxsRef.get()
                     .then(function(querySnapshot){
                         var publicacion =  `
                                                    <div class="card demo-facebook-card swiper-slide">
                                                        <div class="card-header">
                                                            <div class="demo-facebook-name" id="nde${k}">John Doe</div>
                                                        </div>
                                                              <div class="card-content card-content-padding">
                                                                   <center><img src="" height="350px" wid id="fenc${k}"></center>
                                                                    <h2 id="nme${k}"></h2>
                                                                    Visto por ultima vez en: <b id="ee${k}"></b></br></br>
                                                                    Descripcion: </label><div id="dme${k}"></b></br></br>
                                                                    Contacto: <b id="cme${k}"></b></br></br>
                                                                
                                                              </div>
                                                              <div class="card-footer"><a href="#" class="link" id="de{k}">Share</a></div>
                                                    </div>
                                        `;
                    mySwiper.appendSlide(publicacion);
                    
            
                   
                    $$("#nde"+k).text(User +" "+Uape);
                    $$("#nme"+k).text(mascota);
                    $$("#ee"+k).text(visto);
                    $$("#dme"+k).text(descripcion);
                    $$("#cme"+k).text(contactopublicante);
                    $$("#fenc"+k).attr('src', link);
                    
                   
                   
                   
            })
                .catch(function(error){
                    console.log("Error: ", error); 
                });
                
            });


});


$$(document).on('page:init', '.page[data-name="Campañas"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    var db= firebase.firestore();
    var campañasRef = db.collection("Campañas");
    if(logeado==true)
           {
               $$("#alc").removeClass("visible").addClass("oculto");
               $$("#botonc").removeClass("oculto").addClass("visible");
            }
    campañasRef.get()
        //para cargar las campañas dinamicamente de la base de datos
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           
            console.log("data:" + doc.data().numero);
            j=parseInt(doc.data().numero);
            
                       
            
            $$("#ccampañas").prepend(`
                                        <li>
                                          <div class="item-content">
                                            <div class="item-media"><img src="pata.png" width="44"/></div>
                                            <div class="item-inner">
                                              <div class="item-title-row">
                                                <div class="item-title" id="titulo${j}"></div>
                                              </div>
                                              <div class="item-subtitle" id="fecha${j}"></div>
                                              <p id="descripcion${j}"> </p>
                                            </div>
                                          </div>
                                        </li> `)
                    $$("#titulo"+j).text(doc.data().titulo);
                    $$("#fecha"+j).text(doc.data().fecha);
                    $$("#descripcion"+j).text(doc.data().descripcion);
                    
            
        });
        
        })
        .catch(function(error) {
        
                console.log("Error: " , error);
        
        });
        
        $$("#pcamp").on('click', function(){
                 var titulo = $$("#tdlc").val();
                 var descripcion =$$("#ddlc").val();
                 var fecha=$$("#fdlc").val();
                 
                 
                 j++;
                var data = {

                    titulo: titulo ,
                    descripcion: descripcion,
                    fecha: fecha,
                    numero: j
                    
                    
                
                    
                    };
                db.collection("Campañas").doc("Campaña"+j).set
                    (data);
                campañasRef.get()
                .then(function(querySnapshot){
                        
                        
                        
                        $$("#ccampañas").prepend(`
                                        <li>
                                          <div class="item-content">
                                            <div class="item-media"><img src="pata.png" width="44"/></div>
                                            <div class="item-inner">
                                              <div class="item-title-row">
                                                <div class="item-title" id="titulo${j}"></div>
                                              </div>
                                              <div class="item-subtitle" id="fecha${j}"></div>
                                              <p id="descripcion${j}"> </p>
                                            </div>
                                          </div>
                                        </li> `)
                                        
                    $$("#titulo"+j).text(titulo);
                    $$("#fecha"+j).text(fecha);
                    $$("#descripcion"+j).text(descripcion);
            
                
                })
                .catch(function(error){
                    console.log("Error: ", error); 
                });
                
            });
                
    
});