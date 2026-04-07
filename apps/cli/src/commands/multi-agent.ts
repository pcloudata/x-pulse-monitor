import chalk from 'chalk';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { exec } from 'child_process';

dotenv.config({ path: '../../.env' });

export default async function startMultiAgent(options: any) {
  console.log(chalk.magenta('\n🔄 Starting Autonomous Multi-Agent Loop...'));
  console.log(chalk.gray(`Voice mode: ${!!options.voice}\n`));

  try {
    const response = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
      task: "Monitor AO Arweave ecosystem on X right now",
      voice: !!options.voice
    });

    console.log(chalk.green('✅ Multi-agent cycle started!'));
    const reportText = response.data.claude_report || response.data.claude_thought || "Analysis completed.";
    console.log(chalk.cyan('\nClaude Response:'));
    console.log(reportText);

    if (options.voice && process.env.ELEVENLABS_API_KEY) {
      console.log(chalk.magenta('🗣️ Generating voice with ElevenLabs...'));

      try {
        const audioResponse = await axios.post(
          'https://api.elevenlabs.io/v1/text-to-speech/Rachel',
          {
            text: reportText.substring(0, 600),
            model_id: "eleven_turbo_v2_5",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          },
          {
            headers: {
              'xi-api-key': process.env.ELEVENLABS_API_KEY,
              'Content-Type': 'application/json',
              'Accept': 'audio/mpeg'
            },
            responseType: 'arraybuffer'
          }
        );

        const audioPath = '/tmp/claude_response.mp3';
        fs.writeFileSync(audioPath, Buffer.from(audioResponse.data));

        console.log(chalk.green('▶️ Playing Claude response...'));
        exec(`afplay ${audioPath}`, (err) => {
          if (err) console.error("Playback error:", err);
          else console.log(chalk.gray('Voice playback finished.'));
        });

      } catch (e: any) {
        console.error(chalk.red('Voice generation failed:'), e.message);
      }
    }
  } catch (error: any) {
    console.error(chalk.red('❌ Failed:'), error.message);
  }
}
