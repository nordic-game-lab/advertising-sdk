/** 
* @license Copyright (c) 2024 Nordic Game Lab LLC
* You may not use this code without the express permission in writing of Nordic Game Lab LLC.
*/
(async window => {
  const {
    location,
    document,
  } = window;
  const { hostname } = location;
  const { currentScript } = document;
  console.log(currentScript);

  if (!currentScript) return;
  
  try {
     const _data = 'data-';
     const attr = currentScript.getAttribute.bind(currentScript);
     const imageSize = attr(_data + 'image-size') || '100px';
     const hostUrl = attr(_data + 'host-url');
     const protocol = attr(_data + 'protocol') || 'https';
     const apiHost =
      hostUrl || 'api.nordicgamelab.org';
     const endpoint = `${apiHost.replace(/\/$/, '')}/ads`;
     const siteId = attr(_data + 'site-id') || 'c3a8c1c5';
     const host = hostname;
     const response = await fetch(`${protocol}://${endpoint}?siteid=${siteId}`);
     const adData = await response.json();
     const subDomain = host.split('.');
    // Creates the new link with all required utm parameters
    let adLink;
    if(apiHost != 'api.nordicgamelab.org'){
        const redirectLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;
        const adURI = escape(redirectLink);
        adLink = `${protocol}://${apiHost}/ads/click?siteid=${siteId}&adid=${adData.id}&redirect=${adURI}`;
     }else{
        adLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;
     }
 
     const anchorElement = document.createElement('a');
     anchorElement.href = adLink;
     let addContainer = document.getElementById('ad-container');
     const imageElement = document.createElement('img');
     imageElement.src = adData.imageURL;
     imageElement.alt = 'Advertisement Image';
     imageElement.style.width = imageSize;
 
     anchorElement.appendChild(imageElement);

     // Generate a random UUID
function generateUUID() {
  // Adapted from https://stackoverflow.com/a/2117523/1234567
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// find if the cookie exists
function getCookie(name) {
  if (document.cookie.split(";").some((item) => item.trim().startsWith(name))) {
    return true;
  }else {
    return null; // Cookie not found
  }
}

// Create an advertising cookie with a random UUID
function createAdvertisingCookieWithRandomUUID(name, daysToExpire) {
  const existingValue = getCookie(name);
  if(!existingValue){
  const randomUUID = generateUUID();
  const expires = new Date();
  expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

  // Set the cookie with the specified name, random UUID value, and expiration date
  document.cookie = `${name}=${randomUUID}; expires=${expires.toUTCString()}; path=/; domain=nordicgamelab.org`;

  console.log(`Advertising cookie "${name}" created with random UUID "${randomUUID}" and will expire in ${daysToExpire} days.`);
  }else{
    console.log(`Advertising cookie "${name}" already exists.`)
  }
}

// Create the advertisement element
const createAdvertisement = () => {
  addContainer.appendChild(anchorElement);
}

     createAdvertisingCookieWithRandomUUID('ad_tracking', 30);
     let initialized;
     

     const init = () => {
      if (document.readyState === 'complete' && !initialized) {
        createAdvertisement();
        initialized = true;
      }
    };

    document.addEventListener('readystatechange', init, true);

    init();
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 })(window)