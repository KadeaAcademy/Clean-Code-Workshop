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

## Reading Code from Top to Bottom

```
// the Stepdown Rule
```

---

# Functions

## Switch Statements

```javascript
class Employee...
  payAmount() {
    switch (getType()) {
    case EmployeeType.ENGINEER:
      return _monthlySalary;
    case EmployeeType.SALESMAN:
      return _monthlySalary + _commission;
    case EmployeeType.MANAGER:
      return _monthlySalary + _bonus;
    default:
      throw "Incorrect Employee";
    }
  }
```

# Functions

## Switch Statements

```javascript
class EmployeeType...
  payAmount(employee)...

class Salesman extends EmployeeType...
  payAmount(employee) {
    return employee.getMonthlySalary() + employee.getCommission();
  }

class Manager extends EmployeeType...
  payAmount(employee) {
    return employee.getMonthlySalary() + employee.getBonus();
  }
```

---

# Functions

## Use Descriptive Names

```javascript
(testableHtml) => includeSetupAndTeardownPages;

includeSetupAndTeardownPages,
  includeSetupPages,
  includeSuiteSetupPage,
  includeSetupPage;
// what happened to
includeTeardownPages, includeSuiteTeardownPage, includeTeardownPage;
```

## Function Arguments

```javascript
// the ideal number of arguments for a function is zero
```

---

# Functions

## Common Monadic Forms

```javascript
// if a function is going to transform its input argument, // the transformation should appear as the return value

StringBuffer transform(in)
// is better than
void transform(out)
```

## Flag Arguments

```javascript
render(true);
```

---

# Functions

## Common Monadic Forms

```javascript
// asking a question about that argument

fileExists(“MyFile”)
// operating on that argument, transforming and returning it
fileOpen(“MyFile”)
// event, use the argument to alter the state of the system
passwordAttemptFailedNtimes(attempts)
```

## Flag Arguments

```javascript
renderForSuite();
renderForSingleTest();
```

---

# Functions

## Dyadic Functions

```javascript
writeField(name);
// is easier to understand than

writeField(outputStream, name);
// perfectly reasonable
const p = new Point(0, 0);
// problematic
assertEquals(expected, actual);
```

## Triads

```
  assertEquals(message, expected, actual)
```

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

---

# Functions

## Have No Side Effects

```javascript
// do something or answer something, but not both
set(attribute, value);

setAndCheckIfExists

if (attributeExists("username")) {
  setAttribute("username", "unclebob");
  ...
}
```

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

---

# Comments (good)

## Explanation of Intent

```javascript
//This is our best attempt to get a race condition //by creating large number of threads.
for (i = 0; i < 25000; i++) {
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

---

# Comments (bad)

## Mumbling

```javascript
try {
  const propertiesPath = propertiesLocation + "/" + PROPERTIES_FILE;
  const propertiesStream = new FileInputStream(propertiesPath);
  loadedProperties.load(propertiesStream);
} catch(IOException e) {
  // No properties files means all defaults are loaded
}
```

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
public void addCD(title, author,
tracks, durationInMinutes) {
CD cd = new CD();
cd.title = title;
cd.author = author;
cd.tracks = tracks;
cd.duration = durationInMinutes;
 }
```

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
  words[] = line.split("\\W");
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

# Comments (bad)

## Nonlocal Information

```javascript
/*
- Port on which fitnesse would run. Defaults to <b>8082</b>. \*
- @param fitnessePort
*/
setFitnessePort(fitnessePort) {
  this.fitnessePort = fitnessePort;
}
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

# Comments (bad)

## Inobvious Connection

```javascript
/*
start with an array that is big enough to hold all the pixels
(plus filter bytes), and an extra 200 bytes for header info
*/
this.pngBytes = new byte[((this.width + 1) _ this.height \* 3) + 200];
```

## Function Headers

```javascript
// short functions don’t need much description
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
  determinant = determinant(a, b, c);
  return (-b - Math.sqrt(determinant)) / (2 * a);
}
```

---

# Formatting

## Horizontal Alignment

```javascript
class FitNesseExpediter extends ResponseSender {
  let Socket          socket;
  let InputStream     input;
  let OutputStream    output;
  let Request         request;
  let Response        response;
  let FitNesseContext context;
  ...
 }
```

# Formatting

## Horizontal Alignment

```javascript
public class FitNesseExpediter extends ResponseSender {
  let Socket socket;
  let InputStream input;
  let OutputStream output;
  let Request request;
  let Response response;
  let FitNesseContext context;
  ...
 }
```

# Formatting

## Breaking Indentation

```javascript
public class CommentWidget extends TextWidget {
  static final REGEXP = "^#[^\r\n]*(?:(?:\r\n)|\n|\r)?";
  CommentWidget(text) { super(text); }
  render() { return ""; }
}
```

---

# Formatting

## Breaking Indentation

```javascript
public class CommentWidget extends TextWidget {
  static final REGEXP = "^#[^\r\n]\*(?:(?:\r\n)|\n|\r)?";
  CommentWidget(text) {
  super(text);
  }
  render() {
    return "";
  }
}

```

---

# Formatting

## Team Rules

```javascript
// every programmer has his own favorite formatting rules
// but if he works in a team
// then the team rules
```

# Objects and Data Structures

## Data Abstraction

```
      Concrete Point
      public class {
          public x;
          public y;
}

```

# Objects and Data Structures

## Data Abstraction

```
      Abstract Point
      public interface {
          getX();

getY();
void setCartesian(x, y); getR();
getTheta();
void setPolar(r, theta);
}
```

# Objects and Data Structures

## Data Abstraction

```
      Concrete Vehicle
      public interface Vehicle {
          getFuelTankCapacityInGallons();
          getGallonsOfGasoline();
}

```

# Objects and Data Structures

## Data Abstraction

```
      Abstract Vehicle
      public interface Vehicle {
          getPercentFuelRemaining();
}

```

# Objects and Data Structures

## Data/Object Anti-Symmetry

```
      // objects hide their data behind abstractions and
      // expose functions that operate on that data
      // data structure expose their data and
      // have no meaningful functions
```

# Objects and Data Structures

## The Law of Demeter

```
final outputDir = ctxt.getOptions() .getScratchDir()
.getAbsolutePath();
Train Wrecks
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final outputDir = scratchDir.getAbsolutePath();
final outputDir = ctxt.options.scratchDir.absolutePath
;
```

# Error Handling

## Prefer Exceptions to Returning Error Codes

```
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

# Error Handling

## Prefer Exceptions to Returning Error Codes

```
try {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}
catch (Exception e) {
  logger.log(e.getMessage());
}

```

# Error Handling

## Extract Try/Catch Blocks

```

public void delete(Page page) {
try {
deletePageAndAllReferences(page);
} catch (Exception e) {
logError(e);
}
}

private void deletePageAndAllReferences(Page page) {
deletePage(page);
registry.deleteReference(page.name);
configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
logger.log(e.getMessage());
}

```

# Error Handling

## Error Handling Is One Thing

```
      // functions should do one thing
      // error handing is one thing

// if the keyword try exists in a function
// it should be the very first word in the function and that // there should be nothing after the catch/finally blocks

```

# Error Handling

## Define the Normal Flow

```

try {
MealExpenses expenses = expenseReportDAO
.getMeals(employee.getID()); m_total += expenses.getTotal();
} catch(MealExpensesNotFound e) { m_total += getMealPerDiem();
}

```

# Error Handling

## Define the Normal Flow

```

MealExpenses expenses = expenseReportDAO .getMeals(employee.getID());
m_total += expenses.getTotal();

```

# Error Handling

## Don’t Return Null

```

List<Employee> employees = getEmployees(); if (employees != null) {
for(Employee e : employees) { totalPay += e.getPay();
} }

```

# Error Handling

## Don’t Return Null

```

List<Employee> employees = getEmployees(); for(Employee e : employees) {
totalPay += e.getPay();
}
public List<Employee> getEmployees() { if( .. there are no employees .. )
}
return Collections.emptyList();

```

# Error Handling

## Don’t Pass Null

```

public xProjection(p1, p2) { return (p2.x – p1.x) _ 1.5;
}
public xProjection(p1, p2) { if (p1 == null || p2 == null) {
throw InvalidArgumentException ("Invalid argument for MetricsCalculator.xProjection");
}
return (p2.x – p1.x) _ 1.5; }

```

# Unit Tests

## The Three Laws of TDD

```

// first law
// you may not write production code until
// you have written a failing unit test
// second law
// you may not write more of a unit test
// than is sufficient to fail, and not compiling is failing
// third law
// you may not write more production code
// than is sufficient to pass the currently failing test

```

# Unit Tests

## Keeping Tests Clean

```
// test code is just as important as production code
```

## Clean Tests

```
// what makes a clean test? three things
// readability, readability, and readability
```

# Unit Tests

## One Assert per Test

```
      // tests come to a single conclusion
      // that is quick and easy to understand
```

## Single Concept per Test

```
      // the best rule is that you should
      // minimize the number of asserts per concept and
      // test just one concept per test function
```

# Unit Tests

## F.I.R.S.T.

```
// Fast
// Independent
// Repeatable
// Self-validating // Timely
```

# Classes

## Class Organization

```
// public static constants
// private static variables
// private instance variables
// public functions
// private utilities called by a public function right after
```

## Classes Should Be Small!

```
      // the first rule is that they should be small
      // the second rule is that they should be smaller than that
```

# Classes

## The Single Responsibility Principle (SRP)

```
// a class or module should have one, and only one, // reason to change
// SRP is one of the more important concept in OO design
```

## Cohesion

```
// maintaining cohesion results in many small classes
```

## Emergence

```
Simple Design Rule 1: Runs All the Tests
Simple Design Rules 2: No Duplication
Simple Design Rules 3: Expressive
Simple Design Rules 4: Minimal Classes and Methods
```
