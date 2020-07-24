import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from 'services/store.service';
import { environment } from 'environments/environment';
import ILanguage from '@modules/server.common/interfaces/ILanguage';
import { DeviceRouter } from '@modules/client.common.angular2/routers/device-router.service';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
	styleUrls: ['about.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
	public useAboutHtml: string = '<h1>Loading...</h1>';
	public selectedLanguage: ILanguage;
	private sub: Subscription;
	public deviceId: string;
	public userId: string;
	public appVersion: string;

	constructor(
		private userRouter: UserRouter,
		private deviceRouter: DeviceRouter
	) {
		this.selectedLanguage =
			(localStorage.getItem('_language') as ILanguage) || 'en-US';
		this.deviceId = localStorage.getItem('_deviceId');
		this.userId = localStorage.getItem('_userId');
		this.appVersion = environment.APP_VERSION;
	}
	ngOnInit() {
		this.deviceRouter.updateLanguage(this.deviceId, this.selectedLanguage);
		this.sub = this.userRouter
			.getAboutUs(this.userId, this.deviceId)
			.subscribe((html) => {
				this.useAboutHtml = html;
			});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
