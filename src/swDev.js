export default function swDev() {
  if ('serviceWorker' in navigator) {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then(() => {
        console.log('SW registered');
      })
      .catch((err) => {
        console.log('SW regitration faild', err);
      });
  } else {
    console.log("Your browser doesn't support service worker!");
  }
}
