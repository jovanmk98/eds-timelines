
export default async function decorate(block) {
    console.log("Timeline " + block);
  // 1) mark it as "timeline block" so EDS knows about it (if not already)
  block.classList.add('timeline', 'block');

  // 2) locate the wrapper (your DOCX gives you .default-content-wrapper)
  const wrapper = block.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // 3) extract the H1
  const heading = wrapper.querySelector('h1');
  if (!heading) return;

  // 4) build the <ol>
  const ol = document.createElement('ol');
  wrapper.querySelectorAll('h2').forEach(h2 => {
    const date = h2.textContent.trim();
    const p    = h2.nextElementSibling;
    if (!p || p.tagName !== 'P') return;
    const desc = p.textContent.trim();

    const li = document.createElement('li');
    li.innerHTML = `
      <p class="event-date">${date}</p>
      <p class="event-description">${desc}</p>
    `;
    ol.append(li);
  });

  // 5) clear out the old and insert our new timeline
  wrapper.innerHTML = '';
  wrapper.append(heading, ol);
}
