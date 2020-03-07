import * as vscode from "vscode";

/**
 * Terminal factory
 */

class TerminalFactory {
  /**
   * Attrs
   */

  private static instance: TerminalFactory;
  private terminals: vscode.Terminal[];

  /**
   * Creates an instance of terminal factory.
   */

  private constructor() {
    this.terminals = [];
  }

  /**
   * Gets instance
   * @returns instance 
   */

  static getInstance(): TerminalFactory {
    if (!TerminalFactory.instance) {
      TerminalFactory.instance = new TerminalFactory();
    }

    return TerminalFactory.instance;
  }

  /**
   * Gets terminal
   * @param options 
   * @param [multi] 
   * @returns terminal 
   */

  public getTerminal(options: vscode.TerminalOptions, multi: Boolean = false): vscode.Terminal {
    let found = this.findTerminalIndex(options);
    if (found > -1 && this.terminals[found] && multi === false)
      this.disposeTerminal(options);

    let terminal = vscode.window.createTerminal(options);
    this.terminals.push(terminal);
    return terminal;
  }

  /**
   * Finds terminal index
   * @param options 
   * @returns terminal index 
   */

  private findTerminalIndex(options: vscode.TerminalOptions): number {
    return this.terminals.findIndex((c: vscode.Terminal) => c.name === options.name);
  }

  /**
   * Disposes terminal
   * @param options 
   * @returns terminal 
   */
  
  private disposeTerminal(options: vscode.TerminalOptions): Boolean {
    if (this.terminals.length === 0) return false;

    let found = this.findTerminalIndex(options);
    if (found === -1 || !this.terminals[found])
      return false;

    this.terminals[found].dispose();
    this.terminals.splice(found, 1);
    return true;
  }
}

let terminalFactory = TerminalFactory.getInstance();
export { terminalFactory };