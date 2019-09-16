export function getURL(path: string): string {
    let testURL = "http://0.0.0.0/slide"
    let production = "https://sirileepage.com/custom_webpage"
    return `${testURL}/${path}`
}