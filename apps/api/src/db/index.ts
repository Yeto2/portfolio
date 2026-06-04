import { DatabaseSync } from 'node:sqlite';
import { dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { env } from '../config/env.js';

/**
 * Built-in node:sqlite (Node 22+) — no native build step, so this runs
 * anywhere Node does. Source of truth for contact submissions.
 */
let db: DatabaseSync;

export function getDb(): DatabaseSync {
  if (db) return db;

  // Allow an in-memory DB for tests.
  const file = process.env.DATABASE_FILE_OVERRIDE ?? env.DATABASE_FILE;
  if (file !== ':memory:') {
    mkdirSync(dirname(file), { recursive: true });
  }

  db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      message    TEXT NOT NULL,
      budget     TEXT,
      ip         TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  budget?: string | null;
  ip?: string | null;
}

export function insertContact(input: ContactSubmission): { id: number } {
  const stmt = getDb().prepare(
    `INSERT INTO contact_submissions (name, email, message, budget, ip)
     VALUES (?, ?, ?, ?, ?)`,
  );
  const result = stmt.run(
    input.name,
    input.email,
    input.message,
    input.budget ?? null,
    input.ip ?? null,
  );
  return { id: Number(result.lastInsertRowid) };
}

export function listContacts(): unknown[] {
  return getDb()
    .prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    .all();
}
