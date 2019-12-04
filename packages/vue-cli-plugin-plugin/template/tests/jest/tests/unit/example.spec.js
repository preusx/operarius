import { createLocalVue } from '@vue/test-utils';
import Plugin from '@/index';

it('Installs silently', () => {
  const localVue = createLocalVue();

  expect(() => localVue.use(Plugin)).not.toThrow();
});
