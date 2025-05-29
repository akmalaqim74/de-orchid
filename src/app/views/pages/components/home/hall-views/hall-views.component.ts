import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Import the BusinessInfo interface from ContactUs component
import { BusinessInfo } from './../../../share-form-modal/contact-us/contact-us.component';

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
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(5px)' }))
      ])
    ]),
    trigger('hallTransition', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(0.98) translateY(10px)' }),
        animate('400ms 50ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(60, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HallViewsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  selectedHall: string = '';
  currentHallIndex = 0;
  isImageLoading = false;
  touchStartX = 0;
  touchEndX = 0;
  visibleFeaturesCount = 3;

  // Contact Modal Properties
  showContactModal = false;
  contactBusinessInfo: BusinessInfo | null = null;

  halls: Hall[] = [
    {
      id: 'm3',
      name: 'M3 Hall',
      description: 'Modern venue with traditional touch - perfect for grand celebrations and corporate events.',
      features: [
        'Capacity: Up to 500 guests',
        'Modern sound system',
        'LED lighting',
        'Air conditioning',
        'VIP parking area',
        'Customizable layout',
        'Professional catering kitchen',
        'Bridal room access'
      ],
      startingPrice: 5000,
      capacity: 500,
      photos: [
        { thumbnailUrl: 'assets/m3Mall(1).jpg', title: 'Main hall view' },
        { thumbnailUrl: 'assets/m3Mall.jpg', title: 'Reception setup' },
        { thumbnailUrl: 'assets/m3Mall(2).jpg', title: 'Stage area' },
        { thumbnailUrl: 'assets/m3Mall(3).jpg', title: 'Evening ambiance' },
        { thumbnailUrl: 'assets/gsHall.jpg', title: 'Alternative layout' }
      ]
    },
    {
      id: 'akasia',
      name: 'Akasia Hall',
      description: 'Elegant setting for intimate gatherings with beautiful garden views and modern amenities.',
      features: [
        'Capacity: Up to 300 guests',
        'Garden view windows',
        'Natural lighting',
        'Bridal suite included',
        'Premium audio system',
        'Climate controlled',
        'Intimate seating arrangements',
        'Photography-friendly spaces'
      ],
      startingPrice: 3500,
      capacity: 300,
      photos: [
        { thumbnailUrl: 'assets/m3Mall(1).jpg', title: 'Garden view setup' },
        { thumbnailUrl: 'assets/m3Mall.jpg', title: 'Intimate arrangement' },
        { thumbnailUrl: 'assets/m3Mall(2).jpg', title: 'Natural lighting' },
        { thumbnailUrl: 'assets/m3Mall(3).jpg', title: 'Evening reception' },
        { thumbnailUrl: 'assets/gsHall.jpg', title: 'Bridal suite view' }
      ]
    },
    {
      id: 'gombakSetia',
      name: 'Gombak Setia Hall',
      description: 'Modern venue with traditional touch featuring flexible layouts and premium facilities.',
      features: [
        'Capacity: Up to 400 guests',
        'Traditional décor elements',
        'Modern facilities',
        'Customizable layout options',
        'VIP parking area',
        'Professional lighting',
        'Cultural event friendly',
        'Premium service included'
      ],
      startingPrice: 5000,
      capacity: 400,
      photos: [
        { thumbnailUrl: 'assets/gsHall.jpg', title: 'Main hall interior' },
        { thumbnailUrl: 'assets/gsHall(4).jpg', title: 'Traditional setup' },
        { thumbnailUrl: 'assets/gsHall(3).jpg', title: 'Cultural arrangement' },
        { thumbnailUrl: 'assets/gsHall(2).jpg', title: 'Modern amenities' },
        { thumbnailUrl: 'assets/gsHall(1).jpg', title: 'Evening event' }
      ]
    }
  ];

  isAutoSlideEnabled = true;
  autoSlideInterval: any;
  readonly AUTOSLIDE_DELAY = 6000;
  
  private imageCache = new Set<string>();

  constructor() {}

  ngOnInit(): void {
    if (this.halls.length > 0) {
      this.selectedHall = this.halls[0].id;
    }
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Contact Modal Methods
  openContactModal(hall?: Hall): void {
    // Set hall-specific contact info if needed
    if (hall) {
      this.contactBusinessInfo = this.getContactInfoForHall(hall);
    }
    this.showContactModal = true;
  }

  onCloseContactModal(): void {
    this.showContactModal = false;
    this.contactBusinessInfo = null;
  }

  // Get contact information specific to the hall
  getContactInfoForHall(hall: Hall): BusinessInfo {
    return {
      businessID: `hall-${hall.id}`,
      name: 'Dewan Orchid Gombak',
      imageURL: 'assets/logo/De-Orchid-logo.png',
    phone: '+60142155380',
      website: 'https://elegantevents.com',
      email: 'info@elegantevents.com',
      address: '123 Jalan Setia, Gombak Setia, 53100 Kuala Lumpur',
      description: `Hubungi Kami ${hall.name} - ${hall.description}`,
      socialMedia: {
         facebook: 'https://www.facebook.com/deorchidgombak/',
      instagram: 'https://www.instagram.com/deorchid_gombak/?hl=en',
      twitter: 'https://twitter.com/elegantevents',
      linkedin: 'https://linkedin.com/company/elegantevents'
      }
    };
  }

  // Updated action methods to open contact modal
  onBookNow(hall: Hall): void {
    if (!hall) return;
    console.log('Opening contact modal for booking:', hall.name);
    this.openContactModal(hall);
  }

  onViewDetails(hall: Hall): void {
    if (!hall) return;
    console.log('Opening contact modal for details:', hall.name);
    this.openContactModal(hall);
  }

  // Existing methods remain the same...
  imageLoaded(): void {
    this.isImageLoading = false;
    const currentImageUrl = this.getCurrentImageUrl();
    if (currentImageUrl) {
      this.imageCache.add(currentImageUrl);
    }
  }

  imageError(): void {
    this.isImageLoading = false;
    console.error(`Image failed to load for hall: ${this.currentHall?.name}, index: ${this.currentHallIndex}`);
  }

  get currentHall(): Hall | null {
    return this.halls.find(hall => hall.id === this.selectedHall) || null;
  }

  get currentHallPhotos(): Photo[] {
    return this.currentHall?.photos || [];
  }

  selectHall(hallId: string): void {
    if (this.selectedHall !== hallId) {
      const previousHall = this.selectedHall;
      this.selectedHall = hallId;
      this.currentHallIndex = 0;
      
      const newImageUrl = this.getCurrentImageUrl();
      if (newImageUrl && !this.imageCache.has(newImageUrl)) {
        this.isImageLoading = true;
      }
      
      this.restartAutoSlide();
    }
  }

  changeImageSlide(newIndex: number): void {
    if (this.currentHallPhotos.length === 0) return;
    
    let targetIndex = newIndex;
    if (targetIndex < 0) {
      targetIndex = this.currentHallPhotos.length - 1;
    } else if (targetIndex >= this.currentHallPhotos.length) {
      targetIndex = 0;
    }
    
    if (this.currentHallIndex === targetIndex) return;
    
    this.currentHallIndex = targetIndex;
    const imageUrl = this.getCurrentImageUrl();
    if (imageUrl && !this.imageCache.has(imageUrl)) {
      this.isImageLoading = true;
    }
    
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
    if (index >= 0 && index < this.currentHallPhotos.length) {
      this.changeImageSlide(index);
    }
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
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

  onTouchStart(event: TouchEvent): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.touchStartX = event.changedTouches[0].screenX;
    this.stopAutoSlide();
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.currentHallPhotos.length <= 1) return;
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
    this.startAutoSlide();
  }

  handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextHallPhoto();
      } else {
        this.prevHallPhoto();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const target = event.target as Element;
    if (!target || !target.closest('.hall-views-container')) {
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
    }
    
    if (handled) {
      event.preventDefault();
      this.restartAutoSlide();
    }
  }

  openFeaturesModal(hall: Hall): void {
    if (!hall || !hall.features) return;
    console.log('Opening features modal for:', hall.name);
    alert(`Features for ${hall.name}:\n\n${hall.features.join('\n')}`);
  }

  getFormattedPrice(price: number): string {
    if (!price || price < 0) return 'Contact us';
    
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  getCurrentImageUrl(): string {
    if (!this.currentHallPhotos || this.currentHallPhotos.length === 0 || this.currentHallIndex < 0) {
      return 'assets/images/placeholder-hall-image.png';
    }
    
    const photo = this.currentHallPhotos[this.currentHallIndex];
    return photo?.thumbnailUrl || 'assets/images/placeholder-hall-image.png';
  }

  getCurrentImageAlt(): string {
    if (!this.currentHallPhotos || this.currentHallPhotos.length === 0) {
      return 'Hall image';
    }
    
    const photo = this.currentHallPhotos[this.currentHallIndex];
    const hallName = this.currentHall?.name || 'Hall';
    return photo?.title ? `${hallName} - ${photo.title}` : `${hallName} photo`;
  }

  getVisibleFeatures(): string[] {
    if (!this.currentHall?.features) return [];
    return this.currentHall.features.slice(0, this.visibleFeaturesCount);
  }

  hasMoreFeatures(): boolean {
    if (!this.currentHall?.features) return false;
    return this.currentHall.features.length > this.visibleFeaturesCount;
  }

  trackByHallId(index: number, hall: Hall): string { 
    return hall.id; 
  }
  
  trackByPhotoUrl(index: number, photo: Photo): string { 
    return photo.thumbnailUrl; 
  }
  
  trackByIndex(index: number, item: any): number { 
    return index; 
  }
}