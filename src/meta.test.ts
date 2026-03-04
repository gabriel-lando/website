import { readFileSync } from 'fs';
import { resolve } from 'path';
import { profile } from './config';

const rawHtml = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
const builtHtml = rawHtml.replace('%DESCRIPTION%', profile.description).replace('%TITLE%', profile.name);

describe('meta description', () => {
  it('index.html contains the %DESCRIPTION% placeholder', () => {
    expect(rawHtml).toContain('%DESCRIPTION%');
  });

  it('built HTML meta description matches profile.description', () => {
    const match = builtHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe(profile.description);
  });
});

describe('title', () => {
  it('index.html contains the %TITLE% placeholder', () => {
    expect(rawHtml).toContain('%TITLE%');
  });

  it('built HTML title matches profile.name', () => {
    const match = builtHtml.match(/<title>([^<]+)<\/title>/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe(profile.name);
  });
});
