if('serviceWorker' in navigator) {
    navigator.serviceWorker.register("../sw.js").then((message)=>{
        console.log('SW Ok');
    });
} else {
    console.log('aun no ...');
}