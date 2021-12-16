# Design Pattern Decisions

In the Smart Contract _**Garantia.sol**_ have been implemented the following Design Patterns:

******
## 1. Inheritance and Interfaces (Importing and extending contracts and/or using contract interfaces). ##

In the Smart Contract are imported the OpenZeppelin contracts.

**Pausable.sol** : Emergency stop mechanism of the contract, for a possible damage reduction, Circuit Breaker
**Owner.sol**: To be able to save the address of the one who deploys the contract 
 
 Also is in use a Library **Utils.sol** for the format Dates that is Linked into the main contract.

```
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./Utils.sol";
...
```
******

## 2. Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control) ##

The contract **Pausable.sol** allows the Owner of the contract to Pause/Unpause the main contract Garantia.sol so can or cant allow Products to be load. In case any security reason.

For example the owner can Pause the contract, so none users will not be able to load any Product to the Waranty table, only will be able to check if a Prodcut is on the current List, and check if the Warranty is Active or not.

Also Owner, the one that deployed the contract, will be able to Unpaused the contract, so everyone will be able to Load Products again.

This available with modifier whenNotPaused in the main Fucnntion AddProducto

```
function addProducto ( string memory _nombre, string memory _numSerie) public whenNotPaused 
...
```
******