(() => {
 const data={
 overview:{kicker:"COMMAND CENTER",title:"Your work, in one view",description:"Keep marketing, relationships, tasks and results connected so nothing falls through the cracks.",stats:[["12","Active campaigns"],["8","Items to review"],["24","Open opportunities"]],listTitle:"Priority activity",activities:[["Approve next week's content","Marketing / needs review","Review"],["Follow up on sponsorship proposal","Outreach / assigned to team","Due today"],["Review weekly marketing report","Reporting / current period","New"]]},
 content:{kicker:"CREATIVE OPERATIONS",title:"Turn content into campaigns",description:"Organize brand assets, drafts, content calendars, approvals and supported publishing workflows.",stats:[["18","Content assets"],["5","Awaiting approval"],["14","Scheduled examples"]],listTitle:"Content pipeline",activities:[["Raw video uploaded by local team","Content studio / source asset","New"],["Social campaign ready for approval","Content calendar / brand check","Review"],["Weekly content schedule prepared","Planning / sample calendar","Planned"]]},
 crm:{kicker:"RELATIONSHIP MANAGEMENT",title:"Know the next conversation",description:"See customer records, leads, opportunities, sales stages and relevant follow-ups.",stats:[["42","Sample contacts"],["9","Open opportunities"],["6","Follow-ups due"]],listTitle:"Customer and sales activity",activities:[["New inquiry ready for qualification","CRM / inbound inquiry","New"],["Proposal needs follow-up","Pipeline / sales opportunity","Due today"],["Appointment notes added","CRM / account record","Updated"]]},
 reputation:{kicker:"CUSTOMER EXPERIENCE",title:"Stay close to your reputation",description:"Monitor feedback, organize review-response tasks and coordinate appropriate customer follow-up.",stats:[["12","Sample locations"],["4","Reviews to address"],["3","Response drafts"]],listTitle:"Reputation activity",activities:[["New customer feedback received","Reputation / response queue","Review"],["Draft reply awaiting approval","Reputation / customer service","Pending"],["Location feedback summary prepared","Reporting / weekly review","New"]]},
 outreach:{kicker:"RELATIONSHIP GROWTH",title:"Build and track partnerships",description:"Organize sponsor prospects, donor relationships, outreach sequences and business development tasks.",stats:[["32","Prospect records"],["6","Follow-ups due"],["9","Open proposals"]],listTitle:"Outreach pipeline",activities:[["Sponsorship proposal prepared","Partnerships / outreach","Draft"],["New prospect researched","Prospecting / enrichment","New"],["Follow-up needed on proposal","Sponsorships / account owner","Due today"]]},
 tasks:{kicker:"TEAM OPERATIONS",title:"Keep your people aligned",description:"Coordinate ownership, assignments, review queues, project activity and approvals.",stats:[["23","Open tasks"],["7","Due this week"],["46","Completed examples"]],listTitle:"Tasks requiring attention",activities:[["Approve brand creative","Creative / content team","Review"],["Review campaign budget","Campaigns / leadership","Pending"],["Confirm event logistics","Projects / assigned owner","Due today"]]},
 campaigns:{kicker:"MARKETING EXECUTION",title:"Plan every channel together",description:"Connect strategy, audiences, creative, email, social and other supported campaign activity.",stats:[["7","Campaign concepts"],["3","In review"],["4","Active examples"]],listTitle:"Campaign planning",activities:[["Community awareness plan","Multi-channel / campaign brief","Planning"],["Recruitment campaign creative","Content / internal approvals","Review"],["Customer acquisition sequence","Outreach / messaging","Draft"]]},
 reports:{kicker:"GROWTH INTELLIGENCE",title:"Know what is working",description:"Review marketing, sales and workflow activity together, using validated connected data.",stats:[["8","Sample reports"],["4","Tracked channels"],["16","Measured campaigns"]],listTitle:"Reporting and recommendations",activities:[["Campaign performance summary","Analytics / weekly report","Ready"],["Lead follow-up activity","CRM / conversion tracking","Updated"],["Review recommended changes","Business Brain / human approval","Review"]]}
 };
 const menu=document.getElementById('growth-menu'),nav=document.getElementById('growth-links');
 menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close menu':'Menu';});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='Menu';}));
 const put=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
 document.querySelectorAll('[data-workspace]').forEach(button=>button.addEventListener('click',()=>{
   const id=button.dataset.workspace,item=data[id];if(!item)return;
   document.querySelectorAll('[data-workspace]').forEach(b=>{const active=b===button;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});
   put('workspace-kicker',item.kicker);put('workspace-title',item.title);put('workspace-description',item.description);
   item.stats.forEach(([value,label],i)=>{put('workspace-stat-'+(i+1),value);put('workspace-stat-label-'+(i+1),label);});
   put('workspace-list-title',item.listTitle);
   const box=document.getElementById('workspace-activities');if(!box)return;box.replaceChildren();
   item.activities.forEach(([title,subtitle,status])=>{
      const row=document.createElement('div');row.className='activity-item';
      const dot=document.createElement('span');dot.className='activity-dot';
      const info=document.createElement('div');const strong=document.createElement('b');strong.textContent=title;
      const small=document.createElement('small');small.textContent=subtitle;info.append(strong,small);
      const pill=document.createElement('em');pill.textContent=status;row.append(dot,info,pill);box.appendChild(row);
   });
 }));
 const year=document.getElementById('current-year');if(year)year.textContent=String(new Date().getFullYear());
 const form=document.getElementById('growth-form');
 form?.addEventListener('submit',event=>{
   event.preventDefault();if(!form.reportValidity())return;
   const f=new FormData(form);
   const subject='KYBR Growth OS Demo Request — '+String(f.get('company')||'');
   const body=['Name: '+f.get('name'),'Work email: '+f.get('email'),'Company: '+f.get('company'),'Locations: '+f.get('locations'),'','Goals: '+(f.get('goals')||'(not specified)')].join('\n');
   put('growth-form-status','Your email application will open with a prepared draft. You must send it yourself; no data was submitted to a CRM.');
   window.location.href='mailto:hello@kybrmarketing.ai?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 });
})();