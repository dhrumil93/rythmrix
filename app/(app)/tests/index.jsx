import { Redirect } from 'expo-router';
import { ROUTES } from '../../../navigation/routes';

export default function TestsIndex() {
  return <Redirect href={ROUTES.HOME} />;
} 