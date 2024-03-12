
import React from 'react'
import { withScreenshot } from 'storycap';

export const decorators = [
    withScreenshot,
]

export const parameters = {
    screenshot: {
        viewport: {
            width: 1250,
            height: 1000,
            deviceScaleFactor: 2,
        },
        fullPage: false,
        captureBeyondViewport: true,
    }
}
