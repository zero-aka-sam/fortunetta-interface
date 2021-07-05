import Web3 from "web3";

export const operator = (socket) => {
  let blockNumber;
  let roundEnd;
  let controller_address = "0xd47AaD7d1f7B1Fc52Bb58b0B96E6C0dcF6fbCf62";
  let controller_abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "changeUserStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createRound",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributeDailyReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_condition",
				"type": "uint256"
			}
		],
		"name": "editLevel",
		"outputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			}
		],
		"name": "finishRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "contract IClient",
				"name": "_client",
				"type": "address"
			},
			{
				"internalType": "contract IBSCV",
				"name": "_bscv",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousGuard",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newGuard",
				"type": "address"
			}
		],
		"name": "GuardshipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "finishedRound",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceGuardship",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IBSCV",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "setBSCV",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IClient",
				"name": "_client",
				"type": "address"
			}
		],
		"name": "setClient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_countDown",
				"type": "uint32"
			}
		],
		"name": "setCountDown",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			}
		],
		"name": "setOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newGuard",
				"type": "address"
			}
		],
		"name": "transferGuardship",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_withdraw",
				"type": "address"
			}
		],
		"name": "withdrawRevenue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dailyRewardInterval",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dailyRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentRoundId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "guard",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_betCounts",
				"type": "uint256"
			}
		],
		"name": "levelRequirements",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_result",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextdailyRewardAt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Round",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
  ]
  let client_address = '0x8a0afE8cC647eC47b283f5F4aA914B2F643602f6';
  let client_abi = [
	{
		"inputs": [
			{
				"internalType": "contract IBSCV",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "contract IController",
				"name": "_controller",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "_countdown",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_restTime",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "userID",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "choice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "betPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "roundCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BSCV",
		"outputs": [
			{
				"internalType": "contract IBSCV",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Controller",
		"outputs": [
			{
				"internalType": "contract IController",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Countdown",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Tax",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amounts",
				"type": "uint256"
			}
		],
		"name": "addRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_userId",
				"type": "uint32"
			}
		],
		"name": "approveUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "bet",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "_userID",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_userId",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_betAmount",
				"type": "uint256"
			}
		],
		"name": "betManager",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "collectRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createRound",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentInfo",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getPendingRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			}
		],
		"name": "getRoundInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "bettingAddressesOnOne",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bettingAmountsOnOne",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "bettingAddressesOnTwo",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bettingAmountsOnTwo",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "bettingAddressesOnThree",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bettingAmountsOnThree",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "winningChoice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPrize",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUserId",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_userId",
				"type": "uint32"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "UserID",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "Level",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "PendingRewards",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CollectedRewards",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LockTill",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "BetCounts",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Approve",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "restTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IBSCV",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "setBSCV",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IController",
				"name": "_controller",
				"type": "address"
			}
		],
		"name": "setController",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_countdown",
				"type": "uint32"
			}
		],
		"name": "setCountdown",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rest",
				"type": "uint256"
			}
		],
		"name": "setRestTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			}
		],
		"name": "setWinningChoice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_userId",
				"type": "uint32"
			}
		],
		"name": "unapproveUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
  let privateKey =
    "bf688ab0dd2c7c941d430abdc38b7748cf78f659c66b023e66298fe8096b5273";
  let myAddress = "0x37fBA930Ce4C4D75Ae902b9222046783c5660bda";

  const web3Ws = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://bsc.getblock.io/testnet/?api_key=0e6a62b3-529f-4406-9ec5-f38937713302"
    )
  )

  const contract = new web3Ws.eth.Contract(controller_abi, controller_address);

  const client = new web3Ws.eth.Contract(client_abi, client_address);

  const createRound = () => {
    contract.methods.createRound()
      .then((tx) => {
        tx.encodeABI()
        .then((data) => {
        contract.methods.createRound()
        .estimateGas({ from: myAddress }, (err, res) => {
        if (err) {
          console.log(err)
        }
        else {
          web3Ws.eth.getGasPrice().then((gasPrice) => {
            web3Ws.eth.getTransactionCount(myAddress).then((nonce) => {
              web3Ws.eth.getTransactionCount(myAddress)
                  const txData = {
                  from: myAddress,
                  to: controller_address,
                  data: data,
                  gas,
                  gasPrice,
                  }
                      console.log(txData)
             })
          })
        }
      })
      })
      })
    


    
    

    let txi;
    await web3Ws.eth.accounts
      .signTransaction(txData, "0x".concat(privateKey))
      .then(async (signedTx) => {
        txi = await web3Ws.eth.sendSignedTransaction(signedTx.rawTransaction);
      });
    console.log("roundCreated");
  }

  const finishRound = async (index) => {
    console.log(index);
    let tx;
    let gas;
    if (index === 0) {
      tx = contract.methods.finishRound("1");
      gas = await contract.methods
        .finishRound("1")
        .estimateGas({ from: myAddress }, (err, res) => {
          if (err) {
            // console.log(err);
          }
        });
    }
    if (index === 1) {
      tx = contract.methods.finishRound("2");
      gas = await contract.methods
        .finishRound("2")
        .estimateGas({ from: myAddress }, (err, res) => {
          if (err) {
            // console.log(err);
          }
        });
    }
    if (index === 2) {
      tx = contract.methods.finishRound("3");
      gas = await contract.methods
        .finishRound("3")
        .estimateGas({ from: myAddress }, (err, res) => {
          if (err) {
            // console.log(err);
          }
        });
    }
    const data = tx.encodeABI();
    console.log(data);

    //console.log(gas)

    const gasPrice = await web3Ws.eth.getGasPrice();

    const nonce = await web3Ws.eth.getTransactionCount(myAddress);
    const txData = {
      from: myAddress,
      to: address,
      data: data,
      gas,
      gasPrice,
    };
    let txi;
    await web3Ws.eth.accounts
      .signTransaction(txData, "0x".concat(privateKey))
      .then(async (signedTx) => {
        txi = await web3Ws.eth.sendSignedTransaction(signedTx.rawTransaction);
      })
      .catch((err) => {
        console.log("error");
      });
    console.log("roundChoice:", index++);
    return txi;
  };

  //const createR = createRound();

  const block = web3Ws.eth.subscribe("newBlockHeaders", async (err, res) => {
    if (!err) {
      let info;
      let end;
      let block;
      let countdown;
      const round = await contract.methods.getCurrentRoundId().call();
      try {
        info = await client.methods.getRoundInfo(round).call();
        end = Number(info.end);
        countdown = Number(end - res.number);
        console.log(countdown);
        socket.emit("countdown", countdown);
      } catch (err) {
        createRound();
        return;
      }
      if (countdown < Number(0) || countdown === 0) {
        console.log("finishing Round");
        let choice;
        choice = Math.floor(Math.random() * 3);
        finishRound(choice);
      }
    }
    if (err) {
      console.log(err)
    }
  });

  block.unsubscribe();

  const event = contract.events.allEvents();

  event.subscribe(async (err, res) => {
    let betOnOneArray = new Object();
    let betOnTwoArray = new Object();
    let betOnThreeArray = new Object();
    if (!err) {
      console.log(res.event);
      if (res.event === "winningRound") {
        console.log(res.returnValues);
        socket.emit("winningNumber", res.returnValues);
      }
      if (res.event === "betonOne") {
        // console.log("****************One******************");
        // console.log("Address", res.returnValues[0]);
        // console.log("Amount", res.returnValues[1]);
        betOnOneArray.address = res.returnValues[0];
        betOnOneArray.amount = res.returnValues[1];
        socket.emit("betOnOne", betOnOneArray);
      }
      if (res.event === "betonTwo") {
        // console.log("****************Two******************");
        // console.log("Address", res.returnValues[0]);
        // console.log("Amount", res.returnValues[1]);
        betOnTwoArray.address = res.returnValues[0];
        betOnTwoArray.amount = res.returnValues[1];
        socket.emit("betOnTwo", betOnTwoArray);
      }
      if (res.event === "betonThree") {
        // console.log("**************OnThree*****************");
        // console.log("Address", res.returnValues[0]);
        // console.log("Amount", res.returnValues[1]);
        betOnThreeArray.address = res.returnValues[0];
        betOnThreeArray.amount = res.returnValues[1];
        socket.emit("betOnThree", betOnThreeArray);
      }
    }
  });
  event.unsubscribe();

  //functions
};
