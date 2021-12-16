// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./Utils.sol";

/**
 * @title  Warranty Activation for Manufacture Products
 * @author Julio César Moya
 * @dev    This contract has been developed for academic purposes
 *         Import Open Zeppelin contracts 
 *         Pausable.sol: Emergency stop mechanism of the contract, for a possible damage reduction.
 *         Ownable.sol: To be able to save the address of the one who deploys the contract Open Zeppelin and Library Utils to be able to format the Date
 *         
 *         And Using Utils.sol as External Library for format Dates
 * @notice Activate a Product Warranty based on the Serial Number and the Name
 *         It will give you 2 years of hypothetic Warranty, so will be possible to repair de Product.
 *         Also is possible to check, based on the Serial number, if the Warranty is active or not based on the 2 years.
 *         
 */
contract Garantia is Ownable, Pausable{

    /// @dev Data Model for a Productc
    struct  Producto {
        uint id;
        address comprador;
        string nombreProducto;
        string numSerie;
        uint yearInicio;
        uint mesInicio;
        uint diaInicio;
        uint fechaFin;
        uint fecha;
  
    }

    ///@dev Global Variable, Counter of the number of Products that are added to the contract
    uint public  productosCount;
    
    /// @dev Mapping: given an uint stored a Producto
    mapping (uint => Producto) public productos;

    /// @dev  Mapping: given a String, stored a booleano
    mapping (string => bool)  numSeries;

    /// @dev Mapping: given a String stored a uint
    mapping (string => uint)  numSeriesCheck;

/**
* @dev To add a product warranty to the contract
* @param _nombre, Article Name.
* @param _numSerie, Serial number of the Article.
* Modifier, whenNotPaused of the Pausable contract, in case of Pausable, this function cannot be executed.
*/
    function addProducto ( string memory _nombre, string memory _numSerie) public whenNotPaused {

        // _ nombre and _numSerie must not be empty and meet a minimum. Improvement, to be able to verify the serial number, and say that it is real.
	    require(
            bytes(_nombre).length > 0 && bytes(_numSerie).length > 0,
            "You must introduce a Name and a Serial Number"
	        );

        //The serial number should not be already in the list
         require(!numSeries[_numSerie], "Serial number already activated!!");
        //The Warranty is activate
         numSeries[_numSerie] = true; 
        
        uint _id = productosCount;
        productosCount ++;
        address _comprador = msg.sender;

        uint _fecha;
    
        
        //The Two initialize Warranty Products force them to have a valide date
        //Just for UI intention
        if (_id == 0 || _id == 1){
            _fecha  = block.timestamp - 105 weeks;
            }
            else{
                _fecha  = block.timestamp;//This assigns the current Unix Epoch time (the number of milliseconds since January 1, 1970) to the variable now, based on the clock in the computer executing the script.
       
            }
   
      uint _fechaFin = _fecha + 104 weeks;//Warranty date ends
    

      uint _yearInicio = Utils.getYear(_fecha);
      uint _mesInicio = Utils.getMonth(_fecha);
      uint _diaInicio = Utils.getDay(_fecha);

      productos[productosCount] = Producto(_id, _comprador, _nombre, _numSerie, _yearInicio, _mesInicio, _diaInicio, _fechaFin, _fecha);
      numSeriesCheck[_numSerie] = productosCount;
      
    }

/** @dev Contract constructor, only  is called once, by the person who deploys the contract
* Initially are 2 Dummies Products Load
 */
 
constructor ()  {

    addProducto("Dell Computer", "ES110004533");
    addProducto("Play Station 4", "FR4332220044");
	//owner = msg.sender;
}

/** @dev Fallback, in the hypothetical case that the contract is called wrongly, and a payment is made
 * And something went wrong, this function would be called and the payment would be reversed
 */

fallback () external payable {
   revert("Something went wrong, recover your money") ; 
}   

/** @dev Receive, in the hypothetical case that the contract is called wrongly, and a payment is made
 * And something went wrong, this function would be called and the payment would be reversed
 */
 receive() external payable {
        // custom function code
    }

/** @dev Checks if the Warranty has exceeded two years since its activation.
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return String, Returns Active or Expired
*/

function checkGarantia(string memory _numSerie) public  view returns ( string memory) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");

    if (productos[numSeriesCheck[_numSerie]].fechaFin > block.timestamp){
        return "Active";//Activa
    }else {

        return "Expired";//Caducada
    }
  
}

/** @dev Checks if the Warranty has exceeded two years since its activation.
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return String, Returns Active or Expired
*/
function getNombre(string memory _numSerie) public  view returns ( string memory) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");
 
    return productos[numSeriesCheck[_numSerie]].nombreProducto;
 
}

/** @dev Get Product Start Year if necessary
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return Uint, with Start Year
*/
function getYearInicio(string memory _numSerie) public  view returns ( uint) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");
 
    return productos[numSeriesCheck[_numSerie]].yearInicio;
 
}

/** @dev Get Product Start Month if necessary
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return Uint, with Start Month Year
*/
function getMesInicio(string memory _numSerie) public  view returns ( uint) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");
 
    return productos[numSeriesCheck[_numSerie]].mesInicio;
 
}

/** @dev Get the Product Start Day if necessary
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return Uint, with the Start Day
*/
function getDiaInicio(string memory _numSerie) public  view returns ( uint) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");
 
    return productos[numSeriesCheck[_numSerie]].diaInicio;
 
}


/** @dev Get End date  of the Product if necessary
* @param _numSerie, Article serial number. Check that numSerie is in the list.
* @return Uint, with End date on Start date + 104 weeks
*/
function getFechaFin(string memory _numSerie) public  view returns ( uint) {
    require(numSeries[_numSerie], "Serial numner no valid, please introduce an existence one");
 
    return productos[numSeriesCheck[_numSerie]].fechaFin;
 
}


 /// @dev Pause the contract //Call _pause fucntion on Pausable.sol contract
    function pause() public  onlyOwner{
        _pause(); 
    }

/// @dev Unpause the contract //Call _unpause fucntion on Pausable.sol contract
    function unpause() public  onlyOwner{
        _unpause();
    }

}