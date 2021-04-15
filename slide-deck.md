---
marp: true
_class: invert
---

<style>
.row {
  display: flex;
}

.col {
  flex: 50%;
}

.col:not(:last-child) {
	margin-right: 1rem;
}

.align-right {
  text-align: right;
}

.clean-logo {
  position:absolute;                 
  bottom:1rem;                         
  right:1rem;
  width: 2rem
}

.citation__name {
  font-weight: bold;
  font-style: italic;
}

.citation__text {
  font-style: italic;
}

.citation_image {
  max-width: 66%;
  text-align: center;
}

</style>

# **Clean Code**

## Écrire du code propre & maintenable <!--fit-->

<img src="images/logo.png" class="clean-logo">

---

## Outcomes

After this class students will be able to:

1. recognize the elements of bad code, including within functions, classes,arguments, and comments.
2. review code with an eye towards cleanliness and design.
3. plan and execute code cleanup without risk to the application.
4. incrementally improve bad design choices.
5. be much more aware of the quality of the code they, and their team-mates are writing.

---

## Outline

- What does it mean to be clean?
- What is Clean Code?
- Bad Code Dumpster Dive
- Names
- Functions
- Demonstration: Cleaning Code
- Comments
- Formatting
- Practice
- Exercises
- Some tools

---

## What does it mean to be clean?

- The business cost of bad code.
  - The Productivity Roller-Coaster.
  - Race to the Bottom.
  - The Grand-Redesign Myth.
- Why Does Code Rot?
- The Only Way to go Fast

---

# What is Clean Code?

---

## Elegance

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    I like my code to be elegant and efficient<br/>Clean code does one thing well 
    </div>
    <br/>
    <p class="citation__name">Bjarne Stroustrup</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/bjarne.png">
  </div>
</div>

---

## Simple, Direct & Prose

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    Clean code is simple and direct <br/>Clean code reads like well-written prose
    </div>
    <br/>
    <p class="citation__name">Grady Booch</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/booch.png">
  </div>
</div>

---

## Literate

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    Clean code can be read<br/>Clean code should be literate
    </div>
    <br/>
    <p class="citation__name">Dave Thomas</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/dave.png">
  </div>
</div>

---

## Care

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    Clean code always looks like it was written by someone who cares 
    </div>
    <br/>
    <p class="citation__name">Michael Feathers</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/feathers.png">
  </div>
</div>

---

## Small, expressive, simple

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    Reduced duplication, high expressiveness, and early building of, simple abstractions 
    </div>
    <br/>
    <p class="citation__name">Ron Jeffries</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/ron.png">
  </div>
</div>

---

## What you expected

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
    You know you are working on clean code when each routine you read turns out to be pretty much what you expected
    </div>
    <br/>
    <p class="citation__name">Ward Cunningham</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/ward.png">
  </div>
</div>

---

# Bad Code Dumpster Dive

---

# Names

---

# Functions

---

# Demonstration: Cleaning Code

---

# Comments

---

# Formatting

---

# Practice

---

# Exercises

---

# Tools
