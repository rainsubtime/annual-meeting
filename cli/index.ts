#!/usr/bin/env node
/**
 * CLI Entry Point - supports both simple and advanced mode
 */

const mode = process.argv[2];

if (mode === '--advanced' || mode === '-a') {
  // Advanced mode: DeepSeek-powered agents with persistent data
  require('./index-advanced');
} else {
  // Simple mode: OpenAI-powered agents (original version)
  require('./index-simple');
}
