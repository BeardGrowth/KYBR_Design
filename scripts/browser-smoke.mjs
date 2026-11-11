import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('test-artifacts',{recursive:true});

const base='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
const failures=[];
const scenarios=[
 {name:'mobile-small',width:320,height:720},
 {name:'mobile-standard',width:390,height:844},
 {name:'tablet',width:768,height:1024},
 {name:'desktop',width:1440,height:900}
];

for(const viewport of scenarios){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,javaScriptEnabled:true});
 const page=await context.newPage();
 const jsErrors=[];
 page.on('pageerror',e=>jsErrors.push(e.message));
 try{
  const response=await page.goto(base+'/index.html',{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(response.status(),200,'homepage HTTP status');
  await page.waitForTimeout(350);
  const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:document.documentElement.clientWidth}));
  assert.ok(overflow.scroll<=overflow.width+2,'horizontal page overflow: '+JSON.stringify(overflow));
  assert.ok(await page.locator('h1').isVisible(),'hero heading visible');
  assert.equal(await page.locator('a[href="./privacy.html"]').count()>0,true,'privacy notice linked');
  const logo=await page.locator('.cine-header img').first().evaluate(img=>img.complete&&img.naturalWidth>0);
  assert.ok(logo,'KYBR header logo loaded');
  await page.locator('[data-flow-step="2"]').click();
  assert.match(await page.locator('#flow-title').innerText(),/control/i,'workflow navigation working');
  await page.locator('#flow-next').click();
  assert.match(await page.locator('#flow-title').innerText(),/campaign/i,'next workflow step working');
  const menu=page.locator('#growth-menu');
  if(await menu.isVisible()){
   await menu.click();
   assert.equal(await menu.getAttribute('aria-expanded'),'true','mobile menu expanded');
   await menu.click();
  }
  await page.locator('.buyer-faq-list summary').first().click();
  assert.equal(await page.locator('.buyer-faq-list details').first().getAttribute('open'),'','FAQ opens');
  const form=page.locator('#growth-form');
  assert.ok(await form.isVisible(),'lead form exists');
  await form.locator('#growth-name').fill('Test Visitor');
  await form.locator('#growth-email').fill('test@example.com');
  await form.locator('#growth-company').fill('Example Company');
  await form.locator('input[name="priority"]').first().check();
  assert.equal(await form.evaluate(el=>el.checkValidity()),true,'form validates');
  assert.deepEqual(jsErrors,[],'browser JavaScript errors');
  if(['mobile-standard','desktop'].includes(viewport.name)) await page.screenshot({path:'test-artifacts/home-'+viewport.name+'.png',fullPage:true});
  console.log('PASS '+viewport.name+' '+JSON.stringify(overflow));
 }catch(e){failures.push(viewport.name+': '+e.message);console.error('FAIL '+viewport.name+': '+e.message);}
 finally{await context.close();}
}
for(const file of ['enterprise.html','tour.html','brand-lab.html','crm-outreach.html','marketing-automation.html','privacy.html','thank-you.html']){
 const page=await browser.newPage();
 try{
  const response=await page.goto(base+'/'+file,{waitUntil:'domcontentloaded',timeout:20000});
  assert.equal(response.status(),200,file+' load');
  assert.ok(await page.locator('h1').count()>0,file+' H1');
  if(file==='enterprise.html')await page.screenshot({path:'test-artifacts/enterprise-desktop.png',fullPage:true});
  console.log('PASS route '+file);
 }catch(e){failures.push(file+': '+e.message);console.error('FAIL '+file+': '+e.message);}
 finally{await page.close();}
}
await browser.close();
if(failures.length){console.error('Browser smoke failures: '+failures.length);process.exit(1);}
console.log('Browser smoke checks passed. External integrations and live Netlify Forms still require manual verification.');
