import { Redirect } from 'expo-router';
import { ROUTES } from '../navigation/routes';

export default function AppIndex() {
  return <Redirect href={ROUTES.HOME} />;
} 