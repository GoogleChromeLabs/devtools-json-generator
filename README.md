# DevTools JSON Generator

This tool generates a `devtools.json` file for use with [Chrome DevTools' "Workspace" feature](https://developer.chrome.com/docs/devtools/workspaces).

## Usage

### Using npx

To generate the `devtools.json` file in the current directory, run:

```bash
npx generate-devtools-json
```

To generate the file in a specific directory, pass the directory as an argument:

```bash
npx generate-devtools-json /path/to/your/project
```

### Programmatic Usage

You can also use the generator programmatically:

```javascript
const { generateDevToolsJson } = require('generate-devtools-json');

// Generate in the current directory
generateDevToolsJson();

// Generate in a specific directory
generateDevToolsJson('/path/to/your/project');
```
