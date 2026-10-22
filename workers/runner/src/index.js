/* Cloudflare Worker that hosts the studio runner (studio/server.mjs) in a Cloudflare Container.
 * Pages Functions call this Worker over HTTPS (RUNNER_URL); it forwards every request to one container instance.
 * Secrets (wrangler secret put ...): RUNNER_SECRET (required), ANTHROPIC_API_KEY (enables Opus; without it jobs use the fallback). */
import { Container } from '@cloudflare/containers';

export class Runner extends Container {
  defaultPort = 8080;
  sleepAfter = '45m';           // stays warm while jobs are polled; an idle container sleeps and its files go with it
  constructor(ctx, env) {
    super(ctx, env);
    this.envVars = { RUNNER_SECRET: env.RUNNER_SECRET, ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY || '', P2V_CONCURRENCY: '1' };
  }
}

export default {
  async fetch(request, env) {
    if (!env.RUNNER_SECRET) return new Response('RUNNER_SECRET not set', { status: 503 });
    return env.RUNNER.getByName('main').fetch(request);
  },
};
