---
title: Hello THORN
date: 2022-07-12
author: Alecyrus
gravatar: ce27b815f3c9a623395338da35604a81
email: 'alecyrus'
---

THORN is a digital content productivity tool designed to help you sort through your mind fragments, write more comfortably, and share your creations with your readers more quickly.

---
![浅色模式](https://s1.ax1x.com/2022/07/12/jc57l9.png)


We launched the beta test in November last year. Although many users have approbated our interaction design and writing experience, some also complained that the user experience was not good especially when the network environment was unstable. At that time, honstly our first reaction was that it didn't seem like a problem caused by THORN .

But then, a question popped into our minds, is the Internet Connection necessary for writing applications? As a result, our team's following discussions extended a range of issues, particularly regarding privacy and security.

We decisively paused our development process and stopped to rethink what kind of software application THORN should be? Then, based on the pursuit of privacy, speed, and practicality, after a lot of investigation and practice, we began to recognize the limitless possibilities of [offline first](https://www.inkandswitch.com/local-first/#seven-ideals-for-local-first-software) over THORN:

> We believe that data ownership and real-time collaboration are not mutually exclusive. The software can be designed with all the benefits of cloud applications while also allowing you to retain ownership and control over all the data you create.<br/> <br/>
> We refer to this type of software as offline-first software because it prioritizes the use of local storage over servers located in remote data centres.<br/><br/>
> In cloud applications, the data on the server is considered the primary copy of the data; if the client has a copy of the data, it is only subordinate to the server's cache. Any data modifications must be sent to the server. In an offline-first application, we swap these roles: we treat the copy of the data on the local device (laptop, tablet, or phone) as the primary copy. Servers still exist, but they keep secondary copies of data to facilitate access from multiple devices.

Immediately afterwards, we were enlightened, as if all the problems had been solved.

Going back to the previous description of offline-first software, it seems to be no different from some local writing software with cloud backup, right? Not really. Please continue reading.

---
# Not discarding the cloud, but offline first
For multi-device synchronization and user collaboration, traditional cloud-based solutions have been successful with many products and services. Although they allow you to access your data anywhere, all data access must go through their servers, and you are only allowed to do what the server allows you to do. So all your data, including the history of changes to that data, is fully recorded.

In other words, you never fully own the data at all because the ownership and control of the data are in the hands of the service providers, and you can't resist it. You can only presume that these service providers will follow their proposed user agreement and privacy policy and handle you properly of all your data.

On the other hand, you are also at the mercy of the company that provides the service. If the service is unavailable or down, you will no longer be able to access the data created with the software, and even if you can export the data, in most cases, you will not be able to use the software normally without a server. This is also the reason why most users trust large companies or companies with strong capital backgrounds, these companies are less likely to fail, so they can provide longer and more stable services.

You may have used software that syncs data between devices via iCloud or WebDAV, and the data is usually saved in a file on the local disk, so you have full control and ownership of the data: you can do Anything you want, including long-term archiving, making backups, and manipulating files with other programs.

You don't need anyone's permission to access your files anytime without going through a server run by a company. Those Apps usually guarantee your absolute privacy without any censorship. However, they cannot bring you features like real-time synchronization, online collaboration, and more.

So between privacy and collaboration, you need to make a tough trade-off. Can't we have the best of both benefits?

Of course, Offline-first is the answer. Offline-first Apps have seven characteristics:

1. **Quick Response**: The primary copy of the data is kept on the local device, and the user never has to wait for a network connection. Data synchronization with other devices and users happens silently in the background.

2. **Multi-Device Sync**: Data is stored locally on each device and automatically synced across all the devices the user works on.

3. **Network optional**: Users can read and write data at any time, whether online or not. When a network connection is available, the local device automatically synchronizes with other devices.

4. **Collaboration**: Local devices and other devices (whether those are yours or not) support real-time collaboration on the same data.

5. **Longevity**: Your data should be accessible indefinitely. Since you have a native copy of the software and data, this software will work forever. Even if the software maker goes bankrupt, you can continue to run the last released version of the software. And you can export all of your data to a common format for access with other software.

6. **SECURITY AND PRIVACY**: Unlike traditional cloud-based solutions, Offline-first software does not have a centralized database that holds all user data. Your local device only stores your data by avoiding a centralized cloud. The database contains everyone's data, and Offline-first software has excellent security and privacy.

7. **DATA OWNERSHIP AND CONTROL**: The data ownership and control here is not in the legal sense. The offline first software manufacturer will not restrict your access to the local copy data. You are allowed to pass anyway to copy and modify this data without accessing the data through the service provider's API.

After that, everyone should have a sufficient understanding of offline-first software. But unfortunately, the above description is only an ideal state.

So how exactly should you implement offline-first software as well as possible?

---
# Infrastructure for offline-first software: CRDT

According to Ink&Switch's [related research](https://www.inkandswitch.com/local-first/#crdts-as-a-foundational-technology), CRDT is one of the underlying technologies most likely to be used for local-first software implementations.

A CRDT is a special data structure that allows multiple devices to collaborate on editing the same data object. Specifically, suppose devices A and B simultaneously edit a data object over time. In that case, two change sequences, changes-on-A and changes-on-B, are generated respectively, as long as devices A and B send your changes to each other. Then the two devices can calculate the final state of the data locally.

It doesn't sound like anything special, right? But the magic is that CRDT is [mathematically proven](https://dl.acm.org/doi/pdf/10.1145/3133933) to ensure that as long as all changes to data are received from each other, the final stages of data calculated by the two devices must be consistent.

We can imagine that there is no central server to process and resolve data conflicts of all users. Each device resolves conflicts by itself. CRDT can ensure that when each device calculates by itself, all devices can still calculate the complete and consistent results.

The above description may not be perfectly accurate. Still, it can already express the core advantages that CRDT can bring, **decentralization**.

> The premise of decentralization is to apply and implement CRDT on the client side because existing collaborative software can also use CRDT technology in its centralized server to resolve data conflicts. A good representative is[Azure Cosmos DB](https://azure.microsoft.com/en-us/blog/azure-cosmos-db-pushing-the-frontier-of-globally-distributed-databases/)、[Redis](http://lp.redislabs.com/rs/915-NFD-128/images/WP-RedisLabs-Redis-Conflict-free-Replicated-Data-Types.pdf)、[Riak](http://christophermeiklejohn.com/erlang/lasp/2019/03/08/monotonicity.html)、[Weave Mesh](https://www.infoq.com/presentations/weave-mesh/), [Roshi](https://developers.soundcloud.com/blog/roshi-a-crdt-system-for-timestamped-events) and [OpenR](https://openr.readthedocs.io/Protocol_Guide/KvStore.html)。

If you are still interested in continuing to explore CRDT, you can read this article by Alexei Baboulevitch([Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/)) and this video by Martin Kleppmann([CRDTs and the Quest for Distributed Consistency
](https://www.youtube.com/watch?v=B5NULPSiOGw&ab_channel=InfoQ))。

At this point, I think you already understand what CRDT means for offline-first software.

> We believe that CRDTs have the potential to be the foundation of a new generation of software. Just as packet switching is the enabling technology for the Internet and networking, or capacitive touchscreens are the enabling technology for smartphones, we think CRDTs could be the foundation of collaborative software that gives users full ownership of their data.

---
# The data synchronization engine of THORN
Let's go back to the specific implementation. You can notice that for CRDT, a server is still needed to ensure that when the client connects to the network, the server can know the data changes of other clients at any time from the server. Of course, the client also needs to notify the server of data changes when it is offline.

[![jcZQhT.png](https://s1.ax1x.com/2022/07/11/jcZQhT.png)](https://imgtu.com/i/jcZQhT)
The above figure is a schematic diagram of the logical structure of THORN's data synchronization mechanism. You can notice:
1. All client devices of each user have a copy of the data stored in the local database;
2. The THORN synchronization service also has a copy of the data stored in Alibaba Cloud OSS.

Strictly speaking, THORN's official synchronization service is a more reliable "client" because it will save the encrypted data copy to Alibaba Cloud OSS with intra-city redundancy and remote disaster recovery enabled to provide data persistence.

At the same time, when you actively delete a data object, the official synchronization service will broadcast the deletion event to all online devices. However, suppose there is an offline device that did not receive the broadcast deletion event, the deleted data will be retained in this offline device. In that case, you can resync or restore this data object at any time through this offline device.

On the other hand, when any client device connects to the THORN sync service, the client and the THORN sync service will transmit data updates to each other to complete the data synchronization. Then the THORN sync service will push other clients' data updates to the client. At the same time, data changes will also be transmitted to the synchronization service at any time.

So there is a **star schema** between the sync service and the client device:
![](https://s1.ax1x.com/2022/07/12/jcTySe.png)
As shown in the figure, the synchronization between clients 1, 3, 4, and the THORN synchronization service ensures that their respective data copies are in the same state.

When client 3 reconnects to the network, it can also achieve the final consistency of the status of all data copies through data synchronization with the THORN synchronization service.

It doesn't seem to be anything special? Traditional cloud-based solutions are also similar to star architecture. However, this understanding is wrong. The traditional model is a centralized star architecture. The client is subject to the server. Without the server, the client can hardly run normally.

The THORN model is a star-shaped architecture similar to a P2P network. The client and the server are in an equal relationship, and there is no synchronization service. The client can also run independently without user collaboration and multi-device synchronization.

The equality between the client and the server is reflected in the fact that the server can be replaced. You can use the synchronization service operated and maintained by us or use the self-deployed THORN synchronization service. It is worth mentioning that you can switch synchronization services quickly. All you need to do is to change the synchronization service and resynchronize the total amount of data once.

Seeing this, I believe you may have a big question in your mind. The privacy and security that the aforementioned offline-first software promised do not seem to be guaranteed by THORN's model?

---
# How to ensure privacy and security?
Privacy and security issues only involve the THORN synchronization service itself. Under the aforementioned understanding, the THORN synchronization service does not belong to your assets or facilities, even if it aims to provide better services rather than spy on you maliciously.

Aren't you worried that some wicked THORN team member will peek at your data? Even through you have your data locally, the sync service also has your data.

Maybe you don't care about your data being snooped on by hackers. Still, many people cannot use cloud applications due to legal and regulatory constraints and confidentiality obligations.

So, how does THORN do it?

> In THORN, each user can create multiple spaces, and each space can use different THORN synchronization services.

It is crucial to understand the above quote. Because we will implement different THORN synchronization services based on different technologies in the future. Different synchronization service implementations may have completely different degrees of privacy and security.

## Current THORN design
The current THORN synchronization service is implemented based on Websocket, which not only requires low computing and network resources, but also has high performance.

The THORN synchronization service operated and maintained by our official team uses Alibaba Cloud OSS with intra-city redundancy, and remote disaster recovery enabled as the storage medium, but we will also support connecting to the object storage service purchased by users in the future. In addition, the THORN synchronization service will also help self-deployment by individuals and organizations.
> Since the THORN synchronization service has no traditional database dependencies, even if individual users deploy the THORN synchronization service by themselves, the required resources and costs are extremely low.

Of course, this is all optional, depending on how you choose:
1. **Trust the THORN team**: use the THORN official synchronization service to save a copy of the data to the THORN official object storage service;
2. **Maximum protection of data ownership and control**: Use THORN's official synchronization service and save data to the object storage service purchased by yourself;
3. **Maximum guarantee of privacy and data sovereignty**: use the self-deployed official synchronization service and save data to the object storage service purchased by yourself;

In this case, when your data is disseminated, your data may be subject to scrutiny under the requirements of relevant laws and regulations. For details, please refer to [THORN Terms of Service](https://thorn.red/terms .html) in the section about "Users' Commitment to Legally Use THORN Services".

But no matter 1, 2 or 3, you should follow the THORN Terms of Service and use THORN legally. If you violate the laws and regulations of your region and the THORN Terms of Service, you will be prohibited from using the THORN synchronization service.

## Future plans
By mid-2023, we will launch a new THORN sync service based on [Hypercore](https://hypercore-protocol.org/) in THORN International version.

> > Hypercore protocol is a P2P data network built on Hypercore logs. Hypercore is a signed, append-only log. They are like lightweight blockchains without consensus algorithms.


With Hypercore, THORN has end-to-end encryption.

---
> Due to the entirely different architecture, the data of the THORN internal beta version and the official version are not compatible and cannot support migration, but internal beta users do not need to worry. We will provide a compensation plan.

# The new official version of THORN
The cloud-based architecture solution of the THORN beta version is completely abandoned. The entire application architecture of the THORN official version supports "local first" natively at the bottom.

On the basis of *Offline first*, we have created a new THORN application.

## THORN Architecture
![](https://s1.ax1x.com/2022/07/12/jc710I.png)
The above picture shows the planned functions of the official version of THORN. For the specific function introduction, please visit the [official website](https://thorn.red) to view.

At present, some features are not totally completed, and the unfinished features will be launched in the following updates.

## Features preview

### Workspace preview

![](https://s1.ax1x.com/2022/07/12/jc7Vk6.png)

By clicking the button on the far left of the top bar, you can open the *Overview* to view the data statistics of the current space. At the same time, you can also create and switch workspaces on the overview page. In addition, the overview page also allows you to adjust the app display language and overview wallpaper. In the future, we will provide richer statistical visualization charts in the *Overview*.

### Writing · All Articles
![](https://s1.ax1x.com/2022/07/12/jc7acQ.png)

### Writing · Full Text Search
Move the mouse over the search results list item, and the context of the matching text inside the document will be displayed below.
![](https://s1.ax1x.com/2022/07/12/jc7g9U.png)

### Writing · Memos
The most basic Memo features are now supported, and the integration of the Memo API with other applications will be supported in the future.
![](https://s1.ax1x.com/2022/07/12/jc7yNV.png)

### Writing · Article independent editing window
![](https://s1.ax1x.com/2022/07/12/jcbXTI.png)

### Writing · Text style menu
Text color/background, bold, italic, underline, strikethrough... it's all there.
![](https://s1.ax1x.com/2022/07/12/jc7jud.png)

### Writing · Node Menu
#### Paragraph Node Menu
Paragraph nodes integrate Blockquote nodes and Callout nodes, and are rendered in new **markup** and **focus** paragraph styles, while also supporting paragraph **backgrounds**.
![](https://s1.ax1x.com/2022/07/12/jc7vDA.png)

#### Image node menu
* Support picture drag and drop, paste and insert
* Support image title, rounded corners and automatic theme color background
* Support image size, alignment style adjustment
![](https://s1.ax1x.com/2022/07/12/jc7xHI.png)
![](https://s1.ax1x.com/2022/07/12/jcHSEt.png)
![](https://s1.ax1x.com/2022/07/12/jcHqI0.png)


#### Formula Node Menu
* Supports Latex and AsciiMath formula syntax
* Support chemical expressions
![](https://s1.ax1x.com/2022/07/12/jcHFgg.png)

#### Table Node Menu
* Support cell merging, header style, drag and drop to adjust column custom width
* Support cell background, alignment style adjustment
![](https://s1.ax1x.com/2022/07/12/jcH94f.png)

#### Mermaid graph node menu
![](https://s1.ax1x.com/2022/07/12/jcHEuj.png)

### Writing · Ordered/Unordered/To-Do List
![](https://s1.ax1x.com/2022/07/12/jgEEfU.png)


### Writing · Shortcut Command Menu
* Support fuzzy search
* Support Tab and up and down arrow keys to switch selected items
![](https://s1.ax1x.com/2022/07/12/jcHPC8.png)

### Writing · Online Web Pictures
![](https://s1.ax1x.com/2022/07/12/jcHkvQ.png)


### Writing · Editor right panel
#### Article index
![](https://s1.ax1x.com/2022/07/12/jcHMCT.png)

#### Article information
![](https://s1.ax1x.com/2022/07/12/jcHu5V.png)

#### Export and share
![](https://s1.ax1x.com/2022/07/12/jcHnU0.png)


### Writing · Exporting files
#### Markdown
![](https://s1.ax1x.com/2022/07/12/jcHl2F.png)

#### PDF
![](https://s1.ax1x.com/2022/07/12/jcHIMQ.png)

#### Image
![](https://s1.ax1x.com/2022/07/12/jcH8KJ.png)


---
This is just the beginning, there are many more surprising features and optimizations on the way...

# Last but not the least
On August 1, 2022, THORN will be officially launched globally. We look forward to seeing you!

> The THORN Early Access version has been opened for download!