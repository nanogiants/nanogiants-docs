# NanoGiants Docs - Flutterflow

## Table of contents

- [NanoGiants Docs - Flutterflow](#nanogiants-docs---flutterflow)
  - [Table of contents](#table-of-contents)
  - [What is Flutterflow?](#what-is-flutterflow)
  - [When to use Flutterflow?](#when-to-use-flutterflow)
  - [Setting up a new project](#setting-up-a-new-project)
    - [Getting started](#getting-started)
    - [Adding a Github repository](#adding-a-github-repository)
    - [Integrating Firebase](#integrating-firebase)
  - [Building blocks](#building-blocks)
    - [Icons](#icons)
  - [Custom Code](#custom-code)
  - [Branching, merging, and versioning](#branching-merging-and-versioning)
  - [Best Practices](#best-practices)
    - [Keep components small](#keep-components-small)
    - [Folder structure](#folder-structure)
    - [Use the local tooling](#use-the-local-tooling)
  - [Ejecting](#ejecting)

---

## What is Flutterflow?

Flutterflow is a low-code development platform for creating apps, websites and other software utilizing the Flutter framework. It can also take care of building, deploying and distributing the product.

## When to use Flutterflow?

As with most low-code tools, Flutterflow can boost development speed and is great for quickly building UI and layouts. However you should be certain that Flutterflow can actually accommodate all needs of your proiject. Although Flutterflow offeres extensibility using code, this will slow down development and may not satisfy all requirements.

Keep in mind that the inital boost in productivity is most probably going to drop off as you add more features to your project. Reasons for this are that business logic and data management can be hard to understand later on and that refactoring tends to be a complex task in Flutterflow.

Flutterfow is able to export your project as Flutter code so that complex changes can be made in Flutter but be aware that these changes can not be integrated back into the Flutterflow project. This can be a viable option but be aware that working in parallel with Flutterflow and Flutter may lead to complex merge conflicts.

➕ In conclusion these are points in favour of using Flutterflow:

- Speed 🏎️ : Initial speed of development is essential
- Requirements 📝: The project's requirements will most probably be within Flutterflow's capabilities
- Personell 👨‍💻: There's going to be few people working on the project, needing to get a lot done quickly.

➖ In contrast here are some points that speak against using Flutterflow:

- Complexity 🧐: If the requirements of the project are not within Flutterflow's capabilities, it is probably best to use Flutter directly or concider a different technology all together.
- Personell 👨‍💻: If a lot of developers are going to work on the project (e.g. more than 2), Flutterflow is probably not the best choice as version control, history, branching and merging are going to pose a challenge.
- Maintainability ⚙: If long term maintainability is a priority, it is probably better to use a different technology. Flutterflow projects can be hard to understand and maintain at a later stage, refactoring tends to be difficult and the project will always be dependet on Flutterflows dependencies. E.g. Flutterflow dictates a certain Flutter version, which again prohibits using certain libraries.

---

## Setting up a new project

Setting up a new project is where Flutterflow really shines. The process is streamlined and helpful. I will document the first steps to give an idea of what to look our for.

### Getting started

- The getting started dialogue offers a selection of templates to get the project started. For customizability it is probably best to use a blank app, but the templates are an excelent way to inspect the the inner workings of flutterflow and the elements that are offered.
  ![Creation Screen](../files/flutterflow_screenshots/Bildschirmfoto%202024-06-26%20um%2020.07.45.png)

- Next step is to choose thhe package name and color themes. The package name is what will be used to identify the project on the app stores if you decide to publish it with Flutterflow.
  ![Creation Screen](../files/flutterflow_screenshots/Bildschirmfoto%202024-06-26%20um%2020.08.20.png)
- The color themes are just a suggestions to get started and can be changed later on.
- As seen above the project can be published to the web as well.
- Lastly Flutterflow will offer to bootstrap and connect a new Firebase project, too. If this is acceptable for the project, Firebase should definitely be considered as it offers a deep integration with Flutterflow. However, I would reccomend to set up the Firebase project manually as it is kind of error prone to let Flutterflow do it for you.

### Adding a Github repository

- Strictly speaking, this step is optional, as Flutterflow can handle your project without a code repository connected. However, there are some benefits to having a code repository connected including:
  - The ability to inspect the code and history of the project
  - Building the app manually and locally
  - Capability to edit the code manually and eject the project from Flutterflow
- Currently only Github is supported and connecting to the repository is very straight forward as shown below:
  ![Github Screenshot](../files/flutterflow_screenshots/Bildschirmfoto%202024-06-26%20um%2020.25.39.png)

- Once the repository is connected, Flutterflow will create a branch called 'Flutterflow' and push your changes to the repository on request.
  ![Github Screenshot](../files/flutterflow_screenshots/Bildschirmfoto%202024-06-26%20um%2020.28.16.png)

- 🚩 be aware that changes to the code in the repository will not be reflected in the Flutterflow project. They can not be integrated back into the project.

### Integrating Firebase

- Firebase is a useful tool to integrate ready made authenitcation, database, user management, storage and other features into your Flutterflow project.
  As mentioned above I would recommend to set up the Firebase project manually. You might also need a google cloud account. Create these two and save the project ids. Furthermore you will need to add the following e-mail address as editor to the Firebase project: firebase@flutterflow.io#
  ![Firebase Screenshot](../files/flutterflow_screenshots/Bildschirmfoto%202024-06-26%20um%2020.30.33.png)

---

## Building blocks

### Icons

---

## Custom Code

---

## Branching, merging, and versioning

---

## Best Practices

### Keep components small

### Folder structure

### Use the local tooling

---

## Ejecting

**[back to top](#table-of-contents)**
