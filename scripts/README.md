# Web3 Renewables - Scripts

## Background
We currently rely on switchboard to creates org, apps and roles for access.

## Setup
The scripts assume that a domain is already registered via ENS. Ex. domain `brayden.ewc`
> Note: This is no longer required. For production, Energy Web had to create the domain for us. For development, this can be followed or the organization created through the volta switchboard can be used.
1. [Register a domain here](https://ens.energyweb.org/)

Before running this script, values for domain and private key of its owner should be set in `.env.local`

2. Grab your metamask private key of the account that owns the domain. [How to export and accounts private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)

## Deploying

1. Copy .env.example and re-name the copy to `.env.local`. Fill in the variables
```bash
cp .env.example .env.local
```

2. Install dependencies
```bash
yarn install
```
3. Run the deployment script:

```bash
yarn deploy:volta
```

## Switchboard Docs
[Switchboard Object Definitions can be found here](https://github.com/energywebfoundation/ew-credentials/blob/develop/packages/credential-governance/src/types/domain-definitions.ts)