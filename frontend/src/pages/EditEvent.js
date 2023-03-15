import { Suspense } from 'react';
import { useRouteLoaderData, Await } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  // const data = useRouteLoaderData('event-detail');
  // return <EventForm method="patch" event={data.event} />;

  const { event } = useRouteLoaderData('event-detail');

  return (
    <Suspense fallback="Loading...">
      <Await resolve={event}>{(loadEventData) => <EventForm event={loadEventData} method="PATCH" />}</Await>
    </Suspense>
  );
}

export default EditEventPage;
