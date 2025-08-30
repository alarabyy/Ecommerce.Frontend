import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.currentTheme = (localStorage.getItem('theme') as Theme) || 'auto';
  }

  initializeTheme() {
    this.applyTheme(this.currentTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        this.applyAutoTheme();
      }
    });
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme) {
    if (theme === 'auto') {
      this.applyAutoTheme();
    } else {
      this.renderer.setAttribute(document.body, 'data-theme', theme);
    }
  }

  private applyAutoTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.renderer.setAttribute(document.body, 'data-theme', prefersDark ? 'dark' : 'light');
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }
}
