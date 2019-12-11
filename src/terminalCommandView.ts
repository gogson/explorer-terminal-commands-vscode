import * as vscode from "vscode";
import * as path from "path";
import { TerminalCommand, fetchTerminalCommands } from "./terminalCommand";

/**
 * Command tree view provider
 */

export class CommandTreeViewProvider implements vscode.TreeDataProvider<TerminalCommandItem> {
  /**
   * Attrs
   */

  commands: TerminalCommand[];

  /**
   * Creates an instance of command tree view provider.
   * @param context
   */

  constructor(context: vscode.ExtensionContext) {
    this.commands = fetchTerminalCommands();
  }

  /**
   * Gets children
   * @param [command]
   * @returns children
   */

  public async getChildren(command?: TerminalCommandItem): Promise<TerminalCommandItem[]> {
    let treeCommand: TerminalCommandItem[] = [];
    if (this.commands.length !== 0) {
      for (var i = 0; i < this.commands.length; i++) {
        treeCommand[i] = new TerminalCommandItem(this.commands[i].name, this.commands[i]);
      }
    }
    return treeCommand;
  }

  /**
   * Gets tree item
   * @param command
   * @returns tree item
   */

  public getTreeItem(command: TerminalCommandItem): vscode.TreeItem {
    return command;
  }
}

/**
 * Terminal command item
 */

export class TerminalCommandItem extends vscode.TreeItem {
  /**
   * Attrs
   */

  terminalCommand: TerminalCommand;

  /**
   * Creates an instance of terminal command item.
   * @param label
   * @param terminalCommand
   */

  constructor(label: string, terminalCommand: TerminalCommand) {
    super(label, vscode.TreeItemCollapsibleState.None);

    this.terminalCommand = terminalCommand;
    this.tooltip = terminalCommand.command;
    this.command = {
      command: "explorerTerminalCommands.executeCommand",
      title: "Execute",
      arguments: [this]
    };

    this.refreshIcon();
  }

  /**
   * Set treeitem icon
   * Auto commands will be displayed with a blue icon
   * @returns
   */

  refreshIcon() {
    const iconPath = path.join(__filename, "..", "..", "resources");

    if (this.terminalCommand.auto) {
      this.iconPath = {
        light: path.join(iconPath, "light", "blue.svg"),
        dark: path.join(iconPath, "dark", "blue.svg")
      };
      return;
    }

    this.iconPath = {
      light: path.join(iconPath, "light", "default.svg"),
      dark: path.join(iconPath, "dark", "default.svg")
    };
  }
}
