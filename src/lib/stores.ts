import { writable } from 'svelte/store';

export const sidebarCollapsed = writable(false);
export const sidebarOpen = writable(true);