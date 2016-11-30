// set ticket badge color by status
$(document).ready(function() {
  const subdomain = 'SUBDOMAIN'; //replace SUBDOMAIN for account subdomain. For example: var subdomain = 'support';
  const userRole = HelpCenter.user.role;
  const $thisItem = $(this);
  if (userRole == 'agent' || userRole == 'manager') {
    const $postComment = $('.comment');
    const $ticketBadge = $('#comments li .escalation-badge');
    $ticketBadge.attr('id', function(i) {
      return 'comment_badge'+(i+1);
    });
    $postComment.each(function() {
      const $ticketBadgeID = $thisItem.find($ticketBadge).attr('id');
      const $ticketURL = $thisItem.find($ticketBadge).attr('href');
      if ($ticketURL != undefined) {
        const $urlSplit = $ticketURL.split('/tickets/');
        const $ticketID = $urlSplit[1];
        const apiURL = `https://$(subdomain).zendesk.com/api/v2/tickets/$($ticketID).json`;
        const getData = $.ajax({
          type: 'GET',
          url: apiURL,
          dataType: 'json'
        });
        getData.success(function(data){
          const ticketStatus = data.ticket.status;
          const $ticketBadgeIDElement = $('#' + $ticketBadgeID);
          if (ticketStatus == 'new') {
            $ticketBadgeIDElement
              .css({'background': '#F5CA00', 'border-color': '#F5CA00'})
              .text(`Ticket #$($ticketID) - New`);
          }
          if (ticketStatus == 'open') {
            $ticketBadgeIDElement
              .css({'background': '#E82A2A', 'border-color': '#E82A2A'})
              .text(`Ticket #$($ticketID) - Open`);
          }
          if (ticketStatus == 'pending') {
            $ticketBadgeIDElement
              .css({'background': '#59BBE0', 'border-color': '#59BBE0'})
              .text(`Ticket #$($ticketID) - Pending`);
          }
          if (ticketStatus == 'hold') {
            $ticketBadgeIDElement
              .css({'background': '#000000', 'border-color': '#000000'})
              .text(`Ticket #$($ticketID) - On-Hold`);
          }
          if (ticketStatus == 'solved' || ticketStatus == 'closed') {
            $ticketBadgeIDElement
              .css({'background': '#828282', 'border-color': '#828282'})
              .text(`Ticket #$($ticketID) - Solved`);
          }
        })
      }
    })
  }
});
