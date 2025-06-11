/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { existsSync, rmSync, mkdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { generateDevToolsJson } from '../lib/generator.js';

describe('generateDevToolsJson', () => {
  const testDir = 'test-dir';

  const getDevToolsJsonPath = (baseDir) =>
    join(baseDir, '.well-known', 'appspecific', 'com.chrome.devtools.json');

  beforeEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    mkdirSync(testDir);
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it('should create com.chrome.devtools.json in the specified directory', () => {
    generateDevToolsJson(testDir);
    const devtoolsJsonPath = getDevToolsJsonPath(testDir);
    expect(existsSync(devtoolsJsonPath)).toBe(true);
  });

  it('should create com.chrome.devtools.json with the correct content', () => {
    generateDevToolsJson(testDir);
    const devtoolsJsonPath = getDevToolsJsonPath(testDir);
    const devtoolsJsonContent = readFileSync(devtoolsJsonPath, 'utf-8');
    const parsedDevtoolsJson = JSON.parse(devtoolsJsonContent);
    const expectedRoot = resolve(testDir);
    expect(parsedDevtoolsJson.workspace.root).toEqual(expectedRoot);
    expect(parsedDevtoolsJson.workspace.uuid).toBeDefined();
  });

  it('should create com.chrome.devtools.json in the current directory by default', () => {
    const originalCwd = process.cwd();
    process.chdir(testDir);
    generateDevToolsJson();
    const devtoolsJsonPath = getDevToolsJsonPath('.');
    expect(existsSync(devtoolsJsonPath)).toBe(true);
    process.chdir(originalCwd);
  });
});
