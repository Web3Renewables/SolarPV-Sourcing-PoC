# Web3 Renewables - Server

**Note**: Do not log anything important when running the `ec2_runner` file (i.e., do not log anything important in that file or in functions that the file calls). A log file containing all `console.log`s at runtime. This file may then be uploaded over unsecure `smtp`. Any file that is not used by the `ec2_runner` will have its logs only logged to standard output.

## Background
Serverside code for grabbing inverter data, grabbing WattTime data, and creating the formatted GCs

## Setup
Need a WattTime Account
1. [Register Here](https://www.watttime.org/api-documentation/#introduction)

Before running this script, values for the WattTime username, WattTime password, and test inverter API key should be set in `.env.local` (as well as any other environment vairables found in `.env.example`)

## Creating the GCs

**Note:** Daily Functions must be run at any hour the next day as the current time is used get yesterday's date. In addition, the monthly function uses the current date to know which month to grab, therefore, it must be called on any day in the "next" month.

For example: To create the daily GCs for 08-22-2022, the daily function must be run sometime on 08-23-2022. For monthly GCs of August, the function must be run on any day of Sepetember.

1. Copy .env.example and re-name the copy to `.env.local`. Fill in the variables
```bash
cp .env.example .env.local
```

2. Install dependencies
```bash
yarn install
```
3. Run the `create-initial-index.js` file for Volta Test Net and Energy Web Chain. This mutable file keeps track of GCs that have been saved to Web3.Storage. <br>
**Note:** Please look at console after these functions run to place the IPNS Private Key and IPNS Address into your `.env.local` file **before** running the `daily` or `monthly` functions.
```bash
yarn create-initial-index:volta
yarn create-initial-index:ewc
```

4. Run the Volta or Energy Web Chain Daily Script:
```bash
yarn daily:volta

or

yarn daily:ewc
```
4. Run the Volta or Energy Web Chain Monthly Precheck Script:
```bash
yarn monthly-precheck:volta

or

yarn monthly-precheck:ewc
```

5. Run the Volta or Energy Web Chain Monthly Script:
```bash
yarn monthly:volta

or

yarn monthly:ewc
```

## EC2 Instance
View the `ec2` folder for instructions on publishing code to the EC2 instnace.