import Web3 from "web3";
import garantiaArtifact from "../../build/contracts/Garantia.json";

var isPause;

const App = {
  web3: null,
  account: null,
  meta: null,
  loader: null,
  myOwner:null,
  content: null,
  isPaused: false,

  //*
  //*   Initialize front-end
  //*  
  
  start: async function() {
    const { web3 } = this;
    console.info("App.start");
    loader = $("#loader");
    content = $("#content");
    
    try {
      //Get Contract instance
      const networkId = await web3.eth.net.getId();
      console.log("networkId: ", networkId);// Log
      const deployedNetwork = garantiaArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        garantiaArtifact.abi,
        deployedNetwork.address,
      );

      content.show();
      loader.hide();
      // Get Metamask account that is in use
      var  accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      
      console.log("Account: "+ this.account);  
      

    } catch (error) {
      console.error("Is not possible to connect.");
      this.setStatus("Is not possible to connect.");  
    }
    
    $("#address").append(this.account);

    //Ini
    this.cargarTabla();
    this.refreshValores();
    this.isOwner();
    this.statusContract();
   
  },


  //*
  //*   Load the Products
  //*  
  
  cargarTabla: async function()  {
    loader.show();

    var productosResults = $("#productosResults");
    productosResults.children().remove() ; 

    const { productosCount } = this.meta.methods ;
    var numeroProductos = await productosCount().call();
    
    this.setStatus("Number of Products in the List: " + numeroProductos);
    
    const { productos } = this.meta.methods ;

    //Run over mapping and show the products on the Table
    for (var i = 1; i <= numeroProductos; i++) {
      productos(i).call(function(error, response){

        if (error) {
          
          console.error(error);
          } else {
          var datosProductos  = response;
          
          
          var id = datosProductos[0];
          var address = datosProductos[1];
          var name = datosProductos[2];
          var numSerie = datosProductos[3];
          var _yearInicio = datosProductos[4];
          var _mesInicio = datosProductos[5];
          var _diaInicio = datosProductos[6];
          var fechaFin = parseInt(datosProductos[4]) + 2;
          
          // Show it over the Frontend
          var garantiaTemplate = "<tr><th>" + id + "</th><td>"   + name      + "</td><td>" + numSerie + "</td><td>" +
                                _yearInicio +"-" +_mesInicio+ "-"+ _diaInicio+ "</td><td>" + fechaFin + "-"         +
                                _mesInicio  +"-" + _diaInicio    + "</td><td>" + address   + "</td></tr>"

          productosResults.append(garantiaTemplate);
          }
      });
    } 

    loader.hide();
  },

  //*
  //*Adding a Producto. Send the values to the front end
  //*  

  anadirProducto: async function() {
   
    var nombreProducto = $('#nombreProducto').val();
    var numSerie       = $('#numSerie').val();
   

    this.setStatus("Transaction Start... wait please.");
    
    const { addProducto } = this.meta.methods;
    
    try {
      await addProducto(nombreProducto, numSerie).send({ from: this.account });

      
      this.cargarTabla();
      this.refreshValores();
      
    //GManaging possible errors: Pause Contrat, Is not possible to indroduce any field
    } catch (error) {

      //If is in Pause
      if (isPause){
        this.setStatus("Contract in Pausable Status, not possible to add products");
        alert("Contract in Pausable Status, not possible to add products");
        this.refreshValores();
       } else{

        this.setStatus("You must introduce a Product Name and a valid Serial number");
        this.refreshValores();
       }
       
    }

  },

  //*
  //*Comprueba que la Garantia sigue o no Activa tras 2 años
  //*  

  checkGarantia: async function() {
   
    var numSerie = $('#numSerieToCheck').val();
    var isActive;
    this.setStatus("Checking Warranty... wait, please.");
    console.log("numSerie: " + numSerie);
    const { checkGarantia } = this.meta.methods;

    try {
     // await addProducto(nombreProducto, numSerie).send({ from: this.account });
      var response = await checkGarantia(numSerie).call();

      isActive = response;

      alert("The warranty: "+ numSerie + " - Is " +isActive);
      this.refreshValores();
      
    //Managing errors: In is introduce an unexist warranty or any otrher error
    } catch (error) {

      
      if (error.message = "Internal JSON-RPC error"){
        this.setStatus("Must be introduce a valid Serial Number");
        alert("Warranty no valid: "+ numSerie + " - Doesnt exist!");
        this.refreshValores();
       } else{

        this.setStatus("Error: " + error);
        this.refreshValores();
       }
       
    }
    /*
    await checkGarantia(numSerie).call(function(error, response){

      if (error) {
        //this.refreshValores();
          //console.error(error);
          alert("Garantia no valida: "+ numSerie + " - No existe " + error);
          
      } else {
          isActive = response;

          alert("La Garantia para: "+ numSerie + " - Esta " +isActive);
      }
             
  });*/
 
  //this.refreshValores();
   
  },

  //*
  //*using fucntion "owner" from Ownable de Open Zeppelin, get the creator address for the contract
  //*Initialize the roles for Pausable botton and Circuit Breaker
  
  isOwner: async function() { 
    var myowner;

    const { owner } = this.meta.methods;
    await owner().call(function(error, response){
      
        if (error) {
            console.error(error);
        } else {
           
            myowner = response;     
            console.log("Contract Owner: " + myowner);
            
        }
               
    });
    
    //managing Pause boton visivility, only owner can have the visivility
    if (this.account == myowner) {
        $('#breakerBoton').attr("disabled", false);
        $("#textOwner").append(' Sí' );

    } else {
      $('#breakerBoton').attr("disabled", true);
      $("#textOwner").append(' No' );
    }

  },

  
  //*
  //*Using the function"pasue" fromm Contract Pausable from Open Zeppelin 
  //*to be able to read the contract.
  //*
  statusContract: async function(message) {
    
    const { paused } = this.meta.methods;
    await paused().call(function(error, response){
      
        if (error) {
           
            console.error(error);
        } else {
           this.isPaused = response;

           if (this.isPaused){
            $("#breakerBoton").html('Activar Contrato' );
           
           } else{

            $("#breakerBoton").html('Pausar'  );

           }
           
            console.log("Contrato Pause: " + this.isPaused);
            
        }
        this.isPaused = response;
        isPause=this.isPaused;
    }); //fin paused.call()

    
  },

  //*
  //*Making use of the "unpause" && "pause" functions of the Pausable contract. Depending on the state of the contract (paused / unpaused)
  //*it will change to the opposite.
  //* 
  pauseContract: async function() {
    
    //Called by a pauser to unpause/pause, returns to normal state
    if (isPause) {

        const { unpause } = this.meta.methods;
        await unpause().send({from: this.account}, function(error, response){
            if (error) {
                console.log("Unpause Error: ", error);
                alert("isPause: "+ isPause + " _____ "+error);
            } else {
                console.log("Contrato Activo");
                alert("Es posible añadir productos. " + "\nTransacción:" +response);
                $('#submitProduct').attr("disabled", false);
                $("#textStatus").html('Contrato Activo' );
            }
        });

    } else {

        const { pause } = this.meta.methods;
        await pause().send({from: this.account}, function(error, response){
                if (error) {
                  console.error("Pause Error: ", error);
                  alert(error);
              } else {
                  console.log("Contrato Pausado");
                  $('#submitProduct').attr("disabled", true);
                  alert(" NO es posible añadir productos..." + "\nTransacción: "+response);
                  $("#textStatus").html('Contrato Pausado' );
               
              }
        }); 
    
      }  
    this.statusContract();
  },



  //*Show a Log on the front end to keep the user informed
  setStatus: function(message) {
    const status = document.getElementById("contentLog");
    status.innerHTML = message;
  },

  //*refreshes the frontend fields to empty once they have been used.
  refreshValores: async function() {
    $('#nombreProducto').val('');
    $('#numSerie').val('');
    $('#numSerieToCheck').val('');
  }
};

window.App = App;

// * Function that listens for any event that may be on the Front-end
// * It should connect to the Ethereum blockchain, and otherwise it connects to Truffle
window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts obtener 
    const status = document.getElementById("contentLog");
    status.innerHTML = "Conectado a Metamask";
    
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
    //status.innerHTML = "Conectado";
  }

  App.start();
  
});
