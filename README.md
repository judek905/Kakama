# Kakama

A static demo website for a crypto trading platform. It includes a simulated paper-trading screen where users practise with virtual money. No real funds, no real prices, no backend.

## What's inside

```
kakama/
├── index.html      Landing page with sample markets
├── trade.html      Demo trading platform (chart, buy/sell, positions)
├── login.html      Demo sign-up form (does not store or send anything)
├── risk.html       Risk disclosure page
├── css/style.css   All styling
├── js/trade.js     Simulated prices, chart and paper-trading logic
└── README.md
```

## Run it

1. Unzip the folder.
2. Double-click `index.html` to open it in your browser.

No install or build step is needed. To test with a local server instead:

```
cd kakama
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy it

Upload the `kakama` folder to any static host:

- **Netlify:** drag the folder onto the Sites page.
- **Cloudflare Pages / GitHub Pages / Vercel:** connect a repo, leave the build command empty and set the output folder to `/`.

## How the demo works

- Four markets (BTC, ETH, SOL, XRP) start at fixed prices and move by small random changes every second.
- Users start with a $10,000 virtual balance.
- **Buy** opens a long position and **Sell** opens a short one. Profit and loss update live.
- **Close** returns the position size plus profit or loss to the balance. **Reset demo** restores $10,000.
- Everything lives in memory, so refreshing the page resets it.

## Customise

- **Name and colours:** change the colour variables at the top of `css/style.css` (`--gold`, `--up`, `--down`, `--bg`).
- **Markets:** edit the `start` object and the `<option>` list in `trade.html` and `js/trade.js`.
- **Starting balance:** change `balance=10000` in `js/trade.js` and the matching text in the HTML.
- **Volatility:** adjust the `.003` value in the price update lines of `js/trade.js`.

## Before going further

This is a front-end demo only. Before building anything that handles real money or real user data:

- Add a secure backend with proper authentication and password hashing.
- Use real market data from a licensed provider.
- Offering real trading, deposits or withdrawals usually needs a licence, identity (KYC) and anti-money-laundering checks in every country you serve.
- Have a lawyer write the risk disclosure in `risk.html` and the terms of service. The current text is a placeholder.
- Never present simulated results as real or promise profits.

## Licence

Add your own licence here.
