# NanoGiants Docs - Tech Stack 
<!-- section: Introduction -->
<!-- Describe what this document refers to. At what target audience is it aimed? -->

## Table of contents
<!-- section: Table of contents -->
<!-- This shows what sections are covered in this document and gives the reader the possibility to jump to a specific section. It is highly recommended to use a TOC. -->
<!-- This has two items called first and second respectively. Remove them and use your own -->
- [NanoGiants Docs - Tech Stack](#nanogiants-docs---tech-stack)
  - [Table of contents](#table-of-contents)
  - [What is a tech stack?](#what-is-a-tech-stack)
  - [How do we visualize our tech stack?](#how-do-we-visualize-our-tech-stack)
  - [How do we maintain our tech stack?](#how-do-we-maintain-our-tech-stack)

<!-- section: Content -->
<!-- This the actual content. -->

## What is a tech stack?
A tech stack is the set of technologies required to build, maintain, and deploy a software project. When we consider an organisational scope, we must consider all projects (including legacy ones ) to describe the tech stack. 

**[back to top](#table-of-contents)**

## How do we visualize our tech stack?
We use a tool called [Tech Radar] (https://techradar.nanogiants.de). This is a compact yet flexible overview of a tech stack. It consists of segments that categorise technologies (e.g., programming languages, frameworks, DevOps, infrastructure, ...) and rings that describe the phase in which we place the technology. The phases we use are described as follows:

- Adopt: This technology is well established in our company and we use it for our daily work.
- Trial: We plan to move this technology into the adopt phase and want to learn more about it. Therefore, we are actively integrating it into ongoing projects.
- Assess: This technology seems interesting and we want to understand it better. Therefore, we are testing it (preferably in a side project).
- Watch: This technology seems interesting, but is not yet ready to be evaluated. We will put it on a watch list instead.
- Hold: We have stopped this technology and do not recommend it for use.

The categories we use are listed as follows:

- Client Web Technology
- Client Mobile Technology
- Backend Technology
- Data 
- Infrastructure
- Services

**[back to top](#table-of-contents)**

## How do we maintain our tech stack?
We meet in a group called the Tech Council. As a group, we discuss the current state of the tech stack as well as the tech radar and decide if we want to make changes to it. Anyone is eligible to suggest changes. He or she is responsible for presenting the proposal in an appropriate manner. The Council decides whether to accept or reject the proposed change, or whether it needs to be modified before it is accepted. 

A change request may include any of the following:
- Adding a new technology to one of the predefined phases and categories
- Moving an existing technology from one phase to another
- Removing an existing technology from the tech stack altogether

Below is a list of criteria to consider when proposing a technology for our tech stack:
- How well is the technology maintained?
- How popular is the technology (e.g. Github stars, number of dependents, ...)?
- Who is the backer or what company/community is behind this technology?
- Is this technology likely to be future-proof?
- How is this technology licensed? Can we use such technology?
- What is the test coverage of this software? Are other metrics relevant (e.g., snyk)?
- How many dependencies does this technology have?
- Is this technology well documented?
- Is this technology compatible with our existing tech stack and is it a suitable addition?

**[back to top](#table-of-contents)**
