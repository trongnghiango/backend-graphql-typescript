import chalk from "chalk";
import SocketRestartJob from "./jobs/socketRestart.job";

export function InitRepeatJobs() {
  console.log(chalk.redBright("\n➡️➡️➡️ Generate Repeat Jobs"));

  // SocketRestartJob.create({})
  //   .repeatEvery("8 hours")
  //   .unique({ name: SocketRestartJob.jobName })
  //   .save();
}
