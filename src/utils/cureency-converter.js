/* eslint-disable no-case-declarations */
import axios from 'axios';

const URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,binancecoin,tether,solana&vs_currencies=usd,gbp,eur,aud';

export async function getCurrentPrices() {
  try {
    const config = {
      method: 'get',
      url: URL,
    };
    const response = await axios(config);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Registration Error', error.message);
    throw new Error(error);
  }
}

export const usdToCoin = async (usd, paymentMethod) => {
  const currentData = await getCurrentPrices();
  let amount;
  let result;

  const bnb = currentData.binancecoin.usd;
  const btc = currentData.bitcoin.usd;
  const ethereum = currentData.ethereum.usd;
  const tether = currentData.tether.usd;

  switch (paymentMethod) {
    case 'Bitcoin':
      result = usd / btc;
      amount = `${result.toFixed(4)} btc`;
      break;
    case 'Ethereum':
      result = usd / ethereum;
      amount = `${result.toFixed(4)} eth`;
      break;
    case 'BNB':
      result = usd / bnb;
      amount = `${result.toFixed(4)} bnb`;
      break;
    case 'USDT':
      result = usd / tether;
      amount = `${result.toFixed(4)} usdt`;
      break;
    default:
      break;
  }

  return amount;
};
