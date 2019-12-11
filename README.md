# Explorer Terminal Commands

This VSCode extension allows you to define a set of terminal commands in your workspace settings that will appear in the Explorer view of VSCode. Clicking on it will open a terminal and execute the command.

![Extension demo](/demo.gif?raw=true "Extension demo")


## Features

* Auto on/off : wether to run the command immediately or let you finish typing it
* Custom working directory : allow you to set the CWD of the terminal before sending the command
* Multi on/off : wether the command must create a new terminal each time it runs

## Configuration

Commands must be set in your workspace settings.

```
  "explorerTerminal.commands": [
    {
      "command": "top",
    },
    {
      "name": "my ls command",
      "command": "ls -F -lh --color=always -v --author --time-style=long-iso",
      "multi": true,
    },
    {
      "name": "some docker command",
      "command": "docker ps -aq",
      "cwd": "/home/gogson",
    },
    {
      "name": "whereis",
      "command": "whereis ",
      "auto": false
    }
  ]
```