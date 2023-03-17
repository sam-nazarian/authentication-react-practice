import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId', // events/:eventId
            id: 'event-detail',
            loader: eventDetailLoader, //loader for both childs
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction, //action for only this route
              },
              {
                path: 'edit', // events/:eventId/edit
                element: <EditEventPage />,
                action: manipulateEventAction, //action for only this route
                loader: checkAuthLoader, //since we don't need to use the data (return value) of the loader inside the elm we don't need to call the loader in the elm (loader always runs before the elm)
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader, //since we don't need to use the data (return value) of the loader inside the elm we don't need to call the loader in the elm (loader always runs before the elm)
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction, //has no element because only the action is used, whenever the logout button in navigation is clicked
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
