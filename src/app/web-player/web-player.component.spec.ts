import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { WebPlayerComponent } from "./web-player.component"
import { provideMockStore, MockStore } from "@ngrx/store/testing"
import { PlayerSDKSerivce } from "../services/http/player/player-sdk.service";
import { selectQueue } from "../state/queue/queue.selector";
import { mockPlaybackTrack } from "../mocks/web-playback-track.mock";
import { HarnessLoader } from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing'
import { By } from "@angular/platform-browser";
import { currentPlaying } from "../state/player/player.selector";
import { TrackDetailsComponent } from "./track-details/track-details.component";
import { PlayerButtonsComponent } from "./player-buttons/player-buttons.component";
import { MediaProgressBarComponent } from "./media-progress-bar/media-progress-bar.component";
import { MemoizedSelector } from "@ngrx/store";
import { Track } from "../models/track.model";
import { Component } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { mockTrack1 } from "../mocks/track1.mock";
import { mockTrack2 } from "../mocks/track2.mock";

let loader: HarnessLoader;

@Component({
   selector: 'app-media-progress-bar',
   template: '',
   standalone: true, 
})
class MockMediaProgressBarComponent{}

describe("WebPlayerComponent", () => {

    let store: MockStore;
    let fixture: ComponentFixture<WebPlayerComponent>
    let component: WebPlayerComponent;
    let mockQueueSelector: MemoizedSelector<any, Track[]>
    let mockCurrentPlaying: MemoizedSelector<any, Spotify.Track>
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                WebPlayerComponent,
                NoopAnimationsModule
            ],
            providers: [
                provideMockStore(),
                {
                    provide:  PlayerSDKSerivce,
                    useFactory: () => ({
                        disconnect: () => jest.fn(),
                        removeListener: () => jest.fn()
                    })
                },
            ]
        })
        .overrideComponent(WebPlayerComponent, {
            remove: {
                imports: [MediaProgressBarComponent],
            },
            add: {
                imports: [MockMediaProgressBarComponent]
            }
        })
        .overrideComponent(TrackDetailsComponent, {
            set: {
                selector: 'app-track-details',
                template: ''
            }
        })
        .overrideComponent(PlayerButtonsComponent, {
            set: {
                selector: 'app-player-buttons',
                template: ''
            },
        })

        fixture = TestBed.createComponent(WebPlayerComponent)
        loader = TestbedHarnessEnvironment.loader(fixture)
        component = fixture.componentInstance

        store = TestBed.inject(MockStore);
        mockQueueSelector = store.overrideSelector(selectQueue, [])
        mockCurrentPlaying = store.overrideSelector(currentPlaying, undefined)
        fixture.detectChanges()
    })

    it("should define component", () => {
        expect(component).toBeTruthy()
    })

    it("queue button should be disabled", async () => {
        const queueButton = await loader.getHarness(MatButtonHarness.with({selector: ".queue_btn"}))
        const isDisabled = await queueButton.isDisabled()
        expect(isDisabled).toBe(true)
    })

    it("queue$ should be []", fakeAsync(() => {
        component.queue$.subscribe(queue => {
            tick()
            expect(queue).toEqual([])
        })
    }))

    it("should enable the queue button", async () => {
       mockCurrentPlaying.setResult(mockPlaybackTrack)
       store.refreshState()
       fixture.detectChanges()

        const queueButton = await loader.getHarness(MatButtonHarness.with({selector: ".queue_btn"}))
        const isDisabled = await queueButton.isDisabled()
        expect(isDisabled).toBe(false)
    })

    it("should render the loader if queue$ is empty", async () => {

        mockCurrentPlaying.setResult(mockPlaybackTrack);
        store.refreshState()
        fixture.detectChanges()

        const menu = await loader.getHarness(MatMenuHarness);
        await menu.open()

        const loaderEl = fixture.debugElement.query(By.css('.loader'))

        expect(loaderEl).toBeTruthy()
    })

    it("should render the list of queued Tracks", async () => {
        mockCurrentPlaying.setResult(mockPlaybackTrack);
        mockQueueSelector.setResult([mockTrack1, mockTrack2]);

        store.refreshState()
        fixture.detectChanges()

        
        const menu = await loader.getHarness(MatMenuHarness)
        await menu.open()
        let items = await menu.getItems()

        const queue_menu = fixture.debugElement.query(By.css('.queue-menu'))

        expect(queue_menu).toBeTruthy()
        expect(items.length).toBe(2)
    
    })
})