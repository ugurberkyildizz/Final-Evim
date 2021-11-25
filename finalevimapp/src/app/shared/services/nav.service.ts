import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { dynMenuItems } from './pozitifcube-http.service';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor( ) {
		
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
		
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}
	
	// Bir de nav type extTabLink var, yeni sekmede açıyor
	// { path: 'authentication/register/image', title: 'Register with Bg Image', type: 'extTabLink' },
	// MENUITEMS : Menu[] = [{ path: '/', title: 'Anasayfa', icon: 'git-pull-request',active: true, type: 'link' }]

	MENUITEMS : Menu[] = dynMenuItems;

	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

}
