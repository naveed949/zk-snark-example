const snarkjs = require("snarkjs");
const fs = require("fs");

async function run(circuit) {
    const input = JSON.parse(fs.readFileSync(`./factor/input.json`, { encoding: 'utf8' }));
    // await snarkjs.wtns.calculate(`${JSON.parse(input)}`,`${circuit}.wasm`,`./factor/${circuit}_final_1.wtns`)
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, `./factor/${circuit}.wasm`, `${circuit}_final_1.zkey`);

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    const vKey = JSON.parse(fs.readFileSync(`${circuit}_verification_key.json`));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }

}
const generator = async (circuit) => {
    console.info('Initializing ZKey process...')
     await snarkjs.zKey.newZKey(`./factor/${circuit}.r1cs`, "./factor/powerOfTau_final.ptau", `${circuit}_00.zkey`)
     console.info('First contribution...')
    await snarkjs.zKey.contribute(`${circuit}_00.zkey`,`${circuit}_01.zkey`,'cintribution#1','thisismycontribution')
     console.info('Beacon phase...')
    await snarkjs.zKey.beacon(`${circuit}_01.zkey`,`${circuit}_final.zkey`,'beaconContribution','0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',10)
    console.info('Verifying the Zkey...')
    const flag = await snarkjs.zKey.verifyFromR1cs(`./factor/${circuit}.r1cs`,"./factor/powerOfTau_final.ptau",`${circuit}_final.zkey`)
    if (!flag){
        console.error('Verification failed, something went wrong!')
        process.exit(1)
    }

    console.info('Verification done! \nExporting the Verification Key...')
    const Vk = await snarkjs.zKey.exportVerificationKey(`${circuit}_final_1.zkey`)
    fs.writeFileSync(`${circuit}_verification_key.json`, JSON.stringify(Vk))
    console.info('ZKeys generated and written successfully at ../keys')
    return circuit;
};

generator('circuit').then((circuit) => {
    process.exit(0)
});