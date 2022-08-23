import { Job } from "agenda";
import { Agenda } from "../agenda";
import { LogHelper } from "../../helpers/log.helper";
import { ContainereStates, MICRO_SERVICES, PortainerHelper } from "../../helpers/portainer.helper";

export class SocketRestartJob {
  static jobName = "SocketRestartJob";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    LogHelper.runingJobLog(SocketRestartJob.jobName);
    if (process.env.NODE_ENV === "development") {
      return;
    }
    await new SocketRestartJob().doBusiness();
  }

  doBusiness = async () => {
    await this.restartBuyTokenSocket();
  };

  restartBuyTokenSocket = async () => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    const server = new PortainerHelper();
    await server.auth();
    const containers = await server.getContainers();
    const container = containers.find(
      (cont) =>
        cont.Portainer?.ResourceControl?.ResourceId.includes(MICRO_SERVICES.BUY_TOKEN_SOCKET) &&
        cont.State === ContainereStates.running
    );
    if (container) {
      await server.restart(container.Id);
      await server.kill(container.Id);
      await server.delete(container.Id);
    }
  };
}
export default SocketRestartJob;
