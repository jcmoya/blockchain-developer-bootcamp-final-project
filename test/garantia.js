var Garantia = artifacts.require("Garantia");

contract("Garantia", accounts => {

beforeEach( async function() {
  garantiaContrato = await Garantia.deployed();
});



const numSerie1 = "ES110004533";
const numSerie2 = "FR4332220044";
const articulo3 = "Huawei P20";
const numSerie3 = "ES32754451";


//Check the initial Products Loads.
  it("Check that the Builder's Guarantees are added", async () => {

    const value = await garantiaContrato.getNombre.call(numSerie1);
    assert.equal(value, "Dell Computer", "Dell computer Product has not been added")
   
    const value2 = await garantiaContrato.getNombre.call(numSerie2);
    assert.equal(value2, "Play Station 4", "Play Station 4 has not been added")
    
  });

  //Add a new article and show the entire list of Guarantees.
  it("Add new Warranty..", async () => {

      
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
      console.log("Product: "+_name + "-----Serial number: " + _numSerie + "---Starts Date: "+_yearInicio + "-" + _mesInicio + "-" + _diaInicio);
      console.log("*****************************************************************");
      //Checks on Dates and Id
      assert.equal(_id , i - 1, "Id Product is wrong");
      assert.equal(_address , accounts[0]               , "Addres account is not correct");
      assert.equal(_name , listaProductos.nombreProducto, "Name of product wrong");
      assert.equal(_numSerie , listaProductos.numSerie  , "Serial number wrong");
      assert.equal(_yearInicio ,parseInt(listaProductos.yearInicio),"Start Year wrong");
      assert.equal(_mesInicio , parseInt(listaProductos.mesInicio), "Start month wrong");
      assert.equal(_diaInicio , parseInt(listaProductos.diaInicio), "Star day wrong");
      assert.equal(_fechaFin  ,  parseInt(listaProductos.fechaFin), "Ends date wrong");

    }

    
  });

//Check the validity of the Guarantees, if it is active or expired.
  it("Check the validity of the Guarantees", async () => {

    
    //Warranty Expired
    const value = await garantiaContrato.checkGarantia(numSerie1);
    assert.equal(value, "Expired", "Product 1, must be expired")
    const value1 = await garantiaContrato.checkGarantia(numSerie2);
    assert.equal(value1, "Expired", "Product 2, must be expired");

    //Warranty Active
    const value2 = await garantiaContrato.checkGarantia(numSerie3);
    assert.equal(value2, "Active", "Product 3, must be Active");

    
  });

  //Simulates the error of not entering the Article Name field
  it("Error, No Article name", async () => {

    const articulo4 = "";
    const numSerie4 = "ES32754450";
    
    try{
      await garantiaContrato.addProducto(articulo4, numSerie4);

    }
    catch (error) {
      console.log("Resultado: " + error);

    }
 
  });

 // Simulates the error of entering an existing serial number
  it("Error, Serial number already exist on the Table", async () => {

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