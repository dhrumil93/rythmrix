import { Redirect } from 'expo-router';
import { ROUTES } from '../navigation/routes';

export default function Index() {
  // Redirect directly to login page
  return <Redirect href={ROUTES.AUTH}  />;
} 