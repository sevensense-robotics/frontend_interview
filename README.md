# Frontend interview exercise
## Getting started

### Launch the rest api
We are using a simple json-server as the REST API for this case. You can install is using `npm install -g json-server`
To run it use `json-server --watch db.json`.
You can find a complete documentation of it here: https://www.npmjs.com/package/json-server#getting-started

### Launch the frontend
To launch the frontend you need to switch to the `colored-blocks` folder and from there you can run it using `npm install` and then `npm start`.

### Launch the script that updates blocks
We also provide a small python script that modifies the database randomly to simulate external updates. If you want to test your frontend with it you can run it with: `python3 updater.py`. You may need to install `requests` using `pip3 install requests`.


## Task
Your task is to implement a React based frontend for the given REST API. We highly recommend to use Typescript, but you may use plain Javascript as an alternative. You can see a very simple interaction with the API in the `demo.tsx` file.
For your implementation you may use class or function components depending on what you think fits best.
In our example there is a collection of "blocks", where each block has a color and a name. You frontend should display all existing blocks with their name as text and the color as background color. Additionally, they should be clickable. We recommend to use a button (-like) object for this. The interaction with the backend should be as follows:
* At a fixed interval update your frontend to display what is currently contained in the frontend. This might be changed from other sources (see "Getting started" for how to use our script to test this)
* When a block is clicked it should switch to a different existing color (see below). The existing colors do not change during runtime.
For details of what is provided in which format see the "API Description" section.

To limit the amount of time you need to invest into this we kindly ask you to NOT do any styling.
You should not need to write any CSS and can use all basic looks as provided by react.
We will not consider additional effort put into style when reviewing your code.



## API Description
### Blocks
* /blocks [GET, POST]: Access all blocks. Blocks contain 3 fields: id, name and color, where color is the name of a color in the `colors` table. 
* /blocks/<id> [GET, PATCH, PUT, DELETE]: Access or update a single block.

### Colors
* /colors [GET, POST]: Access all colors. Colors contain 3 fields: id, name and hex, where hex is the code that you should use to display the color.

