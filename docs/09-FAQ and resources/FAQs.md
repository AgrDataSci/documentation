---
sidebar_position: 1
---

# Frequently asked questions

### What is the incentive for growers to participate?

Through participation in a tricot experiment, growers are exposed to new technologies: For example, they may try out new crop varieties directly under the conditions of their own farm. This way, participating growers can learn about new options to improve their farming and might discover useful innovation under realistic conditions. Many growers are also motivated by being part of a research project, interacting with researchers and contributing to knowledge generation.

Even when a grower does not immediately identify a suitable option among the three tested technologies, participation can be useful: growers often discuss results with their neighbors, exchange seeds, and subsequently try out options that were successful on other participants’ farms.

### Can I merge data from two different tricot projects?

You can merge the data if both projects are testing the same technology and you have at least one technology option (e.g. the same crop variety) in both projects. The merger can be done, for example, in the R package using ClimMob R Tools and your API key. You find your API key in the ClimMob software, by clicking on your name >>> Profile.

### Does the ODK Collect app work on iOS smartphones?

As of today, there is no ODK Collect app for iOS. You need an Android phone to run ODK Collect.

### Do field agents need constant internet connection while collecting trial data with ODK Collect?

No. The field agents can input the data they collect from the observers even while they are not connected to the internet. Field agents can later upload the data to ClimMob, at the first opportunity to connect to the internet again.

### Do the growers need a smartphone to participate?

No. They note down all their field observations on observation cards. Only the field agents need a smartphone or tablet to enter the growers’ data into the ODK Collect app. ODK Collect will then upload and merge all data into ClimMob.

### How do the growers record their field observations?

At the beginning of the tricot experiment, growers will receive observation cards. These paper cards contain all the questions you decided they should answer during the experiment. The observation cards are very easy to use, growers just need a pen. At the end of the tricot experiment, the data that was recorded on the observation cards will be collected by the field agents.

### Should growers control their field conditions?

Tricot experiments are designed to generate results that apply to realistic management and farm conditions. In order to generate results that are meaningful for general farming practice, the small trials should be cultivated in strictly the same way as the general farming plot. If growers control conditions, for example, by applying mineral fertilizer, they might end up selecting a variety that will not fare well on a larger scale, without fertilizer.

## How should a grower rank the varieties if there are no evident differences?

That’s a tough question. As tricot relies on comparison data, all data must be entered in that format. That means, growers have to decide which variety grows best, which grows worst. They cannot record their observations saying ‘all varieties performed equally well’. We generally advise everybody to just take another look – surely, there is some small difference.

### The growers work in different environments. How can their observations be merged?

Growers provide rankings based on what they observe in their fields. Under different environmental conditions, such as different climate, these observations may vary. The ClimMob process allows for geospatial disaggregation of results by registering growers’ GPS locations. Using existing maps of temperature, rainfall, altitude, and other environmental variables, ClimMob can provide different results for different environments. For example, the results may show that one variety had highest yield in lowlands, while another variety had highest yield in higher altitudes. If the observations did differ significantly between environments, ClimMob will automatically provide location-specific results. You may need to use our R package ClimMobTools for this analysis.

### Does every grower compare their three options with a local control?

Every grower receives and compares three technology options, for example three different crop varieties. If you want to compare these new varieties with the local one, you can do that but it’s not a must. There are two ways to do so. First, you can include the variety that growers usually grow (their ‘local control’) to the comparison as an additional question at the end of the experiment (e.g. Does variety A performed better or worse than the local variety).

Secondly, local varieties can also be included in the pool of test varieties. Some growers will then “blindly” receive a local variety as one of their three options for evaluation. At the end of the trial and once the data from all growers is analyzed, every grower will receive an individual evaluation of which variety has performed best under their local conditions. Perhaps in the next year, they want to grow a different variety, as it outperformed their local variety!

### What agricultural technologies can I innovate using tricot?

So far, tricot has mostly been used to evaluate annual crop varieties (e.g. beans, rice, wheat, chickpeas). But you can use tricot to evaluate different options of any agronomic technology, such as fertilizer management regimes, different irrigation systems, intercropping systems or early establishment of perennial crops.

Please send us an email if you are thinking about testing another technology, and are unsure about how to proceed. We think the tricot method is powerful, and together with the ClimMob software can easily be applied to a range of agronomic technologies.

### Who created ClimMob?

ClimMob and the tricot methodology have been created by Jacob van Etten, PhD, and developed by a team of researchers and programmers at Bioversity International (CGIAR). Learn more about the development process through this publication in
Experimental Agriculture. (Jacob van Etten, et al. 2019. First experiences with a novel farmer citizen science approach: Crowdsourcing participatory variety selection through on-farm triadic comparisons of technologies (tricot). Experimental Agriculture, 55(S1). https://doi.org/10.1017/S0014479716000739)

### I understand that I design the tricot experiment, and participating growers run the trials on their farms. But who are these field agents?

The field agents act as intermediaries between you and the growers.

Let’s say you are designing a tricot experiment that involves 300 growers. All these growers will need to receive initial training; seeds or fertilizer regimes they are about to compare; and in general a person to contact if they have any questions. So the field agents take care of all these tasks, each field agent might care for a group of 10 to 20 growers. Often, they might themselves be a local grower who knows the area and other growers well.

You as administrator of the tricot experiment could also be a field agent.

### How long does it take to run a tricot experiment?

The duration of a tricot experiment depends on the technology you want to test, and on how many cycles you run. For example, if you test different varieties of annual crops, first results can be available after just one cropping season. You can use these results to narrow down the number of varieties for testing in the following season, adjust your tricot experiment and so improve your selection over time.

You should allow enough time before and after the tricot experiment for organizational tasks, to recruit and train field agents and growers, and afterwards to communicate the results of the experiment to the growers.

### How many field agents and growers are required to run a successful tricot experiment?

This depends on the technology you want to test. And also on the resources you have available. However, the ClimMob software will help you plan all those steps, and tailor your tricot experiment to your needs and resources. As a benchmark, reasonable tricot experiments have been performed with just 300 growers, with field agents looking after 10 to 20 growers each.

### I am familiar with Participatory Variety Selection (PVS). Why should I use tricot?

The tricot approach is based on the idea of Participatory Variety Selection: New crop varieties get evaluated by growers, on their own fields, and for traits that are of direct interest to them. The unique idea behind tricot consists in “crowdsourcing” the data. This makes tricot experiments more flexible, less resource-consuming and easier to scale up to very high numbers of contributors, representing more diverse environments.

For example, comparing a PVS and a tricot experiment on common bean selection in Central America showed us that the tricot approach was about a quarter cheaper compared to the PVS experiment.

### How much does it cost to run a tricot experiment?

There is no one fixed answer, but a tricot experiment can be tailored to the resources you have available. As a starting point, here are some of the items you will need to budget for:

* a computer with internet connection to run the ClimMob software
* enough experimental packages of seeds/fertilizer treatments etc. (the technology you want to compare) to distribute among the growers
* training events for recruiting and training field agents
* training events for recruiting and training growers
* time and cost involved for field agents to go out and collect data from the growers
* possibly smartphones / tablets to collect data (field agents might already have phones, and the ODK Collect app is a compatible Android app)

### Is there a cost for any of the software that I need for running a tricot experiment (ClimMob, ODK Collect)?

No, both ClimMob and ODK Collect are free. On ClimMob.net, you will find everything you need for planning, designing and analyzing your tricot experiment. The Android smartphone app “ODK Collect” is used by the field agents to collect data from growers in the field, without the need for internet connectivity.

### Every grower compares only three technology options. Does that mean I can only include three options in the whole tricot experiment?

No, you can include more than three technology options in your tricot experiment. We recommend you pre-select a pool of 7 to 20 different options that you would like to test.

Every grower will receive a personal trial package which contains only three technology options, out of the larger pool. For example, every grower receives seeds of three different crop varieties. It’s important to know that each grower receives “their” specific three varieties based on a strict randomization scheme. The ClimMob software takes care of organizing which three varieties go to which grower.


Suggested FAQs for the ClimMob Chapter:

### Do I need to be a programmer to use ClimMob?

No, ClimMob is designed to be user-friendly and accessible, even for users without technical backgrounds.

### Can ClimMob be used without internet access in the field?

Yes, data can be collected offline with ODK Collect and uploaded once the device has internet access.

### How is ClimMob different from other agricultural data platforms?

ClimMob is designed specifically for participatory testing using the tricot method. It is open-source, modular, and tailored to multi-actor agricultural innovation.

### What crops or technologies can I test with ClimMob?

Any agricultural technology that can be compared in sets of three—e.g., crop varieties, fertilizers, planting methods—can be tested with ClimMob.

### Is ClimMob free to use?

Yes, ClimMob is open-source and free for anyone to use.

