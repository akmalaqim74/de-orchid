import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

// Business info interface for contact modal
interface BusinessInfo {
  businessID: string;
  name: string;
  imageURL?: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  address?: string;
  email?: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    // Mobile menu animation
    trigger('mobileMenu', [
      state('closed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: 1
      })),
      transition('closed => open', animate('300ms ease-out')),
      transition('open => closed', animate('250ms ease-in'))
    ]),
    
    // Dropdown animation
    trigger('dropdown', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.95)'
        }),
        animate('200ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({
          opacity: 0,
          transform: 'translateY(-5px) scale(0.98)'
        }))
      ])
    ]),
    
    // Logo animation
    trigger('logoHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hovered', animate('200ms ease-out'))
    ]),
    
    // Navigation link hover
    trigger('linkHover', [
      transition(':enter', [
        style({ transform: 'translateY(2px)', opacity: 0.8 }),
        animate('150ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  // Navigation states
  isMenuOpen = false;
  isDropdownOpen = false;
  isMobileDropdownOpen = false;
  isServicesDropdownOpen = false;
  
  // Contact modal states
  showContactModal = false;
  contactBusinessInfo: BusinessInfo | null = null;
  
  // Logo hover state
  logoHoverState = 'normal';
  
  ngOnInit() {
    // Component initialization
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close dropdowns when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeAllDropdowns();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      this.isMenuOpen = false;
    }
  }

  private checkScrollPosition() {
    // Removed scroll detection
  }

  // Menu toggle methods
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.closeAllDropdowns();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.closeAllDropdowns();
  }

  // Dropdown methods
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.isServicesDropdownOpen = false;
    }
  }

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 150);
  }
    onCloseContactModal(): void {
    this.showContactModal = false;
    this.contactBusinessInfo = null;
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    if (this.isServicesDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  showServicesDropdown() {
    this.isServicesDropdownOpen = true;
  }

  hideServicesDropdown() {
    setTimeout(() => {
      this.isServicesDropdownOpen = false;
    }, 150);
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  closeAllDropdowns() {
    this.isDropdownOpen = false;
    this.isServicesDropdownOpen = false;
    this.isMobileDropdownOpen = false;
  }

  // Contact modal methods
  openContactModal(): void {
    this.contactBusinessInfo = this.getBusinessInfo();
    this.showContactModal = true;
    this.closeMenu();
  }

  closeContactModal(): void {
    this.showContactModal = false;
    this.contactBusinessInfo = null;
  }

  private getBusinessInfo(): BusinessInfo {
    return {
      businessID: 'deorchid-wedding-001',
      name: "De'Orchid Wedding Services",
      imageURL: 'assets/logo/De-Orchid-logo.png',
      phone: '+60123456789',
      website: 'https://deorchidwedding.com',
      email: 'info@deorchidwedding.com',
      address: '123 Jalan Setia, Gombak Setia, 53100 Kuala Lumpur, Malaysia',
      description: 'Perkhidmatan perkahwinan lengkap untuk menjadikan majlis impian anda kenyataan. Hubungi kami untuk konsultasi percuma!',
      socialMedia: {
        facebook: 'https://facebook.com/deorchidwedding',
        instagram: 'https://instagram.com/deorchidwedding',
        twitter: 'https://twitter.com/deorchidwedding'
      }
    };
  }

  // Navigation methods
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.closeMenu();
  }

  navigateToSection(section: string) {
    // Handle navigation to different sections
    console.log(`Navigating to ${section}`);
    this.closeMenu();
  }

  // Logo hover methods
  onLogoHover() {
    this.logoHoverState = 'hovered';
  }

  onLogoLeave() {
    this.logoHoverState = 'normal';
  }

  // Utility methods
  getMenuState() {
    return this.isMenuOpen ? 'open' : 'closed';
  }

  hasContactOptions(): boolean {
    return !!(
      this.contactBusinessInfo?.phone ||
      this.contactBusinessInfo?.email ||
      this.contactBusinessInfo?.socialMedia?.facebook ||
      this.contactBusinessInfo?.socialMedia?.instagram
    );
  }

  hasAddress(): boolean {
    return !!(this.contactBusinessInfo?.address);
  }

  getBusinessName(): string {
    return this.contactBusinessInfo?.name || 'Business';
  }

  getBusinessImage(): string {
    return this.contactBusinessInfo?.imageURL || 'assets/images/default-business.png';
  }

  // Contact modal event handlers
  onBackgroundClick(event: Event): void {
    this.closeContactModal();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  // Contact methods for modal
  callPhone(phoneNumber: string): void {
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/\s+/g, '');
      window.open(`tel:${cleanPhone}`, '_self');
    }
  }

  openWhatsApp(phoneNumber: string): void {
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/^\+/, '');
      const message = encodeURIComponent('Hi! I\'m interested in your wedding services. Could you provide more information?');
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }
  }

  sendEmail(email: string): void {
    if (email) {
      const subject = encodeURIComponent('Wedding Services Inquiry');
      const body = encodeURIComponent('Dear De\'Orchid Team,\n\nI am interested in learning more about your wedding services. Please provide me with more information about availability, pricing, and packages.\n\nThank you!');
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
    }
  }

  openInstagram(instagramUrl: string): void {
    if (instagramUrl) {
      window.open(instagramUrl, '_blank');
    }
  }

  openFacebook(facebookUrl: string): void {
    if (facebookUrl) {
      window.open(facebookUrl, '_blank');
    }
  }

  openGoogleMaps(address: string): void {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  }
}