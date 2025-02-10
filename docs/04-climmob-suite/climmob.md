---
sidebar_position: 2
---

# ClimMob platform

> MrBot Software Solutions 

Experimental citizen science offers new ways to organize on-farm testing of crop varieties and other agronomic options. Its implementation at scale requires software that streamlines the process of experimental design, data collection and analysis, so that different organizations can support trials. This article considers ClimMob software developed to facilitate implementing experimental citizen science in agriculture. We describe the software design process, including our initial design choices, the architecture and functionality of ClimMob, and the methodology used for incorporating user feedback. Initial design choices were guided by the need to shape a workflow that is feasible for farmers and relevant for farmers, breeders and other decision-makers. Workflow and software concepts were developed concurrently. The resulting approach supported by ClimMob is triadic comparisons of technology options (tricot), which allows farmers to make simple comparisons between crop varieties or other agricultural technologies tested on farms. The software was built using Component-Based Software Engineering (CBSE), to allow for a flexible, modular design of software that is easy to maintain. Source is open-source and built on existing components that generally have a broad user community, to ensure their continuity in the future. Key components include Open Data Kit, ODK Tools, PyUtilib Component Architecture. The design of experiments and data analysis is done through R packages, which are all available on CRAN. Constant user feedback and short communication lines between the development teams and users was crucial in the development process. Development will continue to further improve user experience, expand data collection methods and media channels, ensure integration with other systems, and to further improve the support for data-driven decision-making.

From Design (page 11) of short guide:

Once you have chosen which technology options will be evaluated and you have identified which criteria are most important to the farmers, your project can start.

Create a new project

As explained earlier, tricot uses ClimMob (climmob.net), a free online software specifi-ally created for tricot projects. ClimMob is the fundamental tool for any tricot project, and is used for the following activities: 

• Designing the experiment
• Generating a randomized list of combinations of three technology options for the individual trial packages
• Project management and data overview
• Input of farmers’ observation data
• Data analysis and automatic generation of the post-trial information sheets for farmers

The basic steps for setting up an account and developing and adjusting your project are listed below. More detailed information on how to use and make the most of the ClimMob software can be found on the ClimMob website. 

A. Setting up an account
To create a new user account, access the ClimMob software from the main menu on the ClimMob homepage and click on ‘Log in or register an account’. If you already have an account, you can enter your username and password, and click ‘Log in’. If you have not registered, start the process by clicking on ‘Register an account’. 

B. Creating a project
When you first log in after having registered, you will see a ‘Create a new project’ button. After clicking here, you will be asked to fill out 
general information, size and location of your tricot experiment. In cases where you have already created a project, you can navigate to ‘Projects’ (upper right corner of your screen) to get an overview of your existing projects, navigate between them and create new projects. 

After selecting an existing project or designing a new one, ClimMob will take you to the Main menu, which is the central hub to design your tricot experiment. You need to specify the information on each of the field agents who will work on this project, the technology options that you want to compare, and the registration questions the farmers will be asked when they register to participate. ClimMob will only move on to the next step after you have provided this information. 

C. Define the evaluation criteria 
Depending on the technology options included in your tricot experiment and the needs of your target group, you will define which observations the farmers should make. Each observation corresponds to a question on their observation cards. For example, common criteria for varieties are ‘yield’ or ‘plant height’. The corresponding questions would be ‘Which variety produced highest yield / lowest yield?’ and ‘With which variety did plants grow tallest / least tall?’ See also Step 6 about how farmers will observe crop performance on their trial plots.

D. Define the time point for evaluation
The intervals at which farmers are expected to make an observation during the trials will vary depending on the technologies being tested. For each evaluation criterion you will need to decide at which point in the tricot project farmers make their observations. For example, if you intend to test different crop varieties, you might want to ask farmers to make observations at the start of the project (day of sowing), again after 30 days, and lastly at the end of the trial (day of harvest). 

E. Assign field agents
All field agents who will work on your project must be added individually to the ClimMob project design. Field agents are the people who will be working on site, communicating with the farmers and later collecting observation data. You need to assign a username and password to each field agent, which they will use when logging collected data into the ODK Collect app.

F. Select technology options
Here you specify the technology options you will compare in your tricot experiment. We recommend a pool of 8 to 12 options. For example, if you want to test which bean variety is best adapted to the region, you would add the names of all the bean varieties to be tested. If you want to test which fertilizer type makes crops grow best, you would add the names of all the fertilizer types to be tested.

G. Prepare farmer registration
Once farmers have registered to participate in the trials they will be asked a number of questions by their field agent. Here, you will define which questions should be asked. This information is important for administrative reasons (farmer name, telephone, village, and other relevant details) and for data analysis (e.g. registering the gender and age can help to understand if social indicators influence farmers’ preferences for a certain technology option). You can define the questions yourself here, or you can use the standardized Rural Household Multi-Indicator Survey (RHoMIS) 
provided on the ClimMob website. This is a widely validated format used to characterize farming households. Once you define the list of questions, they will become available as an ODK form, which can be downloaded to your ODK Collect app. Field agents can input the information directly into the app on their smartphone or tablet when registering the participating farmers.

H. Prepare data collection
Throughout their tricot trial, the farmers make comparative observations about their three technology options. Here, you will define which types of observations farmers should make. For example, a common criterion to observe is the total crop yield achieved with each technology option. You must decide which criteria are important for your experiment. Eventually, all these questions will be printed on the observation cards and handed out to farmers at the distribution stage.

I. Prepare the packages
ClimMob will take you through the steps to execute the randomization. Once the randomization is set up, ClimMob will make a list of the packages and the content of each package (each has three technology options drawn from a larger set). This list is available as a downloadable spreadsheet (available in the Downloads section). Also, ClimMob generates a document with QR codes for each of the packages. The project implementer prints the 
codes and pastes it on to each package. These QR codes are used to identify each package during distribution and avoid mistakes. Print these documents and use them to prepare the packages. This process should be done very carefully. Try to follow a procedure that avoids mistakes and allows for checks. 

At the end, each package has a unique number (1, 2, 3, etc.) and contains three different technology options (package 1 has 1A, 1B, and 1C). To get there, organize the work in the following steps:

• Before starting, keep all small bags of one technology option together, each having their own place on a table or a corner of the room. 
• As a next step, mark all the small bags with their respective code (1A, 1B, 1C, 2A, 2B,etc.).
• Only when all the small bags are coded, they are picked up and combined in packages of three. 
• When a package is ready, it is handed to a different person who checks its contents before closing it.