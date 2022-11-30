const snarkjs = require("snarkjs");
const fs = require("fs");

async function proof_generator() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "./circuit_compiled/circuit.wasm", "./keys/circuit_final.zkey");

    fs.writeFileSync("./proof.json",JSON.stringify(proof))
    fs.writeFileSync("./publicInputSignals.json",JSON.stringify(publicSignals))
    console.log("Proof & publicInput Generated!");

}

proof_generator().then(() => {
    process.exit(0);
});