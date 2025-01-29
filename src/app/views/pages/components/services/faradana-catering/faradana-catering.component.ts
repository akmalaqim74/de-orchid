import { Component } from '@angular/core';
import {menuItems} from './faradana-food';
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-faradana-catering',
  templateUrl: './faradana-catering.component.html',
  styleUrls: ['./faradana-catering.component.scss']
})
export class FaradanaCateringComponent {
  selectedCategory: string = 'All Menu';
    
    categories: string[] = [
      'All Menu'
    ];
  
    menuItems: MenuItem[] = [
    ]; 
  
    constructor() {}
  
    ngOnInit(): void {
      this.menuItems = menuItems;
      this.categories.push(...this.getCategories());
      
    
    }
  
    filterByCategory(category: string): MenuItem[] {
      if (category === 'All Menu') {
        return this.menuItems;
      }
      return this.menuItems.filter(item => item.category === category);
    }
    getCategories(): string[] {
      const categoriesSet = new Set(this.menuItems.map(item => item.category));
      
      return Array.from(categoriesSet);
    }

}
