# Avoiding Common Attacks

******
## 1. Pragma version ##

Using, and specifing the Version of the compiler in the contract, then you can  avoid this issues:

- [SWC-102 - Outdated Compiler Version](https://swcregistry.io/docs/SWC-102).
- [SWC-103 - Floating Pragma](https://swcregistry.io/docs/SWC-103).

```
pragma solidity 0.8.10;
...
```


******
## 2. Functions and Variable Visibility ##

All the functions and the main variables have a visibility type specified.This avoid:

- [SWC-100 - Function Default Visibility](https://swcregistry.io/docs/SWC-100).

******

## 3. Presence of unused variables ##

In the main contract all the variables are in use.This avoid:

- [SWC-131 - Presence of unused variables](https://swcregistry.io/docs/SWC-131).