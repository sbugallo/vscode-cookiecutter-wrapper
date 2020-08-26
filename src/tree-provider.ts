import * as vscode from 'vscode';
import * as path from 'path';

export class CookiecutterTemplatesProvider implements vscode.TreeDataProvider<Dependency> {

  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Dependency): Thenable<Dependency[]> {
    const templates = vscode.workspace.getConfiguration("cookiecutter").get("templates") as {title: string, url: string}[];
    const deps = templates.map(template => new Dependency(template.title, template.url));
    return Promise.resolve(deps);
  }

  private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined> = new vscode.EventEmitter<Dependency | undefined>();
  readonly onDidChangeTreeData: vscode.Event<Dependency | undefined> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

export class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public url: string
  ) {
    super(label);
    this.url = url;
  }

  get tooltip(): string {
    return `${this.url}`;
  }

  get description(): string {
    return '';
  }

  iconPath = {
    light: path.join(__filename, '..', '..', 'resources', 'template-light.svg'),
    dark: path.join(__filename, '..', '..', 'resources', 'template-dark.svg')
  };
}