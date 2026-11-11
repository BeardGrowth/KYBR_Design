#!/usr/bin/env node
// KYBR static-site quality gates. Runs without external dependencies.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const errors=[],warnings=[];
const htmlFiles=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const idsByFile=new Map();
for(const file of htmlFiles){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const ids=[...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
 const dupe=ids.filter((id,i)=>ids.indexOf(id)!==i);
 if(dupe.length) errors.push(`${file}: duplicate element IDs: ${[...new Set(dupe)].join(', ')}`);
 idsByFile.set(file,new Set(ids));
 if(!/<html\b[^>]*lang=["']en["']/i.test(html))errors.push(`${file}: missing html language`);
 if(!/<meta\s+name=["']viewport["']/i.test(html))errors.push(`${file}: missing viewport meta`);
 if(!/<title>[^<]+<\/title>/i.test(html))errors.push(`${file}: missing page title`);
 if(!/<main\b/i.test(html))errors.push(`${file}: missing main landmark`);
 const tags=[...html.matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)];
 const count=(tag,closing)=>tags.filter(m=>m[1].toLowerCase()===tag && (m[0].startsWith('</')===closing)).length;
 for(const tag of ['main','section','form','article','fieldset','details','nav']){
  if(count(tag,false)!==count(tag,true))errors.push(`${file}: unmatched <${tag}> tags`);
 }
 for(const m of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)){
  const ref=m[1].trim();
  if(!ref||/^(https?:|data:|mailto:|tel:|javascript:|\/\/)/i.test(ref))continue;
  if(ref.startsWith('#')){if(!ids.includes(ref.slice(1)))warnings.push(`${file}: missing same-page anchor ${ref}`);continue}
  const [rel,hash='']=ref.split('#');
  const target=decodeURIComponent(rel.split('?')[0]);
  if(!target)continue;
  if(target.startsWith('/')){warnings.push(`${file}: absolute local reference ${ref} (review base path)`);continue}
  const local=path.resolve(root,path.dirname(file),target);
  if(!local.startsWith(root+path.sep) && local!==root){errors.push(`${file}: local path escapes root: ${ref}`);continue}
  if(!fs.existsSync(local))errors.push(`${file}: missing local asset/page ${ref}`);
  else if(hash && local.endsWith('.html')){
    const body=fs.readFileSync(local,'utf8');
    if(!new RegExp('\\bid\\s*=\\s*["\\x27]'+hash.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'["\\x27]').test(body))warnings.push(`${file}: anchor ${ref} not found`);
  }
 }
 if(/<form\b[^>]*data-netlify=["']true["']/i.test(html)){
  if(!/name=["']form-name["']/i.test(html)) errors.push(`${file}: Netlify form missing static form-name input`);
  if(!/method=["']POST["']/i.test(html)) errors.push(`${file}: Netlify form missing POST method`);
 }
 const images=[...html.matchAll(/<img\b[^>]*>/gi)];
 for(const img of images)if(!/\balt=["'][^"']*["']/.test(img[0]))warnings.push(`${file}: image missing alt attribute`);
}
for(const name of fs.readdirSync(root).filter(f=>f.endsWith('.js'))){
 const result=spawnSync(process.execPath,['--check',path.join(root,name)],{encoding:'utf8'});
 if(result.status!==0)errors.push(`${name}: invalid JavaScript: ${result.stderr.trim()}`);
}
if(!fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('Disallow: /'))errors.push('Staging robots.txt should block indexing until approved launch');
if(!fs.readFileSync(path.join(root,'_headers'),'utf8').includes('noindex'))errors.push('Staging headers should remain noindex until approved launch');
if(!fs.existsSync(path.join(root,'privacy.html')))errors.push('Inquiry notice page missing');
console.log(`Checked ${htmlFiles.length} HTML files and local assets, JavaScript syntax and staging guardrails.`);
for(const msg of warnings)console.warn('WARN: '+msg);
for(const msg of errors)console.error('FAIL: '+msg);
if(errors.length)process.exit(1);
console.log('Static quality gates passed. Live deployment, forms, web vitals and legal review require separate checks.');
