import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();

  const token = useLoaderData();
  const submit = useSubmit();

  // log the user out after 1 hour, run this function whenever the token value changes (meaning that there's a new token, which means the user logged in or logged out)
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    // console.log('tokenDuration', tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' }); //run the action in of the logout path route
    }, tokenDuration); //logout user when dpending on how much longer the token is active (in milliseconds)
  }, [token, submit]);
  // useEffect only runs when the token changes or when the page is RELOADED

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
