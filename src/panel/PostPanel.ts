import * as vscode from 'vscode';

export class PostPanel {

  public static render(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
      "postPanel",
      "post",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "webview/dist")
        ],
      }
    );

    panel.webview.html = PostPanel.getWebviewContent(panel.webview, context.extensionUri);
  }

  private static getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const stylesUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index.css"]);
    const scriptUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index.js"]);
  
    return `
      <!DOCTYPE html>
      <html lang="">
        <head>
          <meta charset="UTF-8">
          <link rel="icon" href="/favicon.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vite App</title>
          <link rel="stylesheet" crossorigin href="${stylesUri}">
          <script type="module" crossorigin src="${scriptUri}"></script>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `;
  }
}

function getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}