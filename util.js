import express, { response } from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";


import Web3 from "web3";

import controller from './artifacts/controller.js'

import signAndSendTransaction from './utils/index.js'
import { callbackify } from "util";

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json({ limit: "30mb", extended: true }));app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});

  let privateKey =
    "bf688ab0dd2c7c941d430abdc38b7748cf78f659c66b023e66298fe8096b5273";
  let myAddress = "0x37fBA930Ce4C4D75Ae902b9222046783c5660bda";

  const web3Ws = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://bsc.getblock.io/testnet/?api_key=0e6a62b3-529f-4406-9ec5-f38937713302"
    )
  )

const contract = new web3Ws.eth.Contract(controller.abi, controller.address);
	
const callSync_round = (calls, args) => {
	return Promise.all(
		calls.map((call, index) => {
			return call.func()
		})
	)
}


app.use("/create", async (req, res) => {

			const args = [
		{
			name: 'hash'
		},
		{
			name: 'hash'
		},
			{
			name: 'hash'
		},
		{
			name: 'hash'
		},
	]

		const roundEstimationCalls = [
		{
			name: 'encodeABI',
			func: () =>
				contract.methods.createRound().encodeABI()
		},
		{
			name: 'estimateGas',
			func: () => contract.methods.createRound()
				.estimateGas({ from: myAddress })
		},
		{
			name: 'getGasPrice',
			func: () => web3Ws.eth.getGasPrice(),
		},
		{
			name: 'TxnCount',
			func: () => web3Ws.eth.getTransactionCount(myAddress),
		}
	]
	const roundResults = await callSync_round(roundEstimationCalls, args)

	const roundKeys = roundEstimationCalls.map((call,i) => {
		let obj = {}
		obj['name'] = call.name
		return obj
	})

	const result = roundKeys.map((key,i) => {
		return roundResults.map((res,j) => {
			return {...key, data:  res}
		})[i]

	})

	
		const txnData = {
			from: myAddress,
			to: controller.address,
			data: result[0].data,
			gas: result[1].data,
			gasPrice: result[2].data,
	}


		const txn = await signAndSendTransaction(txnData, privateKey, web3Ws)

				console.log(txn)

		// res.format({
		// 	json: () => {
		// 	}
		// })
})
	
app.use('/finishRound', async (req, res) => {

	function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

	const choice = getRandomInt(1,4);

	console.log(choice)


	const finishRoundCalls = [
			{
			name: 'encodeABI',
			func: () =>
				contract.methods.finishRound(choice).encodeABI()
		},
		{
			name: 'estimateGas',
			func: () => contract.methods.finishRound(choice)
				.estimateGas({ from: myAddress })
		},
		{
			name: 'getGasPrice',
			func: () => web3Ws.eth.getGasPrice(),
		},
		{
			name: 'TxnCount',
			func: () => web3Ws.eth.getTransactionCount(myAddress),
		}
	]

	const finishRound = await callSync_round(finishRoundCalls);

	const finishKeys = finishRoundCalls.map((call,i) => {
		let obj = {}
		obj['name'] = call.name
		return obj
	})

	const result = finishKeys.map((key,i) => {
		return finishRound.map((res,j) => {
			return {...key, data:  res}
		})[i]
	})

	const txnData = {
			from: myAddress,
			to: controller.address,
			data: result[0].data,
			gas: result[1].data,
			gasPrice: result[2].data,
	}

	const txn = await signAndSendTransaction(txnData, privateKey, web3Ws)

	console.log('finish','\n',txn)
})