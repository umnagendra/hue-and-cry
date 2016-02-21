#Hue and Cry!
----------
A hack that uses Philips Hue lighting system as real-time performance indicator. 

##Built With
----------
* Node.js
* Express.js
* Twitter search API
* Philips Hue&copy; REST API

##Running
----------
###Setup
1. Obtain your twitter API `consumer key`, `consumer secret`, `access token key` and `access token secret` and replace the placeholders in `helpers/scores/twitter-scores.js`
2. Setup the Philips Hue lighting system, obtain the following entires and replace the placeholders in `helpers/hue.js`:
	* Hue Bridge IP address
	* Hue Bridge username

###Run
```
$ npm install
$ npm start
```

##License
----------
UNLICENSE
This is free and unencumbered software released into the public domain.
For more information, please refer to http://unlicense.org/UNLICENSE

##Third-Party Notices
----------
Philips Hue&copy; is a copyright owned by Philips Electronics N.V.

##About
----------
Originally developed at InMobi Hackathon - Spring 2016 by **Team BeNNe Dose**.
###Authors
[Nagendra Mahesh](https://github.com/umnagendra)
[S M Mahesh](mailto:hue.s.smahesh@dfgh.net)


