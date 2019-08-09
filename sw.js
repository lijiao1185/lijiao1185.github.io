// 监听 service worker 的 install 事件
self.addEventListener('install', function (event) {
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
      // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
      caches.open('my-test-cache-v1').then(function (cache) {
          // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
          return cache.addAll([
              '/',
              '/index.html',
              // '/main.css',
              // '/main.js',
              // '/image.jpg'
          ]);
      })
  );
});
self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
      }).catch(function(error) {
  
        return caches.match('index.html');
  
      })
    );
  });