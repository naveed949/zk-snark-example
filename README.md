# zk-snark-example
This repositry contains snarkjs demo, where a simple circuit is provided and using snarkjs proving & verification keys are generated and later using both keys and the circuit proof of secret information is generated and verified with the help of snarkjs without revealing the secret information.

# How to run demo
To run demo please follow following steps

## 1. Generate Keys
To generate prover & verification keys run following command
```code
npm run keyGen
```
## 2. Prover
To generate proof you need to run prover using following command
```code
npm run prover
```
## 3. Verifier
To verify proof you need to run verifier using following command
```code
npm run verifier
```