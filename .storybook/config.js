
import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'github',
  url: 'https://github.com/kazuaki-p/typescript-sample',
  goFullScreen: false, 
  showStoriesPanel: true, 
  showAddonPanel: false, 
  showSearchBox: false, 
  addonPanelInRight: false
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);