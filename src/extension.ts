import * as vscode from 'vscode';
import {cookiecutter} from './cookiecutter-wrapper';
import {CookiecutterTemplatesProvider, Dependency} from './tree-provider';

export function activate(context: vscode.ExtensionContext) {

	const cookiecutterTemplatesProvider = new CookiecutterTemplatesProvider();

	vscode.window.registerTreeDataProvider(
		'cookiecutterTemplates',
		cookiecutterTemplatesProvider
	);

	vscode.commands.registerCommand('cookiecutter-wrapper.run', (item: Dependency) => {
		const root = vscode.workspace.getConfiguration("cookiecutter").get("baseDir") as string;
		const path = cookiecutter(item.url, root);
	});

	vscode.commands.registerCommand('cookiecutter-wrapper.refresh', () => cookiecutterTemplatesProvider.refresh());
}

export function deactivate() {}
