import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
  title: string;
}

@Component({
  selector: 'app-hall-views',
  templateUrl: './hall-views.component.html',
  styleUrls: ['./hall-views.component.scss'],
  animations: [
      trigger('fadeAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('300ms ease-out', style({ opacity: 0 }))
        ])
      ]),
      trigger('slideAnimation', [
        transition(':increment', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':decrement', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ])
      ]),
      trigger('hallTransition', [
        transition(':enter', [
          style({ transform: 'translateY(20px)', opacity: 0 }),
          animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
        ])
      ])
    ]
})
export class HallViewsComponent {
  selectedHall: string = 'm3';
  currentHallIndex = 0;

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
        { thumbnailUrl: 'assets/gsHall.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
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
        { thumbnailUrl: 'assets/cafe.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe5.jpg', title: '' }
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
        { thumbnailUrl: 'assets/cafe.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
        { thumbnailUrl: 'assets/cafe5.jpg', title: '' }
      ]
    }
  ];
  isImageHeightInsufficient = false;

  checkImageHeight(imageElement: HTMLImageElement): void {
    if (imageElement.offsetHeight < 350) {
      this.isImageHeightInsufficient = true;
    } else {
      this.isImageHeightInsufficient = false;
    }
  }

  get currentHall(): Hall {
    return this.halls.find(hall => hall.id === this.selectedHall) || this.halls[0];
  }

  get currentHallPhotos(): Photo[] {
    return this.currentHall.photos;
  }
  get hallPhotosLength(): number {
    return this.currentHall.photos.length;
  }

  selectHall(hallId: string): void {
    this.selectedHall = hallId;
    this.currentHallIndex = 0;
  }
  prevHallPhoto() {
    if (this.currentHallIndex > 0) {
      this.currentHallIndex--;
    }
  }

  nextHallPhoto() {
    if (this.currentHallIndex < this.currentHallPhotos.length - 1) {
      this.currentHallIndex++;
    }
  }
  goToHallSlide(index: number) {
    this.currentHallIndex = index;
  }

  onBookNow(hall: Hall) {
    // Handle booking logic here
    console.log('Booking hall:', hall);
  }

  onViewDetails(hall: Hall) {
    // Handle view details logic here
    console.log('Viewing details for hall:', hall);
  }
  consultingServices = [
    {
      icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      title: 'Friendly Customer Service',
      description: 'We build services for you from initial sketches to the final production.'
    },
    {
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Unique Ideas & Solutions',
      description: 'Experience in all the major geographies, meaning we understand all underlying drivers.'
    },
    {
      icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
      title: 'Targeting & Positioning',
      description: 'Generate new products with higher potential and lower risks of failure.'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
      title: 'Strengthen Operations',
      description: `But one size doesn't fit all. We understand that every business is different, that's why we.`
    }
  ];
  

}
