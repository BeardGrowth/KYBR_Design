(() => {
  const input = document.getElementById('engine-file');
  const business = document.getElementById('engine-business');
  const goal = document.getElementById('engine-objective');
  const media = document.getElementById('engine-media');
  const status = document.getElementById('engine-status');
  const sample = {
    community: ['Every great business has a story worth sharing.','Get to know the people, moments and passion behind what we do.'],
    event: ['There is something worth putting on your calendar.','We are bringing people together. Here is a look at what is ahead.'],
    offer: ['A little something for our community.','We have something special to share. Explore what is new and connect with our team.'],
    team: ['Meet the people who make it happen.','Behind every great business is a team that cares. Here is ours.']
  };
  let fileUrl = null;
  function say(message) { if (status) status.textContent = message; }
  function clearMedia() {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    fileUrl = null;
    if (media) media.replaceChildren();
  }
  const fill = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  document.getElementById('engine-generate')?.addEventListener('click', () => {
    const name = String(business?.value || '').trim().slice(0,70) || 'Your Business';
    const [title,copy] = sample[goal?.value] || sample.community;
    fill('engine-preview-brand',name);
    fill('engine-preview-heading',title);
    fill('engine-preview-copy',name + ': ' + copy);
    clearMedia();
    const f = input?.files?.[0];
    if (f) {
      const allowed = ['image/png','image/jpeg','image/webp','video/mp4','video/webm','video/quicktime'];
      if (!allowed.includes(f.type) || f.size > 20 * 1024 * 1024) {
        say('Please choose a PNG, JPEG, WebP, MP4, WebM or MOV file under 20 MB.');
        if (input) input.value='';
        return;
      }
      fileUrl=URL.createObjectURL(f);
      const isVideo = f.type.startsWith('video/');
      const el = document.createElement(isVideo?'video':'img');
      el.src=fileUrl;
      if (isVideo) { el.controls=true;el.muted=true;el.playsInline=true;el.preload='metadata';}
      else el.alt='Locally selected content preview for '+name;
      media?.appendChild(el);
      say('Your content is shown in the preview. Nothing has been uploaded, scheduled or published.');
    } else {
      const div = document.createElement('div');
      div.className='engine-placeholder';
      const label=document.createElement('span');
      label.textContent='SAMPLE CREATIVE';
      const heading=document.createElement('strong');
      heading.textContent=title;
      const hint=document.createElement('small');
      hint.textContent='Add a photo or video to preview your own content.';
      div.append(label,heading,hint);
      media?.appendChild(div);
      say('Your sample caption and content plan are ready to review. No content has been scheduled or published.');
    }
  });
  window.addEventListener('pagehide', () => { if (fileUrl) URL.revokeObjectURL(fileUrl); });
})();