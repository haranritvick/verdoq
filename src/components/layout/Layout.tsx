import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#F5F5F5',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}
