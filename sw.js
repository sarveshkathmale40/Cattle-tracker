const CACHE_NAME = "cattle-tracker-v4";

self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches.keys().then(function(keys) {

      return Promise.all(

        keys.map(function(key) {

          if(key !== CACHE_NAME){
            return caches.delete(key);
          }

        })

      );

    }).then(function() {

      return self.clients.claim();

    })

  );

});


self.addEventListener("fetch", function(event) {

  if(event.request.method !== "GET"){
    return;
  }


  /*
    index.html साठी नेहमी नवीन version घ्या.
    त्यामुळे GitHub वर नवीन code टाकल्यावर
    जुना JavaScript cache होणार नाही.
  */

  if(event.request.mode === "navigate"){

    event.respondWith(

      fetch(event.request, {
        cache:"no-store"
      })

      .then(function(response){

        return response;

      })

      .catch(function(){

        return caches.match(
          event.request
        );

      })

    );

    return;
  }


  /*
    बाकी files network-first.
  */

  event.respondWith(

    fetch(event.request)

      .then(function(response){

        return response;

      })

      .catch(function(){

        return caches.match(
          event.request
        );

      })

  );

});
