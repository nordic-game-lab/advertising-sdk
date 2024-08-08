/** 
* @license Copyright (c) 2024 Nordic Game Lab LLC
* You may not use this code without the express permission in writing of Nordic Game Lab LLC.
*/
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
  window.document.cookie = `${name}=${randomUUID}; expires=${expires.toUTCString()}; path=/; domain=nordicgamelab.org`;

  console.log(`Advertising cookie "${name}" created with random UUID "${randomUUID}" and will expire in ${daysToExpire} days.`);
  }else{
    console.log(`Advertising cookie "${name}" already exists.`)
  }
}


export default async function createAdElement(imageSize = '100px', siteID) {
  
  try {
     const _data = 'data-';
     const currentScript = window.document.currentScript; // Get the script element that calls this function
     const attr = currentScript.getAttribute.bind(currentScript);
     const hostUrl = attr(_data + 'host-url');
     const apiHost =
      hostUrl || 'api.nordicgamelab.org';
     const endpoint = `${apiHost.replace(/\/$/, '')}/ads`;
     const siteId = siteID || attr(_data + 'site-id');
     const host = window.location.hostname;
     const response = await fetch(`https://${endpoint}?siteid=${siteId}`);
     const adData = await response.json();
     const subDomain = host.split('.');
    // Creates the new link with all required utm parameters
     const adLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;
 
     const anchorElement = window.document.createElement('a');
     anchorElement.href = adLink;
 
     const imageElement = window.document.createElement('img');
     imageElement.src = adData.imageURL;
     imageElement.alt = 'Advertisement Image';
     imageElement.style.width = imageSize;
 
     anchorElement.appendChild(imageElement);
     createAdvertisingCookieWithRandomUUID('ad_tracking', 30);
     return anchorElement;
 
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 }