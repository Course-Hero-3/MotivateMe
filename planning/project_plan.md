# Project Plan

Pod Members: **Stephane Mbenga, Kian Ranjbar, Gikai Andrews**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

User Roles:
* Student: A scholar who wants to organize their schedule and log assignments


User Personas:

* James: James is an incoming freshman at Cornell University and will be majoring in computer science. In highschool hestruggled to keep track of assignments he needed to complete and was overwhelmed most of the time. He 
  has never had a system for staying organized in terms of his assignments, homeworks, and exams but wants to change and stay organized to take some stress off his    shoulders and do better in college. 
   
* Jonathan: Jonathan is well into his third year at the University of Michigan, and gets demotivated when he is assigned work for his classes. He wishes he was more motivated and inspired to start his work early and finish on or before the deadlines.

* Owen Wilson is a student at Saddleback Community College who just recently came back from a one year break. However, he forgot how fast paced school was and since he wants to transfer by summer, he can’t afford to fail any of his classes. Therefore, he downloaded APP NAME on his laptop in order to keep an agenda of his things. He is a business major so every morning he usually goes on his laptop to complete material online, and that is when he enters items he needs to do, as well as the items he has completed the previous day. He is familiar with technology as he is 20 years old so navigating around the app is not a problem. Some potential pain points may be that he cannot access it on his mobile device on the go.

* Stephany is a very smart student-athlete at UCLA who plays water polo and never has free time. Whether it’s competitive matches or extremely hard tests, she’s always booked. She majors in cognitive science with hopes of becoming a pediatrician later on after graduating with her Bachelor’s. After showing up to one of her classes on the third week of the quarter, and not knowing there was a test, she failed a test for the first time in her life. As a preventive measure, she started using APP NAME on her dorm computer to keep track of her sport, education, and personal life. After 2 months of using it, she never missed another test, and she continued to never miss a practice. However, since Stephany travels a lot, she isn’t at her dorm everyday. However, since the app is on a cloud, she can access her account on any other laptop or computer.


## User Stories

List the current user stories you will implement.

1. As a professor, I want to organize myself by listing what assignments, exams, and projects are due for my students, so that’s why I would like to use this application to make myself organized.

2. As an honors student, I want to be able to see little summaries of previous accomplishments, so that I stay motivated and stay on top of my class while studying to become a surgeon.

3. As a struggling student, I want to be able to keep track of all my tests, so that I give myself enough time to study instead of cramming it all into the day before the test.

4. As a computer science student, I want to be able to see what projects I have to submit for my internships at Google, Apple, and Amazon.

5. As a club president I want to schedule club meetings and also log our clubs activities so we are more organized as a club

6. As a student/teaching assistant, I need to keep track of the assignments I personally have, as well as the projects my students are working on, so that I don't spend too much time on either one and balance my time

7.  As a team captain for my intramural sports soccer team, I want to be able to keep track of our soccer games on a calendar, and also log our soccer games so we can track our progress over time

8.  As a working student, I need to keep track of my In N Out shifts as well to know when my live classes are, so that I can make enough money to pay for my tuition as well as pass my classes

9.  As a professor, I need to log my students exam/homework grades and get a statistical summary of my students successes/failures to present to them how they did at the end of the year

10. As a nursing major, I need to keep track of care plans, flash cards, drug cards, and process recordings organized so I can see what case studies are gonna be due for our scenarios

11. As a foreign student living abroad, I need to make sure I have all classes and tests at the correct time, so I don't miss anything due to my different time zone.

## Pages/Screens

![](https://i.imgur.com/4dfBIIA.png)
![](https://i.imgur.com/udCRd6P.png)
![](https://i.imgur.com/8tJJMD2.png)
![](https://i.imgur.com/A6Ggans.png)
![](https://i.imgur.com/qcPwNQu.png)
![](https://i.imgur.com/ticuZkR.png)
![](https://i.imgur.com/KdgvUkx.png)
![](https://i.imgur.com/LvSt6oz.png)
![](https://i.imgur.com/C8oEEEu.png)

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
1. (Create/Post) Create a new user for the application in order to be able to save their account specific information every time they log in
2. (Read/Post) Send user information to try to log in and if successful, return certain attributes of the user that are in the database already

To-Do Screen:
1. (Read/Get) Retrieves all the task under a user from the tasks database table
2. (Create/Post) Creates a task for a user and adds it to the tasks database table with the users id
3. (Delete) Deletes a existing task for a user by removing it from the tasks database table 
4. (Put/update) Updates info about a task under a user

DashBoard Screen:
1. (Read/Get) Retrieves multiple facts regarding a users accomplishments
2. (Read/Get) Retrieves multiple facts regarding the user’s followings’ accomplishments

Recap Screen:
1. (Read/Get) Retrieves multiple different facts generated by the model associated with that user’s past achievements in terms of tasks completed

## Endpooint Tree
![](https://i.imgur.com/wMhd3GI.png)
***Don't forget to set up your Issues, Milestones, and Project Board!***
