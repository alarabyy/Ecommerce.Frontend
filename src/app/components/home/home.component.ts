import { Component, OnInit, AfterViewInit, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// CORRECTED IMPORT
import { NgParticlesModule } from 'ng-particles';
import { IParticlesProps } from 'ng-particles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';


@Component({
  selector: 'app-home',
  standalone: true,
  // CORRECTED MODULE NAME
  imports: [CommonModule, NgParticlesModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Particle configuration (remains the same)
  particlesOptions: IParticlesProps = {
    background: {
      color: {
        value: 'transparent'
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      color: {
        value: '#26b9a8'
      },
      links: {
        color: '#26b9a8',
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce'
        },
        random: false,
        speed: 2,
        straight: false
      },
      number: {
        density: {
          enable: true,
        },
        value: 80
      },
      opacity: {
        value: 0.3
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: { min: 1, max: 5 }
      }
    },
    detectRetina: true
  };

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
    }
  }

  // Particle engine initialization (remains the same)
  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }

  private initIntersectionObserver(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    const elementsToAnimate = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el: Element) => observer.observe(el));
  }
}
