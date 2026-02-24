import { useState } from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Header from './components/Header';
import Hero from './components/Hero';
import Location from './components/Location';
import LotMap from './components/LotMap';
import FloorPlans from './components/FloorPlans';
import BuildOptions from './components/BuildOptions';
import WhyChoose from './components/WhyChoose';
import PriorityListForm from './components/PriorityListForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import ChatBot from './components/ChatBot';

function HomePage() {
  const [preselectedLot, setPreselectedLot] = useState<number | null>(null);

  const scrollToPriorityList = () => {
    const el = document.getElementById('priority-list');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Location />
        <LotMap onSelectLot={(lotId) => setPreselectedLot(lotId)} />
        <FloorPlans onInquire={scrollToPriorityList} />
        <BuildOptions onConsult={scrollToPriorityList} />
        <WhyChoose />
        <PriorityListForm preselectedLot={preselectedLot} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ChatBot />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
