const snarkjs = require("snarkjs");
const fs = require("fs");

const generator = async (circuit) => {
    console.info('Initializing ZKey process...')

     await snarkjs.zKey.newZKey(`./circuit_compiled/${circuit}.r1cs`, "./keys/powerOfTau_final.ptau", `./keys/${circuit}_00.zkey`)
     console.info('First contribution...')
    await snarkjs.zKey.contribute(`./keys/${circuit}_00.zkey`,`./keys/${circuit}_01.zkey`,'cintribution#1','thisismycontribution')
     console.info('Beacon phase...')
    await snarkjs.zKey.beacon(`./keys/${circuit}_01.zkey`,`./keys/${circuit}_final.zkey`,'beaconContribution','0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',10)
    console.info('Verifying the Zkey...')
    const flag = await snarkjs.zKey.verifyFromR1cs(`./circuit_compiled/${circuit}.r1cs`,"./keys/powerOfTau_final.ptau",`./keys/${circuit}_final.zkey`)
    if (!flag){
        console.error('Verification failed, something went wrong!')
        process.exit(1)
    }

    console.info('Verification done! \nExporting the Verification Key...')
    const Vk = await snarkjs.zKey.exportVerificationKey(`./keys/${circuit}_final.zkey`)
    fs.writeFileSync(`./keys/${circuit}_verification_key.json`, JSON.stringify(Vk))
    console.info('ZKeys generated and written successfully at ./keys/*')
    return circuit;
};

generator('circuit').then((circuit) => {
    process.exit(0)
});