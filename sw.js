const STATIC_CACHE = "static";

const APP_SHELL = [
    "/",
    "index.html",
    "estilos.css",
    "Lista.js",
    "img/ucol.png",
];

self.addEventListener("install", (e) => {
    const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntill(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    console.log("fectch! ", e.request);

    e.respondWith(
        caches
        .match(e.request)
        .then((res) => res || fetch(e.request))
        .catch(console.log)
        );
})