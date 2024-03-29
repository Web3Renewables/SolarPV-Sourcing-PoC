const getInfuraIPFSConfig = () => {
  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  return {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  };
}

export {
  getInfuraIPFSConfig
}