#!/bin/bash
if [ -z "$1" ]
then
  echo "Error: No arguments supplied"
  return 0
fi

if [ "$1" = "--dev" ] || [ "$1" = "-dev" ];
then 
  mkdir -p ./build
  zip -r ./build/web3renewables_server_dev.zip ../server -x "**/node_modules/*" "**/.env.production"
elif [ "$1" = "--prod" ] || [ "$1" = "-prod" ];
then
  mkdir -p ./build
  zip -r ./build/web3renewables_server_prod.zip ../server -x "**/node_modules/*" "**/.env.local"
else
  echo "Error: Incorrect arguments. Please use --dev or --prod"
fi
