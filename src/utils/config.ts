import * as vscode from "vscode";
import { isString } from "util";

/**
 * A terminal command from the settings 
 */

export interface iTerminalCommand {
	command: string;
	name: string;
	cwd?: string;
	auto?: boolean;
	multi?: boolean;
}

export type iComposeFiles = String[];

/**
 * Config Manager
 */

export class ConfigManager {

    static getWorkspace(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration();
    }

    static getSetting(setting : string): any {
      return vscode.workspace.getConfiguration().get(setting);
    }

    static getCommands() : iTerminalCommand[] {
      const settings = this.getSetting("explorerTerminal.commands");

      if (!Array.isArray(settings)) {
        return [];
      }
    
      return settings
        .filter(c => c.command && c.command !== "")
        .map<iTerminalCommand>(c => {
          return {
            command: c.command,
            auto: typeof c.auto === "undefined" ? true : !!c.auto,
            multi: typeof c.multi === "undefined" ? false : !!c.multi,
            name: c.name || c.command,
            cwd: c.cwd
          };
        });
    }

    static getComposeFilenames() : iComposeFiles {
      const settings = this.getSetting("explorerTerminal.commands");

      if (!Array.isArray(settings)) {
        return ["docker-compose.yml"];
      }

      return settings.filter(isString);
    }

}
