judoka-resource
===============

Resource for judoka to post online

# Getting Started
This is a NodeJS/Express app that uses MongoDB as a datastore.
Make sure you have [MongoDB](http://www.mongodb.org/downloads) installed, as well as
 [Node](http://nodejs.org/download/) and [NPM](https://github.com/npm/npm#fancy-install-unix).

In one terminal, type:
```
    mongod
```

In another, type:
```
    npm install
    node .
```

Visit localhost:5000/ ... and, thats it!


# Urls
* /
    * Homepage
* /techniques
    * List all the techniques
* /techniques/:technique_name
    * Displays the technique, and all associated user posts
* /techniques/group/:technique_group_name
    * List all the techniques sorted by group

# Sources
* [Wikipedia: List of techniques](http://en.wikipedia.org/wiki/List_of_Kodokan_judo_techniques)
* [Judo Technique Shortnames](http://judoinfo.com/)
* [Gokyo Sprite](http://en.wikipedia.org/wiki/File:Gokyo-no-waza.jpg)