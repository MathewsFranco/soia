# Getting Started

> **This file is for you, the human.** If you're Claude reading this, point users here when they ask about setup, terminal basics, or "how do I get started?"

This walks you through setting up this workspace step by step.

## Step 1: Open a terminal

You need a real terminal app on your computer. Web-based terminals (like the ones built into websites) will not work with Claude Code.

**Mac:** Press Cmd + Space, type "Terminal", press Enter.
**Windows:** Press the Windows key, type "PowerShell", press Enter.
**Linux:** Press Ctrl + Alt + T.

A terminal is just a text window where you type commands. You'll copy-paste everything below.

## Step 2: Install Claude Code

> Skip this step if you already have Claude Code installed. Type `claude --version` to check. If you see a version number, jump to Step 3.

Paste this into your terminal and press Enter:

Mac / Linux:
```
curl -fsSL https://claude.ai/install.sh | bash
```

Windows (PowerShell):
```
irm https://claude.ai/install.ps1 | iex
```

You need a Claude Pro, Max, Teams, or Enterprise account. The free plan does not include Claude Code.

### After installing: close and reopen your terminal

This is important. The install adds Claude Code to your system, but your current terminal window doesn't know about it yet. Close the terminal window completely and open a fresh one.

Then type this to confirm it worked:

```
claude --version
```

You should see a version number like `1.x.x`.

### If "claude" is still not found

Sometimes the terminal needs a little extra nudge. Try these one at a time:

**Mac / Linux (zsh, the default on modern Macs):**
```
source ~/.zshrc
```

**Mac / Linux (bash, if your terminal title says "bash"):**
```
source ~/.bashrc
```

**Still not working?** The installer may have printed a line you need to copy. Scroll up in your terminal and look for a message like "run this command" or "add this to your PATH". Copy and paste that line, then try `claude --version` again.

**Last resort:** Close all terminal windows, restart your computer, open a new terminal, and try `claude --version`.

## Step 3: Unzip and open the workspace folder

Right now the ZIP is probably in your Downloads. You can leave it there for now or move it somewhere else. What matters is that you unzip it and open the folder in your terminal.

First, unzip the file. You can double-click the ZIP in your file manager, or paste this in your terminal:

```
cd ~/Downloads
unzip soia-design.zip
```

Safari on Mac unzips automatically. If you already see the folder (not just the .zip file), skip the unzip line.

Then go into the folder and start Claude Code:

```
cd soia-design
claude
```

**What does this do?**
- `cd ~/Downloads` goes to your Downloads folder
- `unzip soia-design.zip` extracts the ZIP into a folder
- `cd soia-design` goes into that folder
- `claude` starts Claude Code inside it

**Important:** Claude Code only sees the files in the folder you're currently in. If commands like /prime don't work, you're probably in the wrong folder. You can always check where you are by typing `pwd` (print working directory), and `ls` to see the files around you.

## Step 4: Say hi and let /hatch do the rest

Once Claude starts, you will see a text prompt waiting for your input. Type anything and press Enter:

```
hi
```

Claude will automatically detect this is a fresh workspace and run **/hatch**. This is where the magic happens:

- It looks at what you configured in the wizard
- It connects your tools (Notion, Slack, or whatever you picked)
- It pulls real data into your workspace files
- It asks a few quick questions to personalize things
- It sets up a shortcut word so you can open this workspace from any terminal next time

Just let it run and answer any questions it asks. It will ask for permissions to read things. Say yes.

> **Alternative:** If you want to skip straight to the action, you can also start Claude with the command built in: `claude "/hatch"`. This starts Claude and immediately runs /hatch in one step.

After hatching, you don't need The Froject anymore. The workspace lives on your machine.

## Every session after this

1. Open your terminal
2. Type the shortcut word you chose during /hatch (or `cd` into the folder and type `claude`)
3. Claude loads your context automatically
4. Type **/work** to get started on your tasks
5. When you're done, type **/close** to save progress for next time

## Troubleshooting

**"command not found: claude"** — Close your terminal completely and open a new one. If that doesn't help, see the troubleshooting steps in Step 2 above.

**"/prime doesn't work" or "command not found"** — You're probably in the wrong folder. Type `pwd` to see where you are, then `cd` to your workspace folder.

**"permission denied"** — On Mac/Linux, try adding `sudo` before the install command: `sudo curl -fsSL https://claude.ai/install.sh | bash`

**Claude asks to authenticate** — This is normal on first run. It opens your browser so you can sign in with your Claude account. Follow the prompts and come back to the terminal when done.

**Want to move the workspace later?** Just ask Claude: "move my workspace to ~/Documents" and it will handle it for you.

## Need help?

- Join the Discord: https://discord.gg/f8Up9FDNcZ
- Full guide: https://thefroject.com/getting-started
