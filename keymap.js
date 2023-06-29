class KeyboardMapper {
  constructor() {
    this.keyMappings = new Map();
    this.activeKeys = new Set();
    this.ignoreInputs = ["INPUT", "SELECT", "TEXTAREA"];
    this.scope = "default";
  }

  mapCombination(combination, callback, scope = "default") {
    if (typeof combination !== "string" || typeof callback !== "function") {
      console.error("Invalid combination or callback");
      return;
    }

    const keyCombination = combination.toLowerCase();
    if (!this.keyMappings.has(keyCombination)) {
      this.keyMappings.set(keyCombination, []);
    }

    const mappings = this.keyMappings.get(keyCombination);
    mappings.push({ callback, scope });

    // Attach event listener for keydown

    document.addEventListener("keydown", (event) => {
      this.handleKeyUp.bind(this);
    });
    document.addEventListener("keydown", (event) => {
      const pressedKey = this.getKeyFromEvent(event).toLowerCase();
      const activeScope = this.getScope();

      mappings.forEach((mapping) => {
        if (
          (mapping.scope === activeScope || mapping.scope == "default") &&
          pressedKey === keyCombination
        ) {
          event.preventDefault(); // Prevent default browser behavior
          mapping.callback(event);
        }
      });
    });
  }

  getScope() {
    return this.scope;
  }

  unmapCombination(combination) {
    const keyCombination = combination.toLowerCase();
    this.keyMappings.delete(keyCombination);
  }

  handleKeyDown(event) {
    if (this.ignoreInputs.includes(event.target.tagName)) return;

    const key = this.getKeyFromEvent(event);
    this.activeKeys.add(key);

    this.executeCallbacks();
  }

  handleKeyUp(event) {
    if (this.ignoreInputs.includes(event.target.tagName)) return;

    const key = this.getKeyFromEvent(event);
    this.activeKeys.delete(key);
  }

  executeCallbacks() {
    const activeCombination = Array.from(this.activeKeys).join("+");
    const mappings = this.keyMappings.get(activeCombination);

    if (mappings) {
      mappings.forEach((mapping) => {
        const { callback, scope } = mapping;
        if (typeof callback === "function") {
          const currentScope = this.getScope();
          if (currentScope === scope || scope === "default") {
            callback();
          }
        }
      });
    }
  }

  getKeyFromEvent(event) {
    const { key, shiftKey, ctrlKey, altKey, metaKey } = event;
    let result = "";

    if (ctrlKey || metaKey) result += "ctrl+";
    if (shiftKey) result += "shift+";
    if (altKey) result += "alt+";

    result += key.toLowerCase();

    return result;
  }

  setScope(scope) {
    this.scope = scope;
  }
}
