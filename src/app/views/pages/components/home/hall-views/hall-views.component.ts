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
        { thumbnailUrl: 'assets/gsHall.jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(4).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(3).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(2).jpg', title: '' },
        { thumbnailUrl: 'assets/gsHall(1).jpg', title: '' }
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

  

}
