#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';

import initCommand from './commands/init';
import monitorCommand from './commands/monitor';
import multiAgentCommand from './commands/multi-agent';

const program = new Command();

program
  .name('x-pulse')
  .description('Autonomous X monitoring with Claude + AO multi-agent voice')
  .version('0.1.0');

program
  .command('init')
  .description('Interactive setup wizard')
  .action(initCommand);

program
  .command('monitor <query>')
  .option('--interval <minutes>', 'Monitoring interval', '30')
  .option('--voice', 'Enable voice mode')
  .action(monitorCommand);

program
  .command('start-multi-agent')
  .option('--voice', 'Enable voice conversation between agents')
  .action(multiAgentCommand);

program.parse(process.argv);
