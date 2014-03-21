# TrafficGlance

[![devDependency Status](https://david-dm.org/jayfinch/traffic-glance/dev-status.svg?theme=shields.io)](https://david-dm.org/jayfinch/traffic-glance#info=devDependencies) [![Build Status](https://travis-ci.org/jayfinch/traffic-glance.svg?branch=master)](https://travis-ci.org/jayfinch/traffic-glance) [![Build Status](https://travis-ci.org/jayfinch/traffic-glance.svg?branch=develop)](https://travis-ci.org/jayfinch/traffic-glance)

## About

* Quickly see traffic conditions without all the clutter
* Displays incident warnings if available
* Low barrier to entry:
	* 100% client-side (HTML/Javascript)
	* Just upload it to your server
* Responsive layout

## Getting Started

### 1. Get an API key from Microsoft

Head over to https://www.bingmapsportal.com and make an account. It's a quick process and you'll end up with a developer key (a string of text about 60 characters long).

Save this key for later.

### 2. Create your first route

Visit http://www.bing.com/maps and look up a set of directions. Feel free to add multiple destinations if you'd like. Most importantly, make sure you click-and-drag the route so that it follows the path you wish to take.

When you're happy with your route, click the Share button. Then click "Show full URL." This is important, as your URLs must begin with http://www.bing.com/maps/?v=2

Save this URL for later.

### 3. Create your config file

Rename `config-example.json` as `config.json`.

Edit this file and paste in your API key from step 1.

Following the existing examples, modify the set of routes and make it your own. All you need to do is provide a name and the URL from step 2.

### 4. Upload it

Place the contents of `dist` on your web server. The app will work either at the root of your site or within a subfolder.

## Advanced options

### Auto load based on time of day

Specify a `startTime` and `endTime` in your routes. If it's currently within that timeframe when opening TrafficGlance, the app will automatically fetch traffic information for those routes and display them at the top for quick viewing.

	{
	  "name": "Cogswell Cogs to Home",
	  "startTime": "4:30 pm",
	  "endTime": "6:30 pm",
	  "url": "http://www.bing.com/maps/?v=2"
	}

### Units
You may specify units as `mi` or `km`

## Disclaimer

Microsoft does not offer a commercial license for any app to use their traffic data in a generalized fashion like this. Therefore, this project is only available for your own personal/educational use. I wish I could put this on the mobile app stores	for free, but they will not permit it.
