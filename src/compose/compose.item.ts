import { Command, Disposable, ExtensionContext, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { TerminalCommandItem } from '../command/command.item';
import { iTerminalCommand } from '../utils/config';

interface ComposeTreeItemCommand {
	command: string;
    name: string;
    cwd?: string;
}

export abstract class ComposeTreeItem<T> extends TreeItem {

    protected readonly context: ExtensionContext;
    protected children: ComposeTreeItem<T>[] | undefined;
    protected model: T;
    protected item: TreeItem | undefined;
    protected itemCommands : ComposeTreeItemCommand[];

    constructor(
        context: ExtensionContext,
        model: T,
        label: string,
        expendable: TreeItemCollapsibleState
    ) {
        super(label, expendable);
        this.context = context;
        this.model = model;
        this.itemCommands = [];
    }

    abstract getChildren(): (TreeItem | Promise<TreeItem>)[];

	public getTreeItem(): TreeItem | Promise<TreeItem> {
		return this;
    }
    
    protected getItemCommands(cwd? : string) {
        return this.itemCommands.map<TerminalCommandItem>(s => this.createCommandItem(s.name, s.command, cwd || s.cwd));
    }

    private createCommandItem(name: string, command: string, cwd?: string): TerminalCommandItem {
		return new TerminalCommandItem(this.context, name, <iTerminalCommand>{
            command: command,
            auto: true,
            multi: true,
            name: name,
            cwd: cwd
        });
	}

}