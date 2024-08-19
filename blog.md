---
layout: default
title: Blog
---

# Blog

Welcome to the blog! Here you'll find all my latest posts.

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url }})
*Published on {{ post.date | date: "%B %d, %Y" }}*

{{ post.excerpt | strip_html | truncatewords: 50 }}

[Read more]({{ post.url }})
{% endfor %}
