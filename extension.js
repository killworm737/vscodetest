// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "sample" is now active!');

    
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {


        var selection = vscode.window.activeTextEditor.selection;        
        var selectedText = vscode.window.activeTextEditor.document.getText(selection);
        
        var startLine = selection.start.line ;        
        // var selectedText = vscode.window.activeTextEditor.document.getText(selection);
        // var selectedText = 'function checknegativeStock($stockid,$is_inventory,$loccode,$sale) {';

        var funcFirst = selectedText.indexOf('function ');
        var funclast = selectedText.indexOf('(');
        var braceFirst = selectedText.indexOf('(');
        var braceLast = selectedText.indexOf(')');

        funcText = selectedText.slice(funcFirst+9,funclast);
        braceText = selectedText.slice(braceFirst+1,braceLast);

        var tArr = braceText.split(",");

        textToInsert = '';
  
        // 組合字串
        textToInsert = textToInsert   +  '\t' + '/**' +  '\n' ;     
        textToInsert = textToInsert   +  '\t' +' * [' + funcText + ' description]' +  '\n' ;     
        tArr.forEach(element => {
            textToInsert = textToInsert + '\t' + ' * @param [type] '  +  element +   '\n' ;     
        });  
        textToInsert = textToInsert + '\t' + ' */' +   '\n';

        // vscode.window.showInformationMessage(selectedText); //顯示提示訊息

        vscode.window.activeTextEditor.edit((editBuilder) => {
            pos = new vscode.Position(startLine, 0); 

            if (tArr.length>0) {
                editBuilder.insert(pos, textToInsert);
            }
            
                   
                              
        }).then(() => {
            console.log('Edit applied!');
            

        }, (err) => {
            console.log('Edit rejected!');
            console.error(err);
        });



    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;