import { execSync } from "child_process";

export class DockerComposeAPI {
  
  static exec(command: string, cwd : string){
    try {
      let output = execSync(`${this.getBaseCommand()} ${command}`, {cwd: cwd, encoding: "utf8" });
      return {error: false, output: output};
    } catch (error) {
      return {error: true, details: error};
    }
  }
  
  static isComposeProject(path : string) {
    return this.exec("config", path).error === false;
  }

  static getServices(path : string) {
    let services = this.exec("config --services", path);
    
    if (services.error || !services.output)
      return [];

    let res = services.output.split(/[\r\n]+/g).filter((item) => item);
    return res; 
  }
  
  private static getBaseCommand(file : string  = 'docker-compose.yml') : string {
    return `docker-compose -f ${file}`;
  }
}