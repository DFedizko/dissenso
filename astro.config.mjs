// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	output: "static",

	vite: {
		plugins: [tailwindcss()],
	},

	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "IBM Plex Serif",
				cssVariable: "--font-ibm-plex-serif",
				weights: [400, 500, 600],
				styles: ["normal", "italic"]
			},
			{
				provider: fontProviders.google(),
				name: "IBM Plex Sans",
				cssVariable: "--font-ibm-plex-sans",
				weights: [400, 500, 600],
				styles: ["normal"]
			}
		]
	}
});
