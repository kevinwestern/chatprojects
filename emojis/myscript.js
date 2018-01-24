const handleEmojis = (emojis) => {
  for (let emojiEl of emojis) {
    emojiEl.classList = 'emoji';
    emojiDisplayEl.appendChild(emojiEl);
    window.requestAnimationFrame(() => emojiEl.classList.add('started'));
    setTimeout(() => emojiDisplayEl.removeChild(emojiEl), 2000);
  }
};

const messageListChanged = (mutationsList) => {
  for (let mutation of mutationsList) {
    for (el of (mutation.addedNodes || [])) {
      const messageEl = el.querySelector('#content #message');
      if (!messageEl) {
        return;
      }
      const emojis = messageEl.querySelectorAll('img');
      if (emojis) {
        const clones = Array.prototype.map.call(emojis, (emojiEl) => emojiEl.cloneNode());
        handleEmojis(clones);
      }
    }
  }
};

const addEmojiDisplay = (displayEl) => {
  displayEl.style.height = '100vh';
  displayEl.style.width = '32px';
  displayEl.style.position = 'absolute';
  displayEl.style.left = '0';
  document.body.appendChild(displayEl);
};

const setup = (app, emojiDisplayEl) => {
  // Listen to child list changes.
  const mutationObserverConfig = {
    childList: true,
  };
  const observer = new MutationObserver(messageListChanged);
  const target = document.querySelector('yt-live-chat-item-list-renderer #items');
  observer.observe(target, mutationObserverConfig);
  app.style.display = 'none';
  addEmojiDisplay(emojiDisplayEl);
};


const app = document.querySelector('yt-live-chat-app');
const emojiDisplayEl = document.createElement('div');
if (app) {
  setup(app, emojiDisplayEl);
}