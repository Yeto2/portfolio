import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

// Use an in-memory DB so tests never touch the real file.
process.env.DATABASE_FILE_OVERRIDE = ':memory:';
process.env.NODE_ENV = 'test';

const { buildApp } = await import('./app.js');
const app = await buildApp();

before(async () => {
  await app.ready();
});

after(async () => {
  await app.close();
});

test('GET /health/live returns ok', async () => {
  const res = await app.inject({ method: 'GET', url: '/health/live' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().status, 'ok');
});

test('GET /api/projects returns the three showcase projects', async () => {
  const res = await app.inject({ method: 'GET', url: '/api/projects' });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.length, 3);
  assert.ok(body.every((p: { slug: string }) => typeof p.slug === 'string'));
});

test('GET /api/projects/:slug returns full detail', async () => {
  const res = await app.inject({ method: 'GET', url: '/api/projects/delivery-tracking' });
  assert.equal(res.statusCode, 200);
  assert.ok(res.json().architecture.length > 0);
});

test('GET /api/projects/:slug 404s for unknown slug', async () => {
  const res = await app.inject({ method: 'GET', url: '/api/projects/does-not-exist' });
  assert.equal(res.statusCode, 404);
});

test('POST /api/contact rejects invalid payloads', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/contact',
    payload: { name: '', email: 'not-an-email', message: 'short' },
  });
  assert.equal(res.statusCode, 422);
  assert.equal(res.json().error, 'validation_error');
});

test('POST /api/contact stores a valid submission', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/contact',
    payload: {
      name: 'Jane Client',
      email: 'jane@example.com',
      message: 'I need a real-time tracking backend built. Are you available?',
      budget: '$3k-5k',
    },
  });
  assert.equal(res.statusCode, 201);
  assert.equal(res.json().ok, true);
  assert.ok(Number.isInteger(res.json().id));
});
