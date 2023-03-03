## Instructions

Create a website that allows users to convert between different denominations of Ether and also provides some useful info about Ethereum.

The website should cover these:

1. Display the amount of Ether in all 7 denominations in separate input fields.
2. The user should be able to edit any of the 7 input fields and have the others update accordingly (with their equivalent value). This conversion should be done manually without the usage of an external library.
3. Display prices in USD for 1 Ether and for the amount of Ether the user has inputted. You can fetch the ETH/USD data using [this API](https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd).
4. Display the current price of gas in Ether and in USD. You should utilize the `provider` object in `utils/index.ts` - it's your connection to the Ethereum network.

You can display the data in a format you see fit (can be a table, cards, or whatever comes to your mind).

Here are some things we'd like to see you do:

1. Use [use-query-params](https://github.com/pbeshai/use-query-params) to handle the state of the application.
2. Create custom data fetching hooks for fetching the Ether price and gas price. Possibly create a generalized, reusable hook for data fetching.
3. Show off your knowledge of TypeScript!
4. Style the website using [Tailwind CSS](https://tailwindcss.com/docs) (this has been set up for you).
5. Add in some tests.

You will have to add `REACT_APP_MAINNET_RPC` to your `.env` to be able to communicate with Ethereum Mainnet. To do that, you can log in to [Infura](https://app.infura.io) and click "Create new key". Select Web3 API as the network, then "Create" and grab your Ethereum Mainnet RPC endpoint from the page (it will start with `https://mainnet.infura.io/v3/`).

Target time: 3-4 hours for core functonality and 15-30 minutes to make it look nice.

Have fun & good luck!
