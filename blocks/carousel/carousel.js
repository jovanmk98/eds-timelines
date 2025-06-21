export default function decorate(block) {
  block.classList.add('slider');
  console.log('decorate carousel', block);

  if (!block.id) {
    block.id = 'slider-' + Math.random().toString(36).substr(2, 8);
  }
  const scope = `#${block.id}`;

  const slides = Array.from(block.querySelectorAll(':scope > div'));
  if (slides.length === 0) return;

  block.innerHTML = '';

  slides.forEach((_, i) => {
    const nav = document.createElement('input');
    nav.type = 'radio';
    nav.name = 'slider';
    nav.className = 'slider__nav';
    nav.title = `slide${i + 1}`;
    if (i === 0) nav.checked = true;
    block.appendChild(nav);
  });

  const style = document.createElement('style');
  const totalPct = slides.length * 100;
  let css = `
${scope} .slider__inner {
  width: ${totalPct}%;
}
`;
  slides.forEach((_, i) => {
    css += `
${scope} .slider__nav:checked:nth-of-type(${i + 1}) ~ .slider__inner {
  left: -${100 * i}%;
}
`;
  });
  style.textContent = css;
  document.head.appendChild(style);

  const track = document.createElement('div');
  track.className = 'slider__inner';

  slides.forEach(slide => {
    const titleEl = slide.querySelector('h1');
    const bodyEl = slide.querySelector('p:not(.button-container)');
    const picEl = slide.querySelector('picture') || slide.querySelector('img');
    const linkEl = slide.querySelector('a');

    const slug = titleEl && titleEl.id
      ? titleEl.id
      : (titleEl
        ? titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '-')
        : '');

    const contents = document.createElement('div');
    contents.className = 'slider__contents';

    if (picEl) {
      const imgWrap = picEl.cloneNode(true);
      imgWrap.classList.add('slider__image');
    }

    const caption = document.createElement('h2');
    caption.className = 'slider__caption';
    caption.textContent = titleEl
      ? titleEl.textContent.trim()
      : slug;
    contents.appendChild(caption);

    const txt = document.createElement('p');
    txt.className = 'slider__txt';
    txt.textContent = bodyEl
      ? bodyEl.textContent.trim()
      : '';
    contents.appendChild(txt);

    if (linkEl) {
      linkEl.className = 'slider__link';
      contents.appendChild(linkEl);
    }

    track.appendChild(contents);
  });

  block.appendChild(track);
}
