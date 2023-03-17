import { Form, NavLink, useLoaderData } from 'react-router-dom'; //useRouteLoaderData

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  // when the page changes this loader is re-runs
  const token = useLoaderData(); //this works as the loader & elm are on the same route path
  // const token = useRouteLoaderData('root'); //this also works

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? classes.active : undefined)}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={({ isActive }) => (isActive ? classes.active : undefined)}>
              Newsletter
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink to="/auth?mode=login" className={({ isActive }) => (isActive ? classes.active : undefined)}>
                Authentication
              </NavLink>
            </li>
          )}

          {token && (
            <li>
              {/* whenever the form is submitted it will go to the action of the 'logout' path */}
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
