const V='ghaith-pdf-v2',SH=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SH)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
const put=(r,res)=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
 if(/anthropic|openai|api\./.test(u.hostname))return;
 if(r.mode=='navigate'){e.respondWith(fetch(r).then(x=>put(r,x)).catch(()=>caches.match('./index.html')));return}
 if(u.origin==location.origin||/cdnjs|jsdelivr|gstatic|googleapis|projectnaptha/.test(u.hostname))
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>put(r,x))));});
