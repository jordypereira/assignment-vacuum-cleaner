import { initializeDb } from '../utils/db';

export default defineNitroPlugin(async () => {
  await initializeDb();
});