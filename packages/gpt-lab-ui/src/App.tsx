import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from './components/Layout';
import { Experiments } from './pages/Experiments';
import { Orchestrators } from './pages/Orchestrators';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Experiments />} />
            <Route path="/orchestrators" element={<Orchestrators />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
