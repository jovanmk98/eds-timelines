export default function decorate(block) {
  block.classList.add('slider');

  // 1) grab slides
  const slides = Array.from(block.querySelectorAll(':scope > div'));

  // 2) clear out
  block.innerHTML = '';

  // 3) build nav inputs
  slides.forEach((_, idx) => {
    const nav = document.createElement('input');
    nav.type = 'radio';
    nav.name = 'slider';
    nav.className = 'slider__nav';
    nav.title = `slide${idx + 1}`;
    if (idx === 0) nav.checked = true;
    block.appendChild(nav);
  });

  // 4) create track
  const track = document.createElement('div');
  track.className = 'slider__inner';

  // 5) rebuild slides
  slides.forEach(slide => {
    const titleEl = slide.querySelector('h1');
    const bodyEl  = slide.querySelector('p:not(.button-container)');
    const picEl   = slide.querySelector('picture') || slide.querySelector('img');

    // slug for fallback naming
    const slug = titleEl && titleEl.id
      ? titleEl.id
      : titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '-');

    // wrapper
    const contents = document.createElement('div');
    contents.className = 'slider__contents';

    // clone and inject image/picture
    if (picEl) {
      const imgWrap = picEl.cloneNode(true);
      // ensure top-level element has our class for styling
      imgWrap.classList.add('slider__image');
      contents.appendChild(imgWrap);
    }

    // caption
    const caption = document.createElement('h2');
    caption.className = 'slider__caption';
    caption.textContent = titleEl ? titleEl.textContent.trim() : slug;
    contents.appendChild(caption);

    // text
    const txt = document.createElement('p');
    txt.className = 'slider__txt';
    txt.textContent = bodyEl ? bodyEl.textContent.trim() : '';
    contents.appendChild(txt);

    track.appendChild(contents);
  });

  // 6) append track
  block.appendChild(track);
}
