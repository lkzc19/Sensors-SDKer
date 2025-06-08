import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn,  } from "vscode";
import * as fs from "fs";

export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
  }

  public static render(extensionUri: Uri) {
    const panel = window.createWebviewPanel(
      "showHelloWorld",
      "Hello World",
      ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [Uri.joinPath(extensionUri, "out"), Uri.joinPath(extensionUri, "webview/dist")],
      }
    );

    HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
  }

  public dispose() {
    HelloWorldPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    // const stylesUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index-TXLObeWa.css"]);
    const scriptUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index.js"]);

    return `
      <!DOCTYPE html>
      <html lang="">
        <head>
          <meta charset="UTF-8">
          <link rel="icon" href="/favicon.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vite App</title>
          <script type="module" crossorigin src="${scriptUri}"></script>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `;
  }
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}