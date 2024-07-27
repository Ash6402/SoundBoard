import { LoaderService } from "./loader.service"
import { TestBed } from "@angular/core/testing"

describe("LoaderService", () => {
    let loaderService: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoaderService]
        })

        loaderService = TestBed.inject(LoaderService)
    })

    it("creates an instance", () => {
        expect(loaderService).toBeTruthy()
    })
})