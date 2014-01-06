var APP = APP || {};

APP.container = $("section.container");

APP = $.extend({}, APP, {
  common: {
    init: function() {
      var folder_id = document.body.getAttribute("data-folder-id");

      APP.fetch_bookmarks(folder_id);
    }
  }
});

APP.fetch_bookmarks = function(folder_id) {
  $.getJSON('/'+folder_id+'.json', APP.display_videos);
}

APP.display_videos = function(data) {
  $.each(data, function(index, bookmark) {
    console.log(bookmark);
    APP.append_video(APP.video_id_for(bookmark.url), bookmark.title);
  });
}

APP.append_video = function(video_id, title) {
  if(video_id) {APP.container.append(APP.embed_element(video_id, title));}
}

APP.video_id_for = function(url) {
  var expression = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(expression);
  if (match && match[2].length==11) {
    return match[2];
  } else {
    return null;
  }
}

APP.embed_element = function(video_id, title) {
  return '<h2>'+
          title+
          '</h2><iframe src="http://www.youtube.com/embed/'+
          video_id+
          '?hd=1&rel=0&autohide=1&showinfo=0" frameborder="0" width="500" height="280"></iframe>';
}

UTIL = {
  exec: function( controller, action ) {
    var ns = APP,
      action = ( action === undefined ) ? "init" : action;

    if ( controller !== "" && ns[controller] && typeof( ns[controller][action] ) == "function" ) {
      ns[controller][action]();
    }
  },

  init: function() {
    // var body = document.body, controller = body.getAttribute( "data-controller" ), action = body.getAttribute( "data-action" );

    UTIL.exec( "common" );
    // UTIL.exec( controller );
    // UTIL.exec( controller, action );

    // $(document).trigger('finalized');
  }
};

$(document).ready( UTIL.init );
