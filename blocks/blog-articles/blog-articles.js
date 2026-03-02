import { createOptimizedPicture } from '../../scripts/aem.js';
import { optimizeImageForLCP } from '../../scripts/utils.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  const currentSection = block.closest('.section');
  const firstSectionOnPage = document.querySelector('main > .section:first-of-type');
  const isFirstSection = currentSection && (currentSection === firstSectionOnPage);

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    li.className = 'blog-article-card';

    const cols = [...row.children];

    // --- FIELD 1: IMAGE ---
    const imageDiv = document.createElement('div');
    imageDiv.className = 'blog-articles-image';

    if (cols[0] && cols[0].querySelector('picture')) {
      const img = cols[0].querySelector('img');
      const isEager = isFirstSection && index < 2;
      const optimizedPic = createOptimizedPicture(img.src, img.alt || "article image", isEager, [{ width: '750' }]);

      if (index === 0 && isFirstSection) {
        optimizeImageForLCP(optimizedPic);
      }

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