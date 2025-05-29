import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { BusinessInfo } from '../../../share-form-modal/contact-us/contact-us.component';

interface Photo {
  thumbnailUrl: string;
  title: string;
}

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{ direction }})', opacity: 0 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('hallTransition', [
      transition(':enter', [
        style({ 
          transform: 'translateY(30px) scale(0.8)', 
          opacity: 0
        }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
          transform: 'translateY(0) scale(1)', 
          opacity: 1
        }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MainSectionComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  currentMobileIndex = 0;
  backgroundImage = 'assets/pelaminpengantin.jpg';
  showModal = false;
  imagePath: string = '';
  isLoading = false;
  showContactModal = false;
  contactBusinessInfo: BusinessInfo | null = null;
  
  // Touch gesture properties
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;
  private minSwipeDistance = 50;
  
  // Enhanced configuration with optimized mobile settings
  config = {
    DESKTOP: {
      MIN_WIDTH: 85,
      MAX_WIDTH: 120,
      HEIGHT: 130,
      COLUMN_OFFSET: 16,
      ROW_OFFSET: 110,
      PHOTOS_DISPLAYED: 12
    },
    TABLET: {
      MIN_WIDTH: 70,
      MAX_WIDTH: 95,
      HEIGHT: 105,
      COLUMN_OFFSET: 18,
      ROW_OFFSET: 90,
      PHOTOS_DISPLAYED: 10
    },
    MOBILE: {
      MIN_WIDTH: 65,
      MAX_WIDTH: 85,
      HEIGHT: 85,
      COLUMN_OFFSET: 22,
      ROW_OFFSET: 75,
      PHOTOS_DISPLAYED: 8
    }
  };
  
  weddingPhotos: Photo[] = [
    { thumbnailUrl: 'assets/wedding-photos/image.jpg', title: 'Majlis Akad Nikah' },
    { thumbnailUrl: 'assets/wedding-photos/images.jpg', title: 'Majlis Resepsi Malam' },
    { thumbnailUrl: 'assets/wedding-photos/image(1).jpg', title: 'Dewan Utama' },
    { thumbnailUrl: 'assets/wedding-photos/image(3).jpg', title: 'Pelamin Pengantin' },
    { thumbnailUrl: 'assets/wedding-photos/image(4).jpg', title: 'Sesi Fotografi' },
    { thumbnailUrl: 'assets/wedding-photos/image(5).jpg', title: 'Hiasan Meja VIP' },
    { thumbnailUrl: 'assets/wedding-photos/image(6).jpg', title: 'Majlis Keluarga' },
    { thumbnailUrl: 'assets/wedding-photos/image(7).jpg', title: 'Bunga Rampai' },
    { thumbnailUrl: 'assets/wedding-photos/image(8).jpg', title: 'Sanding Pengantin' },
    { thumbnailUrl: 'assets/wedding-photos/image(9).jpg', title: 'Jamuan Makan' },
    { thumbnailUrl: 'assets/wedding-photos/image(10).jpg', title: 'Deko Entrance' },
    { thumbnailUrl: 'assets/wedding-photos/image(11).jpg', title: 'Live Band Performance' },
    { thumbnailUrl: 'assets/wedding-photos/image(12).jpg', title: 'Majlis Malam' },
    { thumbnailUrl: 'assets/wedding-photos/image(13).jpg', title: 'Traditional Setup' },
    { thumbnailUrl: 'assets/wedding-photos/image(14).jpg', title: 'Garden Wedding' }
  ];

  // Screen size detection with enhanced breakpoints
  screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  
  // Computed property for displayed photos based on screen size
  get displayedPhotos(): Photo[] {
    const config = this.config[this.screenSize.toUpperCase() as keyof typeof this.config];
    return this.weddingPhotos.slice(0, config.PHOTOS_DISPLAYED);
  }
  
  ngOnInit() {
    this.checkScreenSize();
    this.preloadImages();
    this.setupTouchListeners();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    this.removeTouchListeners();
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.showModal) {
      this.closeImageModal();
    }
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    if (this.showModal) {
      this.prevModalImage();
      event.preventDefault();
    }
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    if (this.showModal) {
      this.nextModalImage();
      event.preventDefault();
    }
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    const previousSize = this.screenSize;
    
    if (width < 640) {
      this.screenSize = 'mobile';
    } else if (width < 1024) {
      this.screenSize = 'tablet';
    } else {
      this.screenSize = 'desktop';
    }
    
    // Reset indices if screen size changed
    if (previousSize !== this.screenSize) {
      this.currentIndex = 0;
      this.currentMobileIndex = 0;
    }
  }

  private preloadImages() {
    // Preload images based on screen size
    const config = this.config[this.screenSize.toUpperCase() as keyof typeof this.config];
    const imagesToPreload = Math.min(config.PHOTOS_DISPLAYED, 8);
    
    this.weddingPhotos.slice(0, imagesToPreload).forEach(photo => {
      const img = new Image();
      img.src = photo.thumbnailUrl;
    });
  }

  // Auto-slide functionality for mobile carousel
  private autoSlideInterval: any;

  private startAutoSlide() {
    if (this.screenSize === 'mobile') {
      this.autoSlideInterval = setInterval(() => {
        this.nextMobilePhoto();
      }, 4000); // Change slide every 4 seconds
    }
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  // Touch gesture handling
  private setupTouchListeners() {
    if (this.screenSize === 'mobile') {
      document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }
  }

  private removeTouchListeners() {
    document.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  private handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
    this.stopAutoSlide(); // Stop auto-slide on user interaction
  }

  private handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleGesture();
    
    // Restart auto-slide after user interaction
    setTimeout(() => {
      this.startAutoSlide();
    }, 5000);
  }

  private handleGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    
    // Check if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - previous photo
        this.prevMobilePhoto();
      } else {
        // Swipe left - next photo
        this.nextMobilePhoto();
      }
    }
  }

  // Enhanced mobile navigation methods
  nextMobilePhoto() {
    if (this.currentMobileIndex < this.weddingPhotos.length - 1) {
      this.currentMobileIndex++;
    } else {
      this.currentMobileIndex = 0; // Loop back to start
    }
  }

  prevMobilePhoto() {
    if (this.currentMobileIndex > 0) {
      this.currentMobileIndex--;
    } else {
      this.currentMobileIndex = this.weddingPhotos.length - 1; // Loop to end
    }
  }

  setMobileIndex(index: number) {
    if (index >= 0 && index < this.weddingPhotos.length) {
      this.currentMobileIndex = index;
      this.stopAutoSlide();
      
      // Restart auto-slide after manual selection
      setTimeout(() => {
        this.startAutoSlide();
      }, 5000);
    }
  }

  // Enhanced desktop/tablet navigation
  prevPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextPhoto() {
    if (this.currentIndex < this.weddingPhotos.length - 1) {
      this.currentIndex++;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Enhanced modal functionality
  openImageModal(currentImagePath: string): void {
    this.isLoading = true;
    this.imagePath = currentImagePath;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
    
    // Stop auto-slide when modal is open
    this.stopAutoSlide();
    
    // Simulate loading for better UX
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  closeImageModal(): void {
    this.showModal = false;
    this.isLoading = false;
    document.body.style.overflow = 'auto';
    
    // Restart auto-slide when modal is closed
    setTimeout(() => {
      this.startAutoSlide();
    }, 1000);
    
    // Clear image path after animation
    setTimeout(() => {
      this.imagePath = '';
    }, 300);
  }

  // Enhanced photo positioning with better mobile responsiveness
  getPhotoStyle(index: number) {
    const config = this.config[this.screenSize.toUpperCase() as keyof typeof this.config];
    
    // Adaptive column count based on screen size
    let columns: number;
    switch (this.screenSize) {
      case 'mobile':
        columns = 3.2;
        break;
      case 'tablet':
        columns = 4.2;
        break;
      default:
        columns = 5.2;
    }
    
    const column = index % columns;
    const row = Math.floor(index / (columns - 0.2));
    
    // Reduced randomness for mobile, increased for desktop
    const randomMultiplier = this.screenSize === 'mobile' ? 8 : (this.screenSize === 'tablet' ? 12 : 18);
    const randomOffsetX = (Math.random() - 0.5) * randomMultiplier;
    const randomOffsetY = (Math.random() - 0.5) * (randomMultiplier * 1.5);
    
    // Rotation limits based on screen size
    const rotationLimit = this.screenSize === 'mobile' ? 4 : (this.screenSize === 'tablet' ? 6 : 8);
    
    return {
      'left': `${(column * config.COLUMN_OFFSET) + randomOffsetX}%`,
      'top': `${(row * config.ROW_OFFSET) + randomOffsetY}px`,
      'width': `${this.getRandomSize()}px`,
      'height': `${config.HEIGHT}px`,
      'z-index': index + 10,
      'transform': `rotate(${(Math.random() - 0.5) * rotationLimit}deg)`,
      'animation-delay': `${index * 80}ms`
    };
  }

  getRandomSize(): number {
    const config = this.config[this.screenSize.toUpperCase() as keyof typeof this.config];
    return Math.floor(
      Math.random() * (config.MAX_WIDTH - config.MIN_WIDTH) + config.MIN_WIDTH
    );
  }

  // Enhanced navigation method
  navigateToGallery(): void {
    console.log('Navigating to full gallery...');
    
    // Implementation options:
    // 1. Router navigation (uncomment if you have routing)
    // this.router.navigate(['/gallery']);
    
    // 2. Open full gallery modal
    // this.showFullGalleryModal();
    
    // 3. External link
    // window.open('/gallery', '_blank');
    
    // 4. Scroll to gallery section
    // this.scrollToGallerySection();
    
    // For demo purposes - show alert with options
    const message = `Pilihan navigasi galeri:\n\n` +
                   `1. Halaman galeri penuh\n` +
                   `2. Modal galeri diperluas\n` +
                   `3. Link eksternal\n` +
                   `4. Bagian galeri di halaman ini\n\n` +
                   `Pilih implementasi yang sesuai dengan arsitektur aplikasi Anda.`;
    
    if (confirm(message)) {
      // Implement your preferred navigation here
      this.showFullGalleryModal();
    }
  }

  // Enhanced button methods
  getStarted(): void {
    this.openContactModal();
  }

  openContactModal(): void {
    this.contactBusinessInfo = this.getBusinessInfo();
    this.showContactModal = true;
    this.stopAutoSlide(); // Stop auto-slide when contact modal is open
  }

  closeContactModal(): void {
    this.showContactModal = false;
    this.contactBusinessInfo = null;
    
    // Restart auto-slide when contact modal is closed
    setTimeout(() => {
      this.startAutoSlide();
    }, 1000);
  }

  getBusinessInfo(): BusinessInfo {
    return {
      businessID: 'deorchid-wedding-001',
      name: "De'Orchid Wedding Services",
      phone: '+60142155380',
      email: 'info@deorchidwedding.com',
      website: 'https://deorchidwedding.com',
      address: '123 Jalan Setia, Gombak Setia, 53100 Kuala Lumpur',
      description: 'Perkhidmatan perkahwinan lengkap untuk menjadikan majlis impian anda kenyataan. Hubungi kami untuk konsultasi percuma!',
      socialMedia: {
        facebook: 'https://www.facebook.com/deorchidgombak/',
        instagram: 'https://www.instagram.com/deorchid_gombak/?hl=en',
        twitter: 'https://twitter.com/elegantevents',
        linkedin: 'https://linkedin.com/company/elegantevents'
      }
    };
  }

  learnMore(): void {
    console.log('Learn more clicked - Show more information');
    
    // Enhanced learn more with multiple options
    const options = [
      '📋 Pakej Perkahwinan',
      '🎨 Portfolio Lengkap', 
      '💰 Harga & Promosi',
      '📞 Konsultasi Percuma',
      '⭐ Testimoni Pelanggan'
    ];
    
    const message = `Pilih maklumat yang ingin anda ketahui:\n\n${options.join('\n')}`;
    
    if (confirm(message)) {
      // You can implement different actions based on user selection
      // For now, we'll show the contact modal
      this.openContactModal();
    }
  }

  // Enhanced full gallery modal
  showFullGalleryModal(): void {
    console.log('Implementing full gallery modal...');
    
    // This would typically open a more comprehensive gallery component
    // For now, we'll create a simple implementation
    
    const galleryMessage = `Galeri Penuh - ${this.weddingPhotos.length} Foto\n\n` +
                          `Fitur yang akan tersedia:\n` +
                          `• Grid view dengan semua foto\n` +
                          `• Kategori (Akad, Resepsi, etc.)\n` +
                          `• Filter dan pencarian\n` +
                          `• Download gambar\n` +
                          `• Share ke media sosial\n` +
                          `• Slideshow otomatis`;
    
    alert(galleryMessage);
    
    // You can implement actual full gallery modal here
    // Example: this.fullGalleryService.open(this.weddingPhotos);
  }

  // Get current photo info for modal
  getCurrentPhotoInfo(): Photo | null {
    const currentPhoto = this.weddingPhotos.find(photo => photo.thumbnailUrl === this.imagePath);
    return currentPhoto || null;
  }

  // Enhanced modal navigation with smooth transitions
  nextModalImage(): void {
    const currentPhotoIndex = this.weddingPhotos.findIndex(photo => photo.thumbnailUrl === this.imagePath);
    if (currentPhotoIndex < this.weddingPhotos.length - 1) {
      this.imagePath = this.weddingPhotos[currentPhotoIndex + 1].thumbnailUrl;
    } else {
      // Loop to first image
      this.imagePath = this.weddingPhotos[0].thumbnailUrl;
    }
  }

  prevModalImage(): void {
    const currentPhotoIndex = this.weddingPhotos.findIndex(photo => photo.thumbnailUrl === this.imagePath);
    if (currentPhotoIndex > 0) {
      this.imagePath = this.weddingPhotos[currentPhotoIndex - 1].thumbnailUrl;
    } else {
      // Loop to last image
      this.imagePath = this.weddingPhotos[this.weddingPhotos.length - 1].thumbnailUrl;
    }
  }

  // Enhanced utility methods
  get isMobile(): boolean {
    return this.screenSize === 'mobile';
  }

  get isTablet(): boolean {
    return this.screenSize === 'tablet';
  }

  get isDesktop(): boolean {
    return this.screenSize === 'desktop';
  }

  // Performance optimization methods
  trackByPhoto(index: number, photo: Photo): string {
    return photo.thumbnailUrl;
  }

  // Lazy loading for better performance
  onImageLoad(event: any) {
    event.target.classList.add('loaded');
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-image.jpg'; // Fallback image
  }

  // Accessibility improvements
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.showModal) {
      switch (event.key) {
        case 'ArrowLeft':
          this.prevModalImage();
          event.preventDefault();
          break;
        case 'ArrowRight':
          this.nextModalImage();
          event.preventDefault();
          break;
        case 'Escape':
          this.closeImageModal();
          event.preventDefault();
          break;
      }
    }
  }

  // Screen orientation handling
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    setTimeout(() => {
      this.checkScreenSize();
    }, 100);
  }

  // Network status handling for better mobile experience
  @HostListener('window:online', ['$event'])
  onOnline(event: any) {
    console.log('Back online - resuming image loading');
    this.preloadImages();
  }

  @HostListener('window:offline', ['$event'])
  onOffline(event: any) {
    console.log('Gone offline - optimizing for low connectivity');
    this.stopAutoSlide();
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}