
export default async function decorate(block) {
    console.log("Timeline 123 ", block);
  // 1) mark it as "timeline block" so EDS knows about it (if not already)
  block.classList.add('timeline', 'block');
}
