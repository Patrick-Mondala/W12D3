import FollowToggle from "./follow_toggle"
import UsersSearch from "./users_search"

$(() => {

  $("button.follow-toggle").each(function() {
    new FollowToggle($(this));
  });    

  $("nav.users-search").each(function() {
    new UsersSearch($(this));
  });

})