var Garantia = artifacts.require("Garantia");

contract("Garantia", accounts => {

beforeEach( async function() {
  garantiaContrato = await Garantia.deployed();
});



const numSerie1 = "ES110004533";
const numSerie2 = "FR4332220044";
const articulo3 = "Huawei P20";
const numSerie3 = "ES32754451";


//Comprueba los dos Articulos iniciales del constructo.
  it("Comprobar que se añade las Garantias del Constructor", async () => {

    const value = await garantiaContrato.getNombre.call(numSerie1);
    assert.equal(value, "Trona Chicco", "No se ha creado correctamente Trona Chicco")
   
    const value2 = await garantiaContrato.getNombre.call(numSerie2);
    assert.equal(value2, "Play Station 4", "No se ha creado correctamente Play Station 4")
    
  });

//Añade un nuevo articulo y muestra el listado entero de Garantias.
  it("Añadir una nueva Garantia", async () => {

      
    await garantiaContrato.addProducto(articulo3, numSerie3);
    const contador = await garantiaContrato.productosCount();

    for (var i = 1; i <= contador; i++) {
      const listaProductos = await garantiaContrato.productos(i);

      var _id = listaProductos[0];
      var _address = listaProductos[1];
      var _name = listaProductos[2];
      var _numSerie = listaProductos[3];
      var _yearInicio = listaProductos[4];
      var _mesInicio = listaProductos[5];
      var _diaInicio = listaProductos[6];
      var _fechaFin =listaProductos[7];

      console.log("*****************************************************************");
      console.log("Producto: "+_name + "-----Num Serie: " + _numSerie + "---Inicio: "+_yearInicio + "-" + _mesInicio + "-" + _diaInicio);
      console.log("*****************************************************************");
      //comprobaciones
      assert.equal(_id , i - 1, "El valor Id no corresponde");
      assert.equal(_address , accounts[0]               , "El Address no corresponde");
      assert.equal(_name , listaProductos.nombreProducto, "Nombre no corresponde");
      assert.equal(_numSerie , listaProductos.numSerie  , "Número de Serie no corresponde");
      assert.equal(_yearInicio ,parseInt(listaProductos.yearInicio),"Año inicio no corresponde");
      assert.equal(_mesInicio , parseInt(listaProductos.mesInicio), "Mes inicio no corresponde");
      assert.equal(_diaInicio , parseInt(listaProductos.diaInicio), "Día inicio no corresponde");
      assert.equal(_fechaFin  ,  parseInt(listaProductos.fechaFin), "Fecha fin no corresponde");

    }

    
  });

//Comprueba la validez de las Garantias, si esta activa o no.
  it("Comprobar Validez Garantias", async () => {

    
    //Garantias Caducadas
    const value = await garantiaContrato.checkGarantia(numSerie1);
    assert.equal(value, "Caducada", "Producto 1, debiera estar caducado")
    const value1 = await garantiaContrato.checkGarantia(numSerie2);
    assert.equal(value1, "Caducada", "Producto 2, debiera estar caducado");

    //Garantia Activa
    const value2 = await garantiaContrato.checkGarantia(numSerie3);
    assert.equal(value2, "Activa", "Producto 3, debiera estar Activo");

    
  });

  //Simula el error de no introducr el campo Nombre Articulo
  it("Error, No introducir Nombre Artículo", async () => {

    const articulo4 = "";
    const numSerie4 = "ES32754450";
    
    try{
      await garantiaContrato.addProducto(articulo4, numSerie4);

    }
    catch (error) {
      console.log("Resultado: " + error);

    }
 
  });

 // Simula el error de introducir un numero de serie existente
  it("Error, Introducir número de Serie existente", async () => {

    const articulo4 = "Dell";
    const numSerie4 = "ES32754451";
    
    try{
      await garantiaContrato.addProducto(articulo4, numSerie4);

    }
    catch (error) {
      console.log("Resultado: " + error);

    }
    

  });

});