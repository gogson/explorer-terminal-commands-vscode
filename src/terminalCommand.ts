import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { TerminalCommandItem } from "./terminalCommandView";
import { terminalFactory } from "./terminalFactory";

/**
 * Terminal command
 */

export interface TerminalCommand {
  command: string;
  name: string;
  cwd?: string;
  auto?: boolean;
  multi?: boolean;
}

/**
 * Terminals command handler
 * @param command
 */

export function terminalCommandHandler(cmd: TerminalCommandItem) {
  let command = cmd.terminalCommand;
  let opts = {
    cwd: command.cwd,
    name: command.name || command.command || "Terminal Quick Commands"
  };
  
  let term = terminalFactory.getTerminal(opts, command.multi);
  term.show();
  term.sendText(command.command, command.auto);
}

/**
 * Fetchs terminal commands
 * @returns terminal commands
 */

export function fetchTerminalCommands(): TerminalCommand[] {
  let settings = vscode.workspace.getConfiguration().get("explorerTerminal.commands");

  if (!Array.isArray(settings)) {
    return [];
  }

  return settings
    .filter(c => c.command && c.command !== "")
    .map<TerminalCommand>(c => {
      return {
        command: c.command,
        auto: typeof c.auto === "undefined" ? true : !!c.auto,
        multi: typeof c.multi === "undefined" ? false : !!c.multi,
        name: c.name || c.command,
        cwd: c.cwd
      };
    });
}
