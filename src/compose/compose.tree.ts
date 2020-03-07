import { ConfigManager, iTerminalCommand } from "../utils/config";
import { ComposeStackItem } from "./stack.item";
import { ComposeManager, ComposeStack } from "../utils/compose";
import { TreeItem, TreeDataProvider, EventEmitter, ExtensionContext, Event } from "vscode";

/**
 * Command tree view provider
 */

export class ComposeTreeViewProvider<T> implements TreeDataProvider<TreeItem> {

	protected _onDidChangeTreeData = new EventEmitter<any>();
	public context: ExtensionContext;
	public stacks: ComposeStack[];
	public items: ComposeStackItem[];

	constructor(context: ExtensionContext) {
		this.items = [];
		this.context = context;
		this.stacks = ComposeManager.getStacks();
		this.getComposeStackItem();
  	}

	public async getChildren(stack?: ComposeStackItem): Promise<TreeItem[]> {
		if (stack) return stack.getChildren();
		return this.items;
	}

	public getTreeItem(command: ComposeStackItem): TreeItem {
		return command;
	}

	public async refresh(root?: T): Promise<void> {
		this._onDidChangeTreeData.fire();
		this.getComposeStackItem();
	}

	public get onDidChangeTreeData(): Event<any> {
		return this._onDidChangeTreeData.event;
	}

	private getComposeStackItem() {
		this.items = [];
		this.stacks = ComposeManager.getStacks();

		for (var i = 0; i < this.stacks.length; i++) {
			this.items.push(new ComposeStackItem(this.context, this.stacks[i]));
		}
	}
}