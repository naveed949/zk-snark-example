const snarkjs = require("snarkjs");
const fs = require("fs");

async function verifier(circuit) {
    const vKey = JSON.parse(fs.readFileSync(`./keys/${circuit}_verification_key.json`));
    const proof = JSON.parse(fs.readFileSync('./proof.json'));
    const publicSignals = JSON.parse(fs.readFileSync('./publicInputSignals.json'));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Proof verified successfully");
    } else {
        console.log("Invalid proof");
    }

}

verifier('circuit').then(() => {
    process.exit(0);
});