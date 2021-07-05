import Web3 from 'web3';
import controller from './artifacts/controller.js'
import client from './artifacts/client.js'



const web3Ws = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://bsc.getblock.io/testnet/?api_key=0e6a62b3-529f-4406-9ec5-f38937713302"
    )
  )

const controller_contract = new web3Ws.eth.Contract(controller.abi, controller.address);
const client_contract = new web3Ws.eth.Contract(client.abi, client.address);

const event = web3Ws.eth.subscribe('newBlockHeaders',(err, res)=>{
    if (!err) {
        console.log(res.number);
    }
    if (err) {
        console.log('BlockHeaders Error:', err);
    }
});

const client_event = controller_contract.events.allEvents();
 
client_event.subscribe((err, res) => {
    if (!err) {
        console.log("CONTROLLER:", res);
    }
    if (!res) {
        console.log("CONTROLLER ERR:", err);
    }
})
client_event.unsubscribe();



event.unsubscribe();

// event.unsubscribe();


