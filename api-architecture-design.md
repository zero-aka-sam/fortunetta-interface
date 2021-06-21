TERMINOLOGIES

client : All the naive user are called clients.
controller : The administrator of the product/contract is called a controller.

PARENT ENDPOINT STRUCTURES

i. url : fortunetta.com/api/client

// Usage specification : All the client related information transmissions shall happen via this enpoint.

ii. url : fortunetta.com/api/controller

// Usage specification : All the adminitration related information transmission shall happen via this endpoint

CHILD ENDPOINT STRUCTURES : Client endpoint

i. url : fortunetta.com/api/client/${client-id}

// Usage specification : Retrived the client information as an object for a specific client-id

// Return sample :

{

}
