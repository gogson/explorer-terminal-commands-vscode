import * as vscode from "vscode";
import { DockerComposeAPI } from "./docker";

class ComposeService {
  name : string;
  filePath: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.filePath = path;
  }

}

class ComposeStack {

  filePath: string;
  name : string;
  services: ComposeService[];

  constructor(name: string, path: string) {
    this.filePath = path;
    this.name = name;
    this.services = [];
    this.refreshServices();
  }

  private refreshServices() {
    let services = DockerComposeAPI.getServices(this.filePath);
    this.services = services.map<ComposeService>(s => new ComposeService(s, this.filePath));
  }

  public getServices(): ComposeService[] {
    return this.services;
  }
}

class ComposeManager {
  /**
   * Attrs
   */

  private static instance: ComposeManager;
  private stacks: ComposeStack[];

  /**
   * Creates an instance of terminal factory.
   */

  private constructor() {
    this.stacks = [];
    this.fetchStacks();
  }

  /**
   * Gets instance
   * @returns instance 
   */

  static getInstance(): ComposeManager {
    if (!ComposeManager.instance) {
      ComposeManager.instance = new ComposeManager();
    }

    return ComposeManager.instance;
  }

  private fetchStacks() {
    if (!vscode.workspace || !vscode.workspace.workspaceFolders)
      return;

    this.stacks = vscode.workspace.workspaceFolders
      .filter(folder => DockerComposeAPI.isComposeProject(folder.uri.fsPath))
      .map<ComposeStack>(s => new ComposeStack(s.name, s.uri.fsPath));
  }

  public getStacks() {
    this.fetchStacks();
    return this.stacks;
  }

}

let composeManager = ComposeManager.getInstance();
export { composeManager as ComposeManager, ComposeStack, ComposeService };