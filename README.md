# HC_ticket_for_comment_badge

Show the status of tickets created from comments in Zendesk Help Center articles and Zendesk Community posts.

Someone asked if it was possible to look up the status of a ticket that was created from a HC comment and make changes based on that.

That is definitely possible by making an API call that gets the ticket information. 

In this example, I am changing the existing badge with the ticket number to also include the current status and status color so this:

![image](https://support.zendesk.com/hc/user_images/l9JFTz2VPfG1eCEFG6LXtA.png)

looks like this:

![image](https://support.zendesk.com/hc/user_images/QodhCdDLgHFmvRWxccsDpw.png)

There are other actions you can do with this code, like changing the background color of the whole comment div, adding pop-up alets, making the comment disappear, etc.

This will work on all Help Center templates for both Article and Community post comments.

Quick note before starting: This is customization that is not supported by Zendesk, and you might need a web developer to help you if you have issues.

Go to your Help Center Edit Theme page and add [this](/script.js) code at the top of the JS page.
