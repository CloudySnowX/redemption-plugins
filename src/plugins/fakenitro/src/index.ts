import { registerPlugin } from "@vendetta/plugins";
import { registerSettings } from "@vendetta/settings";
import Settings from "./components/Settings";
import { patches } from "./patches";

let settingsUnregister: () => void;

const FakeNitro = {
  onLoad: () => {
    // Register settings
    settingsUnregister = registerSettings("FakeNitro", Settings);
    
    // Apply patches
    patches.forEach(patch => {
      const unpatch = patch.apply();
      if (typeof unpatch === "function") {
        patch.remove = unpatch;
      }
    });
  },
  onUnload: () => {
    // Unregister settings
    settingsUnregister?.();
    
    // Remove patches
    patches.forEach(patch => {
      if (typeof patch.remove === "function") {
        patch.remove();
      }
    });
  },
  settings: Settings
};

export default registerPlugin(FakeNitro);
