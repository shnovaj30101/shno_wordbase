# shno_wordbase
* With shno_wordbase, it's easy for building personal word question bank.
* This project was only tested on Ubuntu 16.04

## Installation
* MongoDB Installation
> https://docs.mongodb.com/manual/installation/
* Project build
```
$ git clone https://github.com/shnovaj30101/shno_wordbase.git
$ cd shno_wordbase
$ npm install
```

## Usage
* Configuration
```
//Config file path: shno_wordbase/config.js
   
config_options = {
    'port': 3000, // the shno_wordbase service port
    'mongodb_port': 9113 // the MongoDB api port 
}
```
* Start the process
```
$ cd shno_wordbase/display
$ node app.js
```
## GUI Interface
#### Search Interface
> With the search interface, you can search the questions you built by assigning the query word or the date range. Then you can edit or delete a question on the search interface.
 * URL: http://localhost:3000/search/ 
![image](https://github.com/shnovaj30101/shno_wordbase/blob/master/readme_gif/addition.gif)

#### Problem Interface
> You can review the vocabulary by answering questions displayed randomly on the problem interface. This interface would also display the frequency of getting the answer right or not. 
 * URL: http://localhost:3000/problem/ 

#### Addition Interface
> You can add new word questions on the Interface. 
 * URL: http://localhost:3000/addition/ 







