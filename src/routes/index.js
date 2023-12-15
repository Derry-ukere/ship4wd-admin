// react
import { Suspense, lazy } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';

// components
import LoadingScreen from '../components/LoadingScreen';

// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <Signin />
        </GuestGuard>
      ),
    },
    {
      path: '/signup',
      element: (
        <GuestGuard>
          <Signup />
        </GuestGuard>
      ),
    },
    // removed route
    {
      path: 'user',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Index />, index: true },
        { path: 'deposits', element: <Loans /> },
        { path: 'settings', element: <Accounts /> },
        { path: 'withdrawals', element: <Withdrawal /> },
        { path: 'trading', element: <Trading /> },
        { path: 'signals', element: <Signals /> },
        { path: 'trading/new-trader', element: <NewTrader /> },
        { path: 'trading/traders', element: <Traders /> },
        { path: 'image/:imageId', element: <ImagePage /> },
        { path: 'settings/create-admin', element: <Signup /> },
        { path: 'settings/create-user', element: <NewUser /> },
        { path: 'settings/update-password', element: <UpdatePassword /> },
        { path: 'admin', element: <Admins /> },
      ],
    },
    {
      path: '/pages',
      element: <MainLayout />,
      children: [
        { path: 'about-us', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'privacy-policy', element: <Privacy /> },
        { path: 'forex-trading', element: <ForexTrading /> },
        { path: 'stocks-trading', element: <StocksTrading /> },
        { path: 'crypto-trading', element: <CryptoTrading /> },
        { path: 'options-trading', element: <OptionsTrading /> },
        { path: 'copy-expert-traders', element: <CopyTrading /> },
        { path: 'about-mining', element: <Mining /> },
        { path: 'bitcoin-mining', element: <BitcoinMining /> },
        { path: 'dogecoin-mining', element: <DcoinMining /> },
      ],
    },
  ]);
}

const Signin = Loadable(lazy(() => import('../pages/Signin')));
const Signup = Loadable(lazy(() => import('../pages/Signup')));
const NewUser = Loadable(lazy(() => import('../pages/NewUser')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const About = Loadable(lazy(() => import('../pages/AboutUs')));
const Privacy = Loadable(lazy(() => import('../pages/Privacy')));
const ForexTrading = Loadable(lazy(() => import('../pages/ForexTrading')));
const StocksTrading = Loadable(lazy(() => import('../pages/StocksTrading')));
const CryptoTrading = Loadable(lazy(() => import('../pages/CryptoTrading')));
const OptionsTrading = Loadable(lazy(() => import('../pages/OptionsTrading')));
const CopyTrading = Loadable(lazy(() => import('../pages/CopyExperts')));
const Mining = Loadable(lazy(() => import('../pages/Mining')));
const BitcoinMining = Loadable(lazy(() => import('../pages/BitcoinMining')));
const DcoinMining = Loadable(lazy(() => import('../pages/DogecoinMining')));

// dashboard

const Index = Loadable(lazy(() => import('../pages/user/Home')));
const Loans = Loadable(lazy(() => import('../pages/user/Loans')));
const Accounts = Loadable(lazy(() => import('../pages/user/Settings')));
const Withdrawal = Loadable(lazy(() => import('../pages/user/Withdrawal')));
const Trading = Loadable(lazy(() => import('../pages/Trading')));
const Signals = Loadable(lazy(() => import('../pages/Signals')));
const ImagePage = Loadable(lazy(() => import('../pages/ImageUrl')));
const NewTrader = Loadable(lazy(() => import('../pages/NewTrader')));
const Traders = Loadable(lazy(() => import('../pages/Traders')));
const Admins = Loadable(lazy(() => import('../pages/user/Admins')));
const UpdatePassword = Loadable(lazy(() => import('../pages/UpdatePassword')));







