(() => {
  const sidebarButtons = [...document.querySelectorAll('.ex-side-button[data-screen]')];
  const names = {overview:['NETWORK PERFORMANCE','Overview'],campaigns:['CAMPAIGN OPERATIONS','Campaigns'],approvals:['HUMAN-IN-THE-LOOP','Approvals'],locations:['LOCATION DIRECTORY','Locations'],reporting:['EXECUTIVE INSIGHTS','Reporting']};
  const setScreen = name => {
    if (!names[name]) return;
    sidebarButtons.forEach(b => b.classList.toggle('selected',b.dataset.screen === name));
    document.querySelectorAll('.screen').forEach(p => {
      const selected = p.id === 'screen-'+name;
      p.hidden = !selected;
      p.classList.toggle('active-screen',selected);
    });
    const kicker=document.getElementById('screen-kicker'),title=document.getElementById('screen-title');
    if(kicker)kicker.textContent=names[name][0];if(title)title.textContent=names[name][1];
  };
  sidebarButtons.forEach(b=>b.addEventListener('click',()=>setScreen(b.dataset.screen)));
  const role=document.getElementById('role-filter');
  const roleStats={corporate:['44','18','7','146'],regional:['12','8','3','48'],local:['1','3','1','12']};
  role?.addEventListener('change',()=>{
    ['ex-locations','ex-campaigns','ex-approvals','ex-tasks'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=roleStats[role.value][i];});
  });
  const announce=(id,msg)=>{const el=document.getElementById(id);if(el)el.textContent=msg;};
  document.getElementById('approve-campaign')?.addEventListener('click',()=>announce('approval-message','Approved in this simulation. No content was published.'));
  document.getElementById('revision-campaign')?.addEventListener('click',()=>announce('approval-message','Revision requested in this simulation. No message was sent.'));
  document.getElementById('tour-approve')?.addEventListener('click',()=>announce('tour-review-status','Approved in this simulation. Nothing was published.'));
  document.getElementById('tour-revise')?.addEventListener('click',()=>announce('tour-review-status','Revision requested in this simulation.'));
  const locSearch=document.getElementById('location-search');
  locSearch?.addEventListener('input',()=>{
    const q=locSearch.value.toLowerCase().trim();let found=0;
    document.querySelectorAll('.location-record').forEach(row=>{const match=(row.dataset.search||'').includes(q);row.hidden=!match;if(match)found++;});
    const no=document.getElementById('location-no-results');if(no)no.hidden=found!==0;
  });
  let step=0;
  const tabs=[...document.querySelectorAll('[data-step]')],slides=[...document.querySelectorAll('[data-tour-panel]')];
  const labels=['Tell KYBR the goal','Create the campaign','Review the content','Prepare the launch','Review performance'];
  const showStep=n=>{
    if(n<0||n>=labels.length)return;step=n;
    tabs.forEach(b=>{const active=Number(b.dataset.step)===step;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});
    slides.forEach(p=>p.hidden=Number(p.dataset.tourPanel)!==step);
    const h=document.getElementById('tour-heading'),count=document.getElementById('tour-count'),prev=document.getElementById('tour-prev'),next=document.getElementById('tour-next'),progress=document.getElementById('tour-progress-fill');
    if(h)h.textContent=labels[step];if(count)count.textContent='STEP '+(step+1)+' OF 5';if(prev)prev.disabled=step===0;
    if(next)next.textContent=step===4?'Restart Tour':'Next Step';if(progress)progress.style.width=((step+1)*20)+'%';
  };
  tabs.forEach(b=>b.addEventListener('click',()=>showStep(Number(b.dataset.step))));
  document.getElementById('tour-prev')?.addEventListener('click',()=>showStep(step-1));
  document.getElementById('tour-next')?.addEventListener('click',()=>showStep(step===4?0:step+1));
  const brandName=document.getElementById('brand-name'),brandGoal=document.getElementById('brand-goal'),brandTone=document.getElementById('brand-tone'),brandColor=document.getElementById('brand-color'),brandLogo=document.getElementById('brand-logo'),brandPreview=document.getElementById('brand-preview'),previewLogo=document.getElementById('preview-logo');
  const goals={
    leads:['Turn interest into opportunity.','Build a stronger pipeline with a clear reason to connect.','Discover more'],
    awareness:['Be the name they remember.','Connect with your local audience and start meaningful conversations.','Meet our brand'],
    hiring:['Find your next great teammate.','Show candidates the people, purpose, and opportunities behind your brand.','Explore careers'],
    launch:['Something exciting is coming.','Introduce your next big idea with an on-brand launch campaign.','Get the details']
  };
  let logoUrl=null;
  function updateBrand(){
    if(!brandPreview)return;
    const company=(brandName?.value||'Your Company').trim().slice(0,80)||'Your Company';
    const goal=goals[brandGoal?.value]||goals.awareness;
    const tone=brandTone?.value||'confident';
    const heading=document.getElementById('preview-headline'),sub=document.getElementById('preview-subtitle'),cta=document.getElementById('preview-button'),name=document.getElementById('preview-company'),summary=document.getElementById('lab-summary');
    if(name)name.textContent=company.toUpperCase();if(heading)heading.textContent=goal[0];
    const starts={confident:'Meet '+company+'. ',warm:'Your community matters to '+company+'. ',bold:company+' is ready to make an impact. '};
    if(sub)sub.textContent=starts[tone]+goal[1];
    if(cta)cta.textContent=goal[2];
    const accent=brandColor?.value||'#54e7dc';brandPreview.style.setProperty('--brand-accent',accent);
    if(summary)summary.textContent='A '+tone+' '+brandGoal?.selectedOptions[0]?.text.toLowerCase()+' concept for '+company+'.';
  }
  [brandName,brandGoal,brandTone,brandColor].forEach(el=>el?.addEventListener('input',updateBrand));
  brandLogo?.addEventListener('change',()=>{
    if(logoUrl)URL.revokeObjectURL(logoUrl);logoUrl=null;
    const file=brandLogo.files?.[0];
    if(!file){if(previewLogo)previewLogo.style.display='none';return;}
    if(!['image/png','image/jpeg','image/webp','image/svg+xml'].includes(file.type)||file.size>3*1024*1024){announce('lab-message','Please choose a PNG, JPEG, WebP or SVG image under 3 MB.');brandLogo.value='';if(previewLogo)previewLogo.style.display='none';return;}
    logoUrl=URL.createObjectURL(file);if(previewLogo){previewLogo.src=logoUrl;previewLogo.alt='Uploaded logo for '+(brandName?.value||'your company');previewLogo.style.display='block';}
    announce('lab-message','Logo added locally to your preview. It has not been uploaded.');
  });
  document.getElementById('brand-generate')?.addEventListener('click',()=>{
    updateBrand();const r=document.getElementById('lab-results');if(r)r.hidden=false;
    announce('lab-message','Your personalized concept is ready below. This is a local template preview, not an AI-generated campaign.');
    r?.scrollIntoView({block:'nearest',behavior:'smooth'});
  });
  document.getElementById('brand-reset')?.addEventListener('click',()=>{
    if(brandName)brandName.value='';if(brandGoal)brandGoal.value='awareness';if(brandTone)brandTone.value='confident';if(brandColor)brandColor.value='#54e7dc';
    if(brandLogo)brandLogo.value='';if(logoUrl)URL.revokeObjectURL(logoUrl);logoUrl=null;if(previewLogo)previewLogo.style.display='none';
    const r=document.getElementById('lab-results');if(r)r.hidden=true;updateBrand();announce('lab-message','Preview reset.');
  });
  updateBrand();
})();