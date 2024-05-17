/* @license 
* Copyright (c) 2024 Nordic Game Lab LLC
* You may not use this code without the express permission in writing of Nordic Game Lab LLC.
*/
export default async function createAdElement(imageSize = '100px', siteID) {
  
 try {
    const host = window.location.hostname;
    const response = await fetch(`https://api.nordicgamelab.org/ads?siteid=${siteID}`);
    const adData = await response.json();
    const subDomain = host.split('.');
   // Creates the new link with all required utm parameters
    const adLink = `${adData.link}?utm_source=${subDomain[0]}&utm_medium=banner&utm_campaign=${adData.campaign}&ref=${host}`;

    const anchorElement = document.createElement('a');
    anchorElement.href = adLink;

    const imageElement = document.createElement('img');
    imageElement.src = adData.imageURL;
    imageElement.alt = 'Advertisement Image';
    imageElement.style.width = imageSize;

    anchorElement.appendChild(imageElement);
    return anchorElement;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
