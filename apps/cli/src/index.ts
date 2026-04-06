#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import axios from 'axios';

const program = new Command();

program
  .name('x-pulse')
  .description('Autonomous X monitoring with Claude + AO multi-agent voice')
  .version('0.1.0');

// ====================== INIT COMMAND ======================
program
  .command('init')
  .description('Interactive setup wizard')
  .action(async () => {
    console.log(chalk.bold.green('\n�� X Pulse Monitor Setup Wizard\n'));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const ask = (q: string) => new Promise<string>(resolve => rl.question(q, resolve));

    try {
      const xBearer = await ask(chalk.yellow('X Bearer Token: '));
      const anthropicKey = await ask(chalk.yellow('Anthropic API Key: '));
      const eleven = await ask(chalk.yellow('ElevenLabs API Key (optional): ')) || '';
      const openai = await ask(chalk.yellow('OpenAI API Key (optional): ')) || '';

      const content = `# X Pulse Monitor Configuration
# Generated: ${new Date().toISOString()}

X_BEARER_TOKEN=${xBearer}
ANTHROPIC_API_KEY=${anthropicKey}
ELEVENLABS_API_KEY=${eleven}
OPENAI_API_KEY=${openai}

AO_WALLET_PATH=./wallet.json
MCP_PORT=8000
BRIDGE_PORT=8001
`;

      fs.writeFileSync(path.resolve(process.cwd(), '../../.env'), content.trim());
      console.log(chalk.green('\n✅ .env file created successfully!'));
    } catch (e) {
      console.error(chalk.red('Setup cancelled.'));
    } finally {
      rl.close();
    }
  });

// ====================== MONITOR COMMAND ======================
program
  .command('monitor <query>')
  .option('--voice', 'Enable voice mode')
  .action(async (query, options) => {
    console.log(chalk.blue(`🔍 Monitoring: "${query}"`));
    try {
      const res = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
        task: `Monitor recent posts about ${query}`,
        voice: !!options.voice
      });
      console.log(chalk.green('✅ Success!'));
      console.log(res.data);
    } catch (e: any) {
      console.error(chalk.red('Bridge error:'), e.message);
    }
  });

// ====================== START-MULTI-AGENT COMMAND ======================
program
  .command('start-multi-agent')
  .option('--voice', 'Enable voice mode')
  .action(async (options) => {
    console.log(chalk.magenta('\n🔄 Starting Autonomous Multi-Agent Loop...'));
    console.log(chalk.gray(`Voice: ${!!options.voice}\n`));

    try {
      const res = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
        task: "Run continuous X monitoring on AO Arweave ecosystem",
        voice: !!options.voice
      });
      console.log(chalk.green('✅ Multi-agent cycle started!'));
      console.log(chalk.cyan('Claude:'), res.data.claude_thought || res.data);
    } catch (e: any) {
      console.error(chalk.red('Failed:'), e.message);
    }
  });

program.parse(process.argv);
