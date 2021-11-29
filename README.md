# Activate Warranty for consume products

**Create a Decentralice Application(DApp).**

Summary:
The theme for the Dapp is a system that activates in the BLockchain the guarantee of a product dependent on the Serial number and on the name of the product. Activating the Guarantee from the moment it is uploaded, and ending once two years have elapsed. In this way, product buyers could justify their purchase and have access to the Manufacturer's Warranty.

Within the code you can view more comments for a better understanding of the application.

 -Dependencies and Aplications need it to run the Dapp:

Node Package management (npm).
Solidity, compiler used "0.5.8+commit.23d335f2.Emscripten.clang"

Truffle: To Deploy Smart Contract.

Ganache: For using a Local Blockchain and do some tests.

Metamask: To interact with the BLockchaing and be able to sing transactions

# Steps for testing the DApp in a local enviorment
## 1. Clone the project
`https://github.com/jcmoya/blockchain-developer-bootcamp-final-project`

(Node Modules has been deleted to avoid upload it to Git)

## 2. Install dependencies in case are need it
```
$ npm install
```

## 3. Arrancar Ganache
```
./ganache-2.5.4-linux-x86_64.AppImage
```

## Using Open Zeppelin Libraries
For using external Libraries i am going to use the Pausable and Owner contracts from Open Zeppelin. I did not think was need it to deploy them on my contract,IFor using them in the proyect you need to do next steps:


1º Install Open Zeppelin Dependencies inside the proyect folder in this way:

```
 npm install @openzeppelin/contracts

```
Also i used an existing librarie and is already modified to use only some specific functions. This librarie is inside my main contract, as you can see when the contract is deployed in the next step:

  Linking
   -------
   * Contract: Garantia <--> Library: Utils (at address: 0x79efD586841e42C0973535056927d9F2e9BDFFbb)
```

## 4. Compile and Deploy contacts

In the project folder use. Compile contracts:

`$ truffle compile` 

Compiling your contracts...
===========================
> Compiling ./contracts/Garantia.sol
> Compiling ./contracts/Utils.sol
> Artifacts written to /home/jules/Escritorio/Github/blockchain-developer-bootcamp-final-project/build/contracts
> Compiled successfully using:
   - solc: 0.8.10+commit.fc410830.Emscripten.clang


Deploy contract in Ganache: 

`$ truffle migrate --reset` 
```

jules@jules:~/Escritorio/Github/blockchain-developer-bootcamp-final-project$ sudo truffle migrate --reset

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x88429ad33f721190b97514fed61d3f472c07e75e593371e627e42a12698d16bd
   > Blocks: 0            Seconds: 0
   > contract address:    0x13936d9db7d84660e69C69f745b4f5eAC9408bca
   > block number:        5
   > block timestamp:     1638023681
   > account:             0xFA2060537647f77Fb3556b2A5580914dFD0248De
   > balance:             99.98336824
   > gas used:            248854 (0x3cc16)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00497708 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00497708 ETH


2_deploy_contracts.js
=====================

   Deploying 'Utils'
   -----------------
   > transaction hash:    0xc150102e3964dda48d7f3351c0a2e3e34e0486ffdbf6aa435618e10f0c9121f0
   > Blocks: 0            Seconds: 0
   > contract address:    0x79efD586841e42C0973535056927d9F2e9BDFFbb
   > block number:        7
   > block timestamp:     1638023682
   > account:             0xFA2060537647f77Fb3556b2A5580914dFD0248De
   > balance:             99.96738128
   > gas used:            756835 (0xb8c63)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0151367 ETH


   Linking
   -------
   * Contract: Garantia <--> Library: Utils (at address: 0x79efD586841e42C0973535056927d9F2e9BDFFbb)

   Deploying 'Garantia'
   --------------------
   > transaction hash:    0x4e5b2c5d51e7a8c91e0caaddf5b6375687f3c335298b6bcf4a25080e1acd790e
   > Blocks: 0            Seconds: 0
   > contract address:    0x3F13E3A519A8DfaA9cc87a282492F1434938506F
   > block number:        8
   > block timestamp:     1638023689
   > account:             0xFA2060537647f77Fb3556b2A5580914dFD0248De
   > balance:             99.91865284
   > gas used:            2436422 (0x252d46)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04872844 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.06386514 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.06884222 ETH

```
## 5. Arrancar Front End
Desde la carpeta app, para arrancar el servidor usar lo siguiente:
`$ npm run dev`
```

function addProduct ( string memory _name, string memory _serialNumber){

}


function checkWarranty(string memory _serialNumber) public  view returns ( string memory) {
    //Checks the the serial number is correct
  
}


function getInitialYear(string memory _serialNumber) public  view returns ( uint) {
    //Checks the Serial number is coorect and the Year where was bought
 
}


function getEndDate(string memory _serialNumber) public  view returns ( uint) {
    
    //Check serial number exist and is valid and the end of the warranty, initially warranty = 2 years
   
 
}

