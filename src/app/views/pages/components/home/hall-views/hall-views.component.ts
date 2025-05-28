import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'; // Added OnDestroy
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
// Import Subject for ngOnDestroy pattern
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Hall {
  id: string;
  name: string;
  description: string;
  features: string[];
  startingPrice: number;
  capacity: number;
  photos: Photo[];
}
interface Photo {
  thumbnailUrl: string;
  title?: string;
}


@Component({
  selector: 'app-hall-views',
  templateUrl: './hall-views.component.html',
  styleUrls: ['./hall-views.component.scss'],
  animations: [
    trigger('fadeAnimation', [ // Used for tab active indicator, nav buttons
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(5px)' }))
      ])
    ]),
    trigger('hallTransition', [ // Main card transition
      transition('* => *', [ // Trigger on any state change of the bound property
        style({ opacity: 0, transform: 'scale(0.98) translateY(10px)' }),
        animate('500ms 100ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ]),
    // 'slideAnimation' is not explicitly used in the new HTML, can be removed or repurposed
    trigger('staggerAnimation', [ // For features list
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(80, [ // Slightly faster stagger
            animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HallViewsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // For unsubscribing

  selectedHall: string = 'm3';
  currentHallIndex = 0;
  isImageLoading = true; // Set to true initially
  touchStartX = 0;
  touchEndX = 0;
  visibleFeaturesCount = 3; // Number of features to show initially

  halls: Hall[] = [
    {
      id: 'm3',
      name: 'M3 Hall',
      description: 'Modern venue with traditional touch Modern venue with traditional touch',
      features: [
        'Capacity: Up to 400 guests',
        'Customizable layout',
        'VIP parking area'
      ],
      startingPrice: 5000,
      capacity: 500,
      photos: [
        { thumbnailUrl: 'assets/m3Mall(1).jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall.jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall(2).jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall(3).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall.jpg', title: '' }
      ]
    },
    {
      id: 'akasia',
      name: 'Akasia Hall',
      description: 'Elegant setting for intimate gatherings',
      features: [
        'Capacity: Up to 300 guests',
        'Garden view',
        'Bridal suite included'
      ],
      startingPrice: 3500,
      capacity: 300,
      photos: [
        { thumbnailUrl: 'assets/m3Mall(1).jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall.jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall(2).jpg', title: '' },
        { thumbnailUrl: 'assets/m3Mall(3).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall.jpg', title: '' }
      ]
    },
    {
      id: 'gombakSetia',
      name: 'Gombak Setia Hall',
      description: 'Modern venue with traditional touch',
      features: [
        'Capacity: Up to 400 guests',
        'Customizable layout',
        'VIP parking area'
      ],
      startingPrice: 5000,
      capacity: 400,
      photos: [
        { thumbnailUrl: 'assets/gsHall.jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(4).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(3).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(2).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(1).jpg', title: '' }
      ]
    }
  ];
  // Ensure descriptions and features are well-written for the new layout

  isAutoSlideEnabled = true; // Consider making this a user preference
  autoSlideInterval: any;
  readonly AUTOSLIDE_DELAY = 6000; // Autoplay interval in ms

  constructor() {
     // It's better to initialize selectedHall based on actual data in ngOnInit
  }

  ngOnInit(): void {
    if (this.halls.length > 0) {
      this.selectedHall = this.halls[0].id; // Default to first hall
      this.loadImage(); // Load initial image
    }
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadImage(): void {
    this.isImageLoading = true;
    // The [src] binding in template handles the actual image loading.
    // isImageLoading will be set to false by (load) or (error) event on img tag.
  }

  imageLoaded(): void {
    this.isImageLoading = false;
    // No need for checkImageHeight if we are not doing the double-image trick
  }

  imageError(): void {
    this.isImageLoading = false;
    console.error(`Image failed to load for hall: ${this.currentHall?.name}, index: ${this.currentHallIndex}`);
    // Optionally, set a placeholder or specific error state for the image
    if (this.currentHallPhotos[this.currentHallIndex]) {
      this.currentHallPhotos[this.currentHallIndex].thumbnailUrl = 'assets/images/placeholder-hall-error.png'; // Fallback image
    }
  }


  get currentHall(): Hall {
    return this.halls.find(hall => hall.id === this.selectedHall) || this.halls[0] || {} as Hall;
  }

  get currentHallPhotos(): Photo[] {
    return this.currentHall?.photos || [];
  }

  selectHall(hallId: string): void {
    if (this.selectedHall !== hallId) {
      this.selectedHall = hallId;
      this.currentHallIndex = 0;
      this.loadImage();
      this.restartAutoSlide();
    }
  }

  changeImageSlide(newIndex: number): void {
    if (this.currentHallIndex === newIndex || this.currentHallPhotos.length === 0) return;
    
    this.currentHallIndex = (newIndex + this.currentHallPhotos.length) % this.currentHallPhotos.length; // Loop
    this.loadImage();
    this.restartAutoSlide();
  }

  prevHallPhoto(): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.changeImageSlide(this.currentHallIndex - 1);
  }

  nextHallPhoto(): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.changeImageSlide(this.currentHallIndex + 1);
  }

  goToHallSlide(index: number): void {
    this.changeImageSlide(index);
  }

  // Auto-slide functionality
  startAutoSlide(): void {
    this.stopAutoSlide(); // Clear any existing interval
    if (this.isAutoSlideEnabled && this.currentHallPhotos.length > 1) {
      this.autoSlideInterval = setInterval(() => {
        this.nextHallPhoto();
      }, this.AUTOSLIDE_DELAY);
    }
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Touch/Swipe functionality
  onTouchStart(event: TouchEvent): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.touchStartX = event.changedTouches[0].screenX;
    this.stopAutoSlide(); // Pause autoplay on touch
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
    this.startAutoSlide(); // Resume autoplay after swipe
  }

  handleSwipe(): void {
    const swipeThreshold = 50; // Minimum pixels for a swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) { // Swiped left
        this.nextHallPhoto();
      } else { // Swiped right
        this.prevHallPhoto();
      }
    }
  }

  // Keyboard navigation for accessibility
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Only handle if the carousel or its children have focus, to avoid global conflicts
    // This check is simplified; a more robust solution might involve checking event.target
    if (!document.activeElement || !document.activeElement.closest('.hall-views-container')) {
      return;
    }
    
    let handled = false;
    switch (event.key) {
      case 'ArrowLeft':
        this.prevHallPhoto();
        handled = true;
        break;
      case 'ArrowRight':
        this.nextHallPhoto();
        handled = true;
        break;
      // Add more keyboard controls if desired (e.g., for dots, tabs)
    }
    if (handled) {
      event.preventDefault(); // Prevent page scroll
      this.restartAutoSlide(); // Restart timer on manual navigation
    }
  }

  onBookNow(hall: Hall): void {
    console.log('Booking hall:', hall.name);
    // Implement booking modal or navigation
  }

  onViewDetails(hall: Hall): void {
    console.log('Viewing details for hall:', hall.name);
    // Implement details modal or navigation
  }

  openFeaturesModal(hall: Hall): void {
    console.log('Opening features modal for:', hall.name);
    // This is where you would trigger your modal service
    // Example: this.modalService.open(FeaturesModalComponent, { data: hall.features });
    alert(`Imagine a modal displaying all features for ${hall.name}:\n\n${hall.features.join('\n')}`);
  }

  getFormattedPrice(price: number): string {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  // TrackBy functions
  trackByHallId(index: number, hall: Hall): string { return hall.id; }
  trackByPhotoUrl(index: number, photo: Photo): string { return photo.thumbnailUrl + index; } // Add index for safety if URLs aren't unique
  trackByIndex(index: number, item: any): number { return index; }
}