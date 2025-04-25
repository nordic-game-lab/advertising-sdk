/** 
* @license MPL 2.0
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/
(async window => {
  const {
    location,
    document,
  } = window;
  const { hostname } = location;
  const { currentScript } = document;
  const addContainer = document.getElementById('ad-container');

  if (!currentScript) return;
  if(!addContainer) return;
  
  try {
     const _data = 'data-';
     const attr = currentScript.getAttribute.bind(currentScript);
     const imageSize = attr(_data + 'image-size') || '100px';
     const hostUrl = attr(_data + 'host-url');
     const protocol = attr(_data + 'protocol') || 'https';
     const apiHost = hostUrl || 'api.nordicgamelab.org';
     const endpoint = `${apiHost.replace(/\/$/, '')}/ads`;
     const siteId = attr(_data + 'site-id') || 'c3a8c1c5';
     const host = hostname;
     const subDomain = host.split('.');

     // Fetches an ad from the api. Example response is {
     //"id": 1,
     //"imageURL": "https://res.cloudinary.com/dkbe3sbtu/image/upload/v1715777083/Adverts/free-employee-training-software.png",
     //"link": "https://offers.nordicgamelab.org/free-employee-training-software",
     //"campaign": "free_training",
     //"advertiserID": "1",
     //"createdAt": "2024-09-05T02:20:32.304Z",
     //"updatedAt": "2024-09-05T02:20:32.304Z"
     //}
     let response;
     if(document.cookie.includes('ngl_optOut=true')){
      response = await fetch(`${protocol}://${endpoint}?siteid=${siteId}&optOut=true`);
     } else{
      response = await fetch(`${protocol}://${endpoint}?siteid=${siteId}`);
     }
     const adData = await response.json();
     const advertiserResponse = await fetch(`${protocol}://${apiHost.replace(/\/$/, '')}/api/advertiser/${adData.advertiserID}`);
     const advertiserData = await advertiserResponse.json();

    // Uses the site the ad is hosted on to build the link
    let adLink;
    if(apiHost != 'api.nordicgamelab.org'){
        const redirectLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;
        const adURI = escape(redirectLink);
        adLink = `${protocol}://${apiHost}/ads/click?siteid=${siteId}&adid=${adData.id}&redirect=${adURI}`;
     }else{
        adLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;
     }
 
     if(document.cookie.includes('ngl_optOut=true')){
      adLink = adLink + '&optOut=true';
     }
     const anchorElement = document.createElement('a');
     const imageElement = document.createElement('img');
     const ae = document.createElement('a');
     const ie = document.createElement('img');

     anchorElement.href = adLink;
     imageElement.src = adData.imageURL;
     imageElement.alt = 'Advertisement Image';
     imageElement.style.width = imageSize;
     ie.src = 'https://static.nordicgamelab.org/info-circle-svgrepo-com.svg';
     ae.style.width = '20px';
     ae.style.height = '20px';
     ie.style.width = '20px';
     ie.style.height = '20px';
     ie.alt = 'Information Icon';
     ae.href = `https://static.nordicgamelab.org/info.html?name=${escape(advertiserData.advertiser_name)}&description=${escape(advertiserData.description)}&link=${escape(advertiserData.link)}&adId=${adData.id}`;
     ae.style.position = 'absolute';
     ae.style.top = '10px';
     ae.style.right = '10px';
     ae.appendChild(ie);
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
function getCookie(name: string) {
  if (document.cookie.split(";").some((item) => item.trim().startsWith(name))) {
    return true;
  }else {
    return null; // Cookie not found
  }
}

// Create an advertising cookie with a random UUID
function createAdvertisingCookieWithRandomUUID(name: string, daysToExpire: number) {

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

  if(addContainer){
  addContainer.style.position = 'relative';
  addContainer.appendChild(anchorElement);
  addContainer.appendChild(ae);
  }
}
     if(!document.cookie.includes('ngl_optOut=true')){
     createAdvertisingCookieWithRandomUUID('ngl_user_id', 30);
     }
     let initialized: boolean;
     

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
