# JS tools for interacting with Ethereum

This repo consists of a bunch of useful utilities that will allow you to interact with the Ethereum network.

This includes easy provider classes to instantiate to fetch and seed blocks for testing or analytics.

<b>There are also various utils to parse information received from JSON-RPC provider classes.</b> <i>Parsers</i>
(referring to utils for processing/sanitising raw JSON-RPC response data) are not built into the providers by design
choice because I would like to give developers the choice around how sanitised they want the JSON-RPC data received to
be based on whatever their use case is.
