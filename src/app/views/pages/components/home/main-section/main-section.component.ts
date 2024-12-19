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
  config = {
    IMAGE: {
      MIN_WIDTH: 80,
      MAX_WIDTH: 100,
      HEIGHT: 120
    },
    SPACING: {
      COLUMN_OFFSET: 17,  // Percentage for horizontal spacing
      ROW_OFFSET: 100    // Pixels for vertical spacing
    }
  }
  
  weddingPhotos: Photo[] = [
    { thumbnailUrl: 'assets/wedding-photos/image.jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/images.jpg', title: '' },
    { thumbnailUrl: 'assets/wedding-photos/image(1).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(3).jpg', title: '' },
    { thumbnailUrl: 'assets/wedding-photos/image(4).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(5).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(6).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(7).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(8).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(9).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(10).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(11).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(12).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(13).jpg', title: 'Wedding De Orchid' },
    { thumbnailUrl: 'assets/wedding-photos/image(14).jpg', title: 'Wedding De Orchid' }
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

  openImageModal(currentImagePath:String): void {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
    this.imagePath= currentImagePath // Prevent background scrolling
  }
  closeImageModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
  getPhotoStyle(index: number) {
    const column = index % 5.5;
    const row = Math.floor(index / 4);
    
    return {
      'left': `${column * this.config.SPACING.COLUMN_OFFSET}%`,
      'top': `${row * this.config.SPACING.ROW_OFFSET}px`,
      'width': `${this.getRandomSize()}px`,
      'height': `${this.config.IMAGE.HEIGHT}px`,
      'z-index': index
    };
  }

  getRandomSize(): number {
    return Math.floor(
      Math.random() * 
      (this.config.IMAGE.MAX_WIDTH - this.config.IMAGE.MIN_WIDTH) + 
      this.config.IMAGE.MIN_WIDTH
    );
  }

}
