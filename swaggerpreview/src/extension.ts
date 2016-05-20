'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let previewUri = vscode.Uri.parse('swagger-preview://authority/swagger-preview');

    class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
        private _doc = null;

        public provideTextDocumentContent(uri: vscode.Uri): string {
            return this.createCssSnippet();
        }

        get onDidChange(): vscode.Event<vscode.Uri> {
            return this._onDidChange.event;
        }

        public update(uri: vscode.Uri) {
            this._onDidChange.fire(uri);
        }

        private createCssSnippet() {
            let editor = vscode.window.activeTextEditor;
            if (!(editor.document.languageId === 'json')) {
                return this.errorSnippet("Active editor doesn't show a JSON document - no properties to preview.")
            }
            return this.extractSnippet();
        }

        private extractSnippet(): string {
            let editor = vscode.window.activeTextEditor;
            let doc = JSON.parse(editor.document.getText());
            this._doc = doc;
            return this.snippet(doc);
        }

        private errorSnippet(error: string): string {
            return `
                <body>
                    ${error}
                </body>`;
        }

        private snippet(doc): string {
            var style =
                `<style>
html {
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  font-size: 10px; }

body {
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  margin: 10px;
  min-width: 300px; }

div, span, p, ul, ol, dl {
  font-size: 1.3rem; }

h1, h2, h3, h4, h5, h6 {
  font-weight: initial; }

ul {
  padding-left: 2rem;
  padding-right: 2rem; }

h1 {
  font-size: 2.4rem;
  font-family: "Segoe UI Semilight", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: .5rem; }

h2 {
  font-size: 1.6rem;
  font-family: Menlo, Monaco, Consolas, "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback";
  color: #0072c6;
  font-weight: 300; }

h3, h4 {
  font-size: 1.6rem;
  color: #692682; }

h4 {
  margin-bottom: 0; }

ul {
  list-style: none; }

.get-put .parameters,
.get-put .responses {
  padding-left: 0; }

.info {
  margin-top: .5rem; }

.key {
  color: #767676;
  padding-right: .75rem;
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback"; }

.termlabel {
  font-size: 1.6rem;
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  color: #333333; }

.optional-required {
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  color: #333333;
  font-weight: 400; }

.type {
  display: block; }

dl {
  position: relative;
  width: 100%;
  margin: 0; }

dt, dd {
  padding: .5rem 0 .5rem 0; }

dt {
  position: absolute;
  width: 25%; }

dd {
  position: relative;
  margin: 0; }
  dd > span, dd > div {
    margin-left: 25%; }

header h1 {
  color: #692682;
  font-size: 3.7rem;
  font-family: "Segoe UI Light", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 300; }
  header h1:first-child {
    margin-top: 0; }

header h2 {
  color: #767676;
  font-size: 1.87rem;
  font-family: "Segoe UI Semilight", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 400;
  margin-top: 0; }

header ul {
  padding-left: 6px;
  border: 1px solid #dbdbdb;
  border-left: 6px solid #dbdbdb; }

.collapsed .content {
  display: none; }

main .get-put .description:not(:first-of-type) dd::after {
  content: "";
  display: block;
  border-top: 1px solid #dbdbdb;
  margin-top: 1.5rem; }

main .get-put h3 {
  font-size: 1.87rem;
  color: #6c6c6c;
  text-transform: uppercase;
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  font-weight: bold; }

main .arrow {
  cursor: pointer;
  display: block;
  position: relative; }
  main .arrow > h2, main .arrow > h3 {
    cursor: pointer; }
  main .arrow::before {
    -ms-high-contrast-adjust: none;
    position: absolute;
    display: block;
    content: "";
    width: 0;
    height: 0;
    top: 7px;
    border-style: solid;
    border-color: transparent #646465 transparent transparent;
    border-width: 8.4px 8.4px 0 7px;
    left: -21px; }
    @media screen and (-ms-high-contrast: active) {
      main .arrow::before {
        border-color: transparent #fff transparent transparent; } }

main li.collapsed > .arrow::before {
  border-width: 5.6px 5.6px 5.6px 7px;
  left: -15px;
  border-color: transparent transparent transparent #A6A6A6;
  border-left-color: #D4D4D4; }
  @media screen and (-ms-high-contrast: active) {
    main li.collapsed > .arrow::before {
      border-color: transparent transparent transparent #fff;
      border-left-color: #fff; } }

main li.collapsed > .arrow::after {
  -ms-high-contrast-adjust: none;
  position: absolute;
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  border-left-color: #f6f6f6;
  border-width: 2px;
  border-left-width: 2px;
  top: 10px;
  left: 0%;
  margin-left: -13px; }
				</style>`

            var intro = '<body><header>' + this.heading(doc) +
                '<div class="summary"><p>' + this.getDescription(doc.info) + '</p>' +
                '<ul>' +
                '<li><span class="key">Host: </span><span class="value">' + this.getHost(doc) + '</span></li>' +
                '<li><span class="key">Schemes: </span><span class="value">' + this.getSchemes(doc) + '</span></li>' +
                '<li><span class="key">License: </span><span class="value">' + this.getLicense(doc) + '</span></li>' +
                this.getConsumes(doc) +
                this.getProduces(doc) +
                '</ul></div></header>';

            var paths = doc.hasOwnProperty('paths') ? this.getPaths(doc.paths) : '';
            var definitions = doc.hasOwnProperty('definitions') ? this.getDefinitions(doc.definitions) : '';
            var parameters = doc.hasOwnProperty('parameters') ? this.getClientParameters(doc.parameters) : '';
            var responses = doc.hasOwnProperty('responses') ? this.getGlobalResponses(doc.responses) : '';

            var result = style + intro + '<main><ul>' +
                paths + definitions + parameters + responses +
                '</ul></main>' + `
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
		<script>
			$(document).ready(function(){
				var arrow = $('.arrow');
				arrow.click(function(){
					console.log('test');
					//var content = $(this).siblings('.content');
					var parent = $(this).parent();
					
					if (parent.hasClass('collapsed')) {
						parent.removeClass('collapsed');
					}
					else {
						parent.addClass('collapsed');
					}
					
				});
			});
		</script></body>`

            return result;
        }

        private heading(doc): string {
            var title = ((doc.info != null && doc.info.title != undefined) ? doc.info.title : '<div">No Document Title</div>');
            var version =
                ((doc.info != null && doc.info.version != undefined) ? doc.info.version : '<div">No Document Version</div>');
            return '<h1>' + title + '</h1><h2>Version ' + version + '</h2>';
        }

        private getHost(doc): string {

            if (doc.hasOwnProperty('host')) {
                return doc.host;
            } else {
                return 'no host specified';
            }
        }

        private getLicense(doc): string {

            if (doc.hasOwnProperty('info') && doc.info.hasOwnProperty('license')) {
                var result = doc.info.license.name;
                if (doc.info.license)
                    result += ' (<a href="' + doc.info.license.url + '">' + doc.info.license.url + '</a>)';
                return result;
            } else {
                return 'no license specified';
            }
        }

        private getProduces(doc): string {

            var result = '';

            if (doc.hasOwnProperty('produces') && doc.produces.length > 0) {
                result += '<li><span class="key">Produces: </span><span class="value">';
                for (var c in doc.produces) {
                    result += doc.produces[c] + '&nbsp;'
                }
                result += '</span></li>';
            }

            return result;
        }

        private getConsumes(doc): string {

            var result = '';

            if (doc.hasOwnProperty('consumes') && doc.consumes.length > 0) {
                result += '<li><span class="key">Consumes: </span><span class="value">';
                for (var c in doc.consumes) {
                    result += doc.consumes[c] + '&nbsp;'
                }
                result += '</span></li>';
            }

            return result;
        }

        private getProducesAsTR(doc): string {

            var result = '';

            if (doc.hasOwnProperty('produces') && doc.produces.length > 0) {
                result += '<tr><td class="key">Produces</td><td class="value">';
                for (var c in doc.produces) {
                    result += doc.produces[c] + '&nbsp;'
                }
                result += '</td></tr>';
            }

            return result;
        }

        private getConsumesAsTR(doc): string {

            var result = '';

            if (doc.hasOwnProperty('consumes') && doc.consumes.length > 0) {
                result += '<tr><td class="key">Consumes</td><td class="value">';
                for (var c in doc.consumes) {
                    result += doc.consumes[c] + '&nbsp;'
                }
                result += '</td></li>';
            }

            return result;
        }
        private getSchemes(doc): string {

            var result = '';

            if (doc.hasOwnProperty('schemes')) {

                for (var key in doc.schemes) {
                    result += doc.schemes[key] + '&nbsp;';
                }
            } else {
                result = 'no schemes specified';
            }

            return result;
        }

        private getPaths(paths): string {

            var result = '<li><h1 class="arrow">Service Paths</h1><ul id="service_paths">';

            for (var key in paths) {

                if (paths.hasOwnProperty(key)) {
                    var element = paths[key];

                    result += '<li><h2 class="arrow">' + key + '</h2>';
                    result += '<div class="content">'

                    if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                        result += '<h3 class="parameters-all">Parameters for All Operations</h3>';
                        result += this.getOperationParameters('Parameters for All Methods', element);
                    }

                    result += this.getOperations(element);

                    result += '</div></li>';
                }
            }
            return result + '</ul></li>';
        }

        private getOperations(path): string {

            var result = '<ul class="get-put">';

            for (var key in path) {
                if (path.hasOwnProperty(key)) {

                    var element = path[key];

                    switch (key) {
                        case 'get':
                        case 'put':
                        case 'post':
                        case 'delete':
                        case 'head':
                        case 'patch':
                            result += '<li><h3 class="arrow">' + key.toUpperCase() + '</h3>';
                            break;
                        case 'parameters':
                            break;
                        default:
                            result += '<h3>Unsupported HTTP verb</h3>';
                            break;
                    }
                    result += '<div class="content">'
                    if (element.hasOwnProperty('description')) {
                        result += '<div class="definition">' + this.getDescription(element) + '</div>'
                    }
                    result += '<ul><li>'
                    if (element.hasOwnProperty('operationId')) {
                        var ids = element.operationId.split('_');
                        result += '<table>'
                        if (ids.length == 1) {
                            result += '<tr><td>Operation Id</td><td>' + element.operationId + '</td></tr>'
                        }
                        else if (ids.length == 2) {
                            result += '<tr><td class="key">Group</td><td class="value">' + ids[0] + '</td></tr>'
                            result += '<tr><td class="key">Operation</td><td class="value">' + ids[1] + '</td></tr>'
                        }
                        result += this.getConsumesAsTR(element);
                        result += this.getProducesAsTR(element);
                        result += '</table>'
                    }
                    result += '</li></ul>'

                    if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                        result += '<h4>Parameters</h4>';
                        result += this.getOperationParameters('Parameters', element);
                    }

                    if (element.hasOwnProperty('responses')) {
                        result += this.getOperationResponses(element.responses);
                    }
                    result += '</div></li>'
                }
            }

            return result + '</ul>';
        }

        private getOperationParameters(caption, operation): string {

            var result = '';

            if (operation.hasOwnProperty('parameters')) {
                result += '<ul class="parameters"><li>';
                result += '<table width="100%" class="description">';
                for (var key in operation.parameters) {
                    var parameter = operation.parameters[key];
                    result += this.getParameter(parameter);
                }
                result += '</table>';
                result += '</li></ul>';
            }

            return result;
        }

        private getClientParameters(parameters): string {

            var result = '<li><h1 class="arrow">Client (Global) Parameters</h1><ul>'
            result += '<div class="content">'

            for (var key in parameters) {
                var parameter = parameters[key];

                result += '<li id="schema' + key + '"><h2  class="arrow" style="font-size: 1.87rem">' + key + '</h2>';
                result += '<div class="content">'
                result += '<table width="100%" class="description">';
                result += this.getParameter(parameter);
                result += '</table></div></li>';
            }

            return result + '</div></ul></li>';
        }

        private getParameter(parameter): string {

            var result = '';

            if (parameter.hasOwnProperty('$ref'))
            {
                let params = this._doc.parameters;
                var split = parameter['$ref'].split('/');
                if (split.length == 3 && params.hasOwnProperty(split[2]))
                {
                    parameter = params[split[2]];
                }
            }
            
            if (parameter.hasOwnProperty('name')) {
                var required = (parameter.hasOwnProperty('required') && parameter.required);

                result += '<tr><td width="1%"/>'
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName('No Name', parameter) + '<span class="type">' + this.getType(parameter) + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0"><span class="description" valign="top">' + this.getDescription(parameter) + '</span>' +
                    '<div class="info"><span class="key">This parameter is ' + (required ? 'required' : 'optional') + ' and passed in ' + this.getParameterLocation(parameter) + '</span>';

                var dflt = this.getDefaultValue(parameter);
                var valids = this.getValidValues(parameter);

                var isConstant = required && dflt != null && valids != null && parameter.enum.length == 1;

                if (valids != null)
                    result += '</div><div><span class="key">Since this parameter is required and has only one valid value, it is effectively a constant.</span>'

                if (dflt != null) {
                    result += '</div><div><span class="key">Default value: </span><span class="description" valign="top">' + dflt + '</span>'
                }
                if (valids != null) {
                    result += '</div><div><span class="key">Valid values: </span><span class="description" valign="top">' + valids + '</span>'
                }

                result += '</div></td>'
                result += '</tr>'
            }

            return result;
        }

        private getParameterLocation(parameter): string {

            if (parameter.hasOwnProperty('in')) {
                switch (parameter['in']) {
                    case 'header':
                        return 'a header';
                    case 'form':
                        return 'a form element';
                    default:
                        return 'the ' + parameter['in']
                }
            }
            return 'unknown location';
        }

        private getGlobalResponses(responses): string {

            var result = '<li><h1 class="arrow">Responses</h1>'
            result += '<div class="content"><ul class="responses">';

            for (var key in responses) {
                result += '<li id="schema' + key + '"><h2 style="font-size: 1.87rem">' + key + '</h2>'
                result += '<table width="100%" class="description">'

                var response = responses[key];
                result += this.getOperationResponse(key, response)
                result += '</table></li>'
            }

            return result + '</div></ul></li>';
        }

        private getGlobalResponse(key, response): string {

            var result = '';
            var type = this.getType(response);
            var headers = this.getHeaders(response);

            result += '<tr><td width="1%"/>'
            result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="type">' + type + '</span></td>';
            result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>'
            if (headers) {
                result += '<div class="info"><span class="termlabel">Headers</span></div>'
                result += '<div class="info"><span class="termlabel">' + headers + '</span></div>'
            }
            result += '</td></tr>'

            return result;
        }

        private getOperationResponses(responses): string {

            var result = '<h4>Responses</h4>';
            result += '<ul class="responses">';

            for (var key in responses) {
                result += '<li><table width="100%" class="description">'
                var response = responses[key];
                result += this.getOperationResponse(key, response);
                result += '</table></li>'
            }

            result += '</ul>';
            return result;
        }

        private getOperationResponse(key, response): string {

            var result = '';
            var type = this.getType(response.schema);
            var headers = this.getHeaders(response);

            result += '<tr><td width="1%"/>'
            result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span><span class="type">' + type + '</span></td>';
            result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>'
            
            if (headers) {
                result += '<div class="info"><span class="termlabel" style="color: #692682">Headers</span></div>'
                result += '<div class="info"><span class="termlabel">' + headers + '</span></div>'
            }

            return result + '</tr>';
        }

        private getDefinitions(definitions): string {

            var result = '<li><h1 class="arrow" >Definitions</h1><ul>'

            for (var key in definitions) {
                var definition = definitions[key];

                result += '<li><h2 class="arrow" style="font-size: 1.87rem">' + key + '</h2>';

                result += '<div class="content">'
                if (definition.hasOwnProperty('description')) {
                    result += '<p>' + this.getDescription(definition) + '</p>'
                }

                result += '<ul class="get-put"><li>'

                result += this.getSchema(definition);

                result += '</li></ul></div>'
            }

            return result + '</ul></li>';
        }

        private getSchema(schema): string {

            var result = '';

            if (schema.hasOwnProperty('$ref'))
            {
                let definitions = this._doc.definitions;
                var split = schema['$ref'].split('/');
                if (split.length == 3 && definitions.hasOwnProperty(split[2]))
                {
                    schema = definitions[split[2]];
                }
            }            

            result += '<h4>Properties</h4>';

            result += '<ul class="parameters"><li>';

            result += '<table class="description" width="100%">'

            for (var p in schema.properties) {
                var property = schema.properties[p];
                var required = schema.hasOwnProperty('required') && (schema.required.indexOf(p) > -1);

                result += '<tr><td width=".5%"/>'
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName(p, property) + '<span class="type">' + this.getType(property) + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(property) + '</span>' +
                    '<div class="info"><span class="key">This property is ' + (required ? 'required' : 'optional');

                if (property.hasOwnProperty('readOnly') && property.readOnly)
                    result += ' and readonly. It may only occur in response payloads.'

                result += '</span></div>';

                var dflt = this.getDefaultValue(property);
                var valids = this.getValidValues(property);

                if (dflt != null)
                    result += '</div><div><span class="key">Default value: </span><span class="description">' + dflt + '</span>'
                if (valids != null)
                    result += '</div><div><span class="key">Valid values: </span><span class="description">' + valids + '</span>'
                result += '</td></tr>'
            }
            result += '</table>'
            result += '</li></ul>';

            return result;
        }

        private getType(element, array=false, caption=null): string {

            if (element.hasOwnProperty('properties')) {
                
                var schema = element;
                
                if (caption == null)
                    caption = 'Schema';
                   
                if (array)
                    caption += '[]'
                    
                var result = '<ul><li class="collapsed"><h4 class="arrow">' + caption + '</h4>';

                result += '<div class="content">'

                result += '<ul class="get-put"><li>'
                result += this.getSchema(schema);
                result += '</li></ul></div></li></ul>'       
                return result;           
            }
            else if (element.hasOwnProperty('type')) {
                var type = element.type;
                if (type === 'array') {
                    type = this.getType(element.items, true);
                }
                return type;
            }
            else if (element.hasOwnProperty('$ref')) {
                
                let definitions = this._doc.definitions;
                var split = element['$ref'].split('/');
                if (split.length == 3 && definitions.hasOwnProperty(split[2]))
                {
                    element = definitions[split[2]];
                    return this.getType(element, array, split[2]);
                }
            }

            return '';
        }

        private getHeaders(element): string {

            if (element.hasOwnProperty('headers')) {
                var result = '<table class="description" width="100%">';
                for (var hdr in element.headers) {
                    var header = element.headers[hdr];
                    var type = this.getType(header);
                    result += '<tr>'
                    result += '<td width="20%" valign="top">' + this.getHeaderName(hdr, header) + '<span class="type">' + type + '</span></td>';
                    result += '<td width="*" valign="top"><span class="description">' + this.getDescription(header) + '</span></div>';
                }
                result += '</table>'
                return result;
            }

            return null;
        }

        private getDefaultValue(element) {
            return element.hasOwnProperty('default') && element.default != '' ? element.default : null;
        }

        private getValidValues(element) {
            if (element.hasOwnProperty('enum') && element.enum.length > 0) {
                var result = ''
                var first = true
                for (var c in element.enum) {
                    result += element.enum[c]
                    if (!first)
                        result += ', '
                    first = false
                }
                return result;
            }
            return null;
        }

        private getName(deflt, element): string {

            var result = '';

            if (element.hasOwnProperty('name') && element['name'] != '') {
                result += '<span class="termlabel">' + element['name'] + '</span>'
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>'
                }
                return result;
            }

            return '<span class="termlabel">' + deflt + '</span>';
        }

        private getHeaderName(deflt, element): string {

            var result = '';

            if (element.hasOwnProperty('name') && element['name'] != '') {
                result += '<span class="key">' + element['name'] + '</span>'
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>'
                }
                return result;
            }

            return '<span class="key">' + deflt + '</span>';
        }

        private getDescription(element): string {
            return element.hasOwnProperty('description') && element.description != '' ? element.description : 'Missing description.';
        }
    }

    let provider = new TextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('swagger-preview', provider);

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });

    vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    })

    let disposable = vscode.commands.registerCommand('extension.showSwaggerPreview', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });

    });
    context.subscriptions.push(disposable, registration);
}

export function deactivate() {
}