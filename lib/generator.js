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
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { randomUUID } from 'crypto';

export function generateDevToolsJson(targetDirectory = '.') {
  const root = resolve(targetDirectory);
  const wellKnownDir = join(root, '.well-known', 'appspecific');

  mkdirSync(wellKnownDir, { recursive: true });

  const devtoolsJson = {
    workspace: {
      root,
      uuid: randomUUID(),
    },
  };

  writeFileSync(
    join(wellKnownDir, 'com.chrome.devtools.json'),
    JSON.stringify(devtoolsJson, null, 2)
  );

  return root;
}
