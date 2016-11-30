// set ticket badge color by status
$(document).ready(function() {
  // Replace SUBDOMAIN for account subdomain. For example: const subdomain = 'support';
  const subdomain = 'z3nculligan';
  const userRole = HelpCenter.user.role;
  if (userRole == 'agent' || userRole == 'manager') {
    let $postComment = $('.comment');
    let $ticketBadge = $('#comments li .escalation-badge');
    $ticketBadge.attr('id', function(i) {
      return 'comment_badge'+(i+1);
    });
    $postComment.each(function() {
      let $ticketBadgeID = $(this).find($ticketBadge).attr('id');
      let $ticketURL = $(this).find($ticketBadge).attr('href');
      if ($ticketURL != undefined) {
        let $urlSplit = $ticketURL.split('/tickets/');
        let $ticketID = $urlSplit[1];
        let apiURL = `https://${subdomain}.zendesk.com/api/v2/tickets/${$ticketID}.json`;
        let getData = $.ajax({
          type: 'GET',
          url: apiURL,
          dataType: 'json'
        });
        getData.success(function(data){
          let ticketStatus = data.ticket.status;
          let $ticketBadgeIDElement = $('#' + $ticketBadgeID);
          if (ticketStatus == 'new') {
            $ticketBadgeIDElement
              .css({'background': '#F5CA00', 'border-color': '#F5CA00'})
              .text(`Ticket #${$ticketID} - New`);
          }
          if (ticketStatus == 'open') {
            $ticketBadgeIDElement
              .css({'background': '#E82A2A', 'border-color': '#E82A2A'})
              .text(`Ticket #${$ticketID} - Open`);
          }
          if (ticketStatus == 'pending') {
            $ticketBadgeIDElement
              .css({'background': '#59BBE0', 'border-color': '#59BBE0'})
              .text(`Ticket #${$ticketID} - Pending`);
          }
          if (ticketStatus == 'hold') {
            $ticketBadgeIDElement
              .css({'background': '#000000', 'border-color': '#000000'})
              .text(`Ticket #${$ticketID} - On-Hold`);
          }
          if (ticketStatus == 'solved' || ticketStatus == 'closed') {
            $ticketBadgeIDElement
              .css({'background': '#828282', 'border-color': '#828282'})
              .text(`Ticket #${$ticketID} - Solved`);
          }
        })
      }
    })
  }
});
