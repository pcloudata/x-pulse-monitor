import chalk from 'chalk';
import axios from 'axios';

export default async function startMultiAgent(options: any) {
  console.log(chalk.magenta('\n🔄 Starting Autonomous Multi-Agent Loop (Claude ↔ AO)...'));
  console.log(chalk.gray(`Voice mode: ${!!options.voice}\n`));

  try {
    const response = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
      task: "Run continuous X monitoring on AO Arweave ecosystem and summarize key insights",
      voice: !!options.voice
    });

    console.log(chalk.green('✅ Multi-agent cycle started!'));
    console.log(chalk.cyan('\nClaude Response:'));
    console.log(response.data.claude_thought);
    console.log(chalk.gray('\n' + response.data.ao_feedback));
    
  } catch (error: any) {
    console.error(chalk.red('❌ Failed to connect to bridge:'), error.message);
  }
}
