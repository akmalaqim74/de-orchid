import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface BusinessInfo {
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
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  @Input() showContactModal: boolean = false;
  @Input() businessInfo: BusinessInfo | null = null;
  @Output() closeModal = new EventEmitter<void>();

  // Dummy data for hall service business
  defaultBusinessInfo: BusinessInfo = {
    businessID: 'hall-service-001',
    name: 'De-Orchid Gombak',
    imageURL: 'assets/logo/De-Orchid-logo.png',
    phone: '+60142155380',
    website: 'https://elegantevents.com',
    email: 'info@elegantevents.com',
    address: '123 Jalan Setia, Gombak Setia, 53100 Kuala Lumpur',
    description: 'Premium event halls for weddings, corporate events, and special celebrations.',
    socialMedia: {
      facebook: 'https://www.facebook.com/deorchidgombak/',
      instagram: 'https://www.instagram.com/deorchid_gombak/?hl=en',
      twitter: 'https://twitter.com/elegantevents',
      linkedin: 'https://linkedin.com/company/elegantevents'
    }
  };

  constructor() {}

  ngOnInit(): void {
    // Use provided business info or fall back to default
    if (!this.businessInfo) {
      this.businessInfo = this.defaultBusinessInfo;
    }
  }

  closeContactModal(): void {
    this.showContactModal = false;
    this.closeModal.emit();
  }

  // Contact method handlers
  callPhone(phoneNumber: string): void {
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/\s+/g, '');
      window.open(`tel:${cleanPhone}`, '_self');
    }
  }

  openWhatsApp(phoneNumber: string): void {
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/^\+/, '');
      const message = encodeURIComponent(`Hi! Saya berminat untuk dapatkan informasi lebih lanjut tentang layanan hall service di ${this.businessInfo?.name}. Apakah saya dapat membantu?`);
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }
  }

  openWebsite(website: string): void {
    if (website) {
      // Ensure URL has protocol
      const url = website.startsWith('http') ? website : `https://${website}`;
      window.open(url, '_blank');
    }
  }

  sendEmail(email: string): void {
    if (email) {
      const subject = encodeURIComponent('Inquiry about Event Hall Services');
      const body = encodeURIComponent('Dear Team,\n\nI am interested in learning more about your event hall services. Please provide me with more information about availability, pricing, and packages.\n\nThank you!');
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
    }
  }

  openFacebook(facebookUrl: string): void {
    if (facebookUrl) {
      window.open(facebookUrl, '_blank');
    }
  }

  openInstagram(instagramUrl: string): void {
    if (instagramUrl) {
      window.open(instagramUrl, '_blank');
    }
  }

  openTwitter(twitterUrl: string): void {
    if (twitterUrl) {
      window.open(twitterUrl, '_blank');
    }
  }

  openLinkedIn(linkedinUrl: string): void {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank');
    }
  }

  openGoogleMaps(address: string): void {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  }

  // Helper method to check if any contact options are available
  hasContactOptions(): boolean {
    if (!this.businessInfo) return false;
    
    return !!(
      this.businessInfo.phone ||
      this.businessInfo.website ||
      this.businessInfo.email ||
      this.businessInfo.socialMedia?.facebook ||
      this.businessInfo.socialMedia?.instagram ||
      this.businessInfo.socialMedia?.twitter ||
      this.businessInfo.socialMedia?.linkedin
    );
  }

  // Helper method to get business name for display
  getBusinessName(): string {
    return this.businessInfo?.name || 'Business';
  }

  // Helper method to get business image
  getBusinessImage(): string {
    return this.businessInfo?.imageURL || 'assets/images/default-business.png';
  }

  // Helper method to check if business has address
  hasAddress(): boolean {
    return !!(this.businessInfo?.address);
  }

  // Method to handle background click (close modal)
  onBackgroundClick(event: Event): void {
    this.closeContactModal();
  }

  // Method to prevent modal close when clicking inside modal content
  onModalClick(event: Event): void {
    event.stopPropagation();
  }
}