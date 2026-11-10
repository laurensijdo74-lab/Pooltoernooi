const CACHE='pool-vue-beheer-shell-v3';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./beheer-icon-192.png','./beheer-icon-512.png','./beheer.webmanifest'])));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('pool-vue-beheer-shell-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
// Network first for navigation, so new code and online data are never served stale.
self.addEventListener('fetch',event=>{if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>new Response('Geen internetverbinding. Verbind opnieuw om het toernooi te beheren.',{headers:{'Content-Type':'text/plain;charset=utf-8'}})))}});
