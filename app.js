'use strict';
(() => {
  const data = window.SITE_DATA;
  const $ = id => document.getElementById(id);
  let mode = 'study', query = '', hidden = false, filtered = [], index = 0;
  let saved = 0;
  try { saved = Number(localStorage.getItem('ai-study-position')) || 0; } catch (_) {}
  const safeText = (node,text) => { node.textContent = text || ''; };
  const archive = data.archive.map(t=>({id:'turn'+t.i,sourceTurn:t.i+1,title:(t.question || 'Görselle gönderilen ileti').slice(0,70),question:t.question || '',answer:t.answer,images:t.images,kind:t.i>=83?'Site hazırlama isteği':([4,20,29,67,73].includes(t.i)?'Düzeltme / takip':t.i===53?'Tamamlama':'Sohbet iletisi'),items:[],options:[]}));
  function all(){ return mode==='study'?data.cards:archive; }
  function setHash(){if(mode==='study')history.replaceState(null,'','#'+(data.cards.indexOf(filtered[index])+1));}
  function renderList(){
    $('questionList').replaceChildren();
    filtered.forEach((c,i)=>{const b=document.createElement('button'); b.className='list-item'+(i===index?' selected':''); b.setAttribute('aria-current',i===index?'step':'false'); b.setAttribute('aria-label',`${all().indexOf(c)+1}. ${c.title}`); const n=document.createElement('span');n.className='list-num';safeText(n,String(all().indexOf(c)+1).padStart(2,'0'));const copy=document.createElement('span');copy.className='list-copy';safeText(copy,c.title);b.append(n,copy);b.onclick=()=>{index=i;render(true);};$('questionList').append(b);});
    safeText($('resultCount'),`${filtered.length} ${mode==='study'?'soru':'ileti'}`);
  }
  function render(focus=false){
    const c=filtered[index];
    $('empty').hidden=!!c; $('cardLayout').hidden=!c; $('completion').hidden=true;
    renderList();
    $('prev').disabled=!c||index===0;$('next').disabled=!c;
    if(!c){safeText($('position'),'0 SONUÇ');$('progressBar').style.width='0%';$('jump').value='';return;}
    const num=all().indexOf(c)+1;
    safeText($('position'),`${mode==='study'?'SORU':'İLETİ'} ${String(num).padStart(2,'0')} / ${all().length}`);
    safeText($('type'),c.kind);safeText($('sourceOrder'),`Sohbet #${c.sourceTurn}`);
    $('progressBar').style.width=`${num/all().length*100}%`;
    safeText($('questionTitle'),c.title);safeText($('questionText'),c.question);
    $('questionItems').replaceChildren();
    (c.items||[]).forEach((text,i)=>{const row=document.createElement('div');row.className='scenario';const n=document.createElement('span');n.className='scenario-num';safeText(n,String(i+1).padStart(2,'0'));const p=document.createElement('span');safeText(p,text);row.append(n,p);$('questionItems').append(row);});
    $('options').replaceChildren();
    if(c.pairs){const bank=document.createElement('p');bank.className='choice-bank';safeText(bank,'Seçenekler: '+c.options.join(' · '));$('questionItems').append(bank);}
    else (c.options||[]).forEach(text=>{const li=document.createElement('li');safeText(li,text);$('options').append(li);});
    $('images').replaceChildren();
    c.images.forEach((src,i)=>{const b=document.createElement('button');b.className='image-button';b.setAttribute('aria-label',`Orijinal görsel ${i+1}, büyüt`);const img=document.createElement('img');img.src=src;img.alt=`Sohbet ${c.sourceTurn}, orijinal soru görseli ${i+1}`;const label=document.createElement('span');safeText(label,`↗ Orijinal görsel${c.images.length>1?' '+(i+1):''} · Büyüt`);b.append(img,label);b.onclick=()=>{$('largeImage').src=src;$('imageDialog').showModal();};$('images').append(b);});
    $('answerContent').replaceChildren();
    if(c.pairs){const table=document.createElement('table');const caption=document.createElement('caption');caption.className='eyebrow';safeText(caption,'EŞLEŞTİRME CEVAPLARI');table.append(caption);const body=document.createElement('tbody');c.pairs.forEach(p=>{const r=document.createElement('tr');[p.prompt,p.answer].forEach(t=>{const td=document.createElement('td');safeText(td,t);r.append(td);});body.append(r);});table.append(body);$('answerContent').append(table);}
    else if(c.orderedAnswer){const ol=document.createElement('ol');c.orderedAnswer.forEach(t=>{const li=document.createElement('li');safeText(li,t);ol.append(li);});$('answerContent').append(ol);}
    else safeText($('answerContent'),c.answer);
    $('correction').replaceChildren();$('original').hidden=!c.correction;
    if(c.correction){const note=document.createElement('p');note.className='correction-note';safeText(note,`Sohbetteki düzeltme uygulandı (#${c.correction.sourceTurn}). Gösterilen cevap, senin düzeltmeni izleyen yanıttır.`);$('correction').append(note);safeText($('originalContent'),`İlk cevap: ${c.originalAnswer}\n\nSenin düzeltmen: ${c.correction.request}\n\nSon yanıt: ${c.correction.answer}`);}
    $('original').open=false;
    $('jump').value=num;$('jump').max=all().length;safeText($('jumpTotal'),'/ '+all().length);
    safeText($('next'),index===filtered.length-1?'Başa dön ↻':'Next · Sonraki →');
    $('completion').hidden=index!==filtered.length-1||!!query;
    syncAnswer();
    if(mode==='study'){try{localStorage.setItem('ai-study-position',String(num-1));}catch(_){}setHash();}
    if(focus){$('questionTitle').focus({preventScroll:true});$('cardLayout').scrollIntoView({block:'start'});}
  }
  function syncAnswer(){
    $('answerContent').hidden=hidden;$('hiddenAnswer').hidden=!hidden;$('correction').hidden=hidden;$('original').hidden=hidden||!filtered[index]?.correction;
    safeText($('toggleAnswer'),hidden?'Cevabı göster':'Cevabı gizle');$('toggleAnswer').setAttribute('aria-pressed',String(hidden));
  }
  function filter(preferred){
    const q=query.toLocaleLowerCase('tr');
    filtered=all().filter(c=>([c.title,c.question,c.answer,...(c.items||[]),...(c.options||[])].join(' ')).toLocaleLowerCase('tr').includes(q));
    index=Math.max(0,filtered.indexOf(preferred));render();
  }
  function changeMode(next){mode=next;query='';$('search').value='';$('studyTab').classList.toggle('active',mode==='study');$('archiveTab').classList.toggle('active',mode==='archive');$('studyTab').setAttribute('aria-pressed',String(mode==='study'));$('archiveTab').setAttribute('aria-pressed',String(mode==='archive'));filter();}
  $('studyTab').onclick=()=>changeMode('study');$('archiveTab').onclick=()=>changeMode('archive');
  $('search').oninput=()=>{const current=filtered[index];query=$('search').value;filter(current);};
  $('toggleAnswer').onclick=$('revealAnswer').onclick=()=>{hidden=!hidden;syncAnswer();};
  $('prev').onclick=()=>{if(index>0){index--;render(true);}};
  $('next').onclick=()=>{if(filtered.length){index=index===filtered.length-1?0:index+1;render(true);}};
  $('go').onclick=()=>{const num=Number($('jump').value);if(!Number.isInteger(num)||num<1||num>all().length){$('jump').value=all().indexOf(filtered[index])+1;return;}query='';$('search').value='';filter(all()[num-1]);};
  $('jump').onkeydown=e=>{if(e.key==='Enter'){$('go').click();}};
  $('closeImage').onclick=()=>$('imageDialog').close();
  $('imageDialog').onclick=e=>{if(e.target===$('imageDialog'))$('imageDialog').close();};
  document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName)||$('imageDialog').open||e.ctrlKey||e.altKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();$('next').click();}else if(e.key==='ArrowLeft'){e.preventDefault();$('prev').click();}else if(e.code==='Space'){e.preventDefault();hidden=!hidden;syncAnswer();}});
  window.addEventListener('hashchange',()=>{const n=Number(location.hash.slice(1));if(mode==='study'&&n>=1&&n<=data.cards.length){query='';$('search').value='';filter(data.cards[n-1]);}});
  const hash=Number(location.hash.slice(1));
  filter(data.cards[(Number.isInteger(hash)&&hash>=1&&hash<=data.cards.length)?hash-1:Math.min(Math.max(0,saved),data.cards.length-1)]);
})();
