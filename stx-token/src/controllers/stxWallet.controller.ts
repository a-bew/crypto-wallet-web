import { Request, Response } from 'express';
import { StxWalletService } from '../services/stxWallet.service';

export class StxWalletController {
  static async createWallet(req: Request, res: Response) {
    try {
      const wallet = await StxWalletService.createWallet();
      res.status(201).json(wallet);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating wallet', error: error.message });
    }
  }

  static async getBalance(req: Request, res: Response) {
    try {
      const { address } = req.params;
      const balance = await StxWalletService.getBalance(address);
      res.status(200).json(balance);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving balance', error: error.message });
    }
  }

  static async sendStx(req: Request, res: Response) {
    try {
      const { sender, recipient, amount } = req.body;
      await StxWalletService.sendStx(sender, recipient, amount);
      res.status(200).json({ message: 'Transaction successful' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error sending STX', error: error.message });
    }
  }
}
