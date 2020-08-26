import * as vscode from 'vscode';

export function cookiecutter(url: string, root: string): void {
    const terminal = (<any>vscode.window).createTerminal('Cookiecutter terminal');
    terminal.show(true);
    terminal.sendText('cd ' + root + ' && cookiecutter ' + url);
}