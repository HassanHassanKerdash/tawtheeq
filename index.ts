#!/usr/bin/env node

import { customMessages, printWelcomeMessage, printStatusMessage, printSystemInfo } from './startup';
import { spawn, ChildProcess } from 'child_process';

printWelcomeMessage();
printSystemInfo();

printStatusMessage('STARTUP', customMessages.nodemon.start());

const command = 'kawkab-frontend-generate-routes && react-router dev';
const [cmd, ...args] = command.split(' ');

const child: ChildProcess = spawn(cmd, args, {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error: Error) => {
  printStatusMessage('ERROR', customMessages.errors.serverError());
  console.error(error);
});

child.on('exit', (code: number | null) => {
  if (code === 0) {
    printStatusMessage('SUCCESS', customMessages.nodemon.exit());
  } else {
    printStatusMessage('ERROR', `Server stopped with code: ${code}`);
  }
}); 