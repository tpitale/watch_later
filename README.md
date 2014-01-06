# Watch Later #

At some point I saw a neat page that GitHub put up of all the speaking their
team did. Since then, I've wanted a page of my own, but, not just for my own
speaking, but any videos that I had queued up in Instapaper.

This is that page.

## About ##

This setup has three parts:

1. A ruby script which uses the Instapaper API (via the instapaper rubygem) to download all the bookmarks in a particular folder.
2. The json download from the previous step
3. An html file and a javascript file configured to look for that json file, and display youtube embeds

### The Ruby ###

To set up the ruby, you'll need to clone the repo into `~/.instapaper`, `cd` in, and run `bundle install`. After that, run `bin/update_watch_later unread`
(or some other folder_id) using cron. I run it every 5 minutes.

### The json ###

Will get downloaded by cron.

### The html/js ###

Crack open the index.html, and change the body's `data-folder-id` to "unread", or whatever you used when running the `bin/update_watch_later` command.

## Pulling it ALL together ##

Lastly, run `foreman start`. Open your browser to `localhost:8000` and enjoy!
