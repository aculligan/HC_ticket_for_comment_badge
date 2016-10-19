// set ticket badge color by status
$(document).ready(function() {
  var subdomain = "SUBDOMAIN"; //replace SUBDOMAIN for account subdomain. For example: var subdomain = "support";
  if (HelpCenter.user.role == "agent" || HelpCenter.user.role == "manager") {
    var postComment = $(".comment");
    var ticketBadge =$("#comments li .escalation-badge");
    ticketBadge.attr("id", function(i) {
      return "comment_badge"+(i+1);
    });
    postComment.each(function() {
      var ticketBadgeID = $(this).find(ticketBadge).attr("id");
      var ticketURL = $(this).find(ticketBadge).attr("href");
      if (ticketURL != undefined) {
        var urlSplit = ticketURL.split("/tickets/");
        var ticketID = urlSplit[1];
        var getData = $.ajax({
          type:"GET",
          url: "https://" + subdomain + ".zendesk.com/api/v2/tickets/" + ticketID + ".json",
          dataType: "json"
        })
        getData.success(function(data){
          var ticketStatus = data.ticket.status;
          if (ticketStatus == "new") {
            $("#" + ticketBadgeID).css({"background":"#F5CA00", "border-color":"#F5CA00"}).text("Ticket #" + ticketID + " - New");
          }
          if (ticketStatus == "open") {
            $("#" + ticketBadgeID).css({"background":"#E82A2A", "border-color":"#E82A2A"}).text("Ticket #" + ticketID + " - Open");
          }
          if (ticketStatus == "pending") {
            $("#" + ticketBadgeID).css({"background":"#59BBE0", "border-color":"#59BBE0"}).text("Ticket #" + ticketID + " - Pending");
          }
          if (ticketStatus == "hold") {
            $("#" + ticketBadgeID).css({"background":"#000000", "border-color":"#000000"}).text("Ticket #" + ticketID + " - On-Hold");
          }
          if (ticketStatus == "solved" || ticketStatus == "closed") {
            $("#" + ticketBadgeID).css({"background":"#828282", "border-color":"#828282"}).text("Ticket #" + ticketID + " - Solved");
          }
        })
      }
    })
  }
});
