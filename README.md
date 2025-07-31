# Advertising SDK
This is the advertising SDK developed by Nordic Game Lab, LLC.

To use this SDK you need to build your own implementation of the server, [or use our server](https://github.com/nordic-game-lab/ad-server).

## Usage

1. Create a div with the id of ad-container
2. Choose a site id
3. place the sdk in with the site id

### Example

```html
<script src="https://static.nordicgamelab.org/v1/ads.min.js" data-site-id="example" data-image-size="1500px"></script>
```

## Server Implementation 

### /ads
There should be an endpoint of /ads that should return an image and redirect link

That should look like this 

```javascript
{
    "id": 1,
    "imageURL": "https://res.cloudinary.com/dkbe3sbtu/image/upload/v1715777083/Adverts/free-employee-training-software.png",
    "link": "https://offers.nordicgamelab.org/free-employee-training-software",
    "campaign": "free_training",
    "advertiserID": "1",
    "createdAt": "2024-09-05T02:20:32.304Z",
    "updatedAt": "2024-09-05T02:20:32.304Z"
}
```

### /api/advertiser/:id

```javascript
{
    "id": 1,
    "advertiser_name": "Nordic Game Lab",
    "description": "Nordic Game Lab, LLC is a software development company founded on the belief that high-quality software solutions should be accessible to all businesses. Founded by Andrew Ball, a seasoned software developer, Nordic Game Lab was born out of a desire to provide affordable, yet powerful tools that empower businesses to thrive in the digital age.",
    "logo": "https://static.nordicgamelab.org/nordic_game_lab_logos/logo_white_background.jpg",
    "link": "https://www.nordicgamelab.org",
    "createdAt": "2024-10-31T01:01:46.823Z",
    "updatedAt": "2024-10-31T01:01:46.823Z"
}
```

## License
This project is licensed under the Mozilla Public License Version 2.0