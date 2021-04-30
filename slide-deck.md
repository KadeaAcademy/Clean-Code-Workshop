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
	margin-right: 3rem;
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

# Outline

- Outcomes
- What is Clean Code?
- Bad Code Dumpster Dive
- [**Meaningful Names**](#Meaningful-Names)
- [**Functions**](#Functions)
- [**Comments**](#Comments)
- [**Formatting**](#Formatting)
- Error Handling
- Unit Testing
- Practice: Cleaning Code
- Some tools

---

# Outcomes

After this class students will be able to:

1. recognize the elements of bad code, including within functions, classes,arguments, and comments.
2. review code with an eye towards cleanliness and design.
3. plan and execute code cleanup without risk to the application.
4. incrementally improve bad design choices.
5. be much more aware of the quality of the code they, and their team-mates are writing.

---

# What does it mean to be clean?

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

## They Boy Scout Rule

<div class="row">
  <div class="col align-right">
    <div class="citation__text">
      Check the code in cleaner than you checked it out.
    </div>
    <br/>
    <p class="citation__name">Robert C. Martin "Uncle Bob"</p>
  </div>
  <div class="col">
    <img class="citation_image" src="images/bob.png">
  </div>
</div>

---

![bg fit](images/wtf.png)

---

# Bad Code Dumpster Dive

```javascript class:"lineNo"
function testableHtml(pageData, includeSuiteSetup) {
  const wikiPage = pageData.getWikiPage();
  let buffer = new StringBuffer();
  if (pageData.hasAttribute("Test")) {
    if (includeSuiteSetup) {
      const suiteSetup = PageCrawlerImpl.getInheritedPage(
        SuiteResponder.SUITE_SETUP_NAME,
        wikiPage
      );
      if (suiteSetup != null) {
        const pagePath = suiteSetup.getPageCrawler().getFullPath(suiteSetup);
        const pagePathName = PathParser.render(pagePath);
        buffer.append("!include -setup .").append(pagePathName).append("\n");
      }
    }
    const setup = PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
    if (setup != null) {
      const setupPath = wikiPage.getPageCrawler().getFullPath(setup);
      const setupPathName = PathParser.render(setupPath);
      buffer.append("!include -setup .").append(setupPathName).append("\n");
    }
  }
  buffer.append(pageData.getContent());
  if (pageData.hasAttribute("Test")) {
    const teardown = PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
    if (teardown != null) {
      const tearDownPath = wikiPage.getPageCrawler().getFullPath(teardown);
      const tearDownPathName = PathParser.render(tearDownPath);
      buffer
        .append("\n")
        .append("!include -teardown .")
        .append(tearDownPathName)
        .append("\n");
    }
  }
  pageData.setContent(buffer.toString());
  return pageData.getHtml();
}
```

---

# Bad Code Dumpster Dive

```javascript {.line-numbers}
function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
  const isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    const testPage = pageData.getWikiPage();
    let newPageContent = new StringBuffer();
    includeSetupPages(testPage, newPageContent, isSuite);
    newPageContent.append(pageData.getContent());
    includeTeardownPages(testPage, newPageContent, isSuite);
    pageData.setContent(newPageContent.toString());
  }
  return pageData.getHtml();
}
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

---

# Meaningful Names

## Use Intention-Revealing Names

```javascript
function getThem(theList) {
  const list1 = [];
  for (let x of theList) {
    if (x[0] == 4) {
      list1.push(x);
    }
  }
  return list1;
}
```

---

# Meaningful Names

## Use Intention-Revealing Names

```javascript
function getFlaggedCells(gameBoard) {
  const flaggedCells = [];
  for (let cell of gameBoard) {
    if (cell.isFlagged()) {
      flaggedCells.push(cell);
    }
  }
  return flaggedCells;
}
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Avoid Disinformation

```
let a = l;
if (O == l)
  a = O1;
else
  l = 01;
```

## Make Meaningful Distinctions

```javascript
function copyChars(a1, a2) {
  for (let i = 0; i < a1.length; i++) {
    a2[i] = a1[i];
  }
}
```

---

# Meaningful Names

## Use Pronounceable Names

```javascript
class DtaRcrd102 {
  constructor(genymdhms, modymdhms) {
    this.genymdhms = genymdhms;
    this.modymdhms = modymdhms;
  }
  pszqint = "102"; /* ... */
}
```

---

# Meaningful Names

## Use Pronounceable Names

```javascript
class Customer {
  constructor(generationTimestamp, modificationTimestamp) {
    this.generationTimestamp = generationTimestamp;
    this.modificationTimestamp = modificationTimestamp;
  }
  recordId = "102"; /* ... */
}
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Use Searchable Names

```javascript
for (let j = 0; j < 34; j++) {
  s += (t[j] * 4) / 5;
}
```

---

# Meaningful Names

## Use Searchable Names

```javascript
const realDaysPerIdealDay = 4;
const WORK_DAYS_PER_WEEK = 5;
let sum = 0;
for (let j = 0; j < NUMBER_OF_TASKS; j++) {
  const realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
  const realTaskWeeks = realdays / WORK_DAYS_PER_WEEK;
  sum += realTaskWeeks;
}
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Member Prefixes (Avoid encodings)

```javascript
    class Part {
      ...
      m_dsc; // The textual description
      ...
      setName(name) {
        m_dsc = name;
      }
    }
```

## Hungarian Notation (Avoid encodings)

```javascript
    PhoneNumber phoneString;
    // name not changed when type changed!
```

---

# Meaningful Names

## Member Prefixes (Avoid encodings)

```javascript
    class Part {
      ...
      description;
      ...
      setDescription(description) {
        this.description = description;
      }
    }
```

## Hungarian Notation(Avoid encodings)

```javascript
PhoneNumber phone;
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Avoid Mental Mapping

```javascript
    for (let a = 0; a < 10; a++)
      for (let b = 0; b < 10; b++)
```

## Class Names

```javascript
Manager, Processor, Data, Info;
```

---

# Meaningful Names

## Avoid Mental Mapping

```javascript
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++)
```

## Class Names

```javascript
Customer, WikiPage, Account, AddressParser;
// a class name should not be a verb
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Method Names

```javascript
    postPayment, deletePage, save
    // methods should have verb or verb phrase names

    const name = employee.getName();
    customer.setName("mike");

    if (paycheck.isPosted())...

    const fulcrumPoint = Complex.fromRealNumber(23.0);
    // is generally better than
    const fulcrumPoint = new Complex(23.0);
```

<img src="images/logo.png" class="clean-logo">

---

# Meaningful Names

## Pick One Word per Concept

```javascript
fetch, retrieve, get; // as equivalent methods

controller, manager, driver; // confusing
```

## Don’t Pun

```javascript
// avoid using the same word for two purposes
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## Small!

```javascript
// rules of functions:
// 1. should be small
// 2. should be smaller than that
// < 150 characters per line
// < 20 lines
```

## Do One Thing

```javascript
// FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL.
// THEY SHOULD DO IT ONLY.
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## One line block

Blocks within `if`,`else`, `while` statements, and so on should be one line long. Probably that line should be a **function call**.

```javascript
function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
  const isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    const testPage = pageData.getWikiPage();
    const newPageContent = new StringBuffer();
    includeSetupPages(testPage, newPageContent, isSuite);
    newPageContent.append(pageData.getContent());
    includeTeardownPages(testPage, newPageContent, isSuite);
    pageData.setContent(newPageContent.toString());
  }
  return pageData.getHtml();
}
```

---

## One line block

Blocks within `if`,`else`, `while` statements, and so on should be one line long. Probably that line should be a **function call**.

```javascript
function includeSetupAndTeardownPages(pageDate, isSuite) {
  const testPage = pageData.getWikiPage();
  const newPageContent = new StringBuffer();
  includeSetupPages(testPage, newPageContent, isSuite);
  newPageContent.append(pageData.getContent());
  includeTeardownPages(testPage, newPageContent, isSuite);
  pageData.setContent(newPageContent.toString());
}

function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
  if (isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite);
  }
  return pageData.getHtml();
}
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## One Level of Abstraction per Function

```javascript
// high level of abstraction
getHtml()

// intermediate level of abstraction
const pagePathName = PathParser.render(pagePath);

// remarkably low level
.append("\n")
```

---

# Functions

## The Step Down Rule: Reading Code from Top to Bottom

We want the code to read like a top-down narrative.

We want to be able to read the program as though it were a set of **TO** paragraphs, each of which is describing the current level of abstraction and referencing subsequent **TO** paragraphs at the next level down.

```
To include the setups and teardowns, we include setups, then we include the test page content, and then we include the teardowns.
  To include the setups, we include the suite setup if this is a suite, then we include the regular setup.
  To include the suite setup, we search the parent hierarchy for the “SuiteSetUp” page and add an include statement with the path of that page.
  To search the parent...
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## Use Descriptive Names

- Shoud contain a verb/action e.g. `renderPage`, `checkIfPageRendered`, etc.
- Don’t be afraid to make a name long! e.g. `includeSetupAndTeardownPages`
- A long descriptive name is better than a short enigmatic name.
- A long descriptive name is better than a long descriptive comment.
- Don’t be afraid to spend time choosing a name.
- Be consistent in your names. Use the same phrases, nouns, and verbs in the function names you choose for your modules.

---

# Functions

## Function Arguments

```javascript
// the ideal number of arguments for a function is zero
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## Do not transform the input

If a function is going to transform its input argument, the transformation should appear as the return value

```javascript
function transform(in) {
  const out = applyTransformation(in)
  return out;
}
// is Betten than
function transform(in) {
  applyInPlaceTransformation(in)
}
```

---

# Functions

## Argument Objects

```javascript
makeCircle(x, y, radius);
makeCircle(center, radius);
```

## Verbs and Keywords

```javascript
write(name);
writeField(name);

assertEquals(expected, actual);
assertExpectedEqualsActual(expected, actual);
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## Have No Side Effects

Side effects are lies. Your function promises to do one thing, but it also does other hidden things.

```
// do something or answer something, but not both
```

<img src="images/logo.png" class="clean-logo">

---

# Functions

## Don’t Repeat Yourself (DRY)

```javascript
// duplication may be the root of all evil in software
```

## Structured Programming

```javascript
// Edsger Dijkstra’s rules
//  one entry
//  one exit

// functions small
// occasional multiple return, break, or continue statement
// can sometimes even be more expressive Dijkstra’s rules
```

<img src="images/logo.png" class="clean-logo">

---

# Comments

## Comments Do Not Make Up for Bad Code

```javascript
// don’t comment bad code, rewrite it!
```

## Explain Yourself in Code

```javascript
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
  ...

// better
if (employee.isEligibleForFullBenefits())
```

<img src="images/logo.png" class="clean-logo">

---

# Comments (good)

## Legal Comments

```javascript
// Copyright (C) 2011 by Osoco. All rights reserved.
// Released under the terms of the GNU General Public License
// version 2 or later.
```

## Informative Comments

```javascript
// Returns an instance of the Responder being tested.
responderInstance();

// renaming the function: responderBeingTested
// format matched kk:mm:ss EEE, MMM dd, yyyy
const timeMatcher = Pattern.compile("\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*");
```

<img src="images/logo.png" class="clean-logo">

---

# Comments (good)

## Explanation of Intent

```javascript
//This is our best attempt to get a race condition //by creating large number of threads.
for (let i = 0; i < 25000; i++) {
  const widgetBuilderThread = new WidgetBuilderThread(
    widgetBuilder,
    text,
    failFlag
  );
  const thread = new Thread(widgetBuilderThread);
  thread.start();
}
```

## Clarification

```javascript
assertTrue(a.compareTo(b) == -1); // a < b assertTrue(b.compareTo(a) == 1); // b > a
```

<img src="images/logo.png" class="clean-logo">

---

# Comments (good)

## Warning of Consequences

```javascript
function makeStandardHttpDateFormat() {
  //SimpleDateFormat is not thread safe,
  //so we need to create each instance independently.
  const df = new SimpleDateFormat("dd MM yyyy");
  df.setTimeZone(TimeZone.getTimeZone("GMT"));
  return df;
}
```

## TODO Comments

```javascript
//TODO-MdM these are not needed
// We expect this to go away when we do the checkout model
```

<img src="images/logo.png" class="clean-logo">

---

# Comments (good)

## Amplification

```javascript
const listItemContent = match.group(3).trim();
// the trim is real important. It removes the starting
// spaces that could cause the item to be recognized
// as another list.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
```

<img src="images/logo.png" class="clean-logo">

---

# Comments (bad)

## Redundant Comments

```javascript
// Utility method that returns when this.closed is true.
// Throws an exception if the timeout is reached.
function waitForClose(timeoutMillis) {
  if (!closed) {
    wait(timeoutMillis);
    if (!closed) {
      throw "MockResponseSender could not be closed";
    }
  }
}
```

---

# Comments (bad)

## Redundant Comments

```javascript
/**
* The processor delay for this component. */
protected backgroundProcessorDelay = -1;
/**
* The lifecycle event support for this component. */
protected LifecycleSupport lifecycle = new LifecycleSupport(this);
/**
* The container event listeners for this Container. */
protected ArrayList listeners = new ArrayList();
```

---

# Comments (bad)

## Mandated Comments

```javascript
/**
* @param title The title of the CD
* @param author The author of the CD
* @param tracks The number of tracks on the CD
* @param durationInMinutes The duration of the CD in minutes */
void addCD(title, author,
tracks, durationInMinutes) {
CD cd = new CD();
cd.title = title;
cd.author = author;
cd.tracks = tracks;
cd.duration = durationInMinutes;
 }
```

---

# Comments (bad)

## Journal Comments

```javascript
/*
* Changes (from 11-Oct-2001) * --------------------------
* 11-Oct-2001 : * Re-organised the class and moved it to new package com.jrefinery.date (DG);
* 05-Nov-2001 : * Added a getDescription() method, and eliminated NotableDate class (DG);
* 12-Nov-2001 : * IBD requires setDescription() method, now that NotableDate class is gone (DG)
* 05-Dec-2001 : * Fixed bug in SpreadsheetDate class (DG);
```

---

# Comments (bad)

## Noise Comments

```javascript

/** constructor. **/
constructor() { }
/** The day of the month. */
const dayOfMonth;
/* Returns the day of the month. * @return the day of the month. */
function getDayOfMonth() {
  return dayOfMonth;
}
```

---

# Comments (bad)

## Scary Noise

```javascript
/** The name. */
let name;
/** The version. */
let version;
/** The licenceName. */
let licenceName;
/** The version. */
let info;
```

---

# Comments (bad)

## Don’t Use a Comment When You Can Use a Function or a Variable

```javascript
// does the module from the global list <mod> depend on the
// subsystem we are part of?
if (smodule.getDependSubsystems().contains(subSysMod.getSubSystem()))

// this could be rephrased without the comment as
const moduleDependees = smodule.getDependSubsystems();
ourSubSystem = subSysMod.getSubSystem();
if (moduleDependees.contains(ourSubSystem))
```

---

# Comments (bad)

## Position Markers

```javascript
// Actions //////////////////////////////////
```

## Closing Brace Comments

```javascript
while ((line = in.readLine()) != null) {
  lineCount++;
  charCount += line.length();
  words = line.split("\\W");
  wordCount += words.length;
} //while
```

---

# Comments (bad)

## Attributions and Bylines

```javascript
/* Added by Rick */
```

## Commented-Out Code

```javascript
const response = new InputStreamResponse();
response.setBody(formatter.getResultStream(), formatter.getByteCount());
// const resultsStream = formatter.getResultStream();
// const reader = new StreamReader(resultsStream);
// response.setContent(reader.read(formatter.getByteCount()));
```

---

# Comments (bad)

## HTML Comments

```javascript
/**
* Task to run fit tests.
* This task runs fitnesse tests and publishes the results.
* <p/>
* <pre>
* Usage:
* &lt;taskdef name=&quot;execute-fitnesse-tests&quot;
* classname=&quot;fitnesse.ant.ExecuteFitnesseTestsTask&quot * classpathref=&quot;classpath&quot; /&gt;
* OR
* &lt;taskdef classpathref=&quot;classpath&quot;
* resource=&quot;tasks.properties&quot; /&gt;
* <p/>
* &lt;execute-fitnesse-tests
 ;
```

---

# Comments (bad)

## Too Much Information

```javascript
/*
RFC 2045 - Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies section 6.8. Base64 Content-Transfer-Encoding
The encoding process represents 24-bit groups of input bits as output strings of 4 encoded characters. Proceeding from left to right, a 24-bit input group is formed by concatenating 3 8-bit input groups.
These 24 bits are then treated as 4 concatenated 6-bit groups, each of which is translated into a single digit in the base64 alphabet.
When encoding a bit stream via the base64 encoding, the bit stream must be presumed to be ordered with the most- significant-bit first.
*/
```

---

# Formatting

## Team Rules

```javascript
// every programmer has his own favorite formatting rules
// but if he works in a team
// then the team rules
```

---

# Formatting

## The Purpose of Formatting

```javascript
// communication
```

## The Newspaper Metaphor

```javascript
// high-level -> details
```

## Vertical Openness Between Concepts

```javascript
// each blank line is a visual cue
// that identifies a new and separate concept
```

<img src="images/logo.png" class="clean-logo">

---

# Formatting

## Vertical Distance

```javascript
// variables
// should be declared as close to their usage as possible

// instance variables
// should be declared at the top of the class

// dependent functions
// if one function calls another, they should be vertically
// close, and the caller should be above the called

// conceptual affinity
// certain bits of code want to be near other bits
```

<img src="images/logo.png" class="clean-logo">

---

# Formatting

## Horizontal Openness and Density

```javascript
function measureLine(line) {
  lineCount++;
  const lineSize = line.length();
  totalChars += lineSize;
  lineWidthHistogram.addLine(lineSize, lineCount);
  recordWidestLine(lineSize);
}

function root2(a, b, c) {
  const determinant = determinant(a, b, c);
  return (-b - Math.sqrt(determinant)) / (2 * a);
}
```

---

# Formatting

## Horizontal Alignment

```javascript
class FitNesseExpediter extends ResponseSender {
  ...
  let Socket          socket;
  let InputStream     input;
  let OutputStream    output;
  let Request         request;
  let Response        response;
  let FitNesseContext context;
  ...
 }
```

---

# Formatting

## Horizontal Alignment

```javascript
class FitNesseExpediter extends ResponseSender {
  ...
  let Socket socket;
  let InputStream input;
  let OutputStream output;
  let Request request;
  let Response response;
  let FitNesseContext context;
  ...
 }
```

<img src="images/logo.png" class="clean-logo">

---

# Formatting

## Breaking Indentation

```javascript
class CommentWidget extends TextWidget {
  const REGEXP = "^#[^\r\n]*(?:(?:\r\n)|\n|\r)?";
  CommentWidget(text) { super(text); }
  render() { return ""; }
}
```

---

# Formatting

## Breaking Indentation

```javascript
class CommentWidget extends TextWidget {
  const REGEXP = "^#[^\r\n]\*(?:(?:\r\n)|\n|\r)?";
  CommentWidget(text) {
  super(text);
  }
  render() {
    return "";
  }
}

```

<img src="images/logo.png" class="clean-logo">

---

# Error Handling

## Prefer Exceptions to Returning Error Codes

```javascript
if (deletePage(page) == E_OK) {
  if (registry.deleteReference(page.name) == E_OK) {
    if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
      logger.log("page deleted");
    } else {
      logger.log("configKey not deleted");
    }
  } else {
    logger.log("deleteReference from registry failed");
  }
} else {
  logger.log("delete failed");
  return E_ERROR;
}
```

---

# Error Handling

## Prefer Exceptions to Returning Error Codes

```javascript
try {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
} catch (e) {
  logger.log(e.getMessage());
}
```

<img src="images/logo.png" class="clean-logo">

---

# Error Handling

## Extract Try/Catch Blocks

```javascript
function delete(page) {
  try {
    deletePageAndAllReferences(page);
  } catch (e) {
    logError(e);
  }
}

function deletePageAndAllReferences(page) {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}

function logError(e) {
  logger.log(e.getMessage());
}
```

<img src="images/logo.png" class="clean-logo">

---

# Error Handling

## Error Handling Is One Thing

```javascript
// functions should do one thing
// error handing is one thing

// if the keyword try exists in a function
// it should be the very first word in the function and that
// there should be nothing after the catch/finally blocks
```

---

# Error Handling

## Don’t Return Null

```javascript
const employees = getEmployees();
if (employees != null) {
  for (let e of employees) {
    totalPay += e.getPay();
  }
}
```

---

# Unit Tests

## The Three Laws of TDD

**First law**
You may not write production code until you have written a failing unit test.

**Second law**
You may not write more of a unit test than is sufficient to fail, and not compiling is failing.

**Third law**
You may not write more production code than is sufficient to pass the currently failing test.

---

# Unit Tests

## Keeping Tests Clean

```javascript
// test code is just as important as production code
```

## Clean Tests

```javascript
// what makes a clean test? three things
// readability, readability, and readability
```

---

# Unit Tests

## One Assert per Test

```javascript
// tests come to a single conclusion
// that is quick and easy to understand
```

## Single Concept per Test

```javascript
// the best rule is that you should
// minimize the number of asserts per concept and
// test just one concept per test function
```

---

# Unit Tests

## F.I.R.S.T.

```javascript
// Fast
// Independent
// Repeatable
// Self-validating // Timely
```

---

# Classes

## Class Organization

```javascript
// constants
// private variables
// private instance variables
// functions
// private utilities called by a function right after
```

## Classes Should Be Small!

```javascript
// the first rule is that they should be small
// the second rule is that they should be smaller than that
```

---

# Classes

## The Single Responsibility Principle (SRP)

```javascript
// a class or module should have one, and only one, // reason to change
// SRP is one of the more important concept in OO design
```

## Cohesion

```javascript
// maintaining cohesion results in many small classes
```

## Emergence

```javascript
Simple Design Rule 1: Runs All the Tests
Simple Design Rules 2: No Duplication
Simple Design Rules 3: Expressive
Simple Design Rules 4: Minimal Classes and Methods
```

---

# Quelques outils

---

## Prettier

- [Prettier](https://prettier.io/docs/en/index.html) is an opinionated code **formatter**.
- Formatter = a tools that scans your files for style issues and automatically reformats your code to ensure consistent rules
- **Formating rules**: e.g. `max-len`, `no-mixed-spaces-and-tabs`, `keyword-spacing`,etc.

```
foo(reallyLongArg(),omgSoManyParameters(),IShouldRefactorThis(),isThereSeriouslyAnotherOne());
```

```javascript
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

---

## ESLint

- [ESLint](https://eslint.org/) is the most popular JavaScript **linter**
- Linter = a tool that scans code for errors and in some instances can fix them automatically
- Error can include:
  - Coding errors that lead to bugs
  - Stylistic errors
- **Code-quality rules**: eg `no-unused-vars`, `no-extra-bind`,`no-implicit-globals`, `prefer-promise-reject-errors`, etc.

---

## Style Guides

### Javascript

- [JavaScript Standard Style](https://standardjs.com/)
- [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
- [eslint-config-google](https://github.com/google/eslint-config-google#readme)

### React

- [ESLint-plugin-React](https://github.com/yannickcr/eslint-plugin-react)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

### API

- [Google](https://cloud.google.com/apis/design)
- [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

---

![bg fit](images/styles-compared.png)
