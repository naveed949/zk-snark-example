const snarkjs = require("snarkjs");
const fs = require("fs");

async function verifier() {
    const vKey = JSON.parse(fs.readFileSync("../keys/verification_key.json"));
    const proof = JSON.parse(fs.readFileSync("proof.json"));
    const publicSignals = JSON.parse(fs.readFileSync("publicpublicSignals.json"));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }

}

verifier().then(() => {
    process.exit(0);
});