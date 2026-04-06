import chalk from 'chalk';
import axios from 'axios';

export async function runMonitor(query: string, options: any) {
  console.log(chalk.blue(`�� Starting X Pulse Monitor for: "${query}"`));
  console.log(chalk.gray(`Voice mode: ${!!options.voice}`));

  try {
    const response = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
      task: `Monitor recent posts about ${query}`,
      voice: !!options.voice
    });

    console.log(chalk.green('\n✅ Success! Bridge received task.'));
    console.log(chalk.cyan('Response:'), response.data);
  } catch (error: any) {
    console.error(chalk.red('❌ Bridge connection failed:'), error.message);
  }
}

export default runMonitor;
