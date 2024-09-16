import { Router } from 'express';
import { StxWalletController } from '../controllers/stxWallet.controller';

const router = Router();

router.post('/wallet', StxWalletController.createWallet);
router.get('/wallet/balance/:address', StxWalletController.getBalance);
router.post('/wallet/transfer', StxWalletController.sendStx);

export default router;
