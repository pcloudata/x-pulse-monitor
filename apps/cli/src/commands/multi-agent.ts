import chalk from 'chalk';
import axios from 'axios';

export default async function startMultiAgent(options: any) {
  console.log(chalk.magenta('\n🔄 Starting Autonomous Multi-Agent Loop (Claude ↔ AO)...'));
  console.log(chalk.gray(`Voice mode: ${!!options.voice}\n`));

  try {
    const response = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
      task: "Start autonomous multi-agent cycle with voice if enabled",
      voice: !!options.voice,
      mode: "multi-agent"
    });

    console.log(chalk.green('✅ Multi-agent loop initiated!'));
    console.log(chalk.cyan('Bridge Response:'), response.data);
    console.log('\nAgents are now talking to each other autonomously...');
    console.log('Press Ctrl+C to stop the loop.');
  } catch (error: any) {
    console.error(chalk.red('❌ Failed to start multi-agent loop:'), error.message);
  }
}
