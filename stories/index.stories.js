import React from 'react';

import TemplateRedux from '../src/template-redux/index.tsx';
import TemplateMobx from '../src/template-mobx/index.tsx';

import { storiesOf } from '@storybook/react';

storiesOf('template', module)
  .add('redux', () => <TemplateRedux />)
  .add('mobx', () => <TemplateMobx />);