const getUserFromSession = () => {
  return async function getServerSideProps({ req }) {
    if (!req.session.user?.did) {
      return {
        props: {
          user: {
            did: null,
            address: null,
            roles: [],
          },
        },
      };
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  };
};

export default getUserFromSession;
