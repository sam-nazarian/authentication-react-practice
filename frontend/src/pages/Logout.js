import { redirect } from 'react-router-dom';

// Simply a JS file that holds an action
export function action() {
  localStorage.removeItem('token');
  return redirect('/');
}
