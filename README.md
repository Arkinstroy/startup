# Makoshika

Design:

Have you ever wanted to make smart, informed, and profitable stock trades all on your own? Makoshika is an automated analysis software
that will allow you to review huge amounts of data scraped from the web, all contained in convenient and easily visualized knowledge graphs
that are generated with the help of AI. Just enter in which companies you are interested in trading, and Makoshika will pull in any relevant
data about that company, be it financial statements, news articles, or anything else that would indicate whether a buy would be a good decision
or not. The knowledge graphs that are computed will find connections between even the most obscure points of data.



<img width="414" alt="MakoshikaSpec" src="https://user-images.githubusercontent.com/93345601/215248729-04b18088-8da0-4ceb-9901-62be64d0c5ea.png">


Key features

Secure login and account creation
Ability to pull in relevant data on company from the Internet
Ability to generate knowledge graphs based on data pulled in
Ability to recommend choices based on data found
Editable scripts and ability to make custom plugins
Enterprise edition available for large teams or companies.
All data acquired will be securely and persistently stored on the cloud for later access.



Simon HTML

I learned how to put basic HTML structures together to create a website that can go between pages. I also learned how to make basic graphics using html and the svg type. Although none of this is styled or functional, I still know how to throw together a basic and correct layout of different html elements.


Simon CSS

I learned how to integrate bootstrap and regular CSS into an actual webpage. This one was more complicated, and already had the basic html layout, but I saw how to combine this into an actual application and make it look more professional. I also found the method to add responsivity to the application based on size to be very interesting.


Startup HTML and CSS

I learned how to combine the concepts of this class into an actual project. I found it very helpful to have the specification made beforehand. The most interesting thing that I found was editing the DOM through javascript, which is not technically supposed to be a part of this project, but oh well. If pure javascript and HTML can offer this much reactivity, I am excited to see what an actual framework can do.

Startup Javascript

I learned how to interact with the DOM effectively using javascript and how to update information that needs to be displayed. I also learned the basics of interactivity using Javascript and making it so that the website is responsive and can wait for certain amounts of time so that everything is not put in at once.
I also learned how to interact with an HTML canvas with Javascript and change it in real time.

Simon service

I learned about how to fetch data from remote sources in a basic web app. I specifically learned how to store and fetch different points of data to and from a web application. This was especially useful because it allows for functionality to store and then fetch scores without them being lost on reload.

Simon DB

Although I already knew the basics of databases, it helped to learn about storing sensitive information in environment variables. In my startup, this is probably something I should change by storing API keys in the environment variables instead of in the code itself. That way it is not visible publicly.

Simon Login

I learned how to send status codes that indicate how a certain web operation went. It's interesting to see the similarities between the server code made in Java for CS 240 and this code. Both match urls to fetch different services and send responses based on these requests. I like how Javascript and Node makes this process very simple and intuitive. The code is very streamlined and not bulky, unlike Java.

Simon WebSocket

I learned how to use websockets to enable real-time, two-way communication between a web browser and a server. It uses a persistent connection to allow data to be exchanged seamlessly and can be implemented using various programming languages and frameworks. I learned that this is ideal for applications like chat and online gaming, and is becoming increasingly important for real-time communication between web applications and servers.

Startup Service

This was a pain to make. I chased a stupid issue around for a long time involving the MongoDB topology being closed. I fixed it by making a constant variable at the top set to the second cluster, instead of defining it on the fly, which I think was causing the issue (changing it fixed it). Either way, it works now and I'm afraid to touch it. Another thing that was incredibly annoying to figure out was getting the information of the currently logged in user, but this turned out to be ridiculously easy; you could just get the cookie from the response and be like req.cookies.token or something like that.

Startup React

In some ways I kind of nuked my old project and just copied it over to a newly made React app. Either way, it hugely simplified all the code I had in place to manipulate the DOM. I have experience with Vue, so it was a bit weird going over to React and getting used to the different syntax used to accomplish the same concepts. In some ways I like it better though, and it is very streamlined. 
