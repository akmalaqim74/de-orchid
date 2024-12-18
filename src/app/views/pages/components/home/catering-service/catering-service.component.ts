import { Component } from '@angular/core';

@Component({
  selector: 'app-catering-service',
  templateUrl: './catering-service.component.html',
  styleUrls: ['./catering-service.component.scss']
})
export class CateringServiceComponent {

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
