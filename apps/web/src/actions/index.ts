import type { TActionWithOptionalArgs } from "./types";

export * from "./definitions";
export * from "./types";
export * from "./registry";

/**
 * Type guard that checks whether a string is a valid {@link TActionWithOptionalArgs}.
 * It returns `true` when the value is a member of the `TActionWithOptionalArgs`
 * union type defined in `types.ts`.
 */
export function isActionWithOptionalArgs(
	value: string,
): value is TActionWithOptionalArgs {
	// The union is a set of literal string types, so we can safely check
	// membership via a Set created at runtime. This avoids needing a manual
	// list that could get out‑of‑sync.
	const allowed = new Set<string>([
		"add-media-asset",
		"add-media-assets",
		"add-scene",
		"add-scene-asset",
		"apply-effect",
		"apply-filter",
		"change-scene",
		"change-scene-view",
		"clear-selection",
		"copy",
		"cut",
		"delete-element",
		"delete-media-asset",
		"delete-scene",
		"duplicate-element",
		"duplicate-media-asset",
		"export-project",
		"import-project",
		"jump-backward",
		"jump-forward",
		"move-element",
		"move-scene",
		"paste",
		"redo",
		"remove-media-asset",
		"remove-media-assets",
		"rename-scene",
		"reset-project",
		"save-project",
		"select-all",
		"set-effect-params",
		"set-filter-params",
		"set-media-asset-metadata",
		"set-scene-metadata",
		"set-track-mute",
		"set-track-visibility",
		"set-viewport",
		"show-help",
		"toggle-mute",
		"undo",
		"zoom-in",
		"zoom-out",
		"seek-forward",
		"seek-backward",
	]);
	return allowed.has(value);
}

