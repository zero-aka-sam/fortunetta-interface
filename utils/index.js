
const signAndSendTransaction = async (txnData, privateKey, provider)=> {
			return await provider.eth.accounts
                    .signTransaction(
                        txnData, "0x".concat(privateKey)
                    ).then((res) => {
                    return provider.eth.sendSignedTransaction(res.rawTransaction)
                })     
}


export default signAndSendTransaction