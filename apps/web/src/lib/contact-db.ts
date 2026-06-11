import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

let db: DatabaseSync | undefined;

function dbFile(): string {
  if (process.env.DATABASE_FILE_OVERRIDE) return process.env.DATABASE_FILE_OVERRIDE;
  if (process.env.VERCEL) return '/tmp/portfolio.sqlite';
  return process.env.DATABASE_FILE ?? './data/portfolio.sqlite';
}

export function getContactDb(): DatabaseSync {
  if (db) return db;

  const file = dbFile();
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

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
  budget?: string | null;
  ip?: string | null;
}): { id: number } {
  const result = getContactDb()
    .prepare(
      `INSERT INTO contact_submissions (name, email, message, budget, ip)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(input.name, input.email, input.message, input.budget ?? null, input.ip ?? null);
  return { id: Number(result.lastInsertRowid) };
}
