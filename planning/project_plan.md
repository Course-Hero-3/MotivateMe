# Project Plan

Pod Members: **Stephane Mbenga, Kian Ranjbar, Gikai Andrews**

## Problem Statement and Description

Problem Statement: Student planners can be boring and stressful to look at, especially if the schedule is constantly packed and seems to be never-ending. Why not add a bit of motivation to keep students up and running? Besides organizing their school life, MotivateMe allows users to see fun stats on previous tasks they have completed in order to keep them motivated. From wanting to increase their test scores to simply maintaining their already adequate project scores, students have something to look forward to besides an ugly transcript.

Description: MotivateMe allows users to create accounts in order to be able to access their information anywhere as long as they are connected to the internet! After logging in, users can see their Dashboard which briefly displays a small amount of upcoming tasks they have planned, as well as some statistics to see their previous performances in certain categories. In the To-Do Page, users can add, remove, update, and complete tasks. It also shows a full view of all upcoming tasks. The last feature that makes our app stand out is our Recap Page which shows graphs, charts, and other visualizations of the user's statistics in hopes to motivate them to continue doing well, or perhaps motivate them to do better.

## User Roles and Personas

User Roles:
* Student: A scholar who wants to organize their schedule and log assignments

User Personas:

* James: James is an incoming freshman at Cornell University and will be majoring in computer science. In highschool hestruggled to keep track of assignments he needed to complete and was overwhelmed most of the time. He has never had a system for staying organized in terms of his assignments, homeworks, and exams but wants to change and stay organized to take some stress off his shoulders and do better in college. 
   
* Jonathan: Jonathan is well into his third year at the University of Michigan, and gets demotivated when he is assigned work for his classes. He wishes he was more motivated and inspired to start his work early and finish on or before the deadlines.

* Owen Wilson is a student at Saddleback Community College who just recently came back from a one year break. However, he forgot how fast paced school was and since he wants to transfer by summer, he can’t afford to fail any of his classes. Therefore, he downloaded MotivateMe on his laptop in order to keep an agenda of his things. He is a business major so every morning he usually goes on his laptop to complete material online, and that is when he enters items he needs to do, as well as the items he has completed the previous day. He is familiar with technology as he is 20 years old so navigating around the app is not a problem. Some potential pain points may be that he cannot access it on his mobile device on the go.

* Stephany is a very smart student-athlete at UCLA who plays water polo and never has free time. Whether it’s competitive matches or extremely hard tests, she’s always booked. She majors in cognitive science with hopes of becoming a pediatrician later on after graduating with her Bachelor’s. After showing up to one of her classes on the third week of the quarter, and not knowing there was a test, she failed a test for the first time in her life. As a preventive measure, she started using MotivateMe on her dorm computer to keep track of her sport, education, and personal life. After 2 months of using it, she never missed another test, and she continued to never miss a practice. However, since Stephany travels a lot, she isn’t at her dorm everyday. However, since the app is on a cloud, she can access her account on any other laptop or computer.


## User Stories

List the current user stories you will implement.

- [ ] As a film student, I want to organize myself by listing what projects and short films are due for the film festival, so that’s why I would like to see all my tasks sorted in earliest date first. (Kai)

- [x] As an honors student, I want to be able to see little graphs of previous accomplishments, so that I stay motivated and stay on top of my class while studying to become a surgeon.

- [x] As a student I want to have my own account associated with my school email including a profile picture and username, so that my account feels customized.(Kai)

- [ ] As a computer science student, I want to be able to see what projects are late for my internships at Google, Apple, and Amazon, so that I know which project to not waste my time on if I missed the deadline already.

- [x] As a club president I want to add club meetings and log my club's activities and have different colors, so that I can easily tell the difference between tasks.

- [x] As a student/teaching assistant, I need to keep track of the assignments I personally have, as well as the projects my students are working on, and any other type of task, so that I don't spend too much time on either one and balance my time.

- [ ] As a team captain for my intramural sports soccer team, I want to be able to keep track of our soccer games on a calendar, and also log our soccer games so we can track our progress over time.

- [ ] As a working student, I want to be able to filter different graphs, so that I can see the difference in stats in terms of homeworks, tests, etc.

- [x] As a law student, I need to see data related to my completed tasks and be able to see different visualizations for the same stats, so that I can perceive the information differently if I need to.

- [x] As a nursing major, I need to be able to edit care plans, flash cards, drug cards, and process recordings organized, so that I can make small changes as time goes on.

- [x] As a foreign student living abroad, I need to make sure I can delete tasks in case I need to drop out of a course, so I don't get incorrect charts in my recap page.

## Pages/Screens

Figma Wireframe Link: https://www.figma.com/community/file/1128735735093838803
![](https://media3.giphy.com/media/oYhDoGyv1Uelfvl1Ll/giphy.gif?cid=790b7611f7f5ba2a8f35e3fdc9fffa60ec8f2d5ba4a72e26&rid=giphy.gif&ct=g)

## Data Model

Describe your app's data model using diagrams or tables
![](https://i.imgur.com/lydhAYG.png)
![](https://i.imgur.com/fsu4xPm.png)
![](https://i.imgur.com/joEi2qJ.png)
![](https://i.imgur.com/xk73yO4.png)
![](https://i.imgur.com/wjyOAtT.png)

## Endpoints
![](https://i.imgur.com/BFCQJvh.png)

Landing Screen:
1. (Create/POST) Create a new user for the application in order to be able to save their account specific information every time they log in
2. (Read/POST) Send user information to try to log in and if successful, return certain attributes of the user that are in the database already

To-Do Screen:
1. (Read/GET) Retrieves all the task under a user from the tasks database table
2. (Create/POST) Complete a task for the user and add it to the completed database table
3. (Create/POST) Creates a task for a user and adds it to the tasks database table with the users id
4. (Delete/DELETE) Deletes a existing task for a user by removing it from the tasks database table 
5. (Update/PUT) Updates info about a task under a user

DashBoard Screen:
1. (Read/GET) Retrieves facts regarding a user's accomplishments
2. (Read/GET) Retrieves upcoming tasks that the user has in their planner

Recap Screen:
1. (Read/GET) Retrieves multiple different facts generated by the model associated with that user’s past achievements in terms of tasks completed

(Stretch) Social Screen:
1. (Read/GET) Retrieves a list of all the users the logged in user follows
2. (Read/GET) Retrieves a list of all the users the logged in user is followed by
3. (Create/POST) Lets the logged in user follow someone they don't already follow
4. (Delete/DELETE) Lets the logged in user unfollow someone they follow
5. (Read/GET) Retrieves the facts about the user's followers to display them on the feed

## Endpooint Tree
![](https://i.imgur.com/wMhd3GI.png)
