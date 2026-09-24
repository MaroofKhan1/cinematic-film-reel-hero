'use strict';
(() => {
  const section=document.querySelector('#process'), list=section?.querySelector('.process-cards');
  if(!list) return;
  const cards=[...list.querySelectorAll('.process-card')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, lastWidth=0;
  function measure(){
    frame=0;
    list.style.removeProperty('--card-height');
    const height=Math.ceil(Math.max(...cards.map(card=>card.getBoundingClientRect().height)));
    const style=getComputedStyle(section);
    const top=parseFloat(style.getPropertyValue('--stack-top'))||0;
    const peek=parseFloat(style.getPropertyValue('--stack-peek'))||0;
    const fits=height+top+peek*(cards.length-1)+20<=window.innerHeight;
    section.dataset.stack=String(!reduce.matches&&fits);
    if(!reduce.matches&&fits) list.style.setProperty('--card-height',height+'px');
    lastWidth=list.getBoundingClientRect().width;
  }
  const schedule=()=>{if(!frame) frame=requestAnimationFrame(measure);};
  const observer='ResizeObserver' in window?new ResizeObserver(entries=>{
    if(entries.some(entry=>Math.abs(entry.contentRect.width-lastWidth)>.5)) schedule();
  }):null;
  observer?.observe(list);
  window.addEventListener('resize',schedule,{passive:true});
  if(reduce.addEventListener) reduce.addEventListener('change',schedule);else reduce.addListener(schedule);
  document.fonts?.ready.then(schedule);
  schedule();
  window.addEventListener('pageshow',schedule);
  window.addEventListener('pagehide',event=>{
    cancelAnimationFrame(frame);frame=0;
    if(event.persisted)return;
    observer?.disconnect();window.removeEventListener('resize',schedule);window.removeEventListener('pageshow',schedule);
    if(reduce.removeEventListener)reduce.removeEventListener('change',schedule);else reduce.removeListener(schedule);
  });
})();
