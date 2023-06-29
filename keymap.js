class KeyboardMapper {
  constructor() {
    this.keyMappings = new Map();
    this.activeKeys = new Set();
    this.ignoreInputs = ["INPUT", "SELECT", "TEXTAREA"];
    this.scope = "default";
  }

  mapCombination(combinations, callback, scope = "default") {
    if (typeof combinations !== "string" || typeof callback !== "function") {
      console.error("Invalid combination or callback");
      return;
    }

    const combinationList = combinations
      .split(",")
      .map((c) => c.trim().toLowerCase());

    combinationList.forEach((combination) => {
      if (!this.keyMappings.has(combination)) {
        this.keyMappings.set(combination, []);
      }

      const mappings = this.keyMappings.get(combination);
      mappings.push({ callback, scope });
    });

    document.addEventListener("keydown", (event) => {
      this.handleKeyUp.bind(this);
    });
    document.addEventListener("keydown", (event) => {
      const pressedKey = this.getKeyFromEvent(event).toLowerCase();
      const activeScope = this.getScope();

      combinationList.forEach((combination) => {
        const mappings = this.keyMappings.get(combination);
        if (!mappings) return;

        mappings.forEach((mapping) => {
          if (
            (mapping.scope === activeScope || mapping.scope === "default") &&
            pressedKey === combination
          ) {
            event.preventDefault();
            mapping.callback(event);
          }
        });
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
