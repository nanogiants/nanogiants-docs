# NanoGiants Docs - Flutterflow

## Table of contents

- [Table of contents](#table-of-contents)
- [What is Flutterflow?](#what-is-a-tech-stack)
- [When to use Flutterflow?](#when-to-use-flutterflow)
- [Setting up a new project](#setting-up-a-new-project)
  - [Create a new project](#create-a-new-project)
  - [Adding a Github repository](#adding-a-github-repository)
  - [Integrating Firebase](#integrating-firebase)
- [Building blocks](#buildingblocks)
  - [Icons](#icons)
- [Custom Code](#customcode)
- [Branching, merging, and versioning](#branching-merging-and-versioning)
- [Best Practices](#how-do-we-visualize-our-tech-stack)
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

**[back to top](#table-of-contents)**
