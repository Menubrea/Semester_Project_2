# Semester Project 2 at Noroff
Author: Truls Haakenstad Haugen

![alt text](https://user-images.githubusercontent.com/91755385/208303029-4ce028b3-8bc1-400c-863c-bfa3c5a7e13a.png)

## Project Brief
An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings.

#### Required user-stories:

    A user with a stud.noroff.no email may register
    A registered user may login
    A registered user may logout
    A registered user may update their avatar
    A registered user may view their total credit
    A registered user may create a Listing with a title, deadline date, media gallery and description
    A registered user may add a Bid to another user’s Listing
    A registered user may view Bids made on a Listing
    A registered user may use credit to make a Bid on another user’s Listing
    An unregistered user may search through Listings

## Installation
Clone repositiory

``npm i`` to install dependencies and ``npm run build``to build dist folder.

Should you wish to make changes to the project run:

``npm run watch`` and ``npm run start``.

#### At the moment there isn't provided much QA testing.
Should you however wish to run the e2e script file, create an ``.env`` file in ``root`` with instructions from ``env.example``. Should you not have a valid account, you can create one by using the application. Then run ``npm run test-e2e``

## Issues
See https://github.com/Menubrea/Semester_Project_2/issues

## Contact
email: truls.haakenstad@outlook.com
