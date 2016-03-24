(function () {
'use strict';

var reg;
var sub;
var isSubbed = true;
var subBtn = document.getElementById('sub');
var unsubBtn = document.getElementById('unsub');

if ('serviceWorker' in navigator) {
  console.log('Has a SW');
  navigator.serviceWorker.register('sw.js').then(() => {
    return navigator.serviceWorker.ready;
  }).then(serviceWorkerRegistration => {
    reg = serviceWorkerRegistration;
    subBtn.disabled = false;
    console.log('SW is ready :^)', reg);
  }).catch(error => {
    console.log('SW error :^(', error);
  });
}

function subscribe() {
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(pushSubscription => {
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:', sub.endpoint);
    subBtn.disabled = true;
    unsubBtn.disabled = false;
    isSubbed = true;
  });
}

function unsubscribe() {
  sub.unsubscribe().then(event => {
    console.log('Unsubscribed!', event);
    subBtn.disabled = false;
    unsubBtn.disabled = true;
    isSubbed = false;
  }).catch(error => {
    console.log('Error unsubscribing', error);
  });
}

subBtn.addEventListener('click', subscribe);
unsubBtn.addEventListener('click', unsubscribe);

}());
