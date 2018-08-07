const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// load Idea model
require('../models/Idea');
const Idea = mongoose.model('Idea');

// get all ideas
router.get('/ideas', (req, res) => {
  async function getIdeas() {
    const result = await Idea
      .find({})
      .sort({ date: -1});
    res.render('./ideas/get-ideas', { result: result });
  }
  getIdeas();
});

// get a specific idea

// get the add idea page
router.get('/add', (req, res) => {
  res.render('./ideas/add-idea');
});

// get the edit idea page
router.get('/ideas/edit/:id', (req, res) => {
  async function editIdea() {
    const idea = await Idea.findOne({ _id: req.params.id });
    res.render('./ideas/edit-idea', {idea});
  }
  editIdea();
});

// process add form (create a new idea) 
router.post('/ideas', (req, res) => {
  // js error handling 
  async function addIdea() {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    const errors = validateInput(newUser);
    if (errors.length > 0) {
      res.status(400).render('./ideas/add-idea', {
        errors,
        title: req.body.title,
        details: req.body.details
      });
      return;
    } 
    const idea = new Idea(newUser);
    await idea.save();
    res.redirect('/ideas');
  }
  addIdea();
});

// Edit form process (update idea)
router.put('/ideas/:id', (req, res) => {
  const errors = validateInput(req.body);
  if (errors.length > 0) {
    async function editIdea() {
      const idea = await Idea.findOne({ _id: req.params.id });
      res.status(400).render('./ideas/edit-idea', {
        errors,
        idea
      });
    }
    editIdea();
    // res.status(400).render('./ideas/edit-idea', {
    //   errors,
    //   title: req.body.title,
    //   details: req.body.details
    // });
    return;
  }
  async function updateIdea() {
    // find the idea then validate the input then update it
    const idea = await Idea.findOne({_id: req.params.id});
    idea.title = req.body.title;
    idea.details = req.body.details;
    
    await idea.save();
    res.redirect('/ideas');
  }
  updateIdea();
});

router.delete('/ideas/:id', (req, res) => {
  async function deleteIdea() {
    const idea = await Idea.deleteOne({ _id: req.params.id });
    res.redirect('/ideas');
  }
  deleteIdea();
});

function validateInput(input) {
  let errors = [];
  const title = input.title;
  const details = input.details;
  if (!title) 
    errors.push({text: 'Please Add A Title!'});
  else if (title.length < 3) 
    errors.push({text: 'Title must be at least three characters!'});
  else if (!isNaN(title)) 
    errors.push({text: 'Title must have characters beside numbers'});

  if (!details) 
    errors.push({text: 'Please Add A Details!'});
  else if (details.length < 3) 
    errors.push({text: 'Details must be at least three characters!'});
  else if (!isNaN(details)) 
    errors.push({text: 'Details must have characters beside numbers'});
  
  return errors;
}


module.exports = router;