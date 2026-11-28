import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/scripts/search-dropdown.ts', import.meta.url), 'utf8');
const script = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup() {
  class Node {}
  class Element extends Node {}
  class HTMLElement extends Element {}
  class KeyboardEvent {
    constructor(type, options) {
      this.type = type;
      this.key = options.key;
    }
  }

  const listeners = new Map();
  const windowListeners = new Map();
  const on = (map, type, callback) => map.set(type, callback);
  const properties = new Map();
  const container = new HTMLElement();
  container.style = { setProperty: (name, value) => properties.set(name, value) };
  const searchbox = new HTMLElement();
  const input = new HTMLElement();
  let open = false;
  input.closest = () => searchbox;
  input.getBoundingClientRect = () => ({ bottom: 300 });
  input.dispatchEvent = (event) => {
    if (event.key === 'Escape') open = false;
  };
  searchbox.closest = () => container;
  searchbox.contains = (target) => target === input;
  searchbox.querySelector = (selector) =>
    selector.includes('aria-expanded') && !open ? null : input;

  let observer;
  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      observer = this;
    }
    observe() {}
    disconnect() {}
  }

  const document = {
    addEventListener: (type, callback) => on(listeners, type, callback),
    querySelector: () => searchbox,
  };
  const viewport = { offsetTop: 0, height: 640, addEventListener() {} };
  const window = {
    visualViewport: viewport,
    addEventListener: (type, callback) => on(windowListeners, type, callback),
  };
  vm.runInNewContext(script, { document, window, Node, Element, HTMLElement, KeyboardEvent, MutationObserver });
  listeners.get('astro:page-load')();

  return {
    input,
    viewport,
    properties,
    open: () => {
      open = true;
      observer.callback();
    },
    isOpen: () => open,
    inputEvent: () => listeners.get('input')({ target: input }),
    keydown: (key) => listeners.get('keydown')({ target: input, key, isComposing: false }),
    outsideClick: () => listeners.get('click')({ target: new Node() }),
    scroll: () => windowListeners.get('scroll')(),
    resize: () => windowListeners.get('resize')(),
  };
}

test('dismisses pending suggestions on page scroll or outside click until a new interaction', () => {
  for (const dismiss of ['scroll', 'outsideClick']) {
    const ui = setup();
    ui.inputEvent();
    ui.open();
    ui[dismiss]();
    assert.equal(ui.isOpen(), false);
    ui.open();
    assert.equal(ui.isOpen(), false, 'a delayed Pagefind response must not reopen the dropdown');
    ui.inputEvent();
    ui.open();
    assert.equal(ui.isOpen(), true);
    ui.keydown('Escape');
    ui.open();
    assert.equal(ui.isOpen(), false);
    ui.keydown('ArrowDown');
    ui.open();
    assert.equal(ui.isOpen(), true);
  }
});

test('limits suggestions to the visible viewport and updates on resize', () => {
  const ui = setup();
  assert.equal(ui.properties.get('--aw-search-available-height'), '332px');
  ui.viewport.height = 400;
  ui.resize();
  assert.equal(ui.properties.get('--aw-search-available-height'), '92px');
  ui.viewport.height = 250;
  ui.resize();
  assert.equal(ui.properties.get('--aw-search-available-height'), '0px');
});
