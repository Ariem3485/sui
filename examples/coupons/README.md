# Sui Coupon Demo

Sui Coupons is a PoC 1-week hackathon project that demonstrates the effectiveness of combining the expressivity features
of the Move language, with Sui's unique design ans speed, in order to provide a novel Web3.0 user on-boarding mechanism 
via NFT coupon air-drops.

The objective is to offer a tool for merchants that incentivizes and helps their users to have a smooth blockchain
on-boarding experience, by removing the account and passphrase generation friction, which usually demotivates 
the average non-technical person from entering the crypto space in the first place. 

## Why crypto on-boarding usually fails?
There have been many attempts in the past to measure blockchain user on-boarding success rates, but many of them 
introduce even more complex protocols and technical terms, such as lazy minting, layer-2 solutions, custodial services 
(where the self-sovereignty concept is unfortunately absent) and MetaMask self-custody wallets via mnemonics. What is 
usually **missed** however is:
- a strong incentive for users to tolerate the time-consuming process of understanding the technical details before they use it
- a "try me first for free" principle
- users cannot use an account if it's not already topped up with a minimum amount of coins (required to pay for gas)
- addresses are not actually visible on-chain before a first transaction occurs (so they miss the feeling of real ownership)
- in some NFT air-dropping solutions, such as lazy minting, the assets are not available on the blockchain explorers and thus, the users are locked in show-casing platforms.
- layer-2 minting and related flows are very complex terms for the average user to digest
- many of the above issues exist because in many blockchains transactions are either expensive or very slow to allow for massive user on-boarding campaigns (i.e., giving away assets)

## The Sui Coupon protocol
Sui has unique features by design; it can almost scale indefinitely, offer record numbers in transaction speed and 
latency, thus reducing the per-transaction cost, and provide batching which allows for blazing fast air-dropping, 
directly to layer-1 and not externally.

Sui Coupons takes advantage of the aforementioned facts to reasonably solve most of the on-boarding problems, focusing 
on users who never used a blockchain wallet in the past.

In Layman's terms the protocol is very simple and works as follows (per user): A merchant issues a coupon in the form of
NFT Vs the conventional way of sharing coupon codes. To achieve this, it creates a Sui account and mnemonic for this 
user, it mints a discount coupon NFT and transfers it along with some minimal SUI coins to the user's just generated Sui 
address, and it finally emails the Sui explorer-link along with the pre-generated mnemonic to user's email address.  

Each user will receive an email where they can see their mnemonic, but most importantly a link to browse their asset, 
their first on-chain NFT. 

Now, users who expect to spend their coupon are motivated to enroll to any wallet by entering their mnemonic (or use 
QR-code). 
What is interesting is everyone can socially share their NFT-link with friends, even before opening any wallet app. We 
expect that these social element will help on word of mouth and adoption of the coupon NFT idea.

Regarding the merchant, note that in this demo we utilize deterministic key generation, where the merchants only needs a 
single secret keyc (seed) to deterministically generate the mnemonic phrase for every user. The key management is as 
easy as possible by only requiring to protect the secret seed, because every user-mnemonic can always be derived whenever 
required.  

## Sui Coupon extensions
Note that Sui supports batched transactions from the same account, which is a very useful feature in the coupon scenario 
as the merchant can force minting for multiple user in one mega transaction.

Additionally, we are working in a multi-signer batch transaction model, which will allow for spending an NFT even without 
owning the required Sui gas amount. We expect that because of Sui's costs per transaction, many 3rd party service will 
be willing to help users move their assets by tipping the user transaction with the gas required. This extension is WIP.

## Sui Coupon
This project required the implementation or enhancements to the following 5 high-level components:
* the Move implementation of a simple Coupon NFT, available at [`DiscountCoupon`](../../../sui_programmability/framework/sources/DiscountCoupon.move)
* a new Rest server end-point to support the `mint_and_topup` coupon POST request, available at [`rest_server.rs`](../../../sui/src/rest_server.rs)
* a basic Rust Mail server to provide the coupon email template and submit emails via smtp server, available at [`coupon_utils.rs`](../../../sui/src/coupon_utils.rs)
* a Node JS server + frontend for the Coupon issuing Dashboard, available at [`examples/coupons/`](../)
* small updates to sui-explorer for NFT coupon templated show-casing, available at  [`explorer/client/`](../../../explorer/client/).

![user flow](./docs/flow.png 'User Flow')

## Get Started

1. Set up the `.env` file through `cp .env.sample .env`. Rememeber to replace any placeholder value(e.g., ALCHEMY_API_KEY).
2. Install the dependencies through `npm i`
3. Start the server through `npm run dev`
4. The easiest way to test out an endpoint is through [http://localhost:8000/docs](http://localhost:8000/docs) by clicking on "Try it out". No need to manually write curl command or example data.

## Useful Commands for Development

**Requirements**: Node 14.0.0 or later version

In the project directory, you can run:

### `npm i`

Before running any of the following scripts `npm i` must run in order to install the necessary dependencies.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Run the production version

### `npm run lint`

Run linting check (prettier/eslint/stylelint).

### `npm run lint:fix`

Run linting check but also try to fix any issues.

### `npm run prettier:fix:watch`

Run prettier in watch mode and format any file that changes. (Also runs prettier once in the beginning for all the files)\
It can be useful during development to format automatically all the files that change.

## Documentation

Swagger UI is available at [http://localhost:8000/docs](http://localhost:8000/docs). The UI will always show the latest documentation during development.

Aside from allowing developers to inspect the documentation, the Swagger UI also allows the developer to quickly test out the endpoint by clicking the "Try it out" button with pre-populated example data.

The syntax for documentation annotation can be found in the [tsoa docs](https://tsoa-community.github.io/docs/getting-started.html).

![swagger ui](./docs/swagger.png 'Swagger UI')



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Execute Sui Coupons locally:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
