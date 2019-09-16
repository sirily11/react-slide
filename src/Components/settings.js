function getURL(path){
    let testURL = "http://0.0.0.0/custom_webpage"
    let production = "https://sirileepage.com/custom_webpage"
    return `${production}/${path}`
}
export default getURL