#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('x-pulse')
  .description('Autonomous X monitoring with Claude + AO multi-agent voice')
  .version('0.1.0');

program
  .command('init')
  .description('Interactive setup wizard')
  .action(async () => {
    const initCommand = (await import('./commands/init.js')).default;
    await initCommand();
  });

program
  .command('monitor <query>')
  .option('--interval <minutes>', 'Monitoring interval', '30')
  .option('--voice', 'Enable voice mode')
  .action((query, options) => {
    console.log(chalk.blue(`🔍 Monitoring: "${query}"`));
    console.log(chalk.gray(`Voice mode: ${!!options.voice}`));
  });

program.parse(process.argv);
