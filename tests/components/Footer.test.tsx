import Footer from "@/components/shared/Footer";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Footer", () => {
	it("renders the logo and title", () => {
		render(<Footer />);
		expect(screen.getByText("DocSpace")).toBeInTheDocument();
	});

	it("renders the description text", () => {
		render(<Footer />);
		expect(
			screen.getByText("Create, collaborate, and share documents like never before.")
		).toBeInTheDocument();
	});

	it("renders the copyright", () => {
		render(<Footer />);
		expect(screen.getByText(/© 2025 DocSpace/i)).toBeInTheDocument();
	});

	it("renders the FileText icon", () => {
		render(<Footer />);
		// Icon is an SVG with role="img"
		const icons = screen.getAllByRole("img");
		expect(icons.length).toBeGreaterThan(0);
	});
});
