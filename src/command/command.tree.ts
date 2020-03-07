import { TreeDataProvider, EventEmitter, ExtensionContext, TreeItem, Event } from "vscode";
import { ConfigManager, iTerminalCommand } from "../utils/config";
import { TerminalCommandItem } from "./command.item";

export class CommandTreeViewProvider<T> implements TreeDataProvider<TerminalCommandItem> {

	protected _onDidChangeTreeData = new EventEmitter<any>();
	public commands: iTerminalCommand[];

	constructor(private context: ExtensionContext) {
		this.commands = ConfigManager.getCommands();
	}

	public async getChildren(): Promise<TerminalCommandItem[]> {
		let treeCommand: TerminalCommandItem[] = [];
		if (this.commands.length !== 0) {
			for (var i = 0; i < this.commands.length; i++) {
				treeCommand[i] = new TerminalCommandItem(this.context, this.commands[i].name, this.commands[i]);
			}
		}
		return treeCommand;
	}

	public getTreeItem(command: TerminalCommandItem): TreeItem {
		return command;
	}

	async refresh(root?: T): Promise<void> {
		this._onDidChangeTreeData.fire();
		this.commands = ConfigManager.getCommands();
	}

	public get onDidChangeTreeData(): Event<any> {
		return this._onDidChangeTreeData.event;
	}
}
