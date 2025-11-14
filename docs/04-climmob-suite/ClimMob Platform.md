---
sidebar_position: 1
---

### A software platform for experimental citizen science in agriculture.

ClimMob supports tricot trial implementers in evaluating technology options across diverse contexts with a one-platform solution to design, manage, and share experiments. It helps implementers plan and monitor processes while ensuring that relevant outputs reach researchers, field agents, and trial participants at the right time. This enables effective trial operations and agile, data-based decisions, underpinned by an excellent user experience.

ClimMob is a **free, open-source, online platform** for participatory testing projects. It guides users through all stages of their tricot projects: from project design and generation of randomized test packages, to efficient data collection, automated analysis, and reporting.

●	Current version: ClimMob 3.

●	Data collection: via the Android app ODK Collect. 

●	Analysis: uses the R package ClimMobTools.

Requirements: An Android smartphone or tablet for field data collection

### Why ClimMob?

Participatory testing in agriculture can be complex, involving multiple actors—such as project implementers, field agents, and farmers—often across different regions or countries. These projects generate large volumes of data that must be organized, validated, and analyzed.

ClimMob was custom-built to streamline this complexity by supporting:

●	Project design and planning.

●	Generation of randomized test packages.

●	Efficient data collection and storage.

●	Monitoring of data and project progress.

●	Automated data analysis and reporting.

By simplifying all stages of the workflow, ClimMob makes tricot projects more manageable, scalable, and successful.

### Software architecture and design principles

a.	Design philosophy

ClimMob’s architecture was shaped by the need for a feasible and project-owner-oriented workflow, while also addressing the requirements of breeders, researchers, and field agents. The platform is designed primarily for scientists and project coordinators who lead participatory trials, ensuring they can manage projects efficiently while keeping outputs relevant for farmers and decision-makers. The software and workflow were developed in parallel to ensure technical coherence, usability, and alignment with real-world project management needs.

b.	Component-based engineering

ClimMob is built using Component-Based Software Engineering (CBSE). This allows for a flexible and modular platform that is easy to update and maintain.

c.	Open-source foundation

ClimMob is based on robust, widely adopted open-source components, including:

●	Open Data Kit (ODK).

●	ODK Tools.

●	PyUtilib Component Architecture.

All data analysis is conducted through R packages, particularly the ClimMobTools package, ensuring reproducibility and transparency.

### User-centered development

From the beginning, ClimMob has followed an iterative and user-centered development process, marked by:

●	Ongoing feedback from users

●	Short communication loops between developers and field teams

●	Continuous improvements based on real-world use

This has resulted in a platform that adapts to the evolving needs of agricultural innovation projects.

### Who uses ClimMob—and How?

ClimMob was built to support a range of users within participatory testing projects:

a.	Implementers (project leaders)

They benefit from tools for project setup, assigning field agents, and managing test packages. ClimMob also offers automatic statistical reports, enabling data-informed decision-making.

b.	Field Agents

They register participants and collect data using the ODK Collect app. This ensures data entry is quick, efficient, and synchronized with ClimMob.

c.	Testers (farmers or participants)

They receive their test results soon after data submission. This rapid feedback helps them learn from peers and adopt the most promising technologies.

### What’s next for ClimMob?

Ongoing development of ClimMob focuses on:

●	Improving user experience (UI/UX).

●	Expanding data types and media (e.g. audio, photos, sensor data).

●	Enhancing integration with other platforms.

●	Strengthening support for data-driven agricultural decision-making.



