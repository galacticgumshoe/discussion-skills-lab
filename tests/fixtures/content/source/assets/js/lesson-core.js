/* Discussion Skills Lab: reusable sequential lesson navigation and persistence. */
(function(global){
  'use strict';
  function createLesson(config){
    const total=config.total, reference=config.reference, key='dsl:'+config.id+':v1';
    const $=id=>document.getElementById(id);
    let state={completed:[],data:{}};
    try { const raw=localStorage.getItem(key); if(raw){const parsed=JSON.parse(raw); if(parsed && Array.isArray(parsed.completed))state={completed:parsed.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<total),data:parsed.data||{}};} }catch(e){}
    let current=0, collapsed=false;
    const completed=new Set(state.completed);
    const canVisit=i=>i===reference||i===0||completed.has(i-1)||completed.has(i);
    function save(){try{localStorage.setItem(key,JSON.stringify({completed:[...completed],data:state.data}));}catch(e){}}
    function data(){return state.data;}
    function update(){
      const count=completed.size;
      $('progress-text').textContent=`${count} of ${total} pages completed`;
      $('progress-track').setAttribute('aria-valuenow',String(count));
      $('progress-fill').style.width=`${count/total*100}%`;
      document.querySelectorAll('[data-go]').forEach(b=>{
        const i=Number(b.dataset.go), allowed=canVisit(i);
        b.disabled=!allowed;
        b.classList.toggle('active',i===current);
        if(i===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
        const mark=b.querySelector('.mark');if(mark)mark.textContent=i<total&&completed.has(i)?'✓':i!==reference&&!allowed?'🔒':'';
      });
      const select=$('section-select');
      if(select){[...select.options].forEach(o=>o.disabled=!canVisit(Number(o.value)));select.value=String(current);}
      const next=$('next-section'), prev=$('previous-section');
      prev.hidden=current===reference;
      prev.disabled=current===0||current===reference;
      next.hidden=current===reference;
      if(current!==reference){next.disabled=current===total-1?!completed.has(current):!canVisit(current+1);next.textContent=current===total-1?'Open quick reference →':'Next section →';}
      const status=$('nav-status');
      if(status)status.textContent=current===reference?'Quick reference is always available.':current===total-1?(completed.has(current)?'Knowledge check complete.':'Complete the knowledge check to finish the lesson.'):(completed.has(current)?'Section complete. You can continue.':config.requirements[current]||'Complete the activity to unlock the next section.');
    }
    function go(i){
      if(!Number.isInteger(i)||i<0||i>reference||!canVisit(i)){update();return false;}
      current=i;
      document.querySelectorAll('.lesson-view').forEach((v,j)=>{v.hidden=j!==i;v.classList.toggle('active',j===i);});
      update();
      const heading=$('view-'+i).querySelector('h2,h3');
      if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
      window.scrollTo({top:0,behavior:'auto'});
      return true;
    }
    function complete(i){if(i<0||i>=total)return;completed.add(i);save();update();}
    function record(name,value){state.data[name]=value;save();}
    function init(){
      const nav=$('rail-links'),select=$('section-select');
      config.labels.forEach((label,i)=>{
        const b=document.createElement('button');b.type='button';b.className='rail-link';b.dataset.go=i;
        const span=document.createElement('span');span.textContent=label;b.append(span);
        const mark=document.createElement('span');mark.className='mark';mark.setAttribute('aria-hidden','true');b.append(mark);
        b.addEventListener('click',()=>go(i));nav.append(b);
        const option=document.createElement('option');option.value=i;option.textContent=label;select.append(option);
      });
      select.addEventListener('change',()=>go(Number(select.value)));
      const shortcut=$('quick-reference-link');
      if(shortcut)shortcut.addEventListener('click',()=>go(reference));
      $('previous-section').addEventListener('click',()=>go(current===reference?total-1:current-1));
      $('next-section').addEventListener('click',()=>go(current===total-1?reference:current+1));
      $('rail-toggle').addEventListener('click',()=>{
        collapsed=!collapsed;$('layout').classList.toggle('sidebar-collapsed',collapsed);
        $('rail-toggle').setAttribute('aria-expanded',String(!collapsed));
        $('rail-toggle').setAttribute('aria-label',collapsed?'Expand navigation':'Collapse navigation');
        $('rail-toggle').textContent=collapsed?'☰':'⇤';
      });
      go(0);
    }
    return {init,go,complete,record,data,update,canVisit,completed};
  }
  global.DSL={createLesson};
})(window);
