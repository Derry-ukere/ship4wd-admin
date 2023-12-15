// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const WALLETS = {
  bitcoin: process.env.REACT_APP_BITCOIN_ADDR,
  ethereum: process.env.REACT_APP_ETHEREUM_ADDR,
  bnb: process.env.REACT_APP_BNB_ADDR,
  usdt: process.env.REACT_APP_USDT_ADDR,
};

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
  themeStretch: false,
};

export const userModel = {
  acount_status: 'active',
  address_verification: 'complete',
  city: '',
  closed_trades: [
    {
      current_page: 1,
      data: [],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  contracts: [
    {
      current_page: 1,
      data: [],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  country: 'Argentina',
  created_at: 'date',
  created_at_day: '12',
  created_at_month: 'APR',
  created_ip: '111.221.09.112',
  currency: 'Usd',
  deposits: [
    {
      current_page: 1,
      data: [
        {
          amount: 2000,
          amount_in_crypto: 1.25,
          comment: 'Trading',
          created_at: 'date here',
          created_by_admin: true,
          currency: 'USD',
          deleted_at: null,
          id: 147,
          network: 'TRC20',
          payment_method: 'Tether',
          proof: '',
          status: 'Pending',
          symbol: 'USDT',
          tag: '',
          timestamp: '',
          to: 1,
          updated_at: '',
          updated_at_day: '13',
          updated_at_month: 5,
          user_id: 122,
          wallet_address: 'xyyhhsg23y677ss900zmnbbvx',
        },
      ],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  dob: '',
  email_verification: 'completed',
  id_verification: 'skipped',
  message: '',
  message_type: 'Normal',
  mining_balance_atom: 0,
  mining_balance_bnb: 9,
  mining_balance_btc: 1.21,
  mining_balance_doge: 0,
  mobile_number: '08165258860',
  open_trades: [
    {
      current_page: 1,
      data: [],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  password: 'password',
  pending_deposits: 1,
  pending_withdrawals: 0,
  photo_back_view: '',
  photo_front_view: 'url.com',
  photo_profile: 'camera.png',
  photo_utility_bill: 'url.png',
  pin: 1222,
  post_code: '12222',
  push_subscription: '',
  referral_link: 'signup.html?user_id=122',
  referrals: [
    {
      current_page: 1,
      data: [],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  referred_by: null,
  signal_strength: 1,
  state: 'kebbi',
  street_address: '32 larboard road',
  trader_id: 'url.com',
  traders: [],
  trading_balance: 0,
  trading_deposit: 0,
  trading_pnl: 0,
  trading_profit: 0,
  updated_at: 'dat hre',
  wallet_phrase: '',
  wallet_status: '',
  withdrawals: [
    {
      current_page: 1,
      data: [],
      first_page_url: 'url.com',
      from: null,
      last_page: 1,
      last_page_url: 'url.com',
      next_page_url: null,
      path: 'api/users/auth/signin',
      per_page: 25,
      prev_page_url: null,
      to: null,
      total: null,
    },
  ],
  errors: [],
};
