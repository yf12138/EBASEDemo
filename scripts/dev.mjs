#!/usr/bin/env node
/* Cross-platform Vite dev launcher with timestamped logs. */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOG_DIR = process.env.LOG_DIR || 'logs';
const PORT = process.env.CLIENT_DEV_PORT || '8003';
const VITE = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
process.chdir(ROOT);
fs.mkdirSync(LOG_DIR, { recursive: true });

const stamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
const log = (message) => process.stdout.write(`[${stamp()}] [dev] ${message}\n`);

function pidsOnPort(port) {
  if (process.platform === 'win32') {
    const output = execFileSync('netstat.exe', ['-ano', '-p', 'tcp'], { encoding: 'utf8' });
    return [...new Set(output.split(/\r?\n/).map((line) => line.trim().split(/\s+/))
      .filter((parts) => parts.length >= 5 && parts[1].endsWith(`:${port}`) && parts[3] === 'LISTENING')
      .map((parts) => parts[4]).filter((pid) => pid !== String(process.pid)))];
  }
  return execFileSync('lsof', [`-ti:${port}`], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
}

function killTree(pid) {
  if (process.platform === 'win32') execFileSync('taskkill.exe', ['/pid', String(pid), '/t', '/f'], { stdio: 'ignore' });
  else process.kill(-Number(pid), 'SIGKILL');
}

function clearPort() {
  try { for (const pid of pidsOnPort(PORT)) { try { killTree(pid); log(`killed orphan pid=${pid} on :${PORT}`); } catch {} } } catch {}
}

if (!fs.existsSync(VITE)) {
  log('Vite is not installed. Run npm install before starting the dev server.');
  process.exit(1);
}

clearPort();
const logFd = fs.openSync(path.join(LOG_DIR, 'client.std.log'), 'a');
const child = spawn(process.execPath, [VITE, '--port', PORT, '--host', '0.0.0.0'], {
  cwd: ROOT, env: process.env, shell: false, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
});

for (const stream of [child.stdout, child.stderr]) {
  const reader = readline.createInterface({ input: stream, crlfDelay: Infinity });
  reader.on('line', (line) => {
    const message = `[${stamp()}] [client] ${line}\n`;
    process.stdout.write(message);
    fs.writeSync(logFd, message);
  });
}

let stopping = false;
function cleanup(signal) {
  if (stopping) return;
  stopping = true;
  log(`cleanup triggered by ${signal}`);
  try { killTree(child.pid); } catch {}
  try { fs.closeSync(logFd); } catch {}
  process.exit(0);
}
child.once('error', (error) => { log(`failed to start client: ${error.message}`); cleanup('spawn error'); });
child.once('exit', () => cleanup('child exit'));
process.on('SIGINT', () => cleanup('SIGINT'));
process.on('SIGTERM', () => cleanup('SIGTERM'));
process.on('SIGHUP', () => cleanup('SIGHUP'));
