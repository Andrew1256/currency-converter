import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from '../pages/home';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default App;
