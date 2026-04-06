import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question: string): Promise<string> => {
  return new Promise(resolve => rl.question(question, resolve));
};

export async function runInit() {
  console.log(chalk.bold.green('\n🚀 X Pulse Monitor Setup Wizard\n'));

  try {
    const xBearer = await ask(chalk.yellow('X Bearer Token: '));
    const anthropicKey = await ask(chalk.yellow('Anthropic API Key (Claude): '));
    const elevenLabs = await ask(chalk.yellow('ElevenLabs API Key (optional): ')) || '';
    const openaiKey = await ask(chalk.yellow('OpenAI API Key (optional): ')) || '';

    const envContent = `# X Pulse Monitor Configuration
# Generated: ${new Date().toISOString()}

X_BEARER_TOKEN=${xBearer}
ANTHROPIC_API_KEY=${anthropicKey}
ELEVENLABS_API_KEY=${elevenLabs}
OPENAI_API_KEY=${openaiKey}

AO_WALLET_PATH=./wallet.json
MCP_PORT=8000
BRIDGE_PORT=8001
`;

    const envPath = path.resolve(process.cwd(), '../../.env');
    fs.writeFileSync(envPath, envContent.trim());

    console.log(chalk.green('\n✅ .env file created successfully!'));
    console.log(chalk.gray(`Path: ${envPath}`));

  } catch (err) {
    console.error(chalk.red('Setup cancelled.'));
  } finally {
    rl.close();
  }
}

runInit();
