# Daily Rotating Password System

## Overview

The algosketch application now uses a daily rotating password system that generates memorable passwords that change every day at midnight.

## How It Works

The password is generated using a deterministic algorithm based on the current date:

- **Pattern**: `[adjective][noun][year]`
- **Example**: `wisealgo25` (for June 24, 2025)

### Word Arrays

- **Adjectives**: swift, clever, bright, quick, smart, fast, wise, sharp
- **Nouns**: algo, code, data, tree, graph, sort, search, hash
- **Year**: Last two digits of current year

### Selection Logic

- Adjective index: `(day + month) % adjectives.length`
- Noun index: `(day * month) % nouns.length`
- Year suffix: Last two digits of current year

## Usage

### Getting Today's Password

Run the utility script to see today's password:

```bash
bun get-password.ts
```

### Admin Access

1. Visit `/{todaysPassword}` (e.g., `/wisealgo25`)
2. You'll be redirected to `/dashboard` with admin privileges
3. Admin session lasts for 1 hour

### Clearing Admin Access

Visit `/clear` to remove admin privileges and return to the main page.

## Benefits

- **Security**: Password changes daily automatically
- **Memorable**: Uses algorithm-related words that are easy to remember
- **Predictable**: Same password for entire day, consistent across servers
- **No Storage**: Password is computed, not stored anywhere

## Examples

- June 24, 2025: `wisealgo25`
- June 25, 2025: `brighttree25`
- January 1, 2026: `swiftcode26`

## Development Notes

- Localhost (`http://localhost:3000`) bypasses all middleware checks
- Password rotation happens at midnight in the server's timezone
- System works without any external dependencies or database storage
