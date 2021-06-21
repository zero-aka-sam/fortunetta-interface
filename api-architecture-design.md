# API ARCHITECTURE & DESIGN

**TERMINOLOGIES**

`client` : _All the naive user are called clients_
`controller` : _The administrator of the product/contract is called a controller_

1. PARENT ENDPOINT STRUCTURES

-   url : `fortunetta.com/api/client`

Usage specification : All the client related information transmissions shall happen via this enpoint.

-   url : `fortunetta.com/api/controller`

Usage specification : All the adminitration related information transmission shall happen via this endpoint

2. CHILD ENDPOINT STRUCTURES : Client endpoint

-   POST METHODS

i. --url : fortunetta.com/api/client/login/${wallet-address}

> METHOD : POST
> HEADER : -
> body : -

--usage-specification : Logs in the address, and return a jwt_token

--return-sample :
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o
}

-   GET METHODS

i. url : fortunetta.com/api/client/details/${wallet-address}

METHOD : GET
HEADER : Authorization : bearer `${jwt_token}`

--usage-specification : Retrieves the client information as an object for a specific client-wallet-address

--return-sample :
{
username,
email,
address,
biography,
avatar,
level
}

-   PATCH METHODS

i. --url : fortunetta.com/api/client/update_user/:client_id

// Usage specification :Get the client updated information as an object from a client

// Return sample :

{
Name,
Email,
WalletAddress,
Bio,
DisplayPicture
}
