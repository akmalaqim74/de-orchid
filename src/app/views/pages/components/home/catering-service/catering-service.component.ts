import { Component, OnInit } from '@angular/core';
import { consultingServicesData } from './sevice-data';

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
  styleUrls: ['./catering-service.component.scss']
})
export class CateringServiceComponent implements OnInit {
  backgroundImage = 'assets/background-flower-image.jpg';
  title = 'Consulting Services';
  currentServiceIndex = 0;
  currentPersonIndex = 0;
  consultingServicesData?: ConsultingServicesDataStructure;

  ngOnInit() {
    this.consultingServicesData = consultingServicesData;
    console.log('Initial Data:', this.consultingServicesData);
  }

  get currentService(): ServiceData | null {
    return this.consultingServicesData?.consultingServicesData[this.currentServiceIndex] || null;
  }

  get currentPerson(): PersonData | null {
    if (!this.currentService) return null;
    return this.currentService.person[this.currentPersonIndex] || null;
  }

  get currentItems(): ServiceItem[] {
    return this.currentPerson?.items || [];
  }

  prevService() {
    if (!this.consultingServicesData?.consultingServicesData) return;
    
    this.currentServiceIndex = (this.currentServiceIndex - 1 + this.consultingServicesData.consultingServicesData.length) % this.consultingServicesData.consultingServicesData.length;
    this.currentPersonIndex = 0; // Reset person index when changing service
    console.log('Prev Service Index:', this.currentServiceIndex);
  }
  
  nextService() {
    if (!this.consultingServicesData?.consultingServicesData) return;
    
    this.currentServiceIndex = (this.currentServiceIndex + 1) % this.consultingServicesData.consultingServicesData.length;
    this.currentPersonIndex = 0; // Reset person index when changing service
    console.log('Next Service Index:', this.currentServiceIndex);
    console.log('Current Service:', this.currentService);
  }
  
  prevPerson() {
    if (!this.currentService?.person) return;
    
    this.currentPersonIndex = (this.currentPersonIndex - 1 + this.currentService.person.length) % this.currentService.person.length;
  }
  
  nextPerson() {
    if (!this.currentService?.person) return;
    
    this.currentPersonIndex = (this.currentPersonIndex + 1) % this.currentService.person.length;
  }
}