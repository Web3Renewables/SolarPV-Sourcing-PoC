# Web3 Renewables

## Getting Started Developing

1. Copy .env.example and re-name the copy to `.env.local`. fill in the variables
```bash
cp .env.example .env.local
```
`JWT_SECRET` is a private key used for creating sessions.
It has to be at least 32 characters long. 
You can use https://1password.com/password-generator/ to generate one


2. Install dependencies
```bash
yarn install
# or 
npm install
```
3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Roles
![iam client lib domain hierarchy](https://energy-web-foundation-iam-client-lib.readthedocs-hosted.com/images/domainHierarchy.png)

https://energy-web-foundation-iam-client-lib.readthedocs-hosted.com/intro/domainhierarchy/

## Deploying
We rely on switchboard to creates org, apps and roles.

Assumes that the domain is already registered https://ens.energyweb.org/

See the [scripts folder README](../scripts/README.md)


---

## Project Details
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
