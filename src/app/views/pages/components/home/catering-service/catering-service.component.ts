import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations'; // Import animations
import { consultingServicesData } from './sevice-data'; // Make sure path is correct

// (Keep your interfaces as they are)
interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface PersonData {
  name: string;
  image?: string;
  description: string;
  items: ServiceItem[];
}

interface ServiceData {
  title: string;
  person: PersonData[];
}

interface ConsultingServicesDataStructure {
  consultingServicesData: ServiceData[];
}


@Component({
  selector: 'app-catering-service',
  templateUrl: './catering-service.component.html',
  styleUrls: ['./catering-service.component.scss'],
  animations: [ // Add animations here
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
    // Optional: Stagger animation for list items if needed
    // trigger('listAnimation', [
    //   transition('* <=> *', [ // each time the binding value changes
    //     query(':enter', [
    //       style({ opacity: 0, transform: 'translateY(-20px)' }),
    //       stagger('100ms', [
    //         animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    //       ])
    //     ], { optional: true })
    //   ])
    // ])
  ]
})
export class CateringServiceComponent implements OnInit {
  // backgroundImage = 'assets/background-flower-image.jpg'; // Can use this in CSS for body
  title = 'Consulting Services'; // This is now a general section title
  currentServiceIndex = 0;
  currentPersonIndex = 0; // Keep this if a service can have multiple persons to cycle through
  consultingServicesData?: ConsultingServicesDataStructure;
  isLoading = false; // For disabling buttons during transition

  ngOnInit() {
    this.consultingServicesData = consultingServicesData;
    console.log('Initial Data:', this.consultingServicesData);
    // Initialize currentItems to trigger animation on load
    this._updateCurrentData();
  }

  get currentService(): ServiceData | null {
    return this.consultingServicesData?.consultingServicesData[this.currentServiceIndex] || null;
  }

  get currentPerson(): PersonData | null {
    if (!this.currentService) return null;
    // Assuming one person per service for now based on data.
    // If multiple people, this logic would use currentPersonIndex.
    return this.currentService.person[this.currentPersonIndex] || this.currentService.person[0] || null;
  }

  // To trigger animation, we need to re-assign the array
  _currentItems: ServiceItem[] = [];
  get currentItems(): ServiceItem[] {
    return this._currentItems;
  }

  get itemsPerColumn(): number {
    const totalItems = this.currentPerson?.items?.length || 0;
    return Math.ceil(totalItems / 2); // Distribute items between two columns
  }


  private _updateCurrentData() {
    this.isLoading = true;
    // Use a short timeout to allow fade-out animation before data changes
    setTimeout(() => {
      this._currentItems = this.currentPerson?.items ? [...this.currentPerson.items] : [];
      this.isLoading = false;
    }, 150); // Adjust timing if needed, should be less than fade animation
  }

  selectService(index: number) {
    if (this.currentServiceIndex === index || this.isLoading) return;
    this.currentServiceIndex = index;
    this.currentPersonIndex = 0; // Reset person index if you have multiple persons per service
    this._updateCurrentData();
  }

  prevService() {
    if (this.isLoading || !this.consultingServicesData?.consultingServicesData) return;
    const numServices = this.consultingServicesData.consultingServicesData.length;
    this.currentServiceIndex = (this.currentServiceIndex - 1 + numServices) % numServices;
    this.currentPersonIndex = 0;
    this._updateCurrentData();
  }

  nextService() {
    if (this.isLoading || !this.consultingServicesData?.consultingServicesData) return;
    const numServices = this.consultingServicesData.consultingServicesData.length;
    this.currentServiceIndex = (this.currentServiceIndex + 1) % numServices;
    this.currentPersonIndex = 0;
    this._updateCurrentData();
  }

  // Keep these if you plan to have multiple "persons" per service
  // prevPerson() {
  //   if (this.isLoading || !this.currentService?.person) return;
  //   const numPersons = this.currentService.person.length;
  //   this.currentPersonIndex = (this.currentPersonIndex - 1 + numPersons) % numPersons;
  //   this._updateCurrentData();
  // }

  // nextPerson() {
  //   if (this.isLoading || !this.currentService?.person) return;
  //   const numPersons = this.currentService.person.length;
  //   this.currentPersonIndex = (this.currentPersonIndex + 1) % numPersons;
  //   this._updateCurrentData();
  // }
}