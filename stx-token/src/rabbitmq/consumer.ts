import { getChannel } from './index';

export const consumeWalletMessages = async () => {
  const channel = getChannel();
  await channel.assertQueue('wallet_queue', { durable: true });

  channel.consume('wallet_queue', (msg: any) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      console.log('Received message:', message);

      // Process wallet-related messages here

      channel.ack(msg);
    }
  });
};
