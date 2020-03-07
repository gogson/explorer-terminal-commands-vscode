import * as vscode from "vscode";
import * as path from "path";
import { iTerminalCommand } from "../utils/config";
import { terminalFactory } from "../utils/terminal";

export class TerminalCommandItem extends vscode.TreeItem {
	/**
	 * Attrs
	 */

	terminalCommand: iTerminalCommand;

	/**
	 * Creates an instance of terminal command item.
	 * @param label
	 * @param terminalCommand
	 */

	constructor(readonly context: vscode.ExtensionContext, label: string, terminalCommand: iTerminalCommand) {
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
				light: this.context.asAbsolutePath('resources/light/blue.svg'),
				dark: this.context.asAbsolutePath('resources/dark/blue.svg')
			};
			return;
		}

		this.iconPath = {
			light: this.context.asAbsolutePath('resources/light/default.svg'),
			dark: this.context.asAbsolutePath('resources/dark/default.svg')
		};
  }
  
  exec() {
    let command = this.terminalCommand;
    let opts = {
      cwd: command.cwd,
      name: command.name || command.command || "Terminal Quick Commands"
    };
    
    let term = terminalFactory.getTerminal(opts, command.multi);
    term.show();
    term.sendText(command.command, command.auto);
  }
}
