/**
* Helper method for LCP optimization (Largest Contentful Paint).
* Fixing Lighthouse warnings: add preloading (preloal) and high priority (fetchpriority).
* @param {HTMLElement} optimizedPic - Generated tag <picture>
*/
function optimizeImageForLCP(optimizedPic) {
  const optImg = optimizedPic.querySelector('img');
  if (optImg) {
    optImg.setAttribute('fetchpriority', 'high');
  }

  const optSource = optimizedPic.querySelector('source[type="image/webp"]');
  if (optSource) {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = optSource.srcset;
    preloadLink.type = 'image/webp';

    document.head.append(preloadLink);
  }
}

export {
  optimizeImageForLCP
};