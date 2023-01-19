// The password is a private key you must pass at runtime and buildtime (for getServerSideProps),
// it has to be at least 32 characters long. 
// You can use https://1password.com/password-generator/ to generate strong passwords.
export const IRON_OPTIONS = {
    cookieName: 'web3_renewables',
    password: process.env.JWT_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }