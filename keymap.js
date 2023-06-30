class KeyboardMapper {
  constructor() {
    this.keyMappings = new Map();
    this.activeKeys = new Set();
    this.activeCodes = new Set();
    this.ignoreInputs = ["INPUT", "SELECT", "TEXTAREA"];
    this.scope = "default";

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  mapCombination(combination, callback, scope = "default") {
    if (typeof combination !== "string" || typeof callback !== "function") {
      console.error("Invalid combination or callback");
      return;
    }

    const combinationList = combination
      .split(",")
      .map((c) => c.trim().toLowerCase());

    combinationList.forEach((keyCombination) => {
      if (!this.keyMappings.has(keyCombination)) {
        this.keyMappings.set(keyCombination, []);
      }

      const mappings = this.keyMappings.get(keyCombination);
      mappings.push({ callback, scope });
    });
  }

  unmapCombination(combination) {
    const keyCombination = combination.toLowerCase();
    this.keyMappings.delete(keyCombination);
  }

  handleKeyDown(event) {
    if (this.ignoreInputs.includes(event.target.tagName)) return;

    const key = this.getKeyFromEvent(event);

    this.activeCodes.add(key["codes"][0]);
    this.activeKeys.add(key["result"][0]);

    this.executeCallbacks(event);
  }

  handleKeyUp(event) {
    const key = this.getKeyFromEvent(event);
    //if (this.ignoreInputs.includes(event.target.tagName)) return;

    this.activeKeys.clear();
    this.activeCodes.clear();
  }

  executeCallbacks(event) {
    const activeKeys = Array.from(this.activeKeys);
    const activeCodes = Array.from(this.activeCodes);
    const activeKeyCombination = activeKeys.join("+");
    const activeCodeCombination = activeCodes.join("+");

    this.keyMappings.forEach((mappings, combination) => {
      const combinationKeys = combination.split("+");
      if (
        (activeKeys.length === combinationKeys.length &&
          combinationKeys.every((key) => activeKeys.includes(key))) ||
        (activeCodes.length === combinationKeys.length &&
          combinationKeys.every((key) => activeCodes.includes(key)))
      ) {
        event.preventDefault(); // Prevent default browser behavior
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
    });
  }

  getKeyFromEvent(event) {
    const { code, key, shiftKey, ctrlKey, altKey, metaKey } = event;
    let result = [];
    let codes = [];

    if (key.toLowerCase() == "meta") {
      result.push("ctrl");
      codes.push(code.toLowerCase());
    } else if (key.toLowerCase() == "control") {
      result.push("ctrl");
      codes.push(code.toLowerCase());
    } else {
      codes.push(code.toLowerCase());
      result.push(key.toLowerCase());
    }

    let data = { codes: codes, result: result };

    return data;
  }

  getScope() {
    return this.scope;
  }

  setScope(scope) {
    this.scope = scope;
  }
}
