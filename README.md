# ModernKeyMapper

KeyboardMapper is a Vanilla JavaScript class that provides a simple way to map keyboard combinations to specific actions or callbacks in your web application. It allows you to define custom key mappings and handle key events based on different scopes or contexts.

## Features

- Map keyboard combinations to specific actions or callbacks.
- Define different scopes to handle key events in different contexts or sections of your application.
- Support for modifier keys such as Ctrl, Shift, Alt, and Meta.
- Ignore key events when certain input elements (e.g., input, select, textarea) are focused.
- Easy-to-use API for mapping combinations and setting scopes.
- Compatible with modern web browsers.

## Usage

### Installation

To use the KeyboardMapper class in your project, include the `keymaster.js` script in your HTML file:

```html
<script src="path/to/keymap.js"></script>
```

### Example

Here's a basic example of using the KeyboardMapper class:

```javascript
// Create an instance of KeyboardMapper
const keyboardMapper = new KeyboardMapper();

// Map a combination to a callback function
keyboardMapper.mapCombination("ctrl+a", () => {
  console.log("Ctrl+A pressed");
});

// Map a combination to another callback function in a different scope
keyboardMapper.mapCombination(
  "ctrl+c",
  () => {
    console.log("Ctrl+C");
  },
  "scope1"
);

// Change the active scope
keyboardMapper.setScope("scope1");

// Now pressing Ctrl+C will trigger the callback in the "scope1" scope

// Unmap a combination
keyboardMapper.unmapCombination("ctrl+a");
```

### API

#### `mapCombination(combination, callback, scope = "default")`

Maps a keyboard combination to a callback function in the specified scope.

- `combination` (string): The keyboard combination to map. Use the following format: `"key1+key2+..."`. Keys can include modifiers like `ctrl`, `shift`, `alt`, and `meta`. For example, `"ctrl+a"`, `"shift+enter"`.
- `callback` (function): The callback function to be executed when the combination is pressed.
- `scope` (string, optional): The scope or context in which the combination should be active. Defaults to `"default"`.

#### `unmapCombination(combination)`

Unmaps a previously mapped keyboard combination.

- `combination` (string): The keyboard combination to unmap.

#### `setScope(scope)`

Changes the active scope for handling key events.

- `scope` (string): The new scope to set.

#### `destroy()`

Cleans up the event listeners and destroys the KeyboardMapper instance.

# TODO

- Update to accept multiple combinations for one function.
- Update to add a catch all method
- Add Android and Apple support for Camera,Fingerprint,etc
- Add Sequencing


IE:

````javascript
$s.loadClass('core/keymap').mapCombination("ctrl+a", () => {
console.log("Ctrl+A pressed");
}).setScope("scope1").mapCombination("shift+enter", () => {
console.log("Shift+Enter pressed");
}).loadClass('scope1');
```javascript

## Limitations

- The KeyboardMapper class is designed for handling key events in a web browser environment and may not work with non-browser JavaScript environments.
- Certain keyboard combinations or key events may be reserved by the browser and cannot be mapped or captured.
- The KeyboardMapper class is provided as a basic implementation and may not cover all use cases or advanced features. Customizations or modifications may be required based on specific requirements.

## License

This project is licensed under the MIT License.
````
