import { generateWallet, Wallet } from '@stacks/wallet-sdk';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { StxWalletModel } from '../models/stxWallet.model';
import { getAccountBalance } from '@stacks/blockchain-api-client';

export class StxWalletService {
  static async createWallet() {
    const wallet: Wallet = await generateWallet({
      secretKey: process.env.SECRET_KEY || 'your 12-24 word secret phrase',
      password: process.env.PASSWORD || 'your-wallet-password',
    });

    const account = wallet.accounts[0];
    const newWallet = new StxWalletModel({
      address: account.stxAddress,
      privateKey: account.stxPrivateKey,
      publicKey: account.stxPublicKey,
    });

    await newWallet.save();

    return {
      address: account.stxAddress,
      publicKey: account.stxPublicKey,
    };
  }

  static async getBalance(address: string) {
    const network = process.env.NETWORK === 'mainnet' ? new StacksMainnet() : new StacksTestnet();

    try {
      const balance = await getAccountBalance({
        url: network.coreApiUrl,
        principal: address,
      });

      return {
        balance: balance.stx.balance,
      };
    } catch (error) {
      throw new Error('Unable to retrieve balance');
    }
  }

  static async sendStx(sender: string, recipient: string, amount: number) {
    // Implementation of STX transfer using @stacks/transactions
    // This will include signing the transaction and broadcasting it to the network
  }
}
