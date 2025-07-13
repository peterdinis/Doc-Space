import { renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "@/hooks/shared/useMobile";

const MOBILE_BREAKPOINT = 768;

function createMatchMedia(width: number): (query: string) => MediaQueryList {
	return (query: string) => ({
		matches: width < MOBILE_BREAKPOINT,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
	});
}

describe("useIsMobile", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should return true if screen width is less than 768px", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 500,
		});
		window.matchMedia = createMatchMedia(window.innerWidth);

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(true);
	});

	it("should return false if screen width is 768px or more", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});
		window.matchMedia = createMatchMedia(window.innerWidth);

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(false);
	});

	it("should update when screen size changes", () => {
		let currentWidth = 1024;
		Object.defineProperty(window, "innerWidth", {
			get: () => currentWidth,
			configurable: true,
		});

		let listener: ((e: MediaQueryListEvent) => void) | undefined;

		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: currentWidth < MOBILE_BREAKPOINT,
			media: query,
			addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
				listener = cb;
			},
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
		}));

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(false);

		currentWidth = 500;
		if (typeof listener === "function") {
			listener({} as MediaQueryListEvent);
		}

		expect(result.current).toBe(true);
	});
});
