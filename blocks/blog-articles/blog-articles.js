import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {

  const ul = document.createElement('ul');

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    li.className = 'blog-article-card';

    const cols = [...row.children];

    // --- FIELD 1 - Image ---
    const imageDiv = document.createElement('div');
    imageDiv.className = 'blog-articles-image';

    if (cols[0] && cols[0].querySelector('picture')) {
      const img = cols[0].querySelector('img');
      // Only first 2 images are eager loaded, the rest are lazy loaded
      const isEager = index < 2;
      const optimizedPic = createOptimizedPicture(img.src, img.alt, isEager, [{ width: '750' }]);
      imageDiv.append(optimizedPic);
    }

    // --- TEXT CONTAINER ---
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'blog-articles-body';

    // --- FIELD 2: TITLE ---
    if (cols[1]) {
      const title = document.createElement('h3');
      title.className = 'blog-articles-title';
      title.innerHTML = cols[1].innerHTML;
      bodyDiv.append(title);
    }

    // --- FIELD 3: DESCRIPTION ---
    if (cols[2]) {
      const desc = document.createElement('p');
      desc.className = 'blog-articles-desc';
      desc.innerHTML = cols[2].innerHTML;
      bodyDiv.append(desc);
    }

    // --- FIELD 4: LINK ---
    if (cols[3]) {
      const linkWrapper = document.createElement('div');
      linkWrapper.className = 'blog-articles-link-wrapper';

      const link = cols[3].querySelector('a');
      if (link) {
        link.className = 'blog-articles-link';
        linkWrapper.append(link);
      }
      bodyDiv.append(linkWrapper);
    }

    li.append(imageDiv, bodyDiv);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}