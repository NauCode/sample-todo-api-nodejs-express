// These are the dependencies this file will use
const express = require("express");
const router = express.Router();

// Here is the sample data to use in our project
// Usually this would come from a database and
// not from an array like this one
const data = [
  {
    id: 1,
    title: "Finalize project",
    order: 1,
    completed: false,
    createdOn: new Date()
  },
  {
    id: 2,
    title: "Book ticket to London",
    order: 2,
    completed: false,
    createdOn: new Date()
  },
  {
    id: 3,
    title: "Finish last article",
    order: 3,
    completed: false,
    createdOn: new Date()
  },
  {
    id: 4,
    title: "Get a new t-shirt",
    order: 4,
    completed: false,
    createdOn: new Date()
  },
  {
    id: 5,
    title: "Create dinner reservation",
    order: 5,
    completed: false,
    createdOn: new Date()
  }
];

// Here we manage the first GET Request
// The one to /items/
// This has to return all our items data
// In JSON format
router.get("/", function(req, res) {
  res.status(200).json(data);
});

// This is the second GET endpoint
// Its route is /items/:id
// And it returns a JSON with the specified item
// Or the not found error code if that ID is not in our list
router.get("/:id", function(req, res) {
  let found = data.find(function(item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

// This is the POST endpoint
// To add new data to our list
// It is called by a POST request to /items/
// The request has to be sent with an arg:
// title, with the title of the new item to add
// (In JSON format)
router.post("/", function(req, res) {
  let itemIds = data.map(item => item.id);
  let orderNums = data.map(item => item.order);

  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
  let newOrderNum =
    orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

  let newItem = {
    id: newId,
    title: req.body.title,
    order: newOrderNum,
    completed: false,
    createdOn: new Date()
  };

  data.push(newItem);

  res.status(201).json(newItem);
});

// This is the PUT endpoint, to update an item from our list
// Its route is /items/:id
// It needs three args (in JSON format):
// title with the new title of the item
// order with the new position on the array you want to to set this item on
// completed with a bool to set it as completed (or not)
// This will return 204 code if everything is OK
// or 404 if there was any error
router.put("/:id", function(req, res) {
  let found = data.find(function(item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let updated = {
      id: found.id,
      title: req.body.title,
      order: req.body.order,
      completed: req.body.completed
    };

    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// And finally the DELETE request
// It uses the /items/:id/ endpoint
// Once called it deletes the item
// And ALWAYS return 204 code
router.delete("/:id", function(req, res) {
  let found = data.find(function(item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
  }

  res.sendStatus(204);
});

// This is just to have access to this router on other files
// Like in server.js
module.exports = router;
