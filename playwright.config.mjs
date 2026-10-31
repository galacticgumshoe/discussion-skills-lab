import { defineConfig } from '@playwright/test';
import net from 'node:net';
// Workers re-import this config. Propagate the runner's chosen port instead of
// reserving a different port in each worker process.
if (!process.env.DSL_TEST_PORT) {
  const socket = net.createServer();
  await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
  process.env.DSL_TEST_PORT = String(socket.address().port);
  await new Promise(resolve => socket.close(resolve));
}
const port = Number(process.env.DSL_TEST_PORT);

export default defineConfig({
  testDir: './tests/browser',
  timeout: 120_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 3,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node tests/helpers/static-server.mjs',
    env: { PORT: String(port) },
    url: `http://127.0.0.1:${port}`, reuseExistingServer: false
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', viewport: { width: 1440, height: 1000 } } },
    { name: 'firefox', use: { browserName: 'firefox', viewport: { width: 1440, height: 1000 }, launchOptions: { timeout: 20_000 } } },
    { name: 'webkit', use: { browserName: 'webkit', viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile-chromium', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
  ]
});
