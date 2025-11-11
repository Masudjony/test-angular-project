import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { UserOptionComponent } from './user-option/user-option.component';
// import { CalenderFilterComponent } from '../calender-filter/calender-filter.component';
// import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './top-header.html',
  styleUrl: './top-header.css',
})
export class TopHeader {
  isCalendarOpen = false;
  isUserOptionOpen: boolean = false;
  userImage: string = 'UserImage.png';

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // constructor(
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   private houseService: HouseService
  // ) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const storedImage = localStorage.getItem('userImage');
  //     if (storedImage) this.userImage = storedImage;
  //   }
  // }

  // ---------- CALENDAR MODAL ----------
  openCalendarModal() {
    this.isCalendarOpen = true;
  }

  closeCalendarModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.isCalendarOpen = false;
    }
  }

  closeByIcon() {
    this.isCalendarOpen = false;
  }

  onMonthSelected(event: { month: number, year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.isCalendarOpen = false;

    // Notify renter list & other components
    // this.houseService.setSelectedDate(event.month, event.year);
  }


  // ---------- USER IMAGE ----------
  handlePhotoUpdate(newPhoto: string) {
    this.userImage = newPhoto;
    // if (isPlatformBrowser(this.platformId)) {
    //   localStorage.setItem('userImage', newPhoto);
    // }
  }
}
