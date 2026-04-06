import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';

export async function runInit() {
  console.log(chalk.bold.green('\n🚀 Welcome to X Pulse Monitor Setup Wizard!\n'));

  const answers = await inquirer.prompt([
    { type: 'input', name: 'xBearer', message: chalk.yellow('X Bearer Token:') },
    { type: 'password', name: 'anthropicKey', message: chalk.yellow('Anthropic API Key:') },
    { type: 'input', name: 'elevenLabsKey', message: chalk.yellow('ElevenLabs API Key (optional):'), default: '' },
    { type: 'input', name: 'openaiKey', message: chalk.yellow('OpenAI API Key (optional):'), default: '' },
  ]);

  const envContent = `# X Pulse Monitor - Generated ${new Date().toISOString()}

X_BEARER_TOKEN=${answers.xBearer}
ANTHROPIC_API_KEY=${answers.anthropicKey}
ELEVENLABS_API_KEY=${answers.elevenLabsKey}
OPENAI_API_KEY=${answers.openaiKey}

AO_WALLET_PATH=./wallet.json
MCP_PORT=8000
BRIDGE_PORT=8001
`;

  const envPath = path.resolve(process.cwd(), '../../.env');
  fs.writeFileSync(envPath, envContent.trim());

  console.log(chalk.green('\n✅ .env file created successfully!'));
}

export default runInit;
