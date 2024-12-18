import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
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
export class MainSectionComponent {
  currentIndex = 0;
  backgroundImage = 'assets/pelaminpengantin.jpg';
  showModal = false;
  imagePath:String = '';

  
  weddingPhotos: Photo[] = [
    { thumbnailUrl: 'assets/cafe.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe4.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe5.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe2.jpg', title: '' },
    { thumbnailUrl: 'assets/cafe3.jpg', title: '' },
  ];

  

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
  getPhotoStyle(index: number): { [key: string]: string } {
    // True random height between 41px and 60px
    const minHeight = 60;
    const maxHeight = 140;
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  
    return {
      height: `${randomHeight}px`,
      width: '80px'
    };
  }
  openImageModal(currentImagePath:String): void {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
    this.imagePath= currentImagePath // Prevent background scrolling
  }
  closeImageModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

}
