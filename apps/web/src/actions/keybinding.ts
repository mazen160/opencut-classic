import type { TActionWithOptionalArgs } from "./types";

/**
 * Alt is also regarded as macOS OPTION (⌥) key
 * Ctrl is also regarded as macOS COMMAND (⌘) key (NOTE: this differs from HTML Keyboard spec where COMMAND is Meta key!)
 */
export type ModifierKeys =
	| "ctrl"
	| "alt"
	| "shift"
	| "ctrl+shift"
	| "alt+shift"
	| "ctrl+alt"
	| "ctrl+alt+shift";

const KEYS = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
	"k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
	"u", "v", "w", "x", "y", "z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"up", "down", "left", "right",
	"/", "?", ".",
	"enter", "tab", "space", "escape", "esc",
	"backspace", "delete", "home", "end",
] as const;

export type Key = (typeof KEYS)[number];

const KEY_SET: ReadonlySet<string> = new Set(KEYS);

export function isKey(value: string): value is Key {
	return KEY_SET.has(value);
}

/**
 * Type guard that checks whether a string is a valid {@link ShortcutKey}.
 * It validates both single-character shortcuts (e.g. "a") and modifier‑based
 * shortcuts (e.g. "ctrl+z").
 */
export function isShortcutKey(value: string): value is ShortcutKey {
	// Split on the first '+' to separate possible modifiers from the base key.
	const parts = value.split("+");
	if (parts.length === 1) {
		// No modifiers – must be a plain key.
		return isKey(parts[0]);
	}
	// With modifiers the last part must be a key and the preceding part(s)
	// must form a valid ModifierKeys string.
	const keyPart = parts.pop()!;
	const modifierPart = parts.join("+");
	return isKey(keyPart) && (
		modifierPart === "ctrl" ||
		modifierPart === "alt" ||
		modifierPart === "shift" ||
		modifierPart === "ctrl+shift" ||
		modifierPart === "alt+shift" ||
		modifierPart === "ctrl+alt" ||
		modifierPart === "ctrl+alt+shift"
	);
}

export type ModifierBasedShortcutKey = `${ModifierKeys}+${Key}`;
// Singular keybindings (these will be disabled when an input-ish area has been focused)
export type SingleCharacterShortcutKey = `${Key}`;

export type ShortcutKey = ModifierBasedShortcutKey | SingleCharacterShortcutKey;

export type KeybindingConfig = {
	[key in ShortcutKey]?: TActionWithOptionalArgs;
};
